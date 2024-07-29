import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function ItemCard({ item }) {
    return (
        <Card style={{ width: '14rem' }}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
                <Card.Title>{item.phone_name}</Card.Title>
                <Card.Text>
                    {item.price > 0 ? `Price: ${item.price} $` : 'Out of stock'}
                </Card.Text>
                {item.stock > 0 ?
                    <Button size="small" color="primary" component={Link} to={`/Item?slug=${item.slug}`}>
                        View details
                    </Button>
                    :
                    <Button disabled size="small" color="primary">
                        Out of stock
                    </Button>
                }
            </Card.Body>
        </Card>
    );
}