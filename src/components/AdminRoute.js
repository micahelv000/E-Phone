import React from 'react';
import { Navigate } from 'react-router-dom';
import NoPage from '../pages/NoPage';

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('authToken');
    const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

    if (!user || !user.isAdmin) {
        return <NoPage />;
    }

    return children;
};

export default AdminRoute;