import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../CartContext';
import Header from '../components/Header';
import CartCard from '../components/CartCard';
import { Container, Button, Card } from 'react-bootstrap';
import Bottom from '../components/Bottom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);

  const handleRemove = (slug) => {
    removeFromCart(slug);
  };

  const handleQuantityChange = (slug, newQuantity) => {
    updateQuantity(slug, newQuantity);
  };

  useEffect(() => {
    // Calculate total price and number of items
    const newTotalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newNumberOfItems = cart.reduce((count, item) => count + item.quantity, 0);
    
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
                  <h3>Total price is: ${totalPrice.toFixed(2)} for {numberOfItems} {numberOfItems === 1 ? 'item' : 'items'}</h3>
                </Card>
                <Button style={{ marginTop: '10px' }}>Checkout</Button>
              </center>
            </>
          )}
        </div>
      </Container>
      <Bottom style={{ paddingBottom: '0px' }} />

    </div>
  );
}
