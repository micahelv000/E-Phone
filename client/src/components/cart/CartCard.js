import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

export default function CartCard({ item, onRemove, onQuantityChange }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);

    if (isNaN(newQuantity) || newQuantity < 1) {
      return;
    }

    if (newQuantity > item.stock) {
      alert(`Cannot exceed stock limit of ${item.stock}`);
      setQuantity(item.quantity);
    } else {
      setQuantity(newQuantity);
      onQuantityChange(item.slug, newQuantity); // Pass the slug here
    }
  };

  return (
    <Card style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 2 }}>
          <Card.Img
            variant="top"
            src={item.thumbnail || 'default-image-url'}
            alt={item.phone_name}
            style={{ height: '30%', width: '30%' }}
          />
        </div>
        <div style={{ flex: 2 }}>
          <Card.Body>
            <Card.Title>{item.phone_name}</Card.Title>
            <Card.Text>{item.os}, {item.storage}</Card.Text>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Form.Control
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={item.stock}
                style={{ width: '80px' }}
              />
              <h3 style={{ marginLeft: '10px' }}>{(item.price * quantity).toFixed(2)} $</h3>
            </div>
            <Button
              variant="danger"
              onClick={() => onRemove(item.slug)} // Pass the slug here
              style={{ marginTop: '10px', marginBottom: '10px' }}
            >
              Remove
            </Button>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
}
