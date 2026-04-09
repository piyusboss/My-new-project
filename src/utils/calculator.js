export const calculate = (prev, next, operator) => {
  if (prev === '' || next === '') return '0';
  
  const a = parseFloat(prev);
  const b = parseFloat(next);
  
  if (isNaN(a) || isNaN(b)) return 'Error';
  
  switch (operator) {
    case '+':
      return (a + b).toString();
    case '-':
      return (a - b).toString();
    case '*':
      return (a * b).toString();
    case '/':
      return b === 0 ? 'Error' : (a / b).toString();
    case '%':
      return ((a / 100) * b).toString();
    case '√':
      return Math.sqrt(a).toString();
    case 'x²':
      return (a * a).toString();
    default:
      return '0';
  }
};

export const clear = () => '0';

export const deleteLast = (value) => {
  if (value === '0' || value === 'Error') return '0';
  return value.toString().slice(0, -1) || '0';
};

export const handleNumber = (current, number) => {
  if (current === '0' || current === 'Error') {
    return number;
  }
  if (current.includes('.') && number === '.') {
    return current;
  }
  return current + number;
};

export const handleDecimal = (current) => {
  if (current === '0' || current === 'Error') {
    return '0.';
  }
  if (!current.includes('.')) {
    return current + '.';
  }
  return current;
};

export const handleOperator = (current, operator) => {
  if (current === 'Error') return '0';
  return operator;
};

export const formatNumber = (num) => {
  if (num === 'Error') return 'Error';
  if (num === '') return '0';
  
  const n = parseFloat(num);
  if (isNaN(n)) return '0';
  
  if (n === Math.floor(n)) {
    return n.toString();
  }
  
  return n.toFixed(8).replace(/0+$/, '').replace(/\.$/, '');
};