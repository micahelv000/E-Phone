import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfileCard.css';
import axios from 'axios';

export default function ProfileCard({ userData }) {
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userData._id) {
            axios.get(`http://localhost:5000/user-profile-picture/${userData._id}?cb=${new Date().getTime()}`)
                .then(response => {
                    setProfilePictureUrl(response.config.url);
                })
                .catch(() => {
                    setProfilePictureUrl(null);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setProfilePictureUrl(null);
            setIsLoading(false);
        }
    }, [userData._id]);

    return (
        <center>
            <div className="profile-card-container red">
                <div className="col">
                    {isLoading ? (
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        <img className="align-self-end mr-3" src={profilePictureUrl} alt="User Avatar"
                             style={{width: '200px', height: '200px'}}/>
                    )}
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