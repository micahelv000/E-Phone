import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfileCard.css';
import axiosInstance from "../../utils/axiosConfig";

export default function ProfileCard({ userData }) {
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userData._id) {
            axiosInstance.get(`/user-profile-picture/${userData._id}?cb=${new Date().getTime()}`)
                .then(response => {
                    const fullUrl = `${axiosInstance.defaults.baseURL}${response.config.url}`;
                    setProfilePictureUrl(fullUrl);
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
                            <span className="sr-only"></span>
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