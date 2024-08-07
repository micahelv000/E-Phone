import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });


  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.slug === item.slug);

      let newCart;
      if (existingItemIndex >= 0) {
        newCart = prevCart.map((cartItem, index) =>
            index === existingItemIndex
                ? { ...cartItem, quantity: cartItem.quantity + Number(item.quantity) }
                : cartItem
        );
      } else {
        newCart = [...prevCart, { ...item, quantity: Number(item.quantity), price: Number(item.price) }];
      }

      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };
  

  const removeFromCart = (slug) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter(cartItem => cartItem.slug !== slug);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const updateQuantity = (slug, quantity) => {
    setCart((prevCart) => {
      const newCart = prevCart.map(item =>
        item.slug === slug ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};