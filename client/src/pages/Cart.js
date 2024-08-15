import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';
import Header from '../components/layout/Header';
import CartCard from '../components/cart/CartCard';
import { Container, Button, Card } from 'react-bootstrap';
import Bottom from '../components/layout/Bottom';
import axiosInstance from "../utils/axiosConfig";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  const handleRemove = (slug) => {
    removeFromCart(slug);
  };

  const handleQuantityChange = (slug, newQuantity) => {
    const numQuantity = Number(newQuantity);
    if (!isNaN(numQuantity) && numQuantity > 0) {
      updateQuantity(slug, numQuantity);
    }
  };

  const {totalPriceString } = useMemo(() => {
    const newTotalPrice = cart.reduce((sum, item) => {
      const itemPrice = parseFloat(item.price);
      const itemQuantity = parseInt(item.quantity, 10);
      return sum + (isNaN(itemPrice) || isNaN(itemQuantity) ? 0 : itemPrice * itemQuantity);
    }, 0);

    const newNumberOfItems = cart.reduce((count, item) => {
      const itemQuantity = parseInt(item.quantity, 10);
      return count + (isNaN(itemQuantity) ? 0 : itemQuantity);
    }, 0);

    return {
      totalPrice: newTotalPrice,
      numberOfItems: newNumberOfItems,
      totalPriceString: `Total price: ${newTotalPrice.toFixed(2)} for ${newNumberOfItems} ${newNumberOfItems === 1 ? 'item' : 'items'}`
    };
  }, [cart]);

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
      // Check stock for each item
      const stockCheckPromises = sanitizedCart.map(item =>
        axiosInstance.get(`/check-stock/${item.ItemSlug}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      );
  
      const stockResponses = await Promise.all(stockCheckPromises);
  
      for (let i = 0; i < stockResponses.length; i++) {
        const stock = stockResponses[i].data.stock;
        if (sanitizedCart[i].Quantity > stock) {
          alert(`Insufficient stock for ${sanitizedCart[i].ItemName}. Available quantity: ${stock}`);
          return;
        }
      }
  
      // First create the transaction
      const response = await axiosInstance.post('/create-transaction', transaction, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Then update the stock for each item
      await Promise.all(sanitizedCart.map(item =>
        axiosInstance.put(`/update-stock/${item.ItemSlug}`, {
          quantity: item.Quantity
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      ));
  
      clearCart();
      alert('Transaction successful!');
  
      navigate(`/transactionDetails/${response.data._id}`);
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed, please try again.');
    }
  };
  
  return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Container style={{ flex: '1' }}>
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
                      <h3>{totalPriceString}</h3>
                    </Card>
                    <Button onClick={handleCheckout} style={{ marginTop: '10px', marginBottom: '90px' }}>Checkout</Button>
                  </center>
                </>
            )}
          </div>
        </Container>
        <Bottom />
      </div>
  );
}