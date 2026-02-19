/**
 * Answer Evaluator
 *
 * Evaluates student answers using Claude and provides constructive feedback.
 */

import { sendMessage, parseJSONResponse, MODELS } from './claude-client';
import { buildAnswerEvaluationPrompt, TUTOR_SYSTEM_PROMPT } from './prompts';
import type {
  StudentContext,
  AnswerEvaluation,
  GeneratedQuestion,
} from '@/types/learning';

/**
 * Evaluate a student's answer to a question
 */
export async function evaluateAnswer(
  question: GeneratedQuestion,
  studentAnswer: string,
  studentContext: StudentContext
): Promise<AnswerEvaluation> {
  try {
    // Build the evaluation prompt
    const prompt = buildAnswerEvaluationPrompt(
      question.question_text,
      question.correct_answer,
      studentAnswer,
      studentContext
    );

    // Call Claude API
    const response = await sendMessage(prompt, {
      system: TUTOR_SYSTEM_PROMPT,
      model: MODELS.HAIKU, // Use Haiku for faster, cheaper evaluations
      maxTokens: 800,
      temperature: 0.5, // Lower temperature for more consistent evaluations
    });

    // Parse the JSON response
    const evaluation = parseJSONResponse<AnswerEvaluation>(response);

    // Validate the response structure
    if (typeof evaluation.is_correct !== 'boolean') {
      throw new Error('Invalid evaluation: missing is_correct field');
    }

    if (typeof evaluation.accuracy_score !== 'number') {
      throw new Error('Invalid evaluation: missing accuracy_score field');
    }

    if (!evaluation.feedback) {
      throw new Error('Invalid evaluation: missing feedback field');
    }

    console.log(
      `✓ Evaluated answer - Correct: ${evaluation.is_correct}, Score: ${evaluation.accuracy_score}`
    );

    return evaluation;
  } catch (error) {
    console.error('Error evaluating answer:', error);

    // Return a fallback evaluation
    return {
      is_correct: false,
      accuracy_score: 0,
      feedback:
        "I'm having trouble evaluating your answer right now. Please try again or ask for help!",
      conceptual_understanding: 'developing',
      identified_weakness: null,
      suggested_hint: null,
      encouragement: 'Keep trying! You can do this!',
    };
  }
}

/**
 * Quick check if an answer is approximately correct
 * (Useful for validation before full LLM evaluation)
 */
export function quickAnswerCheck(
  correctAnswer: string,
  studentAnswer: string
): { likely_correct: boolean; confidence: number } {
  if (!studentAnswer || !correctAnswer) {
    return { likely_correct: false, confidence: 0 };
  }

  // Normalize both answers for comparison
  const normalizeAnswer = (answer: string): string => {
    return answer
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/[,\$]/g, '') // Remove commas and dollar signs
      .replace(/^0+/, ''); // Remove leading zeros
  };

  const normalizedCorrect = normalizeAnswer(correctAnswer);
  const normalizedStudent = normalizeAnswer(studentAnswer);

  // Exact match
  if (normalizedCorrect === normalizedStudent) {
    return { likely_correct: true, confidence: 1.0 };
  }

  // Check for numeric equivalence
  const correctNum = parseFloat(normalizedCorrect);
  const studentNum = parseFloat(normalizedStudent);

  if (!isNaN(correctNum) && !isNaN(studentNum)) {
    // Check if numbers are approximately equal (within 0.1% or 0.01 for small numbers)
    const tolerance = Math.max(Math.abs(correctNum) * 0.001, 0.01);
    if (Math.abs(correctNum - studentNum) < tolerance) {
      return { likely_correct: true, confidence: 0.95 };
    }
  }

  // Check if student answer is contained in correct answer or vice versa
  if (
    normalizedCorrect.includes(normalizedStudent) ||
    normalizedStudent.includes(normalizedCorrect)
  ) {
    return { likely_correct: true, confidence: 0.7 };
  }

  return { likely_correct: false, confidence: 0 };
}

/**
 * Evaluate multiple answers in batch
 */
export async function batchEvaluateAnswers(
  questionsAndAnswers: Array<{
    question: GeneratedQuestion;
    studentAnswer: string;
  }>,
  studentContext: StudentContext
): Promise<AnswerEvaluation[]> {
  const evaluations: AnswerEvaluation[] = [];

  // Evaluate each answer sequentially
  for (const { question, studentAnswer } of questionsAndAnswers) {
    try {
      const evaluation = await evaluateAnswer(
        question,
        studentAnswer,
        studentContext
      );
      evaluations.push(evaluation);

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error) {
      console.error('Failed to evaluate answer:', error);
      // Push a fallback evaluation
      evaluations.push({
        is_correct: false,
        accuracy_score: 0,
        feedback: 'Unable to evaluate this answer.',
        conceptual_understanding: 'developing',
        identified_weakness: null,
        suggested_hint: null,
        encouragement: 'Keep going!',
      });
    }
  }

  return evaluations;
}

/**
 * Calculate confidence score based on recent evaluations
 */
export function calculateConfidenceScore(
  evaluations: AnswerEvaluation[]
): number {
  if (evaluations.length === 0) {
    return 0;
  }

  // Calculate weighted average of accuracy scores
  // More recent evaluations have higher weight
  let totalWeight = 0;
  let weightedSum = 0;

  evaluations.forEach((evaluation, index) => {
    // Weight decreases exponentially for older evaluations
    const weight = Math.exp(-index / 5);
    weightedSum += evaluation.accuracy_score * weight;
    totalWeight += weight;
  });

  const confidenceScore = weightedSum / totalWeight;

  // Round to 2 decimal places
  return Math.round(confidenceScore * 100) / 100;
}

/**
 * Determine skill level based on confidence score and number of questions
 */
export function determineSkillLevel(
  confidenceScore: number,
  questionsAttempted: number
): 'not_started' | 'learning' | 'practicing' | 'mastered' {
  // Not started if no questions attempted
  if (questionsAttempted === 0) {
    return 'not_started';
  }

  // Need at least 5 questions before considering mastered
  if (confidenceScore >= 0.9 && questionsAttempted >= 5) {
    return 'mastered';
  }

  // Practicing if doing well consistently
  if (confidenceScore >= 0.7 && questionsAttempted >= 3) {
    return 'practicing';
  }

  // Otherwise still learning
  return 'learning';
}

/**
 * Extract weaknesses from multiple evaluations
 */
export function extractWeaknesses(
  evaluations: AnswerEvaluation[]
): string[] {
  const weaknessSet = new Set<string>();

  evaluations.forEach((evaluation) => {
    if (evaluation.identified_weakness && evaluation.identified_weakness.trim()) {
      weaknessSet.add(evaluation.identified_weakness.trim());
    }
  });

  return Array.from(weaknessSet);
}

/**
 * Generate an encouraging summary based on performance
 */
export function generateEncouragingSummary(
  correctCount: number,
  totalCount: number,
  studentName: string
): string {
  const percentage = (correctCount / totalCount) * 100;

  if (percentage >= 90) {
    return `Excellent work, ${studentName}! You're mastering this topic! 🌟`;
  } else if (percentage >= 75) {
    return `Great job, ${studentName}! You're doing really well! Keep it up! 💪`;
  } else if (percentage >= 60) {
    return `Good effort, ${studentName}! You're making solid progress! 📈`;
  } else if (percentage >= 40) {
    return `Nice try, ${studentName}! You're learning and improving! Keep practicing! 🎯`;
  } else {
    return `Keep going, ${studentName}! Every mistake is a chance to learn something new! 💡`;
  }
}
