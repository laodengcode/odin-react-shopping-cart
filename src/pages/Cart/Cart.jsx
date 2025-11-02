import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.css';

export default function Cart() {
  const { cartItems, updateQuantity, removeItem } = useCart();

  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className={styles.cart}>
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <div key={item.id} className={styles.item}>
          <img src={item.image} alt={item.title} />
          <div>
            <h4>{item.title}</h4>
            <p>${item.price}</p>
            <input
              type="number"
              value={item.quantity}
              onChange={e => updateQuantity(item.id, Number(e.target.value))}
              min="1"
            />
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}
