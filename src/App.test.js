import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// This is a simple test to check if the App component renders without crashing
it('renders app', () => {
  render(<App />);
  const titleElement = screen.getByText('React Calculator');
  expect(titleElement).toBeInTheDocument();
});

// Add more comprehensive tests for the Calculator component
it('renders calculator', () => {
  render(<App />);
  const calculatorElement = screen.getByTestId('calculator');
  expect(calculatorElement).toBeInTheDocument();
});
