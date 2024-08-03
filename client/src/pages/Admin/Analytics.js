import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import Header from '../../components/layout/Header';
import Bottom from '../../components/layout/Bottom';


function Analytics() {
    const [userData, setUserData] = useState([]);
    const [salesData, setSalesData] = useState([]);
  
    useEffect(() => {
      // Replace with your API endpoints
      axios.get('/api/user-data')
        .then(response => setUserData(response.data))
        .catch(error => console.error('Error fetching user data:', error));
  
      axios.get('/api/sales-data')
        .then(response => setSalesData(response.data))
        .catch(error => console.error('Error fetching sales data:', error));
    }, []);
  
    return (
    <div>
        <Header />
        <div className="container mt-5">
            <h1>Analytics</h1>
            <div className="card">
            <div className="card-body">
                <h5 className="card-title">User Activity</h5>
                <p className="card-text">
                {userData.length > 0 ? JSON.stringify(userData) : 'Loading...'}
                </p>
            </div>
            </div>
            <div className="card mt-3">
            <div className="card-body">
                <h5 className="card-title">Sales Data</h5>
                <p className="card-text">
                {salesData.length > 0 ? JSON.stringify(salesData) : 'Loading...'}
                </p>
            </div>
            </div>
        </div>
        <Bottom style={{ paddingBottom: '0px' }} />

      </div>
    );
  }


  export default Analytics;
