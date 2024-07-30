import Header from "../../components/Header";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileCard from "../../components/ProfileCard";
import { Container } from "react-bootstrap";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import BottomLongPages from '../../components/BottomLongPages';

import './Profile.css'

export default function Profile() {
    const [userData, setUserData] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axios.get('http://localhost:5000/user-details', {
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

        fetchUserData();
    }, []);

    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/Edituser');
    };

    return (
        <div>
            <Header />

            <br />
            <Container >
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
                                    <Grid xs={6}>
                                        <Button href="admin/add-item">Stock Management</Button>
                                    </Grid>
                                    <Grid xs={6}>
                                        <Button href="admin/analytics">Analytics</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                )}

                <Container className="admin-panel">
                    <center><h2>Last Transaction</h2></center>
                    <Stack spacing={5}>
                        <div className="trans">
                            <div className="trans-item">Transaction number: XXXX | ZZ items | YYYY$</div>
                            <div className="trans-item">Transaction number: XXXX | ZZ items | YYYY$</div>
                            <div className="trans-item">Transaction number: XXXX | ZZ items | YYYY$</div>
                        </div>
                    </Stack>
                </Container>
            </Container>

            <Fab  color="primary" margin-left="100" aria-label="edit" onClick={handleEditClick}>
                <EditIcon />
            </Fab>
            <BottomLongPages style={{ paddingBottom: '0px' }} />

        </div>

    );
}