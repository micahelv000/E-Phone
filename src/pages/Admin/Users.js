import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Header from '../../components/Header.js';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Bottom from '../../components/Bottom';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'username',
      headerName: 'username',
      width: 150,
      editable: true,
    },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'city',
      headerName: 'city',
      width: 150,
      editable: true,
    },
    {
      field: 'phoneNumber',
      headerName: 'phoneNumber',
      type: 'number',
      width: 110,
      editable: true,
    },
  
  ];
  
  
  export default function Users() {
    const [rows, setRows] = useState([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:5000/users', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
          });
          const users = response.data.map((user, index) => ({
            id: index + 1,
            ...user
          }));
          setRows(users);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, []);
    
//in the future, need to implement add admin, remove user, edit user.
    return (
        <div>
            <Header/>
            <Container>
              <h1>Admin page for edit users details</h1>
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
                    baseCheckbox
                    RowSelectionOnClick
                />
            </Box>
            </Container>
            <Bottom style={{ paddingBottom: '0px' }} />

        </div>
    );
}
