/**
 * Tutor Chat API Route
 *
 * Provides conversational tutoring using the Socratic method.
 * Guides students to discover answers rather than giving them directly.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getStudentByAuthId, getTopicById } from '@/lib/supabase/queries';
import { sendMessage, MODELS } from '@/lib/llm/claude-client';
import { buildTutorChatPrompt } from '@/lib/llm/prompts';
import type { StudentContext, TopicContext } from '@/types/learning';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sessionId,
      currentQuestion,
      topicTitle,
      conversationHistory,
      studentMessage,
    } = body;

    if (!currentQuestion || !studentMessage) {
      return NextResponse.json(
        { error: 'Current question and student message are required' },
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
      skill_level: 'learning',
      recent_accuracy: 0,
    };

    // Build topic context
    const topicContext: TopicContext = {
      topic_id: '',
      code: '',
      title: topicTitle || 'Mathematics',
      description: '',
      strand: '',
      level: student.curriculum_level || 5,
    };

    // Build the prompt
    const prompt = buildTutorChatPrompt(
      studentContext,
      topicContext,
      currentQuestion,
      conversationHistory || [],
      studentMessage
    );

    console.log('[API] Getting tutor response for:', studentMessage);

    // Get response from Claude
    const response = await sendMessage(prompt, {
      model: MODELS.SONNET,
      maxTokens: 500,
      temperature: 0.7,
    });

    console.log('[API] Tutor response generated');

    // Optionally save conversation to database
    if (sessionId) {
      // You can implement saving conversation history here if needed
      // await saveConversationMessage({ session_id: sessionId, role: 'user', content: studentMessage });
      // await saveConversationMessage({ session_id: sessionId, role: 'assistant', content: response });
    }

    return NextResponse.json({
      response,
    });
  } catch (error) {
    console.error('[API] Error in tutor chat:', error);
    return NextResponse.json(
      {
        error: 'Failed to get tutor response',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
