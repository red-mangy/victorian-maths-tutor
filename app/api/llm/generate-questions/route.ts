/**
 * Generate Questions API Route
 *
 * Generates personalized mathematics questions using Claude AI.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getStudentByAuthId, getTopicById, getTopicProgress } from '@/lib/supabase/queries';
import { generateQuestions } from '@/lib/llm/question-generator';
import type { StudentContext, TopicContext } from '@/types/learning';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topicId, sessionId, numQuestions = 5 } = body;

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

    // Get topic details
    const topic = await getTopicById(topicId);
    if (!topic) {
      return NextResponse.json(
        { error: 'Topic not found' },
        { status: 404 }
      );
    }

    // Get student's progress on this topic
    const progress = await getTopicProgress(student.id, topicId);

    // Build student context
    const studentContext: StudentContext = {
      student_id: student.id,
      first_name: student.first_name,
      grade_level: student.grade_level,
      curriculum_level: student.curriculum_level || topic.level,
      skill_level: progress?.skill_level || 'not_started',
      recent_accuracy: progress
        ? progress.questions_attempted > 0
          ? Math.round((progress.questions_correct / progress.questions_attempted) * 100)
          : 0
        : 0,
      strengths: progress?.strengths || [],
      weaknesses: progress?.weaknesses || [],
    };

    // Build topic context
    const topicContext: TopicContext = {
      topic_id: topic.id,
      code: topic.code,
      title: topic.title,
      description: topic.description,
      strand: topic.strand,
      sub_strand: topic.sub_strand || undefined,
      level: topic.level,
      elaborations: topic.elaborations || undefined,
    };

    // Generate questions using Claude
    console.log('[API] Generating questions for:', topic.title);
    const questions = await generateQuestions(
      studentContext,
      topicContext,
      numQuestions
    );

    console.log('[API] Generated', questions.length, 'questions');

    // Store questions in session if sessionId is provided
    if (sessionId) {
      await supabase
        .from('learning_sessions')
        .update({
          performance_summary: { questions } as any,
          updated_at: new Date().toISOString(),
        } as any)
        .eq('id', sessionId);

      console.log('[API] Stored questions in session:', sessionId);
    }

    return NextResponse.json({
      success: true,
      questions,
      studentContext,
      topicContext,
    });
  } catch (error) {
    console.error('[API] Error generating questions:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate questions',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
