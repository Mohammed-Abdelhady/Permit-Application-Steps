// OpenAI API types and interfaces
export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIRequest {
  model: string;
  messages: OpenAIMessage[];
  max_tokens?: number;
  temperature?: number;
  stream?: boolean;
}

export interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface GenerateTextRequest {
  fieldType: 'financial' | 'employment' | 'reason';
  currentText?: string;
  context?: string;
}

export interface GenerateTextResponse {
  suggestion: string;
  success: boolean;
  error?: string;
}

export interface GenerateGenericTextRequest {
  prompt: string;
  context?: string;
  maxTokens?: number;
}

export interface GenerateGenericTextResponse {
  text: string;
  success: boolean;
  error?: string;
}

// Field types for text suggestions
export type SuggestionFieldType = 'financial' | 'employment' | 'reason';

// OpenAI model configurations
export interface OpenAIConfig {
  model: string;
  maxTokens: number;
  temperature: number;
}

export const DEFAULT_OPENAI_CONFIG: OpenAIConfig = {
  model: 'gpt-3.5-turbo',
  maxTokens: 150,
  temperature: 0.7,
};

// Error types for better error handling
export interface OpenAIError {
  error: {
    message: string;
    type: string;
    param?: string;
    code?: string;
  };
}

export type OpenAIErrorCode =
  | 401 // Unauthorized
  | 429 // Rate limit exceeded
  | 500 // Internal server error
  | 'TIMEOUT_ERROR'
  | 'FETCH_ERROR'
  | 'PARSING_ERROR';
