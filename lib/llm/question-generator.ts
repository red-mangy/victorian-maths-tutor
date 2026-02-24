/**
 * Question Generator
 *
 * Generates mathematics questions using Claude based on student context and topic.
 */

import { sendMessage, parseJSONResponse, MODELS } from './claude-client';
import { buildQuestionGenerationPrompt, TUTOR_SYSTEM_PROMPT } from './prompts';
import type {
  StudentContext,
  TopicContext,
  GeneratedQuestion,
  QuestionGenerationResponse,
} from '@/types/learning';

/**
 * Generate questions for a student on a specific topic
 */
export async function generateQuestions(
  studentContext: StudentContext,
  topicContext: TopicContext,
  numQuestions: number = 5,
  learningHistory?: { concepts_covered: string[]; total_sessions: number }
): Promise<GeneratedQuestion[]> {
  // Build the prompt with context and learning history
  const prompt = buildQuestionGenerationPrompt(
    studentContext,
    topicContext,
    numQuestions,
    learningHistory
  );

  // Use Sonnet for Year 10 topics (more complex) or Haiku for faster generation on simpler topics
  const useComplexModel = topicContext.level >= 10;
  const primaryModel = useComplexModel ? MODELS.SONNET : MODELS.HAIKU;
  const primaryMaxTokens = useComplexModel ? 3000 : 2000;

  console.log(`[QuestionGen] Generating for "${topicContext.title}" (${topicContext.code}, Level ${topicContext.level})`);
  console.log(`[QuestionGen] Using ${primaryModel} with ${primaryMaxTokens} max tokens`);

  // Retry logic: try with primary model first, then fallback to Sonnet if it fails
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const model = attempt === 1 ? primaryModel : MODELS.SONNET;
      const maxTokens = attempt === 1 ? primaryMaxTokens : 3000;

      if (attempt === 2) {
        console.log(`[QuestionGen] Retry attempt ${attempt} with fallback model: ${model}`);
      }

      // Call Claude API
      const response = await sendMessage(prompt, {
        system: TUTOR_SYSTEM_PROMPT,
        model,
        maxTokens,
        temperature: 0.7,
      });

      // Log response preview for debugging
      console.log(`[QuestionGen] Response preview: ${response.substring(0, 100)}...`);

      // Parse the JSON response
      const parsed = parseJSONResponse<QuestionGenerationResponse>(response);

      // Validate the response structure
      if (!parsed.questions || !Array.isArray(parsed.questions)) {
        throw new Error('Invalid response format: missing questions array');
      }

      // Validate each question has required fields
      const validQuestions = parsed.questions.filter((q) => {
        return (
          q.question_text &&
          q.question_type &&
          q.difficulty &&
          q.correct_answer &&
          Array.isArray(q.hints) &&
          Array.isArray(q.solution_steps)
        );
      });

      if (validQuestions.length === 0) {
        throw new Error('No valid questions generated after filtering');
      }

      console.log(`[QuestionGen] ✓ Successfully generated ${validQuestions.length} valid questions`);

      return validQuestions;
    } catch (error) {
      console.error(`[QuestionGen] Attempt ${attempt} failed:`, error);

      // If this was the last attempt, throw the error
      if (attempt === 2) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to generate questions after ${attempt} attempts: ${errorMessage}`);
      }

      // Otherwise, continue to next attempt
      console.log(`[QuestionGen] Retrying with fallback model...`);
    }
  }

  // This should never be reached due to the throw above, but TypeScript needs it
  throw new Error('Failed to generate questions');
}

/**
 * Generate a single follow-up question based on student's performance
 */
export async function generateFollowUpQuestion(
  studentContext: StudentContext,
  topicContext: TopicContext,
  previousQuestion: GeneratedQuestion,
  wasCorrect: boolean
): Promise<GeneratedQuestion> {
  try {
    // Adjust student context based on performance
    const adjustedContext = {
      ...studentContext,
      recent_accuracy: wasCorrect ? 90 : 40, // Adjust difficulty
    };

    // Generate a single question
    const questions = await generateQuestions(
      adjustedContext,
      topicContext,
      1
    );

    return questions[0];
  } catch (error) {
    console.error('Error generating follow-up question:', error);
    throw error;
  }
}

/**
 * Generate hint for a specific question
 */
export async function generateHint(
  question: GeneratedQuestion,
  studentAnswer: string,
  previousHints: string[]
): Promise<string> {
  try {
    // If we still have unused hints from the original question, use those
    const unusedHints = question.hints.filter(
      (hint) => !previousHints.includes(hint)
    );

    if (unusedHints.length > 0) {
      return unusedHints[0];
    }

    // Otherwise, generate a custom hint based on the student's answer
    const prompt = `You are a mathematics tutor. A student is working on this question:

QUESTION: ${question.question_text}
CORRECT ANSWER: ${question.correct_answer}
STUDENT'S ATTEMPT: ${studentAnswer || 'No attempt yet'}

Previous hints given:
${previousHints.map((h, i) => `${i + 1}. ${h}`).join('\n')}

Generate ONE additional hint that:
1. Doesn't give away the answer
2. Guides the student's thinking in the right direction
3. Is appropriate for their current understanding
4. Uses the Socratic method (asks a guiding question)

Respond with just the hint text, no additional formatting.`;

    const hint = await sendMessage(prompt, {
      system: TUTOR_SYSTEM_PROMPT,
      model: MODELS.HAIKU, // Use Haiku for simple hint generation
      maxTokens: 200,
      temperature: 0.7,
    });

    return hint.trim();
  } catch (error) {
    console.error('Error generating hint:', error);
    // Return a generic hint as fallback
    return 'Think about what you know about this topic. What is the first step you could take?';
  }
}

/**
 * Validate if a generated question meets quality standards
 */
export function validateQuestion(question: GeneratedQuestion): boolean {
  // Check required fields exist
  if (!question.question_text || !question.correct_answer) {
    console.warn('Question missing required fields');
    return false;
  }

  // Check question text is not too short
  if (question.question_text.length < 10) {
    console.warn('Question text too short');
    return false;
  }

  // Check we have at least one hint
  if (!Array.isArray(question.hints) || question.hints.length === 0) {
    console.warn('Question has no hints');
    return false;
  }

  // Check we have at least one solution step
  if (!Array.isArray(question.solution_steps) || question.solution_steps.length === 0) {
    console.warn('Question has no solution steps');
    return false;
  }

  return true;
}

/**
 * Batch generate questions for multiple topics
 */
export async function batchGenerateQuestions(
  studentContext: StudentContext,
  topics: TopicContext[],
  questionsPerTopic: number = 3
): Promise<Map<string, GeneratedQuestion[]>> {
  const results = new Map<string, GeneratedQuestion[]>();

  // Generate questions for each topic sequentially
  // (We could parallelize this, but it's better to avoid rate limits)
  for (const topic of topics) {
    try {
      const questions = await generateQuestions(
        studentContext,
        topic,
        questionsPerTopic
      );
      results.set(topic.topic_id, questions);

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Failed to generate questions for topic ${topic.title}:`, error);
      results.set(topic.topic_id, []);
    }
  }

  return results;
}
