import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  const increment = () => setQty(qty + 1);
  const decrement = () => setQty(qty > 1 ? qty - 1 : 1);

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <div className={styles.controls}>
        <button onClick={decrement}>-</button>
        <input
          type="number"
          value={qty}
          onChange={e => setQty(Number(e.target.value))}
          min="1"
        />
        <button onClick={increment}>+</button>
      </div>
      <button className={styles.addBtn} onClick={() => addItem(product, qty)}>
        Add to Cart
      </button>
    </div>
  );
}
