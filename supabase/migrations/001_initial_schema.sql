-- Victorian Mathematics Learning Platform - Initial Schema
-- This migration creates all necessary tables for the application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- STUDENTS TABLE
-- =============================================================================
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100),
  grade_level VARCHAR(20) NOT NULL, -- 'Year_4', 'Year_5', etc.
  curriculum_level INTEGER CHECK (curriculum_level >= 4 AND curriculum_level <= 10),
  parent_email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  preferences JSONB DEFAULT '{}'::jsonb,
  CONSTRAINT unique_auth_user UNIQUE(auth_user_id)
);

-- Create index on frequently queried columns
CREATE INDEX idx_students_grade_level ON students(grade_level);
CREATE INDEX idx_students_last_active ON students(last_active_at DESC);
CREATE INDEX idx_students_curriculum_level ON students(curriculum_level);

-- Add comment
COMMENT ON TABLE students IS 'Stores student profile information and preferences';

-- =============================================================================
-- CURRICULUM TOPICS TABLE
-- =============================================================================
CREATE TABLE curriculum_topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL, -- e.g., 'VC2M4N01'
  strand VARCHAR(50) NOT NULL, -- 'Number', 'Algebra', 'Measurement', 'Space', 'Statistics', 'Probability'
  sub_strand VARCHAR(100), -- e.g., 'Place value', 'Fractions', 'Geometry'
  level INTEGER NOT NULL CHECK (level >= 4 AND level <= 10),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  elaborations TEXT[], -- Array of learning elaborations
  prerequisites UUID[], -- Array of prerequisite topic IDs
  difficulty_order INTEGER, -- Order within level (for sequencing)
  estimated_hours INTEGER DEFAULT 4,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for filtering and sorting
CREATE INDEX idx_topics_level ON curriculum_topics(level);
CREATE INDEX idx_topics_strand ON curriculum_topics(strand);
CREATE INDEX idx_topics_level_strand ON curriculum_topics(level, strand);
CREATE INDEX idx_topics_difficulty_order ON curriculum_topics(level, difficulty_order);
CREATE INDEX idx_topics_code ON curriculum_topics(code);

-- Add comment
COMMENT ON TABLE curriculum_topics IS 'Victorian Curriculum content descriptors for mathematics';

-- =============================================================================
-- STUDENT PROGRESS TABLE
-- =============================================================================
CREATE TABLE student_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES curriculum_topics(id) ON DELETE CASCADE,
  skill_level VARCHAR(20) DEFAULT 'not_started' CHECK (skill_level IN ('not_started', 'learning', 'practicing', 'mastered')),
  confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  questions_attempted INTEGER DEFAULT 0 CHECK (questions_attempted >= 0),
  questions_correct INTEGER DEFAULT 0 CHECK (questions_correct >= 0),
  last_practiced_at TIMESTAMP WITH TIME ZONE,
  mastered_at TIMESTAMP WITH TIME ZONE,
  strengths TEXT[], -- Array of specific strengths identified by LLM
  weaknesses TEXT[], -- Array of specific areas to improve
  notes TEXT, -- LLM-generated notes about student understanding
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_student_topic UNIQUE(student_id, topic_id),
  CONSTRAINT correct_not_greater_than_attempted CHECK (questions_correct <= questions_attempted)
);

-- Create indexes for queries
CREATE INDEX idx_progress_student ON student_progress(student_id);
CREATE INDEX idx_progress_topic ON student_progress(topic_id);
CREATE INDEX idx_progress_skill_level ON student_progress(skill_level);
CREATE INDEX idx_progress_last_practiced ON student_progress(last_practiced_at DESC);
CREATE INDEX idx_progress_student_skill ON student_progress(student_id, skill_level);

-- Add comment
COMMENT ON TABLE student_progress IS 'Tracks student progress and mastery for each curriculum topic';

-- =============================================================================
-- LEARNING SESSIONS TABLE
-- =============================================================================
CREATE TABLE learning_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES curriculum_topics(id) ON DELETE CASCADE,
  session_type VARCHAR(50) DEFAULT 'guided_practice' CHECK (session_type IN ('guided_practice', 'assessment', 'review')),
  status VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER CHECK (duration_seconds >= 0),
  questions_completed INTEGER DEFAULT 0 CHECK (questions_completed >= 0),
  performance_summary JSONB, -- Summary stats from the session
  llm_model VARCHAR(50), -- Track which model was used
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_sessions_student ON learning_sessions(student_id);
CREATE INDEX idx_sessions_topic ON learning_sessions(topic_id);
CREATE INDEX idx_sessions_status ON learning_sessions(status);
CREATE INDEX idx_sessions_started_at ON learning_sessions(started_at DESC);
CREATE INDEX idx_sessions_student_status ON learning_sessions(student_id, status);

-- Add comment
COMMENT ON TABLE learning_sessions IS 'Tracks individual learning sessions for students';

-- =============================================================================
-- QUESTION INTERACTIONS TABLE
-- =============================================================================
CREATE TABLE question_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES learning_sessions(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES curriculum_topics(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type VARCHAR(50) CHECK (question_type IN ('multiple_choice', 'short_answer', 'problem_solving')),
  difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
  correct_answer TEXT,
  student_answer TEXT,
  is_correct BOOLEAN,
  llm_evaluation TEXT, -- LLM's evaluation of the answer
  llm_feedback TEXT, -- Personalized feedback from LLM
  hints_used INTEGER DEFAULT 0 CHECK (hints_used >= 0),
  time_spent_seconds INTEGER CHECK (time_spent_seconds >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_questions_session ON question_interactions(session_id);
CREATE INDEX idx_questions_student ON question_interactions(student_id);
CREATE INDEX idx_questions_topic ON question_interactions(topic_id);
CREATE INDEX idx_questions_is_correct ON question_interactions(is_correct);
CREATE INDEX idx_questions_created_at ON question_interactions(created_at DESC);

-- Add comment
COMMENT ON TABLE question_interactions IS 'Records every question asked and student response';

-- =============================================================================
-- CONVERSATION HISTORY TABLE
-- =============================================================================
CREATE TABLE conversation_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES learning_sessions(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB, -- Store additional context, tokens used, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_conversation_session ON conversation_history(session_id);
CREATE INDEX idx_conversation_student ON conversation_history(student_id);
CREATE INDEX idx_conversation_created_at ON conversation_history(created_at DESC);

-- Add comment
COMMENT ON TABLE conversation_history IS 'Stores conversational interactions between student and AI tutor';

-- =============================================================================
-- UPDATE TRIGGER FUNCTIONS
-- =============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to tables with updated_at
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_curriculum_topics_updated_at BEFORE UPDATE ON curriculum_topics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_progress_updated_at BEFORE UPDATE ON student_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_sessions_updated_at BEFORE UPDATE ON learning_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_history ENABLE ROW LEVEL SECURITY;

-- Students can only read/update their own data
CREATE POLICY "Students can view own profile"
  ON students FOR SELECT
  USING (auth.uid() = auth_user_id);

CREATE POLICY "Students can update own profile"
  ON students FOR UPDATE
  USING (auth.uid() = auth_user_id);

-- Students can read curriculum topics (public)
CREATE POLICY "Anyone can view curriculum topics"
  ON curriculum_topics FOR SELECT
  TO authenticated
  USING (true);

-- Students can view and insert their own progress
CREATE POLICY "Students can view own progress"
  ON student_progress FOR SELECT
  USING (student_id IN (SELECT id FROM students WHERE auth_user_id = auth.uid()));

CREATE POLICY "Students can insert own progress"
  ON student_progress FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM students WHERE auth_user_id = auth.uid()));

CREATE POLICY "Students can update own progress"
  ON student_progress FOR UPDATE
  USING (student_id IN (SELECT id FROM students WHERE auth_user_id = auth.uid()));

-- Students can manage their own sessions
CREATE POLICY "Students can view own sessions"
  ON learning_sessions FOR SELECT
  USING (student_id IN (SELECT id FROM students WHERE auth_user_id = auth.uid()));

CREATE POLICY "Students can insert own sessions"
  ON learning_sessions FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM students WHERE auth_user_id = auth.uid()));

CREATE POLICY "Students can update own sessions"
  ON learning_sessions FOR UPDATE
  USING (student_id IN (SELECT id FROM students WHERE auth_user_id = auth.uid()));

-- Students can manage their own question interactions
CREATE POLICY "Students can view own questions"
  ON question_interactions FOR SELECT
  USING (student_id IN (SELECT id FROM students WHERE auth_user_id = auth.uid()));

CREATE POLICY "Students can insert own questions"
  ON question_interactions FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM students WHERE auth_user_id = auth.uid()));

-- Students can manage their own conversation history
CREATE POLICY "Students can view own conversations"
  ON conversation_history FOR SELECT
  USING (student_id IN (SELECT id FROM students WHERE auth_user_id = auth.uid()));

CREATE POLICY "Students can insert own conversations"
  ON conversation_history FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM students WHERE auth_user_id = auth.uid()));

-- =============================================================================
-- HELPER FUNCTIONS
-- =============================================================================

-- Function to get student's current learning session
CREATE OR REPLACE FUNCTION get_current_session(p_student_id UUID)
RETURNS UUID AS $$
  SELECT id FROM learning_sessions
  WHERE student_id = p_student_id
    AND status = 'in_progress'
  ORDER BY started_at DESC
  LIMIT 1;
$$ LANGUAGE SQL STABLE;

-- Function to calculate accuracy rate
CREATE OR REPLACE FUNCTION calculate_accuracy(p_student_id UUID, p_topic_id UUID)
RETURNS DECIMAL AS $$
  SELECT CASE
    WHEN COUNT(*) = 0 THEN 0
    ELSE ROUND((COUNT(*) FILTER (WHERE is_correct = true)::DECIMAL / COUNT(*)::DECIMAL) * 100, 2)
  END
  FROM question_interactions
  WHERE student_id = p_student_id
    AND topic_id = p_topic_id;
$$ LANGUAGE SQL STABLE;

-- =============================================================================
-- COMPLETION
-- =============================================================================

-- Add a record to track migration completion
CREATE TABLE IF NOT EXISTS schema_migrations (
  version VARCHAR(50) PRIMARY KEY,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO schema_migrations (version) VALUES ('001_initial_schema');

-- Success message
DO $$ BEGIN
  RAISE NOTICE 'Schema migration 001_initial_schema completed successfully';
END $$;
