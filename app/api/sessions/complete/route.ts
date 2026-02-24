// @ts-nocheck
/**
 * Complete Session API Route
 *
 * Marks a learning session as completed and updates progress.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { updateStudentProgress } from '@/lib/supabase/queries';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, questionsCompleted, questionsCorrect } = body;

    if (!sessionId || questionsCompleted === undefined || questionsCorrect === undefined) {
      return NextResponse.json(
        { error: 'Session ID, questions completed, and questions correct are required' },
        { status: 400 }
      );
    }

    // Get authenticated user
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get session details including questions
    const { data: session, error: sessionError } = await supabase
      .from('learning_sessions')
      .select('student_id, topic_id, performance_summary')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Extract concepts covered from the questions in this session
    const sessionData = session.performance_summary as any;
    const concepts_covered: string[] = [];

    if (sessionData?.questions) {
      sessionData.questions.forEach((q: any) => {
        if (q.focuses_on) {
          concepts_covered.push(q.focuses_on);
        }
      });
    }

    // Update session status with concepts covered
    const { error: updateError } = await supabase
      .from('learning_sessions')
      .update({
        status: 'completed',
        ended_at: new Date().toISOString(),
        questions_completed: questionsCompleted,
        performance_summary: {
          total: questionsCompleted,
          correct: questionsCorrect,
          accuracy: questionsCompleted > 0
            ? Math.round((questionsCorrect / questionsCompleted) * 100)
            : 0,
          concepts_covered, // Save what was learned in this session
          questions: sessionData?.questions || [], // Keep the questions
        },
      } as any)
      .eq('id', sessionId);

    if (updateError) {
      console.error('Error updating session:', updateError);
      return NextResponse.json(
        { error: 'Failed to complete session' },
        { status: 500 }
      );
    }

    // Update student progress
    const accuracy = questionsCompleted > 0
      ? questionsCorrect / questionsCompleted
      : 0;

    await updateStudentProgress(
      session.student_id,
      session.topic_id,
      accuracy,
      questionsCompleted,
      questionsCorrect
    );

    console.log('[API] Completed session:', sessionId);

    return NextResponse.json({
      success: true,
      summary: {
        questionsCompleted,
        questionsCorrect,
        accuracy: Math.round(accuracy * 100),
      },
    });
  } catch (error) {
    console.error('[API] Error completing session:', error);
    return NextResponse.json(
      {
        error: 'Failed to complete session',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
