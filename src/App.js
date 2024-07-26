import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import AddItem from './pages/Items/AddItem';
import AdminAnalytics from './pages/Admin/Analytics';
import AdminUsers from './pages/Admin/Users';
import Cart from './pages/Cart';
import EditItem from './pages/Items/EditItem';
import ItemPage from './pages/Items/ItemPage';
import Login from './pages/User/Login';
import Register from './pages/User/Register';
import Profile from './pages/User/Profile';
import ReactGA from 'react-ga';

const TRACKING_ID = "cFpLxL70R2Wk-juZYkRzDw"; // Replace with your tracking ID
ReactGA.initialize(TRACKING_ID);

function App() {
  return (
    <Router>
      <PageTracker />
      <AppRoutes />
    </Router>
  );
}

function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="add-item" element={<AddItem />} />
      <Route path="admin/analytics" element={<AdminAnalytics />} />
      <Route path="admin/users" element={<AdminUsers />} />
      <Route path="cart" element={<Cart />} />
      <Route path="edit-item/" element={<EditItem />} />
      <Route path="/Item" element={<ItemPage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<Profile />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;
