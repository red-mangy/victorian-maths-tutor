/**
 * Anthropic Claude API Client
 *
 * Wrapper around the Anthropic SDK for interacting with Claude.
 * Provides convenience methods for the educational tutoring use case.
 */

import Anthropic from '@anthropic-ai/sdk';

// Initialize the Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Default models to use
export const MODELS = {
  SONNET: 'claude-sonnet-4-5-20250929', // For complex tasks like question generation
  HAIKU: 'claude-haiku-4-5-20251001', // For simple tasks like answer evaluation
} as const;

/**
 * Send a message to Claude and get a response
 */
export async function sendMessage(
  prompt: string,
  options: {
    system?: string;
    model?: string;
    maxTokens?: number;
    temperature?: number;
  } = {}
): Promise<string> {
  const {
    system = 'You are a helpful AI assistant.',
    model = MODELS.SONNET,
    maxTokens = 2000,
    temperature = 0.7,
  } = options;

  try {
    const response = await anthropic.messages.create({
      model,
      max_tokens: maxTokens,
      temperature,
      system,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract text from the response
    const content = response.content[0];
    if (content.type === 'text') {
      return content.text;
    }

    throw new Error('Unexpected response format from Claude');
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

/**
 * Send a message to Claude with conversation history
 */
export async function sendMessageWithHistory(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  options: {
    system?: string;
    model?: string;
    maxTokens?: number;
    temperature?: number;
  } = {}
): Promise<string> {
  const {
    system = 'You are a helpful AI assistant.',
    model = MODELS.SONNET,
    maxTokens = 2000,
    temperature = 0.7,
  } = options;

  try {
    const response = await anthropic.messages.create({
      model,
      max_tokens: maxTokens,
      temperature,
      system,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    const content = response.content[0];
    if (content.type === 'text') {
      return content.text;
    }

    throw new Error('Unexpected response format from Claude');
  } catch (error) {
    console.error('Error calling Claude API with history:', error);
    throw error;
  }
}

/**
 * Parse JSON response from Claude
 * Claude sometimes wraps JSON in markdown code blocks, this handles that
 */
export function parseJSONResponse<T>(response: string): T {
  try {
    // Remove markdown code blocks if present
    let cleaned = response.trim();

    // Handle various markdown formats
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }

    // Remove any leading/trailing whitespace
    cleaned = cleaned.trim();

    // Try to extract JSON if there's text before/after
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleaned = jsonMatch[0];
    }

    // Attempt to parse
    const parsed = JSON.parse(cleaned);
    return parsed;
  } catch (error) {
    // Enhanced error logging
    console.error('═══════════════════════════════════════════════════════');
    console.error('ERROR: Failed to parse JSON response from Claude');
    console.error('Error details:', error);
    console.error('───────────────────────────────────────────────────────');
    console.error('Raw response (first 500 chars):');
    console.error(response.substring(0, 500));
    console.error('───────────────────────────────────────────────────────');
    console.error('Raw response (last 500 chars):');
    console.error(response.substring(Math.max(0, response.length - 500)));
    console.error('───────────────────────────────────────────────────────');
    console.error('Response length:', response.length);
    console.error('═══════════════════════════════════════════════════════');

    throw new Error('Failed to parse JSON response from Claude');
  }
}

/**
 * Stream a response from Claude (for long-form content)
 */
export async function streamMessage(
  prompt: string,
  onChunk: (text: string) => void,
  options: {
    system?: string;
    model?: string;
    maxTokens?: number;
    temperature?: number;
  } = {}
): Promise<void> {
  const {
    system = 'You are a helpful AI assistant.',
    model = MODELS.SONNET,
    maxTokens = 2000,
    temperature = 0.7,
  } = options;

  try {
    const stream = await anthropic.messages.create({
      model,
      max_tokens: maxTokens,
      temperature,
      system,
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });

    for await (const event of stream) {
      if (
        event.type === 'content_block_delta' &&
        event.delta.type === 'text_delta'
      ) {
        onChunk(event.delta.text);
      }
    }
  } catch (error) {
    console.error('Error streaming from Claude API:', error);
    throw error;
  }
}

/**
 * Count approximate tokens in a text
 * Claude uses ~4 characters per token as a rough estimate
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Check if API key is configured
 */
export function isConfigured(): boolean {
  return !!process.env.ANTHROPIC_API_KEY;
}
