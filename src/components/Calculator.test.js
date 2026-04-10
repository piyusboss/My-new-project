import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calculator from './Calculator';

it('renders calculator', () => {
  render(<Calculator />);
  const displayElement = screen.getByTestId('display');
  expect(displayElement).toBeInTheDocument();
});

it('displays 0 initially', () => {
  render(<Calculator />);
  const displayElement = screen.getByTestId('display');
  expect(displayElement).toHaveTextContent('0');
});

it('updates display when number button is clicked', () => {
  render(<Calculator />);
  const displayElement = screen.getByTestId('display');
  const numberButton = screen.getByText('5');
  
  fireEvent.click(numberButton);
  expect(displayElement).toHaveTextContent('5');
});

it('handles basic addition', () => {
  render(<Calculator />);
  const displayElement = screen.getByTestId('display');
  const numberButtons = screen.getAllByRole('button', { name: /\d/ });
  const operatorButtons = screen.getAllByRole('button', { name: /[\+\-\*/]/ });
  
  fireEvent.click(numberButtons[5]); // 5
  fireEvent.click(operatorButtons[2]); // +
  fireEvent.click(numberButtons[7]); // 7
  fireEvent.click(screen.getByText('='));
  
  expect(displayElement).toHaveTextContent('12');
});

it('handles clear button', () => {
  render(<Calculator />);
  const displayElement = screen.getByTestId('display');
  const clearButton = screen.getByText('C');
  const numberButtons = screen.getAllByRole('button', { name: /\d/ });
  
  fireEvent.click(numberButtons[0]); // 1
  fireEvent.click(clearButton);
  
  expect(displayElement).toHaveTextContent('0');
});

it('handles decimal point', () => {
  render(<Calculator />);
  const displayElement = screen.getByTestId('display');
  const numberButtons = screen.getAllByRole('button', { name: /\d/ });
  const decimalButton = screen.getByText('.');
  
  fireEvent.click(numberButtons[0]); // 1
  fireEvent.click(decimalButton);
  
  expect(displayElement).toHaveTextContent('1.');
});

it('handles division by zero', () => {
  render(<Calculator />);
  const displayElement = screen.getByTestId('display');
  const numberButtons = screen.getAllByRole('button', { name: /\d/ });
  const operatorButtons = screen.getAllByRole('button', { name: /[\+\-\*/]/ });
  
  fireEvent.click(numberButtons[0]); // 1
  fireEvent.click(operatorButtons[3]); // /
  fireEvent.click(numberButtons[0]); // 0
  fireEvent.click(screen.getByText('='));
  
  expect(displayElement).toHaveTextContent('Error');
});
