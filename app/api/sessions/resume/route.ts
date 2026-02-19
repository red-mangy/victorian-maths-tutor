/**
 * Resume Session API Route
 *
 * Loads an existing session with its questions and progress.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSessionById, getSessionQuestions } from '@/lib/supabase/queries';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Get the session
    const session = await getSessionById(sessionId);
    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Get all question interactions for this session
    const questionInteractions = await getSessionQuestions(sessionId);

    // Parse questions from the performance_summary or reconstruct from interactions
    let questions = [];

    // Check if questions are stored in performance_summary
    if (session.performance_summary && typeof session.performance_summary === 'object') {
      const summary = session.performance_summary as any;
      if (summary.questions && Array.isArray(summary.questions)) {
        questions = summary.questions;
      }
    }

    // If no stored questions but we have interactions, reconstruct from interactions
    if (questions.length === 0 && questionInteractions.length > 0) {
      questions = questionInteractions.map((interaction) => ({
        question_text: interaction.question_text,
        question_type: interaction.question_type,
        difficulty: interaction.difficulty_level,
        hints: [],
        correct_answer: '', // We don't store the correct answer in interactions
        solution_steps: [],
      }));
    }

    // Determine which questions have been answered
    const answeredQuestions = new Set(
      questionInteractions
        .filter((q) => q.is_correct !== null) // Only questions that have been evaluated
        .map((q) => q.question_text)
    );

    // Find the first unanswered question index
    let currentQuestionIndex = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!answeredQuestions.has(questions[i].question_text)) {
        currentQuestionIndex = i;
        break;
      }
    }

    // If all questions are answered, set to the last index
    if (currentQuestionIndex === 0 && questions.length > 0 && answeredQuestions.size === questions.length) {
      currentQuestionIndex = questions.length;
    }

    return NextResponse.json({
      session,
      questions,
      currentQuestionIndex,
      questionsAnswered: answeredQuestions.size,
    });
  } catch (error) {
    console.error('[API] Error resuming session:', error);
    return NextResponse.json(
      {
        error: 'Failed to resume session',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
