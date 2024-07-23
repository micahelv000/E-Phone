import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { LuUser2 } from "react-icons/lu";
import { FaCartShopping } from "react-icons/fa6";
import EphoneImage from '../assets/images/Ephone.png';

const isLoggedIn = () => {
    return Boolean(localStorage.getItem('authToken'));
};

export default function Header(options) {
    const navigate = useNavigate();

    const handleUserIconClick = () => {
        if (isLoggedIn()) {
            navigate('/profile');
        } else {
            navigate('/login');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="navbar-brand me-7"><FaCartShopping size={32}/></div>
                <div className="navbar-brand mx-auto"><img src={EphoneImage} alt='Ephone' height='60px'/></div>
                <div className="navbar-brand ms-7" onClick={handleUserIconClick}><LuUser2  size={32}/></div>
            </div>
        </nav>
    );
}