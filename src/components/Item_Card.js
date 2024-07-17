import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Divider from '@mui/joy/Divider';


export default function Item_Card({ item }) {
    return (
        <Card style={{ width: '14rem' }}>
          <Card.Img variant="top" src={item.img} />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
                {item.price}
            </Card.Text>
            <Button size="small" color="primary">
            View details
            </Button>
          </Card.Body>
        </Card>

        

    );
}
