import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function ItemCard({ item }) {
    const [itemData, setItemData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const slug = item.slug;

        if (slug) {
            fetch(`http://phone-specs-api.vercel.app/${slug}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error fetching data: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.status && data.data) {
                        setItemData(data.data);
                    } else {
                        throw new Error('No phone data found');
                    }
                    setLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });
        } else {
            setError('No slug parameter provided');
            setLoading(false);
        }
    }, [item.slug]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Card style={{ width: '14rem' }}>
            <Card.Img variant="top" src={itemData.thumbnail} />
            <Card.Body>
                <Card.Title>{itemData.phone_name}</Card.Title>
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
