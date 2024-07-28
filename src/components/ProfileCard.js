import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './ProfileCard.css';

export default function ProfileCard({ userData }) {
    return (
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
                        {/*<li>Email: 1@example.com</li>*/}
                        {/*<li>Date Joined: January 1, 2020</li>*/}
                        {/*<li>Last Login: September 25, 2022</li>*/}
                        {/*<li>Total Revenue: $1,000</li>*/}
                        {/*<li>Total Transactions: 100</li>*/}
                        {/*<li>Average Transaction Value: $50</li>*/}
                        {/*<li>Average Transaction Frequency: 3 months</li>*/}
                        {/*<li>Total Products: 50</li>*/}
                        {/*<li>Total Categories: 10</li>*/}
                        {/*<li>Total Users: 200</li>*/}

                    </ul>
                </div>
            </div>
        </div>
    );
}