import React, { useState, useRef, useEffect } from 'react';

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to macOS Terminal. Type "help" for commands.' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newHistory = [...history, { type: 'input', content: trimmed }];

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    let output = '';

    switch (command) {
      case 'help':
        output = 'Available commands: help, clear, echo [text], whoami, date, ls, cd';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'echo':
        output = args;
        break;
      case 'whoami':
        output = 'guest';
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'ls':
        output = 'Desktop  Downloads  Documents  Pictures  Music';
        break;
      case 'cd':
        output = `cd: no such file or directory: ${args}`;
        break;
      default:
        output = `command not found: ${command}`;
    }

    if (output) {
      newHistory.push({ type: 'output', content: output });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="h-full w-full bg-[#1e1e1e] text-green-400 font-mono p-4 text-sm overflow-y-auto" onClick={() => document.getElementById('term-input')?.focus()}>
      {history.map((line, i) => (
        <div key={i} className="mb-1">
          {line.type === 'input' ? (
            <div>
              <span className="text-blue-400 mr-2">guest@macbook:~$</span>
              <span className="text-white">{line.content}</span>
            </div>
          ) : (
            <div className="whitespace-pre-wrap text-gray-300">{line.content}</div>
          )}
        </div>
      ))}
      <div className="flex items-center">
        <span className="text-blue-400 mr-2">guest@macbook:~$</span>
        <input
          id="term-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none border-none text-white flex-1"
          autoFocus
          autoComplete="off"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default Terminal;
