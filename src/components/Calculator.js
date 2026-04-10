import React, { useState } from 'react';
import {
  calculate,
  clear,
  deleteLast,
  handleNumber,
  handleDecimal,
  handleOperator,
  formatNumber
} from '../utils/calculator';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState('');
  const [operator, setOperator] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(handleNumber(display, num));
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else {
      setDisplay(handleDecimal(display));
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue('');
    setOperator('');
    setWaitingForOperand(false);
  };

  const handleDelete = () => {
    setDisplay(deleteLast(display));
  };

  const handleOperator = (nextOperator) => {
    handleOperatorPress(
      display,
      previousValue,
      operator,
      setOperator,
      setWaitingForOperand,
      setDisplay,
      setPreviousValue
    );
  };

  const handleEquals = () => {
    if (previousValue === '' || operator === '') return;

    const inputValue = parseFloat(display);
    const newValue = calculate(previousValue, inputValue, operator);
    
    setDisplay(formatNumber(newValue));
    setPreviousValue('');
    setOperator('');
    setWaitingForOperand(false);
  };

  const getButtonClass = (type) => {
    switch (type) {
      case 'number':
        return 'number-button';
      case 'operator':
        return 'operator-button';
      case 'action':
        return 'action-button';
      case 'equals':
        return 'equals-button';
      default:
        return 'button';
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="display-previous">
          {previousValue && operator && <span className="operator">{operator}</span>}
        </div>
        <div className="display-current">{formatNumber(display)}</div>
      </div>
      
      <div className="calculator-buttons">
        <div className="row">
          <button
            className={getButtonClass('action')}
            onClick={handleClear}
          >
            C
          </button>
          <button
            className={getButtonClass('action')}
            onClick={handleDelete}
          >
            DEL
          </button>
          <button
            className={getButtonClass('operator')}
            onClick={() => handleOperator('/')}
          >
            ÷
          </button>
          <button
            className={getButtonClass('operator')}
            onClick={() => handleOperator('*')}
          >
            ×
          </button>
        </div>
        
        <div className="row">
          <button
            className={getButtonClass('number')}
            onClick={() => inputNumber('7')}
          >
            7
          </button>
          <button
            className={getButtonClass('number')}
            onClick={() => inputNumber('8')}
          >
            8
          </button>
          <button
            className={getButtonClass('number')}
            onClick={() => inputNumber('9')}
          >
            9
          </button>
          <button
            className={getButtonClass('operator')}
            onClick={() => handleOperator('-')}
          >
            -
          </button>
        </div>
        
        <div className="row">
          <button
            className={getButtonClass('number')}
            onClick={() => inputNumber('4')}
          >
            4
          </button>
          <button
            className={getButtonClass('number')}
            onClick={() => inputNumber('5')}
          >
            5
          </button>
          <button
            className={getButtonClass('number')}
            onClick={() => inputNumber('6')}
          >
            6
          </button>
          <button
            className={getButtonClass('operator')}
            onClick={() => handleOperator('+')}
          >
            +
          </button>
        </div>
        
        <div className="row">
          <button
            className={getButtonClass('number')}
            onClick={() => inputNumber('1')}
          >
            1
          </button>
          <button
            className={getButtonClass('number')}
            onClick={() => inputNumber('2')}
          >
            2
          </button>
          <button
            className={getButtonClass('number')}
            onClick={() => inputNumber('3')}
          >
            3
          </button>
          <button
            className={getButtonClass('action')}
            onClick={handleDecimal}
          >
            .
          </button>
        </div>
        
        <div className="row">
          <button
            className={getButtonClass('number')}
            onClick={() => inputNumber('0')}
          >
            0
          </button>
          <button
            className={getButtonClass('number')}
            onClick={() => inputNumber('00')}
          >
            00
          </button>
          <button
            className={getButtonClass('equals')}
            onClick={handleEquals}
          >
            =
          </button>
          <button
            className={getButtonClass('action')}
            onClick={() => handleOperator('%')}
          >
            %
          </button>
        </div>
        
        <div className="row">
          <button
            className={getButtonClass('number')}
            onClick={() => handleOperator('√')}
          >
            √
          </button>
          <button
            className={getButtonClass('number')}
            onClick={() => handleOperator('x²')}
          >
            x²
          </button>
          <button
            className={getButtonClass('operator')}
            onClick={() => handleOperator('/')}
          >
            ÷
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;