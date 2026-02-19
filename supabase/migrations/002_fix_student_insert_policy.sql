-- Fix Student Profile Creation
-- Add INSERT policy so users can create their student profile during signup

-- Drop existing policies and recreate with INSERT
DROP POLICY IF EXISTS "Students can view own profile" ON students;
DROP POLICY IF EXISTS "Students can update own profile" ON students;

-- Recreate policies with INSERT included
CREATE POLICY "Students can view own profile"
  ON students FOR SELECT
  USING (auth.uid() = auth_user_id);

CREATE POLICY "Students can insert own profile"
  ON students FOR INSERT
  WITH CHECK (auth.uid() = auth_user_id);

CREATE POLICY "Students can update own profile"
  ON students FOR UPDATE
  USING (auth.uid() = auth_user_id);
