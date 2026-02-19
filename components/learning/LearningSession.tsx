'use client';

/**
 * Learning Session Component
 *
 * Orchestrates the interactive learning experience.
 * Manages question generation, answer submission, evaluation, and progress tracking.
 */

import { useState, useEffect, useRef } from 'react';
import { Question } from './Question';
import { AnswerInput } from './AnswerInput';
import { Feedback } from './Feedback';
import { SessionSummary } from './SessionSummary';
import { ChatPanel } from './ChatPanel';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { CurriculumTopic } from '@/types/database';

interface QuestionData {
  question_text: string;
  question_type: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hints: string[];
  correct_answer: string;
  solution_steps: string[];
}

interface EvaluationResult {
  is_correct: boolean;
  accuracy_score: number;
  feedback: string;
  conceptual_understanding: string;
  identified_weakness: string | null;
  encouragement: string;
}

interface LearningSessionProps {
  topic: CurriculumTopic;
  studentId: string;
  resumeSessionId?: string;
}

type SessionState =
  | 'initializing'
  | 'loading_question'
  | 'answering'
  | 'evaluating'
  | 'showing_feedback'
  | 'completed';

export function LearningSession({ topic, studentId, resumeSessionId }: LearningSessionProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionState, setSessionState] = useState<SessionState>('initializing');
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [studentAnswers, setStudentAnswers] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [retryAttempts, setRetryAttempts] = useState<number>(0);
  const MAX_RETRIES = 2;

  // Ref to track if initialization has started (prevents duplicate calls in React Strict Mode)
  const initializingRef = useRef(false);
  const initializedRef = useRef(false);

  // Initialize session and load questions
  useEffect(() => {
    // Prevent duplicate initialization (React Strict Mode calls useEffect twice)
    if (initializingRef.current || initializedRef.current) {
      return;
    }

    // Also skip if we already have a session or questions
    if (sessionId || questions.length > 0) {
      return;
    }

    // Set both flags immediately to prevent duplicate calls
    initializingRef.current = true;
    initializedRef.current = true;

    initializeSession();
    // NO cleanup function - we want the flags to persist across strict mode remounts
  }, []);

  const initializeSession = async () => {
    try {
      setSessionState('initializing');
      setError(null);

      // Check if we're resuming an existing session
      if (resumeSessionId) {
        console.log('[LearningSession] Resuming session:', resumeSessionId);

        // Load existing session
        const resumeResponse = await fetch('/api/sessions/resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: resumeSessionId }),
        });

        if (!resumeResponse.ok) {
          throw new Error('Failed to resume session');
        }

        const { session, questions: loadedQuestions, currentQuestionIndex: resumeIndex } = await resumeResponse.json();

        setSessionId(session.id);
        setQuestions(loadedQuestions);
        setCurrentQuestionIndex(resumeIndex);

        // If all questions are answered, need to generate more
        if (resumeIndex >= loadedQuestions.length) {
          console.log('[LearningSession] All questions answered, generating more...');
          await loadQuestions(session.id);
        } else {
          console.log('[LearningSession] Resuming from question', resumeIndex + 1);
          setSessionState('answering');
        }
      } else {
        // Start new session
        console.log('[LearningSession] Starting new session');

        const sessionResponse = await fetch('/api/sessions/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topicId: topic.id,
            sessionType: 'guided_practice',
          }),
        });

        if (!sessionResponse.ok) {
          throw new Error('Failed to start session');
        }

        const { session } = await sessionResponse.json();
        setSessionId(session.id);

        // Generate initial questions
        await loadQuestions(session.id);
      }
    } catch (err) {
      console.error('Error initializing session:', err);
      setError('Failed to start learning session. Please try again.');
      setSessionState('completed');
      // Reset flags on error to allow retry
      initializingRef.current = false;
      initializedRef.current = false;
    }
  };

  const loadQuestions = async (sessionId: string) => {
    try {
      setSessionState('loading_question');

      const response = await fetch('/api/llm/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          topicId: topic.id,
          numQuestions: 5,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const { questions } = await response.json();
      setQuestions(questions);
      setSessionState('answering');
    } catch (err) {
      console.error('Error loading questions:', err);
      setError('Failed to generate questions. Please try again.');
      setSessionState('completed');
    }
  };

  const handleSubmitAnswer = async (answer: string) => {
    if (!sessionId) return;

    try {
      setSessionState('evaluating');
      setStudentAnswers([...studentAnswers, answer]);

      const currentQuestion = questions[currentQuestionIndex];

      // Evaluate answer
      const response = await fetch('/api/llm/evaluate-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          topicId: topic.id,
          questionText: currentQuestion.question_text,
          correctAnswer: currentQuestion.correct_answer,
          studentAnswer: answer,
          questionType: currentQuestion.question_type,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to evaluate answer');
      }

      const evaluationResult = await response.json();
      setEvaluation(evaluationResult);

      if (evaluationResult.is_correct) {
        setCorrectCount(correctCount + 1);
      }

      setSessionState('showing_feedback');
    } catch (err) {
      console.error('Error evaluating answer:', err);
      setError('Failed to evaluate answer. Please try again.');
      setSessionState('answering');
    }
  };

  const handleTryAgain = () => {
    setEvaluation(null);
    setSessionState('answering');
    setRetryAttempts(retryAttempts + 1);
  };

  const handleNextQuestion = () => {
    setEvaluation(null);
    setRetryAttempts(0); // Reset retry attempts for next question

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSessionState('answering');
    } else {
      completeSession();
    }
  };

  const completeSession = async () => {
    if (!sessionId) {
      setSessionState('completed');
      return;
    }

    try {
      // Update session status to completed
      await fetch('/api/sessions/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          questionsCompleted: currentQuestionIndex + 1,
          questionsCorrect: correctCount,
        }),
      });
    } catch (err) {
      console.error('Error completing session:', err);
      // Continue to show summary even if completion fails
    }

    setSessionState('completed');
  };

  // Render loading state
  if (sessionState === 'initializing' || sessionState === 'loading_question') {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">
          {sessionState === 'initializing'
            ? 'Starting your learning session...'
            : 'Generating questions...'}
        </p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={initializeSession}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Render session summary
  if (sessionState === 'completed') {
    return (
      <SessionSummary
        questionsCompleted={studentAnswers.length}
        questionsCorrect={correctCount}
        topicTitle={topic.title}
      />
    );
  }

  // Render active learning session
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content - Question and Answer */}
      <div className="lg:col-span-2 space-y-6">
        {/* Question */}
        <Question
          questionText={currentQuestion.question_text}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          difficulty={currentQuestion.difficulty}
        />

        {/* Answer Input or Feedback */}
        {sessionState === 'showing_feedback' && evaluation ? (
          <Feedback
            isCorrect={evaluation.is_correct}
            feedback={evaluation.feedback}
            encouragement={evaluation.encouragement}
            onNextQuestion={handleNextQuestion}
            onTryAgain={handleTryAgain}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
            canRetry={retryAttempts < MAX_RETRIES}
          />
        ) : (
          <AnswerInput
            onSubmit={handleSubmitAnswer}
            isSubmitting={sessionState === 'evaluating'}
            disabled={sessionState !== 'answering'}
          />
        )}

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-8 rounded-full transition-colors ${
                index < currentQuestionIndex
                  ? 'bg-gray-400'
                  : index === currentQuestionIndex
                  ? 'bg-blue-500'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Chat Panel - Right Side */}
      <div className="lg:col-span-1">
        <div className="sticky top-4 h-[calc(100vh-8rem)]">
          {sessionId && (
            <ChatPanel
              sessionId={sessionId}
              currentQuestion={currentQuestion.question_text}
              topicTitle={topic.title}
            />
          )}
        </div>
      </div>
    </div>
  );
}
