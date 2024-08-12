import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LuUser2 } from "react-icons/lu";
import { FaCartShopping } from "react-icons/fa6";
import EphoneImage from '../../assets/images/Ephone.png';
import './Header.css';
import { CartContext } from '../../CartContext';

const isLoggedIn = () => {
    return Boolean(localStorage.getItem('authToken'));
};

export default function Header() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { cart } = useContext(CartContext);

    const handleMouseEnter = () => {
        if (isLoggedIn()) {
            setIsOpen(true);
        }
    };

    const handleMouseLeave = () => {
        if (isLoggedIn()) {
            setIsOpen(false);
        }
    };

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

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div
                    className="navbar-brand me-7"
                    onClick={navigateCart}
                    style={{ cursor: 'pointer', position: 'relative' }}
                >
                    <FaCartShopping size={32} className="icon"/>
                    {isLoggedIn() && totalItems > 0 && (
                        <span className="cart-badge">{totalItems}</span>
                    )}
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
                    {isOpen && isLoggedIn() && (
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

                            <h6 className="dropdown-item" onClick={handleLogout}>
                                Logout
                            </h6>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}