/**
 * Evaluate Answer API Route
 *
 * Evaluates a student's answer using Claude AI and provides feedback.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getStudentByAuthId, saveQuestionInteraction } from '@/lib/supabase/queries';
import { evaluateAnswer } from '@/lib/llm/answer-evaluator';
import type { StudentContext, GeneratedQuestion } from '@/types/learning';
import type { Database } from '@/types/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, questionText, correctAnswer, studentAnswer, questionType, topicId } = body;

    if (!questionText || !studentAnswer || !correctAnswer) {
      return NextResponse.json(
        { error: 'Question text, correct answer, and student answer are required' },
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

    // Build student context
    const studentContext: StudentContext = {
      student_id: student.id,
      first_name: student.first_name,
      grade_level: student.grade_level,
      curriculum_level: student.curriculum_level || 5,
      skill_level: 'learning', // Will be updated based on actual progress
      recent_accuracy: 0,
    };

    // Build question object from the provided fields
    const question: GeneratedQuestion = {
      question_text: questionText,
      question_type: questionType || 'short_answer',
      difficulty: 'medium', // Default difficulty
      hints: [],
      correct_answer: correctAnswer,
      solution_steps: [],
      focuses_on: 'General concept understanding', // Default focus
    };

    // Evaluate the answer using Claude
    console.log('[API] Evaluating answer for:', questionText);
    const evaluation = await evaluateAnswer(
      question,
      studentAnswer,
      studentContext
    );

    console.log('[API] Evaluation:', evaluation.is_correct ? 'Correct' : 'Incorrect');

    // Save or update question interaction in database
    if (sessionId) {
      // Check if this question has already been answered in this session (for retries)
      const { data: existingInteraction, error: fetchError } = await supabase
        .from('question_interactions')
        .select('id')
        .eq('session_id', sessionId)
        .eq('question_text', questionText)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existingInteraction && !fetchError) {
        // Update existing interaction (this is a retry)
        type QuestionUpdate = Database['public']['Tables']['question_interactions']['Update'];

        await (supabase
          .from('question_interactions') as any)
          .update({
            student_answer: studentAnswer,
            is_correct: evaluation.is_correct,
            llm_evaluation: JSON.stringify(evaluation),
            llm_feedback: evaluation.feedback,
          } satisfies QuestionUpdate)
          .eq('id', existingInteraction.id);

        console.log('[API] Updated existing question interaction (retry)');
      } else {
        // Create new interaction (first attempt)
        await saveQuestionInteraction({
          session_id: sessionId,
          student_id: student.id,
          topic_id: topicId,
          question_text: questionText,
          question_type: questionType || 'short_answer',
          difficulty_level: question.difficulty,
          student_answer: studentAnswer,
          is_correct: evaluation.is_correct,
          llm_evaluation: JSON.stringify(evaluation),
          llm_feedback: evaluation.feedback,
          time_spent_seconds: 0, // Could be tracked on the client side
        });

        console.log('[API] Saved new question interaction');

        // Update the session's questions_completed count (only for new questions)
        const { count, error: countError } = await supabase
          .from('question_interactions')
          .select('*', { count: 'exact', head: true })
          .eq('session_id', sessionId);

        if (countError) {
          console.error('[API] Error counting questions:', countError);
        } else {
          console.log('[API] Question count for session:', count);

          type SessionUpdate = Database['public']['Tables']['learning_sessions']['Update'];

          const { error: updateError } = await (supabase
            .from('learning_sessions') as any)
            .update({
              questions_completed: count || 0,
              updated_at: new Date().toISOString()
            } satisfies SessionUpdate)
            .eq('id', sessionId);

          if (updateError) {
            console.error('[API] Error updating session questions_completed:', updateError);
          } else {
            console.log('[API] Successfully updated session questions_completed to:', count);
          }
        }
      }
    }

    return NextResponse.json(evaluation);
  } catch (error) {
    console.error('[API] Error evaluating answer:', error);
    return NextResponse.json(
      {
        error: 'Failed to evaluate answer',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
