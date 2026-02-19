'use client';

/**
 * Answer Input Component
 *
 * Allows students to input their answer to a question.
 * Supports multi-line input with auto-resize.
 * - Press Enter to submit
 * - Press Ctrl+Enter (or Cmd+Enter on Mac) to add a new line
 */

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  isSubmitting: boolean;
  disabled?: boolean;
}

export function AnswerInput({ onSubmit, isSubmitting, disabled }: AnswerInputProps) {
  const [answer, setAnswer] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previousDisabledRef = useRef(disabled);

  // Auto-resize textarea as content grows
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [answer]);

  // Clear answer when re-enabled (for "Try Again" functionality)
  useEffect(() => {
    if (previousDisabledRef.current && !disabled) {
      // Component was disabled and is now enabled again (Try Again clicked)
      setAnswer('');
    }
    previousDisabledRef.current = disabled;
  }, [disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer.trim());
      // Keep the value in the textarea (don't clear it)
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter or Cmd+Enter adds a new line
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      setAnswer(answer + '\n');
      return;
    }

    // Regular Enter submits the form
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      if (answer.trim()) {
        handleSubmit(e as any);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="answer"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Your Answer
        </label>
        <textarea
          ref={textareaRef}
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your answer here... (Press Enter to submit, Ctrl+Enter for new line)"
          disabled={isSubmitting || disabled}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none overflow-hidden min-h-[80px] bg-white text-gray-900 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
          autoFocus
        />
      </div>
      <Button
        type="submit"
        disabled={!answer.trim() || isSubmitting || disabled}
        isLoading={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Checking...' : 'Submit Answer'}
      </Button>
    </form>
  );
}
