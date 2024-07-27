import Header from "../../components/Header";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileCard from "../../components/ProfileCard";
import { Container } from "react-bootstrap";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { Padding } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [userData, setUserData] = useState({});

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
            <Container>
                
                <ProfileCard userData={userData} />

                
            </Container>

            <Fab  color="primary" aria-label="edit" onClick={handleEditClick}>
            <EditIcon />
            </Fab>
        </div>
        
    );
}