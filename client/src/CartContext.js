import React, {createContext, useCallback, useEffect, useState} from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = useCallback((item) => {
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

      return newCart;
    });
  }, []);

  const removeFromCart = useCallback((slug) => {
    setCart((prevCart) => {
      return prevCart.filter(cartItem => cartItem.slug !== slug);
    });
  }, []);

  const updateQuantity = useCallback((slug, quantity) => {
    setCart((prevCart) => {
      return prevCart.map(item =>
          item.slug === slug ? {...item, quantity: Number(quantity)} : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
        {children}
      </CartContext.Provider>
  );
};