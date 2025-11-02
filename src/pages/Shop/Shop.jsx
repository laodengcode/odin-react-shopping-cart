import React from 'react';
import useFetchProducts from '../../hooks/useFetchProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Shop.module.css';

export default function Shop() {
  const { products, loading } = useFetchProducts();

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.shop}>
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
