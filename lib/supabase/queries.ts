// @ts-nocheck
/**
 * Supabase Database Queries
 *
 * Common database operations for the application.
 * All queries use Row Level Security (RLS) for data protection.
 */

import { createClient } from './server';
import type {
  Student,
  StudentInsert,
  CurriculumTopic,
  StudentProgress,
  StudentProgressInsert,
  StudentProgressUpdate,
  LearningSession,
  LearningSessionInsert,
  LearningSessionUpdate,
  QuestionInteraction,
  QuestionInteractionInsert,
  ConversationMessage,
  ConversationMessageInsert,
} from '@/types/database';

// =============================================================================
// STUDENT QUERIES
// =============================================================================

/**
 * Get student by auth user ID
 */
export async function getStudentByAuthId(authUserId: string): Promise<Student | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('auth_user_id', authUserId)
    .single();

  if (error) {
    console.error('Error fetching student:', error);
    return null;
  }

  return data;
}

/**
 * Create a new student profile
 */
export async function createStudent(student: StudentInsert): Promise<Student | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('students')
    .insert(student as any)
    .select()
    .single();

  if (error) {
    console.error('Error creating student:', error);
    return null;
  }

  return data;
}

/**
 * Update student last active timestamp
 */
export async function updateStudentLastActive(studentId: string): Promise<void> {
  const supabase = await createClient();

  await supabase
    .from('students')
    .update({ last_active_at: new Date().toISOString() } as any)
    .eq('id', studentId);
}

// =============================================================================
// CURRICULUM QUERIES
// =============================================================================

/**
 * Get all curriculum topics
 */
export async function getAllTopics(): Promise<CurriculumTopic[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('curriculum_topics')
    .select('*')
    .order('level', { ascending: true })
    .order('difficulty_order', { ascending: true });

  if (error) {
    console.error('Error fetching topics:', error);
    return [];
  }

  return data || [];
}

/**
 * Get topics by grade level
 */
export async function getTopicsByLevel(level: number): Promise<CurriculumTopic[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('curriculum_topics')
    .select('*')
    .eq('level', level)
    .order('difficulty_order', { ascending: true });

  if (error) {
    console.error('Error fetching topics by level:', error);
    return [];
  }

  return data || [];
}

/**
 * Get topics by strand
 */
export async function getTopicsByStrand(strand: string): Promise<CurriculumTopic[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('curriculum_topics')
    .select('*')
    .eq('strand', strand)
    .order('level', { ascending: true })
    .order('difficulty_order', { ascending: true });

  if (error) {
    console.error('Error fetching topics by strand:', error);
    return [];
  }

  return data || [];
}

/**
 * Get a single topic by ID
 */
export async function getTopicById(topicId: string): Promise<CurriculumTopic | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('curriculum_topics')
    .select('*')
    .eq('id', topicId)
    .single();

  if (error) {
    console.error('Error fetching topic:', error);
    return null;
  }

  return data;
}

// =============================================================================
// PROGRESS QUERIES
// =============================================================================

/**
 * Get all progress for a student
 */
export async function getStudentProgress(studentId: string): Promise<StudentProgress[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('student_progress')
    .select('*, topic:curriculum_topics(*)')
    .eq('student_id', studentId)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching student progress:', error);
    return [];
  }

  return data || [];
}

/**
 * Get progress for a specific topic
 */
export async function getTopicProgress(
  studentId: string,
  topicId: string
): Promise<StudentProgress | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('student_progress')
    .select('*')
    .eq('student_id', studentId)
    .eq('topic_id', topicId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
    console.error('Error fetching topic progress:', error);
  }

  return data || null;
}

/**
 * Create or update student progress
 */
export async function upsertProgress(
  progress: StudentProgressInsert | StudentProgressUpdate
): Promise<StudentProgress | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('student_progress')
    .upsert(progress, {
      onConflict: 'student_id,topic_id',
    })
    .select()
    .single();

  if (error) {
    console.error('Error upserting progress:', error);
    return null;
  }

  return data;
}

/**
 * Update student progress based on session performance
 */
export async function updateStudentProgress(
  studentId: string,
  topicId: string,
  accuracy: number,
  questionsAttempted: number,
  questionsCorrect: number
): Promise<void> {
  const supabase = await createClient();

  // Get existing progress
  const existing = await getTopicProgress(studentId, topicId);

  // Calculate new confidence score (weighted average with previous attempts)
  const newConfidence = accuracy;
  const previousConfidence = existing?.confidence_score || 0;
  const totalAttempts = (existing?.questions_attempted || 0) + questionsAttempted;

  const confidenceScore = existing
    ? (previousConfidence * existing.questions_attempted + newConfidence * questionsAttempted) / totalAttempts
    : newConfidence;

  // Determine skill level based on confidence and attempts
  let skillLevel: 'not_started' | 'learning' | 'practicing' | 'mastered' = 'learning';

  if (confidenceScore >= 0.9 && totalAttempts >= 20) {
    skillLevel = 'mastered';
  } else if (confidenceScore >= 0.7 && totalAttempts >= 10) {
    skillLevel = 'practicing';
  } else if (totalAttempts >= 5) {
    skillLevel = 'practicing';
  }

  // Update progress
  await upsertProgress({
    student_id: studentId,
    topic_id: topicId,
    skill_level: skillLevel,
    confidence_score: confidenceScore,
    questions_attempted: totalAttempts,
    questions_correct: (existing?.questions_correct || 0) + questionsCorrect,
    last_practiced_at: new Date().toISOString(),
    ...(skillLevel === 'mastered' && !existing?.mastered_at
      ? { mastered_at: new Date().toISOString() }
      : {}),
  } as any);
}

// =============================================================================
// SESSION QUERIES
// =============================================================================

/**
 * Create a new learning session
 */
export async function createSession(
  session: LearningSessionInsert
): Promise<LearningSession | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('learning_sessions')
    .insert(session)
    .select()
    .single();

  if (error) {
    console.error('Error creating session:', error);
    return null;
  }

  return data;
}

/**
 * Get current in-progress session for a student
 */
export async function getCurrentSession(studentId: string): Promise<LearningSession | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('learning_sessions')
    .select('*, topic:curriculum_topics(*)')
    .eq('student_id', studentId)
    .eq('status', 'in_progress')
    .order('started_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching current session:', error);
  }

  return data || null;
}

/**
 * Update a learning session
 */
export async function updateSession(
  sessionId: string,
  updates: LearningSessionUpdate
): Promise<LearningSession | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('learning_sessions')
    .update(updates)
    .eq('id', sessionId)
    .select()
    .single();

  if (error) {
    console.error('Error updating session:', error);
    return null;
  }

  return data;
}

/**
 * Get session by ID
 */
export async function getSessionById(sessionId: string): Promise<LearningSession | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('learning_sessions')
    .select('*, topic:curriculum_topics(*)')
    .eq('id', sessionId)
    .single();

  if (error) {
    console.error('Error fetching session:', error);
    return null;
  }

  return data;
}

/**
 * Get recent sessions for a student
 */
export async function getRecentSessions(
  studentId: string,
  limit: number = 10
): Promise<LearningSession[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('learning_sessions')
    .select('*, topic:curriculum_topics(*)')
    .eq('student_id', studentId)
    .order('started_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent sessions:', error);
    return [];
  }

  return data || [];
}

// =============================================================================
// QUESTION QUERIES
// =============================================================================

/**
 * Save a question interaction
 */
export async function saveQuestionInteraction(
  interaction: QuestionInteractionInsert
): Promise<QuestionInteraction | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('question_interactions')
    .insert(interaction)
    .select()
    .single();

  if (error) {
    console.error('Error saving question interaction:', error);
    return null;
  }

  return data;
}

/**
 * Get questions for a session
 */
export async function getSessionQuestions(
  sessionId: string
): Promise<QuestionInteraction[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('question_interactions')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching session questions:', error);
    return [];
  }

  return data || [];
}

// =============================================================================
// CONVERSATION QUERIES
// =============================================================================

/**
 * Save a conversation message
 */
export async function saveConversationMessage(
  message: ConversationMessageInsert
): Promise<ConversationMessage | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('conversation_history')
    .insert(message)
    .select()
    .single();

  if (error) {
    console.error('Error saving conversation message:', error);
    return null;
  }

  return data;
}

/**
 * Get conversation history for a session
 */
export async function getSessionConversation(
  sessionId: string
): Promise<ConversationMessage[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('conversation_history')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching conversation history:', error);
    return [];
  }

  return data || [];
}

// =============================================================================
// ANALYTICS QUERIES
// =============================================================================

/**
 * Get student statistics
 */
export async function getStudentStats(studentId: string) {
  const supabase = await createClient();

  // Get total questions attempted and correct
  const { data: questionStats } = await supabase
    .from('question_interactions')
    .select('is_correct')
    .eq('student_id', studentId);

  const totalQuestions = questionStats?.length || 0;
  const correctQuestions = questionStats?.filter((q) => q.is_correct).length || 0;
  const accuracy = totalQuestions > 0 ? (correctQuestions / totalQuestions) * 100 : 0;

  // Get topics mastered count
  const { data: masteredTopics } = await supabase
    .from('student_progress')
    .select('id')
    .eq('student_id', studentId)
    .eq('skill_level', 'mastered');

  // Get total sessions count
  const { data: sessions } = await supabase
    .from('learning_sessions')
    .select('id')
    .eq('student_id', studentId);

  return {
    totalQuestions,
    correctQuestions,
    accuracy: Math.round(accuracy),
    topicsMastered: masteredTopics?.length || 0,
    totalSessions: sessions?.length || 0,
  };
}
