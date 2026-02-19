'use client';

/**
 * Question Component
 *
 * Displays a math question to the student.
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface QuestionProps {
  questionText: string;
  questionNumber: number;
  totalQuestions: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export function Question({
  questionText,
  questionNumber,
  totalQuestions,
  difficulty,
}: QuestionProps) {
  const difficultyConfig = {
    easy: { className: 'bg-green-100 text-green-800', label: 'Easy' },
    medium: { className: 'bg-yellow-100 text-yellow-800', label: 'Medium' },
    hard: { className: 'bg-red-100 text-red-800', label: 'Hard' },
  };

  return (
    <Card variant="outlined">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span
            className={`inline-flex items-center justify-center font-medium rounded-full text-xs px-2 py-0.5 ${difficultyConfig[difficulty].className}`}
          >
            {difficultyConfig[difficulty].label}
          </span>
        </div>
        <CardTitle className="text-xl">Question</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-lg text-gray-900 leading-relaxed whitespace-pre-wrap">
          {questionText}
        </p>
      </CardContent>
    </Card>
  );
}
