/**
 * Format Utility Functions
 *
 * Helper functions for formatting data for display
 */

/**
 * Format a curriculum level number to a display-friendly year name
 * @param level - The curriculum level (4-11)
 * @returns Formatted year string (e.g., "Year 4", "Year 10A")
 */
export function formatYearLevel(level: number | string): string {
  const numLevel = typeof level === 'string' ? parseInt(level, 10) : level;

  // Level 11 is Year 10A (accelerated)
  if (numLevel === 11) {
    return 'Year 10A';
  }

  // All other levels are just "Year X"
  return `Year ${numLevel}`;
}

/**
 * Format a grade level string for display
 * Handles both regular years and accelerated pathways
 */
export function formatGradeLevel(gradeLevel: string): string {
  // Handle Year_10A format
  if (gradeLevel === 'Year_10A') {
    return 'Year 10A';
  }

  // Handle Year_X format
  if (gradeLevel.startsWith('Year_')) {
    const year = gradeLevel.replace('Year_', '');
    return `Year ${year}`;
  }

  return gradeLevel;
}
