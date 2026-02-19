-- Victorian Curriculum F-10: Mathematics Topics for Years 4-10
-- Complete curriculum seed data covering all strands

-- Clear existing topics
TRUNCATE TABLE curriculum_topics CASCADE;

-- ============================================================================
-- YEAR 4 (Level 4)
-- ============================================================================

-- NUMBER (Year 4)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M4N01', 'Number', 'Number and place value', 4, 'Recognise, represent and order numbers to at least tens of thousands', 'Investigate and use the properties of odd and even numbers', ARRAY[
  'Understanding place value in numbers beyond 10,000',
  'Comparing and ordering large numbers',
  'Recognising patterns in odd and even numbers'
], 1),

('VC2M4N02', 'Number', 'Fractions and decimals', 4, 'Recognise and extend the application of fractions', 'Investigate strategies to solve problems involving addition and subtraction of fractions with the same denominator', ARRAY[
  'Understanding fractions as equal parts of a whole',
  'Adding and subtracting fractions with common denominators',
  'Solving practical problems involving fractions'
], 2),

('VC2M4N03', 'Number', 'Fractions and decimals', 4, 'Count and represent fractions including decimals', 'Make connections between fractions and decimal notation up to two decimal places', ARRAY[
  'Understanding decimal notation for tenths and hundredths',
  'Converting between fractions and decimals',
  'Representing decimals on a number line'
], 3),

('VC2M4N04', 'Number', 'Money and financial mathematics', 4, 'Solve problems involving purchases', 'Calculate change from financial transactions and create simple budgets', ARRAY[
  'Calculating change from purchases',
  'Understanding the value of different denominations',
  'Creating and managing simple budgets'
], 4);

-- ALGEBRA (Year 4)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M4A01', 'Algebra', 'Number patterns', 4, 'Recognise and use factors and multiples', 'Use computational thinking to generate and record number patterns', ARRAY[
  'Identifying factors and multiples of numbers',
  'Finding factor pairs',
  'Exploring multiplication patterns'
], 5);

-- MEASUREMENT (Year 4)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M4M01', 'Measurement', 'Using units of measurement', 4, 'Compare objects using familiar metric units', 'Solve measurement problems involving length, mass and capacity', ARRAY[
  'Using metres, centimetres, millimetres',
  'Measuring and comparing lengths',
  'Converting between metric units'
], 6),

('VC2M4M02', 'Measurement', 'Using units of measurement', 4, 'Measure and compare time durations', 'Convert between units of time and solve problems involving time', ARRAY[
  'Reading and interpreting calendars',
  'Calculating time intervals',
  'Converting between hours, minutes, and seconds'
], 7);

-- SPACE (Year 4)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M4SP01', 'Space', 'Shape', 4, 'Compare and describe shapes', 'Classify shapes and compare their attributes and transformations', ARRAY[
  'Identifying 2D and 3D shapes',
  'Describing properties of shapes',
  'Understanding symmetry'
], 8),

('VC2M4SP02', 'Space', 'Location and transformation', 4, 'Create and interpret maps', 'Use simple scales and compass directions to describe locations', ARRAY[
  'Using cardinal directions',
  'Reading simple maps',
  'Understanding scale'
], 9);

-- STATISTICS (Year 4)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M4ST01', 'Statistics', 'Data representation', 4, 'Collect and represent data', 'Acquire, validate and represent data in tables and graphs', ARRAY[
  'Creating column graphs and picture graphs',
  'Collecting data through surveys',
  'Interpreting data displays'
], 10);

-- PROBABILITY (Year 4)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M4P01', 'Probability', 'Chance', 4, 'Describe the likelihood of events', 'Conduct experiments and describe chance using everyday language', ARRAY[
  'Understanding certain, likely, unlikely, impossible',
  'Conducting simple chance experiments',
  'Recording outcomes of chance events'
], 11);

-- ============================================================================
-- YEAR 5 (Level 5)
-- ============================================================================

-- NUMBER (Year 5)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M5N01', 'Number', 'Number and place value', 5, 'Represent and order numbers beyond 100,000', 'Investigate place value in numbers beyond hundred thousands', ARRAY[
  'Understanding place value to millions',
  'Comparing and ordering large numbers',
  'Rounding to the nearest ten, hundred, thousand'
], 1),

('VC2M5N02', 'Number', 'Number and place value', 5, 'Apply strategies for addition and subtraction', 'Solve problems involving addition and subtraction of large numbers', ARRAY[
  'Using mental strategies for calculations',
  'Applying written methods for multi-digit numbers',
  'Solving word problems with addition and subtraction'
], 2),

('VC2M5N03', 'Number', 'Fractions and decimals', 5, 'Compare and order fractions', 'Investigate strategies to solve problems with fractions and decimal representations', ARRAY[
  'Finding equivalent fractions',
  'Comparing fractions with different denominators',
  'Converting between fractions and decimals'
], 3),

('VC2M5N04', 'Number', 'Money and financial mathematics', 5, 'Create budgets and financial plans', 'Calculate costs, profit and loss in financial contexts', ARRAY[
  'Creating and following budgets',
  'Understanding profit and loss',
  'Making informed financial decisions'
], 4);

-- ALGEBRA (Year 5)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M5A01', 'Algebra', 'Number patterns', 5, 'Explore and identify number patterns', 'Generate and describe numerical and geometric patterns', ARRAY[
  'Continuing number sequences',
  'Identifying rules for patterns',
  'Creating own patterns'
], 5);

-- MEASUREMENT (Year 5)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M5M01', 'Measurement', 'Using units of measurement', 5, 'Estimate and measure using metric units', 'Calculate perimeter and area of rectangles using familiar metric units', ARRAY[
  'Measuring length, mass, and capacity',
  'Calculating perimeter of shapes',
  'Finding area using grid squares'
], 6),

('VC2M5M02', 'Measurement', 'Using units of measurement', 5, 'Compare time across locations', 'Compare 12-hour and 24-hour systems and calculate time differences', ARRAY[
  'Converting between 12-hour and 24-hour time',
  'Understanding time zones',
  'Calculating duration between times'
], 7);

-- SPACE (Year 5)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M5SP01', 'Space', 'Shape', 5, 'Construct and describe transformations', 'Create and describe symmetry, rotation and reflection', ARRAY[
  'Creating symmetrical patterns',
  'Understanding rotations',
  'Identifying lines of symmetry'
], 8),

('VC2M5SP02', 'Space', 'Location and transformation', 5, 'Use coordinates to represent locations', 'Describe routes using landmarks and directional language', ARRAY[
  'Using coordinates on a grid',
  'Following and creating directions',
  'Using compass directions'
], 9);

-- STATISTICS (Year 5)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M5ST01', 'Statistics', 'Data representation', 5, 'Plan and conduct statistical investigations', 'Acquire data, create displays and describe and interpret results', ARRAY[
  'Posing questions for investigation',
  'Creating column graphs and dot plots',
  'Interpreting data to answer questions'
], 10);

-- PROBABILITY (Year 5)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M5P01', 'Probability', 'Chance', 5, 'Describe and order chance outcomes', 'List possible outcomes of chance experiments and order likelihood', ARRAY[
  'Using fractions to describe probability',
  'Ordering events from least to most likely',
  'Conducting probability experiments'
], 11);

-- ============================================================================
-- YEAR 6 (Level 6)
-- ============================================================================

-- NUMBER (Year 6)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M6N01', 'Number', 'Number and place value', 6, 'Represent and compare integers', 'Investigate everyday situations with integers including positive and negative numbers', ARRAY[
  'Understanding integers on a number line',
  'Comparing positive and negative numbers',
  'Using integers in real-world contexts'
], 1),

('VC2M6N02', 'Number', 'Fractions and decimals', 6, 'Add and subtract fractions', 'Investigate operations with fractions including addition and subtraction', ARRAY[
  'Adding fractions with related denominators',
  'Subtracting fractions',
  'Solving fraction word problems'
], 2),

('VC2M6N03', 'Number', 'Fractions and decimals', 6, 'Multiply and divide decimals', 'Investigate multiplication and division of decimals', ARRAY[
  'Multiplying decimals by whole numbers',
  'Dividing decimals',
  'Understanding decimal place value in operations'
], 3),

('VC2M6N04', 'Number', 'Ratios and rates', 6, 'Investigate equivalent ratios', 'Represent and solve problems involving ratios', ARRAY[
  'Understanding ratios as comparisons',
  'Finding equivalent ratios',
  'Solving ratio problems'
], 4);

-- ALGEBRA (Year 6)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M6A01', 'Algebra', 'Patterns and relationships', 6, 'Explore number and geometric patterns', 'Continue and create sequences involving whole numbers and decimals', ARRAY[
  'Identifying patterns in tables',
  'Describing rules for patterns',
  'Creating growing patterns'
], 5);

-- MEASUREMENT (Year 6)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M6M01', 'Measurement', 'Using units of measurement', 6, 'Convert between metric units', 'Solve problems involving length, area, volume and capacity', ARRAY[
  'Converting between mm, cm, m, km',
  'Calculating area of rectangles',
  'Finding volume of rectangular prisms'
], 6),

('VC2M6M02', 'Measurement', 'Using units of measurement', 6, 'Connect decimal representations to metric system', 'Interpret and use timetables', ARRAY[
  'Using decimal representations of measurements',
  'Reading and interpreting timetables',
  'Calculating time durations'
], 7);

-- SPACE (Year 6)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M6SP01', 'Space', 'Shape', 6, 'Classify and construct 2D shapes and 3D objects', 'Investigate combinations of translations, reflections and rotations', ARRAY[
  'Classifying triangles and quadrilaterals',
  'Understanding transformation combinations',
  'Building 3D objects from nets'
], 8),

('VC2M6SP02', 'Space', 'Location and transformation', 6, 'Investigate coordinates', 'Use coordinates to specify locations and describe paths', ARRAY[
  'Plotting points on a coordinate plane',
  'Describing translations using coordinates',
  'Understanding the four quadrants'
], 9);

-- STATISTICS (Year 6)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M6ST01', 'Statistics', 'Data representation', 6, 'Interpret data displays', 'Compare data displays and interpret results', ARRAY[
  'Interpreting column graphs, line graphs, and pie charts',
  'Comparing different data representations',
  'Drawing conclusions from data'
], 10);

-- PROBABILITY (Year 6)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M6P01', 'Probability', 'Chance', 6, 'Compare observed and expected frequencies', 'Conduct repeated trials of chance experiments', ARRAY[
  'Recording outcomes of repeated trials',
  'Comparing experimental and theoretical probability',
  'Understanding that chance is unpredictable'
], 11);

-- ============================================================================
-- YEAR 7 (Level 7)
-- ============================================================================

-- NUMBER (Year 7)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M7N01', 'Number', 'Number and place value', 7, 'Compare, order and represent integers', 'Investigate indices and square roots of perfect square numbers', ARRAY[
  'Working with integers including addition and subtraction',
  'Understanding index notation',
  'Finding square roots'
], 1),

('VC2M7N02', 'Number', 'Real numbers', 7, 'Compare fractions and decimals', 'Represent and solve problems with rational numbers', ARRAY[
  'Converting between fractions, decimals, and percentages',
  'Comparing and ordering rational numbers',
  'Operations with rational numbers'
], 2),

('VC2M7N03', 'Number', 'Money and financial mathematics', 7, 'Connect fractions, decimals and percentages', 'Solve problems involving financial contexts', ARRAY[
  'Calculating percentages',
  'Finding discounts and markups',
  'Understanding simple interest'
], 3);

-- ALGEBRA (Year 7)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M7A01', 'Algebra', 'Patterns and relationships', 7, 'Formulate algebraic expressions', 'Use variables to represent mathematical relationships', ARRAY[
  'Writing algebraic expressions',
  'Substituting values into expressions',
  'Understanding variables'
], 4),

('VC2M7A02', 'Algebra', 'Equations', 7, 'Create and solve linear equations', 'Solve simple linear equations with one variable', ARRAY[
  'Solving one-step equations',
  'Using inverse operations',
  'Checking solutions'
], 5);

-- MEASUREMENT (Year 7)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M7M01', 'Measurement', 'Using units of measurement', 7, 'Calculate area and perimeter', 'Solve problems involving area and perimeter of shapes', ARRAY[
  'Finding area of triangles and parallelograms',
  'Calculating composite areas',
  'Understanding the relationship between area and perimeter'
], 6),

('VC2M7M02', 'Measurement', 'Geometric measurement', 7, 'Calculate volume and surface area', 'Find volumes of prisms and surface areas', ARRAY[
  'Calculating volume of rectangular and triangular prisms',
  'Finding surface area',
  'Solving practical volume problems'
], 7);

-- SPACE (Year 7)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M7SP01', 'Space', 'Geometric reasoning', 7, 'Classify angles and demonstrate geometric properties', 'Identify corresponding, alternate and co-interior angles', ARRAY[
  'Identifying angle types',
  'Understanding angle relationships',
  'Solving problems with parallel lines'
], 8),

('VC2M7SP02', 'Space', 'Location and transformation', 7, 'Describe transformations on a Cartesian plane', 'Investigate transformations using coordinates', ARRAY[
  'Transforming shapes on a coordinate plane',
  'Describing translations, reflections, rotations',
  'Using coordinates to specify transformations'
], 9);

-- STATISTICS (Year 7)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M7ST01', 'Statistics', 'Data analysis', 7, 'Analyse and compare data displays', 'Calculate mean, median, mode and range', ARRAY[
  'Calculating measures of center',
  'Interpreting different data displays',
  'Comparing data sets using statistics'
], 10);

-- PROBABILITY (Year 7)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M7P01', 'Probability', 'Chance', 7, 'Assign probabilities to events', 'Conduct experiments and assign probabilities as fractions and decimals', ARRAY[
  'Calculating theoretical probability',
  'Representing probability on a scale',
  'Conducting probability experiments'
], 11);

-- ============================================================================
-- YEAR 8 (Level 8)
-- ============================================================================

-- NUMBER (Year 8)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M8N01', 'Number', 'Number and place value', 8, 'Investigate terminating and recurring decimals', 'Use index laws with integer indices', ARRAY[
  'Converting fractions to decimals',
  'Understanding recurring decimals',
  'Applying index laws'
], 1),

('VC2M8N02', 'Number', 'Real numbers', 8, 'Investigate irrational numbers', 'Represent irrational numbers on a number line', ARRAY[
  'Understanding surds',
  'Approximating irrational numbers',
  'Comparing rational and irrational numbers'
], 2),

('VC2M8N03', 'Number', 'Money and financial mathematics', 8, 'Solve percentage problems', 'Calculate percentage increase and decrease', ARRAY[
  'Finding percentages of quantities',
  'Calculating percentage change',
  'Solving discount and markup problems'
], 3);

-- ALGEBRA (Year 8)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M8A01', 'Algebra', 'Patterns and relationships', 8, 'Plot linear relationships', 'Solve problems using linear relationships', ARRAY[
  'Plotting linear graphs',
  'Finding gradient and intercepts',
  'Understanding linear patterns'
], 4),

('VC2M8A02', 'Algebra', 'Equations', 8, 'Solve linear equations', 'Solve problems using linear equations with one variable', ARRAY[
  'Solving multi-step equations',
  'Solving equations with variables on both sides',
  'Applying equations to word problems'
], 5);

-- MEASUREMENT (Year 8)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M8M01', 'Measurement', 'Using units of measurement', 8, 'Calculate areas of composite shapes', 'Find areas of circles and composite shapes', ARRAY[
  'Using the area formula for circles',
  'Breaking composite shapes into parts',
  'Solving practical area problems'
], 6),

('VC2M8M02', 'Measurement', 'Geometric measurement', 8, 'Solve volume problems', 'Calculate volumes of cylinders and composite solids', ARRAY[
  'Finding volume of cylinders',
  'Calculating volume of composite solids',
  'Applying volume in real contexts'
], 7);

-- SPACE (Year 8)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M8SP01', 'Space', 'Geometric reasoning', 8, 'Use geometric properties', 'Establish properties of quadrilaterals using congruence and angle properties', ARRAY[
  'Proving properties of shapes',
  'Using congruence to solve problems',
  'Understanding geometric proofs'
], 8),

('VC2M8SP02', 'Space', 'Pythagoras theorem', 8, 'Apply Pythagoras theorem', 'Solve problems using Pythagoras theorem', ARRAY[
  'Using Pythagoras theorem to find side lengths',
  'Applying Pythagoras in practical situations',
  'Understanding right-angled triangles'
], 9);

-- STATISTICS (Year 8)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M8ST01', 'Statistics', 'Data analysis', 8, 'Compare data using summary statistics', 'Investigate techniques for data collection', ARRAY[
  'Calculating and comparing statistics',
  'Understanding sampling methods',
  'Identifying bias in data collection'
], 10);

-- PROBABILITY (Year 8)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M8P01', 'Probability', 'Chance', 8, 'Identify complementary and mutually exclusive events', 'Calculate probabilities of compound events', ARRAY[
  'Understanding complementary events',
  'Using two-way tables for probability',
  'Calculating probabilities of combined events'
], 11);

-- ============================================================================
-- YEAR 9 (Level 9)
-- ============================================================================

-- NUMBER (Year 9)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M9N01', 'Number', 'Real numbers', 9, 'Apply index laws with fractional indices', 'Investigate operations with surds', ARRAY[
  'Simplifying expressions with indices',
  'Working with fractional indices',
  'Simplifying surds'
], 1),

('VC2M9N02', 'Number', 'Money and financial mathematics', 9, 'Solve financial problems', 'Calculate compound interest and depreciation', ARRAY[
  'Understanding compound interest',
  'Calculating depreciation',
  'Comparing financial options'
], 2);

-- ALGEBRA (Year 9)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M9A01', 'Algebra', 'Patterns and relationships', 9, 'Sketch linear and non-linear relations', 'Solve problems using tables and graphs', ARRAY[
  'Sketching parabolas',
  'Understanding non-linear relationships',
  'Interpreting graphs'
], 3),

('VC2M9A02', 'Algebra', 'Equations', 9, 'Solve simultaneous linear equations', 'Apply simultaneous equations to solve problems', ARRAY[
  'Solving systems of equations graphically',
  'Using substitution and elimination methods',
  'Applying to word problems'
], 4),

('VC2M9A03', 'Algebra', 'Quadratic equations', 9, 'Expand and factorise quadratic expressions', 'Solve quadratic equations', ARRAY[
  'Expanding binomial products',
  'Factorising quadratic expressions',
  'Solving by factorisation'
], 5);

-- MEASUREMENT (Year 9)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M9M01', 'Measurement', 'Using units of measurement', 9, 'Calculate surface area and volume', 'Find surface area and volume of prisms, cylinders, pyramids, cones and spheres', ARRAY[
  'Using formulas for curved surfaces',
  'Calculating volumes of complex shapes',
  'Solving practical problems'
], 6);

-- SPACE (Year 9)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M9SP01', 'Space', 'Trigonometry', 9, 'Apply trigonometric ratios', 'Use trigonometric ratios to solve problems', ARRAY[
  'Using sine, cosine, and tangent',
  'Solving for unknown sides',
  'Applying trigonometry to real contexts'
], 7),

('VC2M9SP02', 'Space', 'Geometric reasoning', 9, 'Use similarity to solve problems', 'Establish and apply tests for triangle similarity', ARRAY[
  'Understanding similar triangles',
  'Using similarity to find lengths',
  'Applying similarity theorems'
], 8);

-- STATISTICS (Year 9)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M9ST01', 'Statistics', 'Data analysis', 9, 'Analyse data using scatterplots', 'Investigate relationships between variables', ARRAY[
  'Creating and interpreting scatterplots',
  'Identifying correlations',
  'Fitting lines of best fit'
], 9);

-- PROBABILITY (Year 9)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M9P01', 'Probability', 'Chance', 9, 'Use Venn diagrams and two-way tables', 'Calculate probabilities using arrays and tree diagrams', ARRAY[
  'Using tree diagrams for compound events',
  'Understanding conditional probability',
  'Solving probability problems'
], 10);

-- ============================================================================
-- YEAR 10 (Level 10)
-- ============================================================================

-- NUMBER (Year 10)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M10N01', 'Number', 'Real numbers', 10, 'Define rational and irrational numbers', 'Use properties of surds and fractional indices', ARRAY[
  'Simplifying complex surds',
  'Operating with fractional indices',
  'Understanding real number system'
], 1),

('VC2M10N02', 'Number', 'Money and financial mathematics', 10, 'Model financial situations', 'Investigate loans, investments and annuities', ARRAY[
  'Understanding loan repayments',
  'Calculating investment returns',
  'Comparing financial products'
], 2);

-- ALGEBRA (Year 10)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M10A01', 'Algebra', 'Patterns and relationships', 10, 'Sketch and interpret graphs of functions', 'Examine quadratic, exponential and reciprocal functions', ARRAY[
  'Sketching parabolas with transformations',
  'Understanding exponential growth and decay',
  'Interpreting function graphs'
], 3),

('VC2M10A02', 'Algebra', 'Quadratic equations', 10, 'Solve quadratic equations', 'Use the quadratic formula and completing the square', ARRAY[
  'Applying the quadratic formula',
  'Completing the square',
  'Solving problems using quadratics'
], 4),

('VC2M10A03', 'Algebra', 'Polynomials', 10, 'Expand and factorise polynomials', 'Solve problems involving polynomials', ARRAY[
  'Factorising cubic expressions',
  'Expanding polynomial products',
  'Solving polynomial equations'
], 5);

-- MEASUREMENT (Year 10)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M10M01', 'Measurement', 'Using units of measurement', 10, 'Solve problems involving surface area and volume', 'Calculate surface area and volume of composite solids', ARRAY[
  'Working with complex 3D shapes',
  'Combining formulas for composite solids',
  'Applying to practical situations'
], 6);

-- SPACE (Year 10)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M10SP01', 'Space', 'Trigonometry', 10, 'Apply trigonometry to solve problems', 'Use sine and cosine rules and area formula', ARRAY[
  'Applying sine rule',
  'Using cosine rule',
  'Finding areas using trigonometry'
], 7),

('VC2M10SP02', 'Space', 'Geometric reasoning', 10, 'Formulate geometric proofs', 'Apply deductive reasoning to prove geometric properties', ARRAY[
  'Writing formal proofs',
  'Using congruence and similarity',
  'Proving circle theorems'
], 8);

-- STATISTICS (Year 10)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M10ST01', 'Statistics', 'Data analysis', 10, 'Evaluate statistical reports', 'Compare data distributions and identify misleading representations', ARRAY[
  'Analysing bivariate data',
  'Evaluating statistical claims',
  'Understanding standard deviation'
], 9);

-- PROBABILITY (Year 10)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M10P01', 'Probability', 'Chance', 10, 'Investigate independence of events', 'Calculate conditional probabilities', ARRAY[
  'Understanding independent and dependent events',
  'Calculating conditional probability',
  'Using probability trees'
], 10);

-- ============================================================================
-- YEAR 10A (Level 11) - ACCELERATED MATHEMATICS
-- Victorian Curriculum 2.0 codes (VC2M10A...)
-- ============================================================================

-- NUMBER (Year 10A)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M10AN01', 'Number', 'Real numbers', 11, 'Rational and irrational numbers, surds and fractional indices', 'Define rational and irrational numbers and perform operations with surds and fractional indices', ARRAY[
  'Understanding rational vs irrational numbers',
  'Simplifying expressions with surds',
  'Working with fractional indices',
  'Converting between index and surd forms'
], 1),

('VC2M10AN02', 'Number', 'Real numbers', 11, 'Operations involving fractional exponents and surds', 'Apply exponent laws with fractional exponents and simplify expressions with surds', ARRAY[
  'Using exponent laws with fractional powers',
  'Simplifying numerical expressions with surds',
  'Rationalizing denominators',
  'Solving problems with surds and fractional indices'
], 2),

('VC2M10AN03', 'Number', 'Logarithms', 11, 'Logarithms', 'Use the definition of a logarithm to establish and apply the laws of logarithms', ARRAY[
  'Understanding logarithm as inverse of exponential',
  'Applying logarithm laws',
  'Working with logarithmic scales',
  'Solving problems using logarithms'
], 3);

-- ALGEBRA (Year 10A)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M10AA01', 'Algebra', 'Polynomials', 11, 'Polynomials and the factor and remainder theorems', 'Investigate the concept of a polynomial and apply the factor and remainder theorems', ARRAY[
  'Understanding polynomial structure',
  'Applying factor theorem',
  'Using remainder theorem',
  'Solving polynomial equations'
], 4),

('VC2M10AA02', 'Algebra', 'Algorithms', 11, 'Algorithms and simulations to solve problems', 'Devise and use algorithms and simulations to solve mathematical problems', ARRAY[
  'Designing algorithms for problem solving',
  'Creating simulations',
  'Applying computational thinking',
  'Testing and refining algorithms'
], 5),

('VC2M10AA03', 'Algebra', 'Linear expressions', 11, 'Combinations of linear expressions with rational coefficients', 'Simplify combinations of linear expressions and solve related equations', ARRAY[
  'Simplifying algebraic expressions',
  'Solving linear equations with rational coefficients',
  'Working with fractions in algebra',
  'Applying to contextual problems'
], 6),

('VC2M10AA04', 'Algebra', 'Exponential functions', 11, 'Inverse relationship between exponential and logarithmic functions', 'Understand the connection between exponential functions and logarithms', ARRAY[
  'Understanding inverse relationship',
  'Solving exponential equations using logarithms',
  'Graphing exponential and logarithmic functions',
  'Applications of exponential growth and decay'
], 7),

('VC2M10AA05', 'Algebra', 'Functions and graphs', 11, 'Parabolas, hyperbolas, circles and exponential functions and transformations', 'Describe, interpret and sketch various functions and their transformations', ARRAY[
  'Sketching parabolas and their features',
  'Understanding hyperbolas',
  'Graphing circles from equations',
  'Exploring exponential functions',
  'Applying transformations to graphs'
], 8),

('VC2M10AA06', 'Algebra', 'Polynomials', 11, 'Graphs of polynomials', 'Apply understanding of polynomials to sketch curves and describe features', ARRAY[
  'Identifying polynomial features',
  'Finding intercepts and turning points',
  'Sketching polynomial curves',
  'Analyzing end behavior'
], 9),

('VC2M10AA07', 'Algebra', 'Quadratic equations', 11, 'Factorise quadratics and solve quadratic equations', 'Factorise monic and non-monic quadratic expressions and solve quadratic equations', ARRAY[
  'Factorising complex quadratics',
  'Using the quadratic formula',
  'Completing the square',
  'Solving contextual problems'
], 10),

('VC2M10AA08', 'Algebra', 'Functions', 11, 'Function notation', 'Use function notation to describe relationships between variables', ARRAY[
  'Understanding function notation f(x)',
  'Identifying domain and range',
  'Composing functions',
  'Modelling with functions'
], 11),

('VC2M10AA09', 'Algebra', 'Simultaneous equations', 11, 'Simultaneous equations by systematic guess-check-and-refine', 'Solve simultaneous equations using systematic methods including technology', ARRAY[
  'Solving linear simultaneous equations',
  'Solving non-linear simultaneous equations',
  'Using substitution and elimination',
  'Applying digital tools'
], 12),

('VC2M10AA10', 'Algebra', 'Functions and transformations', 11, 'Experimenting with functions and relations', 'Explore transformations of functions and relations', ARRAY[
  'Applying transformations to the plane',
  'Exploring parameter changes',
  'Understanding function families',
  'Investigating composite transformations'
], 13);

-- MEASUREMENT (Year 10A)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M10AM01', 'Measurement', 'Surface area and volume', 11, 'Surface area and volume of pyramids, cones, spheres and composite solids', 'Solve problems involving surface area and volume of complex solids', ARRAY[
  'Calculating surface area of pyramids and cones',
  'Finding volumes of cones and spheres',
  'Working with composite solids',
  'Solving real-world measurement problems'
], 14),

('VC2M10AM02', 'Measurement', 'Rates of change', 11, 'Average rates of change and limiting values', 'Investigate average rates of change and their limiting values', ARRAY[
  'Understanding average rate of change',
  'Calculating rates from graphs',
  'Exploring limiting values',
  'Introduction to instantaneous rates'
], 15);

-- SPACE (Year 10A)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M10ASP03', 'Space', 'Trigonometry', 11, 'Definitions of trigonometric functions and their graphs', 'Use the unit circle to define trigonometric functions and graph them', ARRAY[
  'Understanding the unit circle',
  'Defining sine, cosine and tangent as functions',
  'Graphing trigonometric functions',
  'Exploring periodic behavior and amplitude'
], 16),

('VC2M10ASP05', 'Space', '3D trigonometry', 11, 'Pythagoras and trigonometry in three dimensions', 'Apply Pythagoras theorem and trigonometry to solve 3D problems', ARRAY[
  'Visualizing 3D geometric situations',
  'Applying Pythagoras in 3D',
  'Using trigonometry in three dimensions',
  'Solving practical 3D problems'
], 17);

-- STATISTICS (Year 10A)
INSERT INTO curriculum_topics (code, strand, sub_strand, level, title, description, elaborations, difficulty_order) VALUES
('VC2M10AST02', 'Statistics', 'Data analysis', 11, 'Measures of spread', 'Calculate and interpret measures of spread including standard deviation', ARRAY[
  'Calculating standard deviation',
  'Interpreting measures of spread',
  'Identifying and analyzing outliers',
  'Comparing distributions'
], 18),

('VC2M10AST03', 'Statistics', 'Bivariate data', 11, 'Scatterplots and lines of best fit', 'Investigate bivariate data sets using scatterplots and linear models', ARRAY[
  'Creating scatter plots',
  'Finding lines of best fit',
  'Making predictions from models',
  'Understanding correlation and causation',
  'Discussing limitations of models'
], 19);
