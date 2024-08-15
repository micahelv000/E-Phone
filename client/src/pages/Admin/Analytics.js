import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/layout/Header';
import Bottom from '../../components/layout/Bottom';
import Card from '../../components/analytics/Card';
import BarChartComponent from '../../components/analytics/BarChartComponent';
import PieChartComponent from '../../components/analytics/PieChartComponent';
import LineChartComponent from '../../components/analytics/LineChartComponent';
import { faUsers, faExchangeAlt, faDollarSign, faChartLine } from '@fortawesome/free-solid-svg-icons';

const Analytics = () => {
  const [userData, setUserData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axiosInstance.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchTransactionData = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axiosInstance.get('/admin-all-transactions', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTransactionData(response.data);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    fetchUserData();
    fetchTransactionData();
  }, []);

  const totalUsers = userData.length;
  const totalTransactions = transactionData.length;
  const totalSales = transactionData.reduce((acc, transaction) => acc + transaction.TotalPrice, 0);
  const averageTransactionValue = totalSales / totalTransactions;

  const transactionsPerUser = userData.map(user => ({
    username: user.username,
    transactions: transactionData.filter(transaction => transaction.UserId === user._id).length
  }));

  const salesPerUser = userData.map(user => ({
    username: user.username,
    sales: transactionData.filter(transaction => transaction.UserId === user._id).reduce((acc, transaction) => acc + transaction.TotalPrice, 0)
  }));

  const salesOverTime = transactionData.map(transaction => ({
    date: new Date(transaction.OrderDate).toLocaleDateString(),
    sales: transaction.TotalPrice
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h1>Analytics</h1>
        <div className="row">
          <div className="col-md-3">
            <Card icon={faUsers} title="Total Users" value={totalUsers} bgColor="bg-primary" />
          </div>
          <div className="col-md-3">
            <Card icon={faExchangeAlt} title="Total Transactions" value={totalTransactions} bgColor="bg-success" />
          </div>
          <div className="col-md-3">
            <Card icon={faDollarSign} title="Total Sales" value={`$${totalSales.toFixed(2)}`} bgColor="bg-info" />
          </div>
          <div className="col-md-3">
            <Card icon={faChartLine} title="Average Transaction Value" value={`$${averageTransactionValue.toFixed(2)}`} bgColor="bg-warning" fontSize="1rem" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Transactions Per User</h5>
                <BarChartComponent data={transactionsPerUser} dataKey="transactions" xAxisKey="username" barColor="#8884d8" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Sales Per User</h5>
                <PieChartComponent data={salesPerUser} dataKey="sales" nameKey="username" colors={COLORS} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Sales Over Time</h5>
                <LineChartComponent data={salesOverTime} dataKey="sales" xAxisKey="date" lineColor="#8884d8" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Bottom style={{ paddingBottom: '0px' }} />
    </div>
  );
}

export default Analytics;