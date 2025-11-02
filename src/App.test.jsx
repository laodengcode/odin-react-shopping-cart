import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CartProvider } from './context/CartContext';
import App from './App';

test('navigates between pages and updates cart count', async () => {
  render(
    <CartProvider>
      <App />
    </CartProvider>
  );

  // ✅ Step 1: Navigate to the Shop page
  const shopLinks = screen.getAllByText(/Shop/i);
  const shopLink = shopLinks.find(link => link.tagName === 'A'); // pick the <a> link
  fireEvent.click(shopLink);

  // ✅ Step 2: Wait for products to appear (from fetch mock)
  const addButtons = await screen.findAllByText(/Add to Cart/i);
  expect(addButtons.length).toBeGreaterThan(0);

  // ✅ Step 3: Click the first Add to Cart button
  fireEvent.click(addButtons[0]);

  // ✅ Step 4: Verify the cart count updates
  const cartLinks = screen.getAllByText(/Cart/i);
  const cartLink = cartLinks.find(link => link.tagName === 'A'); // pick the <a> link
  await waitFor(() => {
    expect(cartLink).toHaveTextContent(/Cart\s*\(\s*1\s*\)/i);
  });
});
