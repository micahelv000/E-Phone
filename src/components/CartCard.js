import React, { useState } from 'react';
import './CartCard.css'

const CartCard = ({ item, onRemove, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    setQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity);
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className="cart-item">
      <div className="item-details">
        <img src={item.image} alt={item.name} className="item-image" />
        <div className="item-info">
          <h4>{item.name}</h4>
          <p>{item.description}</p>
          <p>${item.price}</p>
        </div>
      </div>
      <div className="item-actions">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="quantity-input"
        />
        <button onClick={handleRemove} className="remove-button">Remove</button>
      </div>
    </div>
  );
};

export default CartCard;
