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
  studentLevel: number; // Year level 4-10
  resumeSessionId?: string;
}

type SessionState =
  | 'initializing'
  | 'loading_question'
  | 'answering'
  | 'evaluating'
  | 'showing_feedback'
  | 'completed';

export function LearningSession({ topic, studentId, studentLevel, resumeSessionId }: LearningSessionProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [viewingQuestionIndex, setViewingQuestionIndex] = useState(0); // Which question is being viewed
  const [sessionState, setSessionState] = useState<SessionState>('initializing');
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [studentAnswers, setStudentAnswers] = useState<string[]>([]);
  const [evaluationHistory, setEvaluationHistory] = useState<(EvaluationResult | null)[]>([]); // Store all evaluations
  const [currentAnswerDraft, setCurrentAnswerDraft] = useState<string>(''); // Preserve current answer draft
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
        setViewingQuestionIndex(resumeIndex);

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

      // Store evaluation in history
      const newHistory = [...evaluationHistory];
      newHistory[currentQuestionIndex] = evaluationResult;
      setEvaluationHistory(newHistory);

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
    setCurrentAnswerDraft(''); // Clear draft for new question

    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setViewingQuestionIndex(nextIndex);

      // Restore draft if it exists for next question (e.g., if they navigated back)
      if (studentAnswers[nextIndex]) {
        setCurrentAnswerDraft(studentAnswers[nextIndex]);
      }

      setSessionState('answering');
    } else {
      completeSession();
    }
  };

  // Navigate to a specific question (for review)
  const handleNavigateToQuestion = async (index: number) => {
    // Can only navigate to answered questions or current question
    if (index > currentQuestionIndex) return;

    setViewingQuestionIndex(index);

    // If navigating to a previously answered question, show its evaluation
    if (index < currentQuestionIndex) {
      // Check if we already have the evaluation in memory
      if (evaluationHistory[index]) {
        setEvaluation(evaluationHistory[index]);
        setSessionState('showing_feedback');
      } else {
        // Need to fetch from database (for resumed sessions)
        await loadPreviousQuestionData(index);
      }
    } else {
      // Navigating back to current question
      // Check if current question has already been evaluated
      if (evaluationHistory[index]) {
        // Already answered and evaluated - show feedback
        setEvaluation(evaluationHistory[index]);
        setSessionState('showing_feedback');
      } else {
        // Not yet answered - show input with draft if available
        setEvaluation(null);
        // Restore draft from studentAnswers if it exists (preserves unsaved work)
        if (studentAnswers[index]) {
          setCurrentAnswerDraft(studentAnswers[index]);
        }
        setSessionState('answering');
      }
    }
  };

  // Load previous question data from database (for resumed sessions)
  const loadPreviousQuestionData = async (index: number) => {
    if (!sessionId) return;

    try {
      setSessionState('loading_question');

      const response = await fetch(`/api/sessions/question-history?sessionId=${sessionId}&questionIndex=${index}`);

      if (!response.ok) {
        throw new Error('Failed to load question history');
      }

      const { studentAnswer, evaluation } = await response.json();

      // Store in arrays for future use
      const newAnswers = [...studentAnswers];
      newAnswers[index] = studentAnswer;
      setStudentAnswers(newAnswers);

      const newHistory = [...evaluationHistory];
      newHistory[index] = evaluation;
      setEvaluationHistory(newHistory);

      setEvaluation(evaluation);
      setSessionState('showing_feedback');
    } catch (err) {
      console.error('Error loading question history:', err);
      setError('Failed to load previous question. Please try again.');
      setSessionState('answering');
    }
  };

  // Handle answer draft changes (preserve as student types)
  const handleAnswerDraftChange = (newValue: string) => {
    setCurrentAnswerDraft(newValue);
    // Also save to studentAnswers array to preserve across navigation
    const newAnswers = [...studentAnswers];
    newAnswers[currentQuestionIndex] = newValue;
    setStudentAnswers(newAnswers);
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
  const viewingQuestion = questions[viewingQuestionIndex];
  const isReviewingPastQuestion = viewingQuestionIndex < currentQuestionIndex;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content - Question and Answer */}
      <div className="lg:col-span-2 space-y-6">
        {/* Review Mode Banner */}
        {isReviewingPastQuestion && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-sm font-medium text-yellow-800">
                  Reviewing Question {viewingQuestionIndex + 1}
                </span>
              </div>
              <button
                onClick={() => handleNavigateToQuestion(currentQuestionIndex)}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Return to Question {currentQuestionIndex + 1} →
              </button>
            </div>
          </div>
        )}

        {/* Question */}
        <Question
          questionText={viewingQuestion.question_text}
          questionNumber={viewingQuestionIndex + 1}
          totalQuestions={questions.length}
          difficulty={viewingQuestion.difficulty}
        />

        {/* Answer Input or Feedback */}
        {sessionState === 'showing_feedback' && evaluation ? (
          <>
            {/* Show previous answer when reviewing */}
            {isReviewingPastQuestion && studentAnswers[viewingQuestionIndex] && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Your Answer:</h4>
                <p className="text-gray-900">{studentAnswers[viewingQuestionIndex]}</p>
              </div>
            )}

            <Feedback
              isCorrect={evaluation.is_correct}
              feedback={evaluation.feedback}
              encouragement={evaluation.encouragement}
              onNextQuestion={isReviewingPastQuestion ? () => handleNavigateToQuestion(currentQuestionIndex) : handleNextQuestion}
              onTryAgain={isReviewingPastQuestion ? undefined : handleTryAgain}
              isLastQuestion={currentQuestionIndex === questions.length - 1}
              canRetry={!isReviewingPastQuestion && retryAttempts < MAX_RETRIES}
            />
          </>
        ) : (
          <AnswerInput
            onSubmit={handleSubmitAnswer}
            isSubmitting={sessionState === 'evaluating'}
            disabled={sessionState !== 'answering' || isReviewingPastQuestion}
            yearLevel={studentLevel}
            value={currentAnswerDraft}
            onValueChange={handleAnswerDraftChange}
          />
        )}

        {/* Progress indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            {questions.map((_, index) => {
              const isAnswered = index < currentQuestionIndex;
              const isCurrent = index === currentQuestionIndex;
              const isViewing = index === viewingQuestionIndex;
              const isClickable = isAnswered || isCurrent;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleNavigateToQuestion(index)}
                  disabled={!isClickable}
                  className={`h-2 w-8 rounded-full transition-all ${
                    isAnswered
                      ? 'bg-gray-400 hover:bg-gray-500 cursor-pointer'
                      : isCurrent
                      ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                      : 'bg-gray-200 cursor-not-allowed'
                  } ${isViewing ? 'ring-2 ring-blue-300 ring-offset-2' : ''} disabled:opacity-50`}
                  title={
                    isAnswered
                      ? `Question ${index + 1} (answered - click to review)`
                      : isCurrent
                      ? `Question ${index + 1} (current)`
                      : `Question ${index + 1} (upcoming)`
                  }
                />
              );
            })}
          </div>
          {currentQuestionIndex > 0 && (
            <p className="text-xs text-center text-gray-500">
              Click on gray bars to review previous questions
            </p>
          )}
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
