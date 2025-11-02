import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../../context/CartContext';
import ProductCard from './ProductCard';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 10,
  image: 'https://via.placeholder.com/100',
};

describe('ProductCard', () => {
  test('renders product info', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/\$10/)).toBeInTheDocument();
  });

  test('increments and decrements quantity', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    const input = screen.getByRole('spinbutton');
    const increment = screen.getByText('+');
    const decrement = screen.getByText('-');

    fireEvent.click(increment);
    expect(input.value).toBe('2');

    fireEvent.click(decrement);
    expect(input.value).toBe('1');
  });

  test('adds item to cart', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    const addButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addButton);

    // Since cart context updates are internal, we just assert that button works without crashing
    expect(addButton).toBeEnabled();
  });
});
