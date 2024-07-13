import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Item_Card({ item }) {
    return (
        <Card style={{ width: '14rem' }}>
          <Card.Img variant="top" src={item.img} />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
                {item.price}
            </Card.Text>
            <Button variant="primary">View details</Button>
          </Card.Body>
        </Card>
    );
}
