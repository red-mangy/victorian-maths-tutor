-- Update curriculum_topics level constraint to allow Year 10A (level 11)
-- Run this BEFORE applying the seed file with Year 10A topics

-- Drop the old constraint
ALTER TABLE curriculum_topics DROP CONSTRAINT IF EXISTS curriculum_topics_level_check;

-- Add new constraint allowing levels 4-11 (4-10 for standard years, 11 for Year 10A)
ALTER TABLE curriculum_topics ADD CONSTRAINT curriculum_topics_level_check CHECK (level >= 4 AND level <= 12);
