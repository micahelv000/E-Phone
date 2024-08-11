import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/layout/Header.js';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Button, ButtonGroup, Modal, FormControl, InputGroup, Spinner } from 'react-bootstrap';
import axiosInstance from '../../utils/axiosConfig';
import BottomLongPages from '../../components/layout/BottomLongPages';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Transactions() {
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [editedRows, setEditedRows] = useState(new Set());
    const [showModal, setShowModal] = useState(false);
    const [transactionDetails, setTransactionDetails] = useState(null);
    const [userMap, setUserMap] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
      try {
        await axiosInstance.delete(`http://localhost:5000/delete-transaction/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    };

    const handleUpdateTransaction = async (transaction) => {
      try {
        await axiosInstance.put(`http://localhost:5000/transaction/${transaction.id}`, transaction, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        alert(`Transaction ${transaction.id} updated successfully`);
        setEditedRows((prevEditedRows) => {
          const newEditedRows = new Set(prevEditedRows);
          newEditedRows.delete(transaction.id);
          return newEditedRows;
        });
      } catch (error) {
        alert(`Error updating transaction ${transaction.id}`);
        console.error(`Error updating transaction ${transaction.id}:`, error);
      }
    };

    const handleViewDetails = async (id) => {
      try {
        const response = await axiosInstance.get(`http://localhost:5000/transaction/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        navigate(`/transactionDetails/${id}`); 
      } catch (error) {
        console.error('Error fetching transaction details:', error);
      }
    };
    

    const columns = [
      { field: 'id', headerName: 'ID', width: 250 },
      { field: 'TotalQuantity', headerName: 'Total Quantity', width: 150 },
      { field: 'TotalPrice', headerName: 'Total Price', width: 150 },
      { field: 'UserName', headerName: 'User', width: 150 },
      { field: 'OrderDate', headerName: 'Order Date', width: 200 },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 300,
        renderCell: (params) => (
          <ButtonGroup style={{ gap: '5px' }}>
            <Button variant="danger" onClick={() => handleDelete(params.row.id)}>
              Delete
            </Button>
            <Button variant="primary" onClick={() => handleViewDetails(params.row.id)}>
              View Details
            </Button>
          </ButtonGroup>
        ),
      },
    ];

    const handleRowEdit = (updatedRow) => {
      setEditedRows((prevEditedRows) => {
        const newEditedRows = new Set(prevEditedRows);
        newEditedRows.add(updatedRow.id);
        return newEditedRows;
      });
      setRows((prevRows) => {
        return prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row));
      });
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const [transactionsResponse, usersResponse] = await Promise.all([
            axiosInstance.get('http://localhost:5000/admin-all-transactions', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
              }
            }),
            axiosInstance.get('http://localhost:5000/users', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
              }
            }),
          ]);

          const userMap = usersResponse.data.reduce((acc, user) => {
            acc[user._id] = user.name;
            return acc;
          }, {});
          
          setUserMap(userMap);

          const transactions = transactionsResponse.data.map((transaction) => ({
            id: transaction._id,
            TotalQuantity: transaction.TotalQuantity,
            TotalPrice: transaction.TotalPrice,
            UserName: transaction.username || 'Unknown User',
            OrderDate: new Date(transaction.OrderDate).toLocaleString(),
          }));
          
          setRows(transactions);
          setFilteredRows(transactions);
          setNoData(transactions.length === 0);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    useEffect(() => {
      const filtered = rows.filter(row =>
        row.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.UserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.TotalPrice.toString().includes(searchQuery) ||
        row.OrderDate.toLowerCase().includes(searchQuery)
      );
      setFilteredRows(filtered);
      setNoData(filtered.length === 0);
    }, [searchQuery, rows]);

    const handleCloseModal = () => {
      setShowModal(false);
      setTransactionDetails(null);
    };

    return (
      <div>
        <Header/>
        <Container>
          <center><h1>Admin page for editing transaction details</h1></center>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="basic-addon2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
              <Spinner animation="border" />
            </div>
          ) : (
            <Box sx={{ height: '80vh', width: '100%' }}>
              {noData ? (
                <center><h2>No data available</h2></center>
              ) : (
                <DataGrid
                  rows={filteredRows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 20,
                      },
                    },
                  }}
                  pageSizeOptions={[20]}
                  checkboxSelection
                  processRowUpdate={handleRowEdit}
                />
              )}
            </Box>
          )}
        </Container>
        <br/>
        <BottomLongPages style={{ paddingBottom: '0px' }} />

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Transaction Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {transactionDetails ? (
              <div>
                <p><strong>ID:</strong> {transactionDetails._id}</p>
                <p><strong>Total Quantity:</strong> {transactionDetails.TotalQuantity}</p>
                <p><strong>Total Price:</strong> ${transactionDetails.TotalPrice.toFixed(2)}</p>
                <p><strong>User:</strong> {transactionDetails.username}</p>
                <p><strong>Order Date:</strong> {new Date(transactionDetails.OrderDate).toLocaleString()}</p>
                <p><strong>Items:</strong></p>
                <ul>
                  {transactionDetails.Items.map((item, index) => (
                    <li key={index}>{item.ItemName}: {item.Quantity}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}
