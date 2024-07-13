import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function Header(options) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="navbar-brand">Cart</div>
                <div className="navbar-brand mx-auto">Logo</div>
                <div className="navbar-brand">Profile</div>
            </div>
        </nav>
    );
}
