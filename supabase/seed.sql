-- Victorian Mathematics Learning Platform - Curriculum Seed Data
-- This file populates the curriculum_topics table with 15 core topics for Years 4-6
-- Data is aligned with Victorian Curriculum Version 2.0

-- =============================================================================
-- YEAR 4 TOPICS (6 topics)
-- =============================================================================

-- Topic 1: Place value to 10,000
INSERT INTO curriculum_topics (
  code, strand, sub_strand, level, title, description, elaborations, prerequisites, difficulty_order, estimated_hours
) VALUES (
  'VC2M4N01',
  'Number',
  'Place value',
  4,
  'Place value to 10,000',
  'Recognise, represent and order numbers to at least tens of thousands, and use their understanding of place value to read, write and partition numbers in various ways.',
  ARRAY[
    'Using place value to partition and represent numbers up to 10,000',
    'Comparing and ordering numbers using place value understanding',
    'Recognizing numbers in expanded form (e.g., 5000 + 400 + 30 + 2)',
    'Using number lines to represent and compare numbers'
  ],
  ARRAY[]::UUID[], -- No prerequisites for MVP
  1,
  4
);

-- Topic 2: Addition and subtraction (4 digits)
INSERT INTO curriculum_topics (
  code, strand, sub_strand, level, title, description, elaborations, prerequisites, difficulty_order, estimated_hours
) VALUES (
  'VC2M4N02',
  'Number',
  'Addition and subtraction',
  4,
  'Addition and subtraction with 4 digits',
  'Develop efficient mental and written strategies for addition and subtraction involving numbers with up to 4 digits.',
  ARRAY[
    'Using mental strategies for addition and subtraction',
    'Applying written algorithms for multi-digit calculations',
    'Solving word problems involving addition and subtraction',
    'Estimating and checking the reasonableness of answers'
  ],
  ARRAY[]::UUID[],
  2,
  6
);

-- Topic 3: Multiplication (single digit)
INSERT INTO curriculum_topics (
  code, strand, sub_strand, level, title, description, elaborations, prerequisites, difficulty_order, estimated_hours
) VALUES (
  'VC2M4N03',
  'Number',
  'Multiplication',
  4,
  'Multiplication with single-digit numbers',
  'Develop efficient mental and written strategies for multiplication involving one-digit numbers.',
  ARRAY[
    'Recalling and using multiplication facts up to 10 × 10',
    'Using multiplication strategies like doubling and skip counting',
    'Understanding the relationship between multiplication and division',
    'Solving simple word problems involving multiplication'
  ],
  ARRAY[]::UUID[],
  3,
  6
);

-- Topic 4: Division (sharing and grouping)
INSERT INTO curriculum_topics (
  code, strand, sub_strand, level, title, description, elaborations, prerequisites, difficulty_order, estimated_hours
) VALUES (
  'VC2M4N04',
  'Number',
  'Division',
  4,
  'Division as sharing and grouping',
  'Develop efficient mental and written strategies for division, understanding division as both sharing and grouping.',
  ARRAY[
    'Understanding division as sharing equally',
    'Understanding division as grouping',
    'Relating division to multiplication',
    'Solving simple word problems involving division'
  ],
  ARRAY[]::UUID[],
  4,
  5
);

-- Topic 5: Fractions (unit fractions)
INSERT INTO curriculum_topics (
  code, strand, sub_strand, level, title, description, elaborations, prerequisites, difficulty_order, estimated_hours
) VALUES (
  'VC2M4N05',
  'Number',
  'Fractions',
  4,
  'Unit fractions and simple fractions',
  'Recognise, represent and order unit fractions including 1/2, 1/4, 1/5 and 1/10 and their multiples.',
  ARRAY[
    'Using visual models to represent unit fractions',
    'Comparing and ordering fractions with the same denominator',
    'Finding simple fractions of quantities',
    'Understanding fractions as parts of a whole'
  ],
  ARRAY[]::UUID[],
  5,
  5
);

-- Topic 6: Decimals (tenths)
INSERT INTO curriculum_topics (
  code, strand, sub_strand, level, title, description, elaborations, prerequisites, difficulty_order, estimated_hours
) VALUES (
  'VC2M4N06',
  'Number',
  'Decimals',
  4,
  'Decimals to tenths',
  'Recognise and represent decimals including tenths and understand the connection to fractions.',
  ARRAY[
    'Representing decimals using place value',
    'Understanding the connection between tenths and decimal notation',
    'Comparing and ordering decimals',
    'Using decimals in real-world contexts like money'
  ],
  ARRAY[]::UUID[],
  6,
  4
);

-- =============================================================================
-- YEAR 5 TOPICS (5 topics)
-- =============================================================================

-- Topic 7: Place value to 100,000
INSERT INTO curriculum_topics (
  code, strand, sub_strand, level, title, description, elaborations, prerequisites, difficulty_order, estimated_hours
) VALUES (
  'VC2M5N01',
  'Number',
  'Place value',
  5,
  'Place value to 100,000',
  'Recognise, represent and order numbers to at least hundreds of thousands, using their understanding of place value.',
  ARRAY[
    'Using place value to represent numbers up to 100,000',
    'Comparing and ordering larger numbers',
    'Understanding the value of each digit in a number',
    'Rounding numbers to the nearest 10, 100, or 1,000'
  ],
  ARRAY[]::UUID[],
  1,
  4
);

-- Topic 8: Multiplication (2-digit numbers)
INSERT INTO curriculum_topics (
  code, strand, sub_strand, level, title, description, elaborations, prerequisites, difficulty_order, estimated_hours
) VALUES (
  'VC2M5N02',
  'Number',
  'Multiplication',
  5,
  'Multiplication with 2-digit numbers',
  'Develop efficient strategies for multiplication involving multi-digit numbers.',
  ARRAY[
    'Using the area model for multiplication',
    'Applying the standard algorithm for multiplication',
    'Solving word problems involving multiplication',
    'Estimating products and checking reasonableness'
  ],
  ARRAY[]::UUID[],
  2,
  6
);

-- Topic 9: Division with remainders
INSERT INTO curriculum_topics (
  code, strand, sub_strand, level, title, description, elaborations, prerequisites, difficulty_order, estimated_hours
) VALUES (
  'VC2M5N03',
  'Number',
  'Division',
  5,
  'Division with remainders',
  'Develop efficient strategies for division, including interpreting remainders in context.',
  ARRAY[
    'Understanding and interpreting remainders',
    'Using long division for larger numbers',
    'Solving division word problems with context',
    'Checking division answers using multiplication'
  ],
  ARRAY[]::UUID[],
  3,
  6
);

-- Topic 10: Equivalent fractions
INSERT INTO curriculum_topics (
  code, strand, sub_strand, level, title, description, elaborations, prerequisites, difficulty_order, estimated_hours
) VALUES (
  'VC2M5N04',
  'Number',
  'Fractions',
  5,
  'Equivalent fractions',
  'Compare and order fractions with the same and different denominators, and locate fractions on a number line.',
  ARRAY[
    'Recognising and creating equivalent fractions',
    'Using visual models to compare fractions',
    'Locating fractions on a number line',
    'Simplifying fractions to simplest form'
  ],
  ARRAY[]::UUID[],
  4,
  5
);

-- Topic 11: Decimals to hundredths
INSERT INTO curriculum_topics (
  code, strand, sub_strand, level, title, description, elaborations, prerequisites, difficulty_order, estimated_hours
) VALUES (
  'VC2M5N05',
  'Number',
  'Decimals',
  5,
  'Decimals to hundredths',
  'Recognise and represent decimals including hundredths, and understand the connections to fractions and place value.',
  ARRAY[
    'Representing decimals to hundredths using place value',
    'Connecting fractions and decimals',
    'Comparing and ordering decimals',
    'Adding and subtracting simple decimals'
  ],
  ARRAY[]::UUID[],
  5,
  5
);

-- =============================================================================
-- YEAR 6 TOPICS (4 topics)
-- =============================================================================

-- Topic 12: Place value to millions
INSERT INTO curriculum_topics (
  code, strand, sub_strand, level, title, description, elaborations, prerequisites, difficulty_order, estimated_hours
) VALUES (
  'VC2M6N01',
  'Number',
  'Place value',
  6,
  'Place value to millions',
  'Recognise, represent and order numbers to at least millions, using their understanding of place value.',
  ARRAY[
    'Using place value to represent very large numbers',
    'Rounding numbers to various place values',
    'Comparing and ordering millions',
    'Using scientific notation as an introduction'
  ],
  ARRAY[]::UUID[],
  1,
  4
);

-- Topic 13: Fraction operations
INSERT INTO curriculum_topics (
  code, strand, sub_strand, level, title, description, elaborations, prerequisites, difficulty_order, estimated_hours
) VALUES (
  'VC2M6N02',
  'Number',
  'Fractions',
  6,
  'Adding and subtracting fractions',
  'Add and subtract fractions with related denominators, using strategies based on fractions as equal parts of a whole.',
  ARRAY[
    'Finding common denominators for addition',
    'Adding and subtracting fractions with different denominators',
    'Solving word problems involving fraction operations',
    'Using visual models to understand fraction operations'
  ],
  ARRAY[]::UUID[],
  2,
  6
);

-- Topic 14: Decimal operations
INSERT INTO curriculum_topics (
  code, strand, sub_strand, level, title, description, elaborations, prerequisites, difficulty_order, estimated_hours
) VALUES (
  'VC2M6N03',
  'Number',
  'Decimals',
  6,
  'Decimal operations',
  'Add, subtract and multiply decimals, and divide decimals where the result is rational.',
  ARRAY[
    'Adding and subtracting decimals with alignment',
    'Multiplying decimals by whole numbers',
    'Dividing decimals in context',
    'Solving real-world problems with decimal operations'
  ],
  ARRAY[]::UUID[],
  3,
  6
);

-- Topic 15: Introduction to percentages
INSERT INTO curriculum_topics (
  code, strand, sub_strand, level, title, description, elaborations, prerequisites, difficulty_order, estimated_hours
) VALUES (
  'VC2M6N04',
  'Number',
  'Percentages',
  6,
  'Introduction to percentages',
  'Recognise that percentages are a representation of fractions and decimals, and can be expressed as a part of 100.',
  ARRAY[
    'Understanding percentage as parts per hundred',
    'Converting between percentages, fractions, and decimals',
    'Finding simple percentages of quantities',
    'Using percentages in real-life contexts like discounts'
  ],
  ARRAY[]::UUID[],
  4,
  5
);

-- =============================================================================
-- VERIFY SEED DATA
-- =============================================================================

-- Count topics by year level
DO $$
DECLARE
  year4_count INTEGER;
  year5_count INTEGER;
  year6_count INTEGER;
  total_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO year4_count FROM curriculum_topics WHERE level = 4;
  SELECT COUNT(*) INTO year5_count FROM curriculum_topics WHERE level = 5;
  SELECT COUNT(*) INTO year6_count FROM curriculum_topics WHERE level = 6;
  SELECT COUNT(*) INTO total_count FROM curriculum_topics;

  RAISE NOTICE 'Curriculum seed data loaded successfully:';
  RAISE NOTICE '  Year 4: % topics', year4_count;
  RAISE NOTICE '  Year 5: % topics', year5_count;
  RAISE NOTICE '  Year 6: % topics', year6_count;
  RAISE NOTICE '  Total: % topics', total_count;
END $$;
