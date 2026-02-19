'use client';

/**
 * Session Summary Component
 *
 * Displays a summary of the completed learning session.
 */

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface SessionSummaryProps {
  questionsCompleted: number;
  questionsCorrect: number;
  topicTitle: string;
}

export function SessionSummary({
  questionsCompleted,
  questionsCorrect,
  topicTitle,
}: SessionSummaryProps) {
  const accuracy = questionsCompleted > 0
    ? Math.round((questionsCorrect / questionsCompleted) * 100)
    : 0;

  const getMessage = () => {
    if (accuracy >= 80) {
      return {
        emoji: '🌟',
        title: 'Excellent Work!',
        message: "You're mastering this topic! Keep up the great work.",
      };
    } else if (accuracy >= 60) {
      return {
        emoji: '👍',
        title: 'Good Progress!',
        message: "You're doing well. A bit more practice and you'll have this down!",
      };
    } else {
      return {
        emoji: '💪',
        title: 'Keep Practicing!',
        message: "Don't worry, learning takes time. Try this topic again when you're ready!",
      };
    }
  };

  const { emoji, title, message } = getMessage();

  return (
    <Card variant="outlined" className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="text-center">
          <div className="text-6xl mb-4">{emoji}</div>
          <CardTitle className="text-2xl mb-2">{title}</CardTitle>
          <p className="text-gray-600">{topicTitle}</p>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {questionsCompleted}
              </p>
              <p className="text-sm text-gray-600 mt-1">Questions</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">
                {questionsCorrect}
              </p>
              <p className="text-sm text-gray-600 mt-1">Correct</p>
            </div>
            <div>
              <p className={`text-3xl font-bold ${
                accuracy >= 70 ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {accuracy}%
              </p>
              <p className="text-sm text-gray-600 mt-1">Accuracy</p>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-700">{message}</p>

        <div className="flex gap-4">
          <Link href="/dashboard" className="flex-1">
            <Button variant="outline" className="w-full">
              Back to Dashboard
            </Button>
          </Link>
          <Button className="flex-1" onClick={() => window.location.reload()}>
            Practice Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
