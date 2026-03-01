'use client';

/**
 * Math Input Component
 *
 * Text input with virtual keyboard for mathematical symbols.
 * Designed for Years 4-10 students on mobile/tablet devices.
 */

import { useState, useRef, useEffect } from 'react';

interface MathInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  yearLevel?: number; // 4-10 for filtering relevant symbols
}

// Symbol categories for different year levels
const SYMBOL_SETS = {
  basic: [
    { symbol: '×', label: 'Multiply' },
    { symbol: '÷', label: 'Divide' },
    { symbol: '=', label: 'Equals' },
    { symbol: '+', label: 'Plus' },
    { symbol: '−', label: 'Minus' },
    { symbol: '(', label: 'Open bracket' },
    { symbol: ')', label: 'Close bracket' },
  ],
  intermediate: [
    { symbol: '²', label: 'Squared' },
    { symbol: '³', label: 'Cubed' },
    { symbol: '√', label: 'Square root' },
    { symbol: '¼', label: 'Quarter' },
    { symbol: '½', label: 'Half' },
    { symbol: '¾', label: 'Three quarters' },
    { symbol: '.', label: 'Decimal point' },
  ],
  advanced: [
    { symbol: 'π', label: 'Pi' },
    { symbol: '°', label: 'Degree' },
    { symbol: '≤', label: 'Less than or equal' },
    { symbol: '≥', label: 'Greater than or equal' },
    { symbol: '≠', label: 'Not equal' },
    { symbol: '±', label: 'Plus minus' },
    { symbol: '%', label: 'Percent' },
  ],
};

export function MathInput({
  value,
  onChange,
  placeholder = 'Type your answer...',
  label,
  disabled = false,
  className = '',
  yearLevel = 6,
}: MathInputProps) {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  // Determine which symbol sets to show based on year level
  const getSymbolSets = () => {
    const sets = [SYMBOL_SETS.basic];
    if (yearLevel >= 5) sets.push(SYMBOL_SETS.intermediate);
    if (yearLevel >= 7) sets.push(SYMBOL_SETS.advanced);
    return sets;
  };

  const allSymbols = getSymbolSets().flat();

  // Update cursor position when input changes
  useEffect(() => {
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart || 0);
    }
  }, [value]);

  const insertSymbol = (symbol: string) => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const newValue = value.substring(0, start) + symbol + value.substring(end);

    onChange(newValue);

    // Set cursor position after the inserted symbol
    setTimeout(() => {
      const newPos = start + symbol.length;
      input.focus();
      input.setSelectionRange(newPos, newPos);
    }, 0);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* Input Field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowKeyboard(true)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          autoComplete="off"
        />

        {/* Keyboard Toggle Button */}
        <button
          type="button"
          onClick={() => setShowKeyboard(!showKeyboard)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
          title={showKeyboard ? 'Hide keyboard' : 'Show keyboard'}
        >
          {showKeyboard ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      </div>

      {/* Virtual Keyboard */}
      {showKeyboard && (
        <div className="mt-3 p-3 bg-gray-50 border-2 border-gray-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600">
              Math Symbols
            </span>
            <button
              type="button"
              onClick={() => setShowKeyboard(false)}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Hide
            </button>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2">
            {allSymbols.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => insertSymbol(item.symbol)}
                disabled={disabled}
                className="flex items-center justify-center h-12 bg-white border-2 border-gray-300 rounded-lg text-xl font-semibold hover:bg-blue-50 hover:border-blue-400 active:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={item.label}
              >
                {item.symbol}
              </button>
            ))}
          </div>

          {/* Helper Text */}
          <div className="mt-3 text-xs text-gray-500 text-center">
            Tap a symbol to insert it at cursor position
          </div>
        </div>
      )}
    </div>
  );
}
