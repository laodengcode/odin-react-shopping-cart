import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from '../../context/CartContext';
import Cart from './Cart';

// Helper component to prefill cart for tests
function PrefilledCart() {
  const { addItem } = useCart();

  React.useEffect(() => {
    addItem({ id: 1, title: 'Test Product', price: 20, image: 'img' }, 2);
  }, [addItem]);

  return <Cart />;
}

describe('Cart Page', () => {
  test('renders cart with items', async () => {
    render(
      <CartProvider>
        <PrefilledCart />
      </CartProvider>
    );

    expect(await screen.findByText(/Test Product/)).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });

  test('removes item from cart', async () => {
    render(
      <CartProvider>
        <PrefilledCart />
      </CartProvider>
    );

    const removeButton = await screen.findByText(/Remove/);
    fireEvent.click(removeButton);

    expect(screen.queryByText(/Test Product/)).not.toBeInTheDocument();
  });
});
