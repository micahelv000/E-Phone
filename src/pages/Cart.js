import React, { useState } from 'react';
import Header from '../components/Header';
import CartCard from '../components/CartCard';


export default function Cart() {
  
    const [items, setItems] = useState([
    { id: 1, name: 'Product 1', description: 'Description 1', price: 10.0, quantity: 1, image: '/path/to/image1.jpg' },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 20.0, quantity: 2, image: '/path/to/image2.jpg' },
  ]);

  const handleRemove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: parseInt(newQuantity, 10) } : item
    ));
  };

  return (
    <div>
      <Header />
      <div className="shopping-cart">
        {items.map(item => (
          <CartCard
            key={item.id}
            item={item}
            onRemove={handleRemove}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>
    </div>
  );
}
