import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/layout/Header.js';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Button, ButtonGroup } from 'react-bootstrap';
import axiosInstance from '../../utils/axiosConfig';
import BottomLongPages from '../../components/layout/BottomLongPages';

export default function Users() {
  const [rows, setRows] = useState([]);
  const [editedRows, setEditedRows] = useState(new Set());

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateUser = async (user) => {
    try {
      await axiosInstance.put(`http://localhost:5000/users/${user.id}`, user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      alert(`User ${user.id} updated successfully`);
      setEditedRows((prevEditedRows) => {
        const newEditedRows = new Set(prevEditedRows);
        newEditedRows.delete(user.id);
        return newEditedRows;
      });
    } catch (error) {
      alert(`Error updating user ${user.id}`);
      console.error(`Error updating user ${user.id}:`, error);
    }
  };

  const handleForceLogout = async (id) => {
    try {
      await axiosInstance.post(`http://localhost:5000/users/${id}/force-logout`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      alert(`User ${id} has been logged out`);
    } catch (error) {
      console.error('Error forcing log out:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'username',
      headerName: 'Username',
      width: 150,
      editable: true,
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 150,
      editable: true,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 150,
      editable: true,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      type: 'text',
      width: 110,
      editable: true,
    },
    {
      field: 'isAdmin',
      headerName: 'Admin',
      width: 110,
      editable: true,
      type: 'boolean',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <ButtonGroup style={{ gap: '5px' }}>
          <Button variant="danger" onClick={() => handleDelete(params.row.id)}>
            Delete
          </Button>
          <Button
            variant="primary"
            onClick={() => handleUpdateUser(params.row)}
            disabled={!editedRows.has(params.row.id)}
          >
            Update
          </Button>
          <Button
            variant="warning"
            onClick={() => handleForceLogout(params.row.id)}
          >
            Force Log Out
          </Button>
        </ButtonGroup>
      ),
    }
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
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        const users = response.data.map((user) => ({
          id: user._id,
          ...user
        }));
        setRows(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Header/>
      <Container>
        <center><h1>Admin page for edit users details</h1></center>
        <Box sx={{ height: '80vh', width: '100%' }}>
          <DataGrid
            rows={rows}
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
        </Box>
      </Container>
      <br/>
      <BottomLongPages style={{ paddingBottom: '0px' }} />
    </div>
  );
}