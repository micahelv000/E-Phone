import Header from "../../components/layout/Header";
import React, { useEffect, useState } from 'react';
import ProfileCard from "../../components/profile/ProfileCard";
import { Container } from "react-bootstrap";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import BottomLongPages from '../../components/layout/BottomLongPages';
import './Profile.css'
import axiosInstance from "../../utils/axiosConfig";

export default function Profile() {
    const [userData, setUserData] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axiosInstance.get('http://localhost:5000/user-details', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data);
                setIsAdmin(response.data.isAdmin);
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        const fetchTransactions = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axiosInstance.get('http://localhost:5000/all-transactions', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions', error);
            }
        };

        fetchUserData();
        fetchTransactions();
    }, []);

    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/Edituser');
    };

    const handleTransactionClick = (id) => {
        navigate(`/transactionDetails/${id}`);
    };

    return (
        <div className="profile-page">
            <Header />
            <div className="profile-content">
                <Container>
                    <ProfileCard userData={userData} />
                    {isAdmin && (
                        <Container className="admin-panel">
                            <Box sx={{ flexGrow: 3 }}>
                                <Grid>
                                    <h3><center>Admin Panel</center></h3>
                                </Grid>
                                <Grid container spacing={2} columns={24} className="admin-buttons">
                                    <Grid xs={8}>
                                        <Button href="admin/users">Users Management</Button>
                                    </Grid>
                                    <Grid container xs={16} columns={12}>
                                        <Grid xs={4}>
                                            <Button href="admin/add-item">Stock Management</Button>
                                        </Grid>
                                        <Grid xs={4}>
                                            <Button href="admin/analytics">Analytics</Button>
                                        </Grid>
                                        <Grid xs={4}>
                                            <Button href="admin/Transactions">Transactions</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Container>
                    )}
                    <Container className="admin-panel">
                        <center><h2>Last Transactions</h2></center>
                        <Stack spacing={5}>
                            <div className="trans">
                                {transactions.length === 0 ? (
                                    <center><p>No transactions found.</p></center>
                                ) : (
                                    transactions.map(transaction => (
                                        <div
                                            key={transaction._id}
                                            className="trans-item"
                                            onClick={() => handleTransactionClick(transaction._id)}
                                            style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px' }}
                                        >
                                            <p><strong>Transaction ID:</strong> {transaction._id}</p>
                                            <p><strong>Total Quantity:</strong> {transaction.TotalQuantity} items</p>
                                            <p><strong>Total Price:</strong> ${transaction.TotalPrice.toFixed(2)}</p>
                                            <p><strong>Order Date:</strong> {new Date(transaction.OrderDate).toLocaleString()}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </Stack>
                    </Container>
                </Container>
            </div>
            <Fab color="primary" margin-left="100" aria-label="edit" onClick={handleEditClick}>
                <EditIcon />
            </Fab>
            <BottomLongPages style={{ paddingBottom: '0px' }} />
        </div>
    );
}