import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button as BootstrapButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext'; // Adjust the path as needed
import Bottom from '../components/Bottom';

export default function ItemCard({ item }) {
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/item?slug=${item.slug}&price=${item.price}&stock=${item.stock}`);
    };

    const handleaddToCart = () => {
        addToCart({ ...item, quantity: 1 }); // Assuming you want to add 1 quantity by default
    };

    return (
        <Card style={{ width: '15rem' }}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
                <Card.Title>{item.phone_name}</Card.Title>
                <Card.Text>
                    {item.stock > 0 ? `Price: ${item.price} $` : 'Out of stock'}
                </Card.Text>
                <BootstrapButton size="25%" variant="primary" onClick={handleViewDetails} style={{ margin: '5px' }}>
                    View Details
                </BootstrapButton>
            </Card.Body>
        </Card>
    );
}
