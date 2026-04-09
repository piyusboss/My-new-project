import React, { useState, useCallback } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null); // Renamed to previousValue for clarity
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const inputNumber = useCallback((number) => {
    if (waitingForOperand) {
      setDisplayValue(String(number));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(prev => prev === '0' ? String(number) : prev + number);
    }
  }, [waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
    } else {
      if (!displayValue.includes('.')) {
        setDisplayValue(prev => prev + '.');
      }
    }
  }, [waitingForOperand, displayValue]);

  const clear = useCallback(() => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setShouldResetDisplay(false);
  }, []);

  const deleteLastDigit = useCallback(() => {
    setDisplayValue(prev => {
      const newValue = prev.slice(0, -1);
      return newValue === '' ? '0' : newValue;
    });
  }, []);

  const performOperation = useCallback((nextValue) => {
    const inputValue = parseFloat(displayValue);

    if (operation && previousValue && !waitingForOperand) {
      const currentValue = previousValue || 0;
      let newValue;
      switch (operation) {
        case '+':
          newValue = currentValue + nextValue;
          break;
        case '-':
          newValue = currentValue - nextValue;
          break;
        case '*':
          newValue = currentValue * nextValue;
          break;
        case '/':
          newValue = currentValue / nextValue;
          break;
        default:
          return;
      }
      setDisplayValue(String(newValue));
      setPreviousValue(newValue);
    } else {
      setDisplayValue(String(nextValue));
      setPreviousValue(inputValue);
    }

    setWaitingForOperand(true);
    setOperation(operation);
  }, [displayValue, operation, previousValue, waitingForOperand]);

  const inputDigit = useCallback((digit) => {
    if (shouldResetDisplay) {
      clear();
      setShouldResetDisplay(false);
    }
    inputNumber(digit);
  }, [shouldResetDisplay, clear, inputNumber]);

  const handleEquals = useCallback(() => {
    if (operation && previousValue && !waitingForOperand) {
      performOperation(parseFloat(displayValue));
    }
  }, [operation, previousValue, waitingForOperand, performOperation, displayValue]);

  const handleOperation = useCallback((op) => {
    const inputValue = parseFloat(displayValue);
    if (waitingForOperand) {
      setOperation(op);
    } else if (operation && previousValue) {
      performOperation(inputValue);
      setOperation(op);
    } else {
      setOperation(op);
    }
  }, [displayValue, operation, previousValue, waitingForOperand, performOperation]);

  const handleClear = useCallback(() => {
    clear();
  }, [clear]);

  const handleClearEntry = useCallback(() => {
    setDisplayValue('0');
    setShouldResetDisplay(true);
  }, []);

  const handleBackspace = useCallback(() => {
    if (displayValue.length > 1) {
      deleteLastDigit();
    } else {
      clear();
    }
  }, [displayValue, deleteLastDigit, clear]);

  const getDisplayValue = useCallback(() => {
    const value = parseFloat(displayValue);
    if (isNaN(value)) {
      return 'Error';
    } else if (waitingForOperand) {
      return previousValue || '0';
    } else {
      return displayValue;
    }
  }, [displayValue, waitingForOperand, previousValue]);

  const renderNumberButton = (number) => (
    <button
      key={number}
      className="calculator-button number-button"
      onClick={() => inputDigit(number)}
    >
      {number}
    </button>
  );

  const renderOperationButton = (op, symbol) => (
    <button
      key={op}
      className="calculator-button operation-button"
      onClick={() => handleOperation(op)}
    >
      {symbol}
    </button>
  );

  const renderSpecialButton = (label, onClick) => (
    <button
      key={label}
      className="calculator-button special-button"
      onClick={onClick}
    >
      {label}
    </button>
  );

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="calculator-display-value">
          {getDisplayValue()}
        </div>
      </div>
      <div className="calculator-buttons">
        <div className="calculator-row">
          {renderSpecialButton('C', handleClear)}
          {renderSpecialButton('CE', handleClearEntry)}
          {renderSpecialButton('⌫', handleBackspace)}
          {renderOperationButton('/', '/')}
        </div>
        <div className="calculator-row">
          {renderNumberButton(7)}
          {renderNumberButton(8)}
          {renderNumberButton(9)}
          {renderOperationButton('*', '*')}
        </div>
        <div className="calculator-row">
          {renderNumberButton(4)}
          {renderNumberButton(5)}
          {renderNumberButton(6)}
          {renderOperationButton('-', '-')}
        </div>
        <div className="calculator-row">
          {renderNumberButton(1)}
          {renderNumberButton(2)}
          {renderNumberButton(3)}
          {renderOperationButton('+', '+')}
        </div>
        <div className="calculator-row">
          {renderNumberButton(0)}
          {renderSpecialButton('.', inputDecimal)}
          {renderOperationButton('=', '=')}
        </div>
      </div>
    </div>
  );
};

export default Calculator;