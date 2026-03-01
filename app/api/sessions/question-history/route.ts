/**
 * Question History API
 *
 * Fetches a specific question's answer and evaluation from a learning session.
 * Used when reviewing previously answered questions in resumed sessions.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('sessionId');
    const questionIndex = searchParams.get('questionIndex');

    if (!sessionId || questionIndex === null) {
      return NextResponse.json(
        { error: 'Session ID and question index are required' },
        { status: 400 }
      );
    }

    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the session belongs to the user
    const { data: session, error: sessionError } = await supabase
      .from('learning_sessions')
      .select('student_id')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Get the student to verify ownership
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (studentError || !student || student.id !== session.student_id) {
      return NextResponse.json(
        { error: 'Unauthorized to access this session' },
        { status: 403 }
      );
    }

    // Fetch the question interaction for this index
    // Note: We need to get the Nth interaction based on created_at order
    const { data: interactions, error: interactionError } = await supabase
      .from('question_interactions')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (interactionError) {
      console.error('[QuestionHistory] Error fetching interactions:', interactionError);
      return NextResponse.json(
        { error: 'Failed to fetch question history' },
        { status: 500 }
      );
    }

    const targetIndex = parseInt(questionIndex);
    const interaction = interactions[targetIndex];

    if (!interaction) {
      return NextResponse.json(
        { error: 'Question interaction not found' },
        { status: 404 }
      );
    }

    // Return the student's answer and the evaluation
    const response = {
      studentAnswer: interaction.student_answer,
      evaluation: {
        is_correct: interaction.is_correct,
        accuracy_score: interaction.accuracy_score || 0,
        feedback: interaction.llm_feedback || '',
        conceptual_understanding: interaction.conceptual_understanding || 'developing',
        identified_weakness: interaction.identified_weakness,
        encouragement: interaction.llm_evaluation || 'Keep practicing!',
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('[QuestionHistory] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
