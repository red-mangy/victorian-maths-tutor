/**
 * Database Types
 *
 * TypeScript types for all database tables and enums.
 * These types provide type safety when working with Supabase.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      students: {
        Row: {
          id: string;
          auth_user_id: string | null;
          first_name: string;
          last_name: string | null;
          grade_level: string;
          curriculum_level: number | null;
          parent_email: string | null;
          created_at: string;
          updated_at: string;
          last_active_at: string;
          preferences: Json;
        };
        Insert: {
          id?: string;
          auth_user_id?: string | null;
          first_name: string;
          last_name?: string | null;
          grade_level: string;
          curriculum_level?: number | null;
          parent_email?: string | null;
          created_at?: string;
          updated_at?: string;
          last_active_at?: string;
          preferences?: Json;
        };
        Update: {
          id?: string;
          auth_user_id?: string | null;
          first_name?: string;
          last_name?: string | null;
          grade_level?: string;
          curriculum_level?: number | null;
          parent_email?: string | null;
          created_at?: string;
          updated_at?: string;
          last_active_at?: string;
          preferences?: Json;
        };
      };
      curriculum_topics: {
        Row: {
          id: string;
          code: string;
          strand: string;
          sub_strand: string | null;
          level: number;
          title: string;
          description: string;
          elaborations: string[] | null;
          prerequisites: string[] | null;
          difficulty_order: number | null;
          estimated_hours: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          strand: string;
          sub_strand?: string | null;
          level: number;
          title: string;
          description: string;
          elaborations?: string[] | null;
          prerequisites?: string[] | null;
          difficulty_order?: number | null;
          estimated_hours?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          strand?: string;
          sub_strand?: string | null;
          level?: number;
          title?: string;
          description?: string;
          elaborations?: string[] | null;
          prerequisites?: string[] | null;
          difficulty_order?: number | null;
          estimated_hours?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      student_progress: {
        Row: {
          id: string;
          student_id: string;
          topic_id: string;
          skill_level: 'not_started' | 'learning' | 'practicing' | 'mastered';
          confidence_score: number | null;
          questions_attempted: number;
          questions_correct: number;
          last_practiced_at: string | null;
          mastered_at: string | null;
          strengths: string[] | null;
          weaknesses: string[] | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          topic_id: string;
          skill_level?: 'not_started' | 'learning' | 'practicing' | 'mastered';
          confidence_score?: number | null;
          questions_attempted?: number;
          questions_correct?: number;
          last_practiced_at?: string | null;
          mastered_at?: string | null;
          strengths?: string[] | null;
          weaknesses?: string[] | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          topic_id?: string;
          skill_level?: 'not_started' | 'learning' | 'practicing' | 'mastered';
          confidence_score?: number | null;
          questions_attempted?: number;
          questions_correct?: number;
          last_practiced_at?: string | null;
          mastered_at?: string | null;
          strengths?: string[] | null;
          weaknesses?: string[] | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      learning_sessions: {
        Row: {
          id: string;
          student_id: string;
          topic_id: string;
          session_type: 'guided_practice' | 'assessment' | 'review';
          status: 'in_progress' | 'completed' | 'abandoned';
          started_at: string;
          ended_at: string | null;
          duration_seconds: number | null;
          questions_completed: number;
          performance_summary: Json | null;
          llm_model: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          topic_id: string;
          session_type?: 'guided_practice' | 'assessment' | 'review';
          status?: 'in_progress' | 'completed' | 'abandoned';
          started_at?: string;
          ended_at?: string | null;
          duration_seconds?: number | null;
          questions_completed?: number;
          performance_summary?: Json | null;
          llm_model?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          topic_id?: string;
          session_type?: 'guided_practice' | 'assessment' | 'review';
          status?: 'in_progress' | 'completed' | 'abandoned';
          started_at?: string;
          ended_at?: string | null;
          duration_seconds?: number | null;
          questions_completed?: number;
          performance_summary?: Json | null;
          llm_model?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      question_interactions: {
        Row: {
          id: string;
          session_id: string;
          student_id: string;
          topic_id: string;
          question_text: string;
          question_type: 'multiple_choice' | 'short_answer' | 'problem_solving' | null;
          difficulty_level: 'easy' | 'medium' | 'hard' | null;
          correct_answer: string | null;
          student_answer: string | null;
          is_correct: boolean | null;
          llm_evaluation: string | null;
          llm_feedback: string | null;
          hints_used: number;
          time_spent_seconds: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          student_id: string;
          topic_id: string;
          question_text: string;
          question_type?: 'multiple_choice' | 'short_answer' | 'problem_solving' | null;
          difficulty_level?: 'easy' | 'medium' | 'hard' | null;
          correct_answer?: string | null;
          student_answer?: string | null;
          is_correct?: boolean | null;
          llm_evaluation?: string | null;
          llm_feedback?: string | null;
          hints_used?: number;
          time_spent_seconds?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          student_id?: string;
          topic_id?: string;
          question_text?: string;
          question_type?: 'multiple_choice' | 'short_answer' | 'problem_solving' | null;
          difficulty_level?: 'easy' | 'medium' | 'hard' | null;
          correct_answer?: string | null;
          student_answer?: string | null;
          is_correct?: boolean | null;
          llm_evaluation?: string | null;
          llm_feedback?: string | null;
          hints_used?: number;
          time_spent_seconds?: number | null;
          created_at?: string;
        };
      };
      conversation_history: {
        Row: {
          id: string;
          session_id: string;
          student_id: string;
          role: 'user' | 'assistant' | 'system';
          content: string;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          student_id: string;
          role: 'user' | 'assistant' | 'system';
          content: string;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          student_id?: string;
          role?: 'user' | 'assistant' | 'system';
          content?: string;
          metadata?: Json | null;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {
      get_current_session: {
        Args: { p_student_id: string };
        Returns: string | null;
      };
      calculate_accuracy: {
        Args: { p_student_id: string; p_topic_id: string };
        Returns: number;
      };
    };
    Enums: {};
  };
}

// Convenience types for working with tables
export type Student = Database['public']['Tables']['students']['Row'];
export type StudentInsert = Database['public']['Tables']['students']['Insert'];
export type StudentUpdate = Database['public']['Tables']['students']['Update'];

export type CurriculumTopic = Database['public']['Tables']['curriculum_topics']['Row'];
export type CurriculumTopicInsert = Database['public']['Tables']['curriculum_topics']['Insert'];
export type CurriculumTopicUpdate = Database['public']['Tables']['curriculum_topics']['Update'];

export type StudentProgress = Database['public']['Tables']['student_progress']['Row'];
export type StudentProgressInsert = Database['public']['Tables']['student_progress']['Insert'];
export type StudentProgressUpdate = Database['public']['Tables']['student_progress']['Update'];

export type LearningSession = Database['public']['Tables']['learning_sessions']['Row'];
export type LearningSessionInsert = Database['public']['Tables']['learning_sessions']['Insert'];
export type LearningSessionUpdate = Database['public']['Tables']['learning_sessions']['Update'];

export type QuestionInteraction = Database['public']['Tables']['question_interactions']['Row'];
export type QuestionInteractionInsert = Database['public']['Tables']['question_interactions']['Insert'];
export type QuestionInteractionUpdate = Database['public']['Tables']['question_interactions']['Update'];

export type ConversationMessage = Database['public']['Tables']['conversation_history']['Row'];
export type ConversationMessageInsert = Database['public']['Tables']['conversation_history']['Insert'];
export type ConversationMessageUpdate = Database['public']['Tables']['conversation_history']['Update'];

// Type aliases for common use cases
export type SkillLevel = 'not_started' | 'learning' | 'practicing' | 'mastered';
export type SessionStatus = 'in_progress' | 'completed' | 'abandoned';
export type QuestionType = 'multiple_choice' | 'short_answer' | 'problem_solving';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type ConversationRole = 'user' | 'assistant' | 'system';
