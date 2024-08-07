import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import AddItem from './pages/Admin/ManageItems';
import AdminAnalytics from './pages/Admin/Analytics';
import AdminUsers from './pages/Admin/Users';
import Cart from './pages/Cart';
import EditItem from './pages/Items/EditItem';
import ItemPage from './pages/Items/ItemPage';
import Login from './pages/User/Login';
import Register from './pages/User/Register';
import Profile from './pages/User/Profile';
import ReactGA from 'react-ga';
import EditUser from './pages/User/EditUser';
import { CartProvider } from './CartContext';
import TransactionDetails from './pages/TransactionDetails';
import AdminRoute from './components/admin/AdminRoute';

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
      <CartProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="admin/add-item" element={
            <AdminRoute>
              <AddItem />
            </AdminRoute>
          } />
          <Route path="admin/analytics" element={
            <AdminRoute>
              <AdminAnalytics />
            </AdminRoute>
          } />
          <Route path="admin/users" element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          } />
          <Route path="cart" element={<Cart />} />
          <Route path="edit-item/" element={<EditItem />} />
          <Route path="/Item" element={<ItemPage />} />
          <Route path="login" element={<Login />} />
          <Route path="EditUser" element={<EditUser />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="TransactionDetails/:id" element={<TransactionDetails />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </CartProvider>
  );
}

export default App;
