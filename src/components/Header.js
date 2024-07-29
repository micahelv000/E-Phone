import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { LuUser2 } from "react-icons/lu";
import { FaCartShopping } from "react-icons/fa6";
import EphoneImage from '../assets/images/Ephone.png';
import './Header.css';

const isLoggedIn = () => {
    return Boolean(localStorage.getItem('authToken'));
};
    
export default function Header() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    const handleUserIconClick = () => {
        if (isLoggedIn()) {
            navigate('/profile');
        } else {
            navigate('/login');
        }
    };

    const navigateHome = () => {
        navigate('/');
    };

    const navigateCart = () => {
        navigate('/cart');
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div 
                    className="navbar-brand me-7" 
                    onClick={navigateCart} 
                    style={{ cursor: 'pointer' }}
                >
                    <FaCartShopping size={32} className="icon"/>
                </div>
                <div 
                    className="navbar-brand mx-auto" 
                    onClick={navigateHome}
                >
                    <img src={EphoneImage} id="logo" alt='Ephone' height='60px' style={{ cursor: 'pointer' }}/>
                </div>
                
                <div 
                    className="navbar-brand ms-7" 
                    onClick={handleUserIconClick} 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ position: 'relative', cursor: 'pointer' }}
                >
                    <LuUser2 size={32} className="icon"/>
                    {isOpen && (
                        <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                backgroundColor: 'white',
                                border: '1px solid #ccc',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                zIndex: 1,
                                padding: '10px'
                            }}>

                            {isLoggedIn() && (
                                <h6 className="dropdown-item" onClick={handleLogout}>
                                    Logout
                                </h6>
                            )}

                            <h5 style={{ textDecoration: 'underline' }}>Admin pages</h5>
                            <a href="admin/users" style={{ display: 'block', padding: '10px', textDecoration: 'none', color: 'black' }}><h6>Users management</h6></a>
                            <a href="add-item" style={{ display: 'block', padding: '10px', textDecoration: 'none', color: 'black' }}><h6>Stock management</h6></a>
                            <a href="admin/analytics" style={{ display: 'block', padding: '10px', textDecoration: 'none', color: 'black' }}><h6>Analytics</h6></a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
