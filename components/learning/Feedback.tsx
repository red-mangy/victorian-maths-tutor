'use client';

/**
 * Feedback Component
 *
 * Displays the AI tutor's evaluation and feedback on a student's answer.
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface FeedbackProps {
  isCorrect: boolean;
  feedback: string;
  encouragement?: string;
  onNextQuestion: () => void;
  onTryAgain?: () => void;
  isLastQuestion: boolean;
  canRetry?: boolean;
}

export function Feedback({
  isCorrect,
  feedback,
  encouragement,
  onNextQuestion,
  onTryAgain,
  isLastQuestion,
  canRetry = true,
}: FeedbackProps) {
  return (
    <Card
      variant="outlined"
      className={isCorrect ? 'border-green-500 bg-green-50' : 'border-yellow-500 bg-yellow-50'}
    >
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <span className="text-2xl">
            {isCorrect ? '✅' : '🤔'}
          </span>
          {isCorrect ? 'Well done!' : "Let's review"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
            {feedback}
          </p>
        </div>

        {encouragement && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-700 italic">
              💪 {encouragement}
            </p>
          </div>
        )}

        {/* Show different buttons based on correctness */}
        {isCorrect ? (
          <Button
            onClick={onNextQuestion}
            className="w-full"
          >
            {isLastQuestion ? 'Complete Session' : 'Next Question'}
          </Button>
        ) : (
          <div className="flex gap-3">
            {canRetry && onTryAgain && (
              <Button
                onClick={onTryAgain}
                variant="primary"
                className="flex-1"
              >
                Try Again
              </Button>
            )}
            <Button
              onClick={onNextQuestion}
              variant={canRetry ? "outline" : "primary"}
              className="flex-1"
            >
              {isLastQuestion ? 'Complete Session' : 'Skip to Next'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
