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
import type { Database } from '@/types/database';

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

    // Fetch learning history - get completed sessions for this topic
    const { data: sessions } = await supabase
      .from('learning_sessions')
      .select('performance_summary, ended_at')
      .eq('student_id', student.id)
      .eq('topic_id', topicId)
      .eq('status', 'completed')
      .order('ended_at', { ascending: false })
      .limit(5); // Get last 5 sessions

    // Extract concepts covered and analyze recent performance
    const conceptsCovered: string[] = [];
    const recentAccuracies: number[] = [];

    if (sessions) {
      sessions.forEach((session: any) => {
        const summary = session.performance_summary;
        if (summary?.concepts_covered) {
          conceptsCovered.push(...summary.concepts_covered);
        }
        if (summary?.accuracy !== undefined) {
          recentAccuracies.push(summary.accuracy);
        }
      });
    }

    // Calculate recent average accuracy (last 3 sessions)
    const recentAvgAccuracy = recentAccuracies.length > 0
      ? recentAccuracies.slice(0, 3).reduce((a, b) => a + b, 0) / Math.min(recentAccuracies.length, 3)
      : progress && progress.questions_attempted > 0
        ? Math.round((progress.questions_correct / progress.questions_attempted) * 100)
        : 0;

    // Determine adaptive difficulty instruction
    let adaptiveInstruction = '';
    let recommendedSkillLevel = progress?.skill_level || 'not_started';

    if (sessions && sessions.length > 0) {
      if (recentAvgAccuracy < 40) {
        // Struggling significantly - step back to fundamentals
        adaptiveInstruction = 'STEP BACK: Student is struggling (< 40% accuracy). Return to FOUNDATIONAL concepts with SIMPLER questions. Break concepts into smaller steps. Use more scaffolding and concrete examples.';
        recommendedSkillLevel = 'learning'; // Ensure we're at basics
      } else if (recentAvgAccuracy < 60) {
        // Struggling - slow down progression
        adaptiveInstruction = 'SLOW DOWN: Student is finding this challenging (< 60% accuracy). Stay at CURRENT level. Reinforce concepts with varied practice. Do NOT introduce new complexity yet.';
        // Keep current level
      } else if (recentAvgAccuracy < 70) {
        // Building confidence - maintain pace
        adaptiveInstruction = 'CONSOLIDATE: Student is building understanding (60-70% accuracy). Continue at current level with gentle progression. Introduce slight variations but maintain core difficulty.';
      } else if (recentAvgAccuracy < 85) {
        // Doing well - standard progression
        adaptiveInstruction = 'STANDARD PROGRESSION: Student is performing well (70-85% accuracy). Gradually increase complexity. Introduce new aspects or applications of concepts.';
        if (recommendedSkillLevel === 'learning') recommendedSkillLevel = 'practicing';
      } else {
        // Excelling - challenge them
        adaptiveInstruction = 'CHALLENGE: Student is excelling (85%+ accuracy). Introduce more complex problems, multi-step reasoning, or real-world applications. Push boundaries while maintaining engagement.';
        if (recommendedSkillLevel === 'practicing') recommendedSkillLevel = 'mastered';
      }
    }

    // Build learning history with performance analysis
    const learningHistory = {
      concepts_covered: [...new Set(conceptsCovered)], // Remove duplicates
      total_sessions: sessions?.length || 0,
      recent_accuracy: recentAvgAccuracy,
      adaptive_instruction: adaptiveInstruction
    };

    // Build student context with adaptive skill level
    const studentContext: StudentContext = {
      student_id: student.id,
      first_name: student.first_name,
      grade_level: student.grade_level,
      curriculum_level: student.curriculum_level || topic.level,
      skill_level: recommendedSkillLevel, // Use adaptive skill level
      recent_accuracy: Math.round(recentAvgAccuracy),
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

    // Generate questions using Claude with learning history
    console.log('[API] Generating questions for:', topic.title);
    console.log('[API] Learning history:', learningHistory);
    const questions = await generateQuestions(
      studentContext,
      topicContext,
      numQuestions,
      learningHistory
    );

    console.log('[API] Generated', questions.length, 'questions');

    // Store questions in session if sessionId is provided
    if (sessionId) {
      type SessionUpdate = Database['public']['Tables']['learning_sessions']['Update'];

      await (supabase
        .from('learning_sessions') as any)
        .update({
          performance_summary: { questions } as any,
          updated_at: new Date().toISOString(),
        } satisfies SessionUpdate)
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
