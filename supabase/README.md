# Database Setup Instructions

## Seeding the Curriculum Data

This directory contains the complete Victorian Curriculum F-10 Mathematics topics for Years 4-10, plus Year 10A (Accelerated).

### Topics Included

The seed file `seed-curriculum-full.sql` includes **90+ topics** covering:

- **Year 4**: 11 topics (Level 4)
- **Year 5**: 11 topics (Level 5)
- **Year 6**: 11 topics (Level 6)
- **Year 7**: 11 topics (Level 7)
- **Year 8**: 11 topics (Level 8)
- **Year 9**: 10 topics (Level 9)
- **Year 10**: 10 topics (Level 10)
- **Year 10A**: 19 topics (Level 11) - Accelerated mathematics pathway (Victorian Curriculum 2.0)

All six curriculum strands are covered:
1. Number
2. Algebra
3. Measurement
4. Space
5. Statistics
6. Probability

### Year 10A (Accelerated Mathematics)

Year 10A is designed for high-achieving students preparing for VCE Specialist Mathematics and Methods. It includes advanced topics such as:
- Surds and fractional indices
- Logarithms and logarithmic scales
- Polynomials and the factor/remainder theorems
- Advanced functions (exponential, circular/trigonometric)
- Circle geometry proofs
- 3D trigonometry
- Bivariate data analysis and linear modelling
- Standard deviation and statistical inference

### How to Apply the Seed Data

**IMPORTANT**: Before loading the curriculum data, you must update the database constraint to allow Year 10A (level 11).

#### Step 1: Update Database Constraint (Required for Year 10A)

Run this first to allow level 11:

**Option A: Using Supabase Dashboard**
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `update-level-constraint.sql`
4. Paste into the editor
5. Click **Run**

**Option B: Using psql**
```bash
psql -h <your-db-host> -U postgres -d postgres -f supabase/update-level-constraint.sql
```

#### Step 2: Load Curriculum Data

**Option 1: Using Supabase Dashboard**

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `seed-curriculum-full.sql`
4. Paste into the editor
5. Click **Run**

**Option 2: Using psql Command Line**

```bash
# First update the constraint
psql -h <your-db-host> -U postgres -d postgres -f supabase/update-level-constraint.sql

# Then load the curriculum data
psql -h <your-db-host> -U postgres -d postgres -f supabase/seed-curriculum-full.sql
```

**Option 3: Using Supabase CLI**

```bash
# If you have Supabase CLI installed
# First run the constraint update manually via dashboard or psql
# Then reset the database
supabase db reset  # This will run migrations and seeds
```

### Verification

After running the seed file, verify the data was loaded:

```sql
-- Check total topics count
SELECT level, COUNT(*) as topic_count
FROM curriculum_topics
GROUP BY level
ORDER BY level;

-- Check topics by strand
SELECT strand, COUNT(*) as topic_count
FROM curriculum_topics
GROUP BY strand
ORDER BY strand;

-- View sample topics for Year 4
SELECT code, title
FROM curriculum_topics
WHERE level = 4
ORDER BY difficulty_order;
```

Expected results:
- Total topics: ~94 (75 for Years 4-10, plus 19 for Year 10A)
- 6 strands represented
- Topics for levels 4-11 (where level 11 = Year 10A)

### Topic Structure

Each topic includes:
- **code**: Victorian Curriculum code (e.g., VC2M4N01 for Version 2.0, or VCMNA355 for Version 1.0)
- **strand**: Main curriculum strand
- **sub_strand**: More specific categorization
- **level**: Year level (4-10 for standard years, 11 for Year 10A)
- **title**: Brief description
- **description**: Full learning outcome
- **elaborations**: Array of key learning points
- **difficulty_order**: Suggested teaching sequence

### Customization

To add your own topics:

```sql
INSERT INTO curriculum_topics (
  code,
  strand,
  sub_strand,
  level,
  title,
  description,
  elaborations,
  difficulty_order
) VALUES (
  'CUSTOM01',
  'Number',
  'Custom topic',
  5,
  'Your custom topic title',
  'Detailed description',
  ARRAY['Point 1', 'Point 2'],
  99
);
```

### Updating Topics

To update an existing topic:

```sql
UPDATE curriculum_topics
SET
  description = 'New description',
  elaborations = ARRAY['Updated point 1', 'Updated point 2']
WHERE code = 'VC2M4N01';
```

### Notes

- The seed file uses `TRUNCATE TABLE curriculum_topics CASCADE` which will clear existing topics
- Topics are organized by difficulty_order within each level
- All topics (Years 4-10 and Year 10A) use Victorian Curriculum F-10 Version 2.0 codes (VC2M...)
- Year 10A codes follow the pattern: VC2M10AN... (Number), VC2M10AA... (Algebra), VC2M10AM... (Measurement), VC2M10ASP... (Space), VC2M10AST... (Statistics)
- Year 10A is represented as level 11 in the database to distinguish it from standard Year 10
- Elaborations provide teaching guidance and key learning points
