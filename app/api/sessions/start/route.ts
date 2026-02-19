/**
 * Start Session API Route
 *
 * Creates a new learning session and generates initial questions.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getStudentByAuthId, createSession } from '@/lib/supabase/queries';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topicId, sessionType = 'guided_practice' } = body;

    if (!topicId) {
      return NextResponse.json(
        { error: 'Topic ID is required' },
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

    // Get student profile
    const student = await getStudentByAuthId(user.id);
    if (!student) {
      return NextResponse.json(
        { error: 'Student profile not found' },
        { status: 404 }
      );
    }

    // Create learning session
    const session = await createSession({
      student_id: student.id,
      topic_id: topicId,
      session_type: sessionType,
      status: 'in_progress',
      llm_model: 'claude-sonnet-4-5-20250929',
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 500 }
      );
    }

    console.log('[API] Created session:', session.id);

    // Generate questions will be called separately by the client
    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        topic_id: session.topic_id,
        started_at: session.started_at,
      },
    });
  } catch (error) {
    console.error('[API] Error starting session:', error);
    return NextResponse.json(
      {
        error: 'Failed to start session',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
