'use client';

/**
 * Answer Input Component
 *
 * Allows students to input their answer to a question with math symbol support.
 * Features a virtual keyboard for mathematical notation.
 */

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { MathInput } from '@/components/ui/MathInput';

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  isSubmitting: boolean;
  disabled?: boolean;
  yearLevel?: number; // Student's year level (4-10) for symbol filtering
  value?: string; // Controlled value for preserving drafts
  onValueChange?: (value: string) => void; // Callback when value changes
}

export function AnswerInput({
  onSubmit,
  isSubmitting,
  disabled,
  yearLevel = 6,
  value: controlledValue,
  onValueChange
}: AnswerInputProps) {
  const [answer, setAnswer] = useState('');
  const previousDisabledRef = useRef(disabled);

  // Sync with controlled value when provided
  useEffect(() => {
    if (controlledValue !== undefined) {
      setAnswer(controlledValue);
    }
  }, [controlledValue]);

  // Clear answer when re-enabled (for "Try Again" functionality)
  useEffect(() => {
    if (previousDisabledRef.current && !disabled) {
      // Component was disabled and is now enabled again (Try Again clicked)
      setAnswer('');
      if (onValueChange) {
        onValueChange('');
      }
    }
    previousDisabledRef.current = disabled;
  }, [disabled, onValueChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer.trim());
      // Keep the value in the input (don't clear it)
    }
  };

  const handleAnswerChange = (newValue: string) => {
    setAnswer(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const handleClear = () => {
    setAnswer('');
    if (onValueChange) {
      onValueChange('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <MathInput
        value={answer}
        onChange={handleAnswerChange}
        placeholder="Type your answer here..."
        label="Your Answer"
        disabled={isSubmitting || disabled}
        yearLevel={yearLevel}
      />

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={!answer.trim() || isSubmitting || disabled}
          isLoading={isSubmitting}
          fullWidth
        >
          {isSubmitting ? 'Checking...' : 'Submit Answer'}
        </Button>

        {answer && !isSubmitting && !disabled && (
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
          >
            Clear
          </Button>
        )}
      </div>

      {/* Helper text */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>• Tap the keyboard icon to access math symbols</p>
        <p>• Use your regular keyboard for numbers and letters</p>
      </div>
    </form>
  );
}
