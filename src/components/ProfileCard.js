import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './ProfileCard.css';

export default function Header(options) {
    return (
        <div class="container red" >
                <div class="col">
                    <img class="align-self-end mr-3" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_190b1ca853a%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_190b1ca853a%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.421875%22%20y%3D%22104.5%22%3E200x200%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Generic placeholder image"/>
                </div>
                <div class="col">
                    <div class="media-body">
                        <h5 class="mt-0">User Name</h5>
                        <p>Bio</p>
                        <ul>
                            <li>Email: 1@example.com</li>
                            <li>Phone: +1 123 456 7890</li>
                            <li>Address: 123 Main St, City, State, ZIP</li>
                            <li>Date Joined: January 1, 2020</li>
                            <li>Last Login: September 25, 2022</li>
                            <li>Total Revenue: $1,000</li>
                            <li>Total Transactions: 100</li>
                            <li>Average Transaction Value: $50</li>
                            <li>Average Transaction Frequency: 3 months</li>
                            <li>Total Products: 50</li>
                            <li>Total Categories: 10</li>
                            <li>Total Users: 200</li>
                            
                        </ul>
                    </div>
                </div>
        </div>
    );
}
