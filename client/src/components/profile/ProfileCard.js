import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './ProfileCard.css';

export default function ProfileCard({ userData }) {
    return (
        <center>
        <div className="profile-card-container red">
            <div className="col">
                <img className="align-self-end mr-3" src="https://avatar.iran.liara.run/public/1" alt="User Avatar"
                     style={{width: '200px', height: '200px'}}/>
            </div>
            <div className="col">
                <div className="media-body">
                    <h5 className="mt-0">@{userData.username}</h5>
                    <ul>
                        <li>Full Name: {userData.firstName} {userData.lastName}</li>
                        <li>City: {userData.city}</li>
                        <li>Phone: {userData.phoneNumber}</li>


                    </ul>
                </div>
            </div>
        </div>
        </center>
    );
}