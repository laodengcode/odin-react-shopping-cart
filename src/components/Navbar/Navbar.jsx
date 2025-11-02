import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { getTotalCount } = useCart();

  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.link}>Home</NavLink>
      <NavLink to="/shop" className={styles.link}>Shop</NavLink>
      <NavLink to="/cart" className={styles.link}>
        Cart ({getTotalCount()})
      </NavLink>
    </nav>
  );
}
