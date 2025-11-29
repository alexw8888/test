import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDot = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setWaitingForOperand(false);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      const newValue = calculate(currentValue, inputValue, operator);
      setPrevValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (prev, next, op) => {
    switch (op) {
      case '+': return prev + next;
      case '-': return prev - next;
      case '*': return prev * next;
      case '/': return prev / next;
      default: return next;
    }
  };

  const Button = ({ label, className, onClick }) => (
    <button
      className={`h-14 w-14 rounded-full flex items-center justify-center text-2xl font-medium transition active:brightness-110 ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );

  return (
    <div className="h-full w-full bg-black text-white flex flex-col p-4 select-none">
      <div className="flex-1 min-h-[80px] flex items-end justify-end text-5xl font-light px-4 mb-4 bg-gray-800 rounded-lg border-2 border-gray-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] truncate">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-3">
        <Button label="AC" className="bg-gray-400 text-black text-xl" onClick={clear} />
        <Button label="+/-" className="bg-gray-400 text-black text-xl" onClick={() => setDisplay(String(-parseFloat(display)))} />
        <Button label="%" className="bg-gray-400 text-black text-xl" onClick={() => setDisplay(String(parseFloat(display) / 100))} />
        <Button label="÷" className="bg-orange-500" onClick={() => performOperation('/')} />

        <Button label="7" className="bg-gray-700" onClick={() => inputDigit(7)} />
        <Button label="8" className="bg-gray-700" onClick={() => inputDigit(8)} />
        <Button label="9" className="bg-gray-700" onClick={() => inputDigit(9)} />
        <Button label="×" className="bg-orange-500" onClick={() => performOperation('*')} />

        <Button label="4" className="bg-gray-700" onClick={() => inputDigit(4)} />
        <Button label="5" className="bg-gray-700" onClick={() => inputDigit(5)} />
        <Button label="6" className="bg-gray-700" onClick={() => inputDigit(6)} />
        <Button label="-" className="bg-orange-500" onClick={() => performOperation('-')} />

        <Button label="1" className="bg-gray-700" onClick={() => inputDigit(1)} />
        <Button label="2" className="bg-gray-700" onClick={() => inputDigit(2)} />
        <Button label="3" className="bg-gray-700" onClick={() => inputDigit(3)} />
        <Button label="+" className="bg-orange-500" onClick={() => performOperation('+')} />

        <Button label="0" className="bg-gray-700 col-span-2 w-auto !justify-start pl-7" onClick={() => inputDigit(0)} />
        <Button label="." className="bg-gray-700" onClick={inputDot} />
        <Button label="=" className="bg-orange-500" onClick={() => performOperation('=')} />
      </div>
    </div>
  );
};

export default Calculator;
