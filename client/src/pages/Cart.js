import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';
import Header from '../components/layout/Header';
import CartCard from '../components/cart/CartCard';
import { Container, Button, Card } from 'react-bootstrap';
import Bottom from '../components/layout/Bottom';
import axiosInstance from "../utils/axiosConfig";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  const handleRemove = (slug) => {
    removeFromCart(slug);
  };

  const handleQuantityChange = (slug, newQuantity) => {
    updateQuantity(slug, newQuantity);
  };

  const handleCheckout = async () => {
    const sanitizedCart = cart.map(item => ({
      ItemSlug: item.slug,
      ItemName: item.phone_name,
      Quantity: Number(item.quantity),
      Price: Number(item.price)
    }));

    const totalPrice = sanitizedCart.reduce((sum, item) => sum + item.Price * item.Quantity, 0);
    const totalQuantity = sanitizedCart.reduce((count, item) => count + item.Quantity, 0);

    const transaction = {
      Items: sanitizedCart,
      TotalPrice: totalPrice,
      TotalQuantity: totalQuantity,
      OrderDate: new Date()
    };

    try {
      const response = await axiosInstance.post('http://localhost:5000/create-transaction', transaction, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Transaction successful:', response.data);
      clearCart();
      alert('Transaction successful!');

      navigate(`/transactionDetails/${response.data._id}`);
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed, please try again.');
    }
  };

  useEffect(() => {
    const newTotalPrice = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
    const newNumberOfItems = cart.reduce((count, item) => count + Number(item.quantity), 0);

    setTotalPrice(newTotalPrice);
    setNumberOfItems(newNumberOfItems);
  }, [cart]);

  return (
      <div>
        <Header />
        <Container>
          <div className="shopping-cart">
            {cart.length === 0 ? (
                <center>
                  <div>
                    <h2>No items in the cart.</h2>
                    <p>
                      Please select items that you wish to purchase from the home page and then return here. <br />
                      Take a look at our monkey:
                    </p>
                    <img src='https://news.gsu.edu/files/2019/10/monkey-800x600.jpg' alt='Monkey' />
                  </div>
                </center>
            ) : (
                <>
                  {cart.map(item => (
                      <div key={item.slug}>
                        <CartCard
                            item={item}
                            onRemove={() => handleRemove(item.slug)}
                            onQuantityChange={(newQuantity) => handleQuantityChange(item.slug, newQuantity)}
                        />
                      </div>
                  ))}
                  <center>
                    <Card className="total-price" style={{ padding: '10px', marginTop: '10px', fontSize: '18px' }}>
                      <h3>Total price: ${totalPrice.toFixed(2)} for {numberOfItems} {numberOfItems === 1 ? 'item' : 'items'}</h3>
                    </Card>
                    <Button onClick={handleCheckout} style={{ marginTop: '10px', marginBottom: '90px' }}>Checkout</Button>
                  </center>
                </>
            )}
          </div>
        </Container>
        <Bottom style={{ paddingBottom: '0px' }} />
      </div>
  );
}