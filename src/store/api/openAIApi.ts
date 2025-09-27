import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  OpenAIMessage,
  OpenAIRequest,
  OpenAIResponse,
  GenerateTextRequest,
  GenerateTextResponse,
} from '../types/openAI';
import {
  getCurrentLanguage,
  getLocalizedPrompt,
  getFieldPrompts,
  type SupportedLanguage,
} from '../constants/prompts';

// Configuration
const OPENAI_CONFIG = {
  model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-3.5-turbo',
  maxTokens: {
    suggestion: 150,
    general: 500,
  },
  temperature: 0.7,
} as const;

/**
 * Get localized prompts based on current language
 * @param language - Current language ('en' or 'ar')
 * @returns Object with field-specific prompts
 */
const getLocalizedFieldPrompts = (language: SupportedLanguage) =>
  getFieldPrompts(language);

// RTK Query API for OpenAI
export const openAIApi = createApi({
  reducerPath: 'openAIApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_OPENAI_BASE_URL,
    prepareHeaders: headers => {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey) {
        console.error(
          'OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your .env file.'
        );
      }
      if (apiKey) {
        headers.set('Authorization', `Bearer ${apiKey}`);
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  }),
  tagTypes: ['TextSuggestion'],
  endpoints: builder => ({
    generateTextSuggestion: builder.mutation<
      GenerateTextResponse,
      GenerateTextRequest
    >({
      query: request => {
        const { fieldType, currentText = '', context = '' } = request;

        // Get current language and localized prompts
        const language = getCurrentLanguage();
        const fieldPrompts = getLocalizedFieldPrompts(language);
        const fieldPrompt = fieldPrompts[fieldType];
        const systemPrompt = getLocalizedPrompt(language, 'system');

        const promptText = `${fieldPrompt}
Current text: "${currentText}"
Additional context: "${context}"`;

        const messages: OpenAIMessage[] = [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: promptText,
          },
        ];

        const openAIRequest: OpenAIRequest = {
          model: OPENAI_CONFIG.model,
          messages,
          max_tokens: OPENAI_CONFIG.maxTokens.suggestion,
          temperature: OPENAI_CONFIG.temperature,
          stream: false,
        };

        return {
          url: 'chat/completions',
          method: 'POST',
          body: openAIRequest,
        };
      },
      transformResponse: (response: OpenAIResponse): GenerateTextResponse => {
        try {
          const suggestion =
            response.choices[0]?.message?.content?.trim() || '';

          if (!suggestion) {
            return {
              suggestion: '',
              success: false,
              error: 'No suggestion generated',
            };
          }

          return {
            suggestion,
            success: true,
          };
        } catch {
          return {
            suggestion: '',
            success: false,
            error: 'Failed to parse OpenAI response',
          };
        }
      },
      transformErrorResponse: (response): GenerateTextResponse => {
        let errorMessage = 'Failed to generate suggestion';

        if (response.status === 401) {
          errorMessage =
            'Invalid API key. Please check your OpenAI API configuration.';
        } else if (response.status === 429) {
          errorMessage = 'Rate limit exceeded. Please try again in a moment.';
        } else if (response.status === 500) {
          errorMessage =
            'OpenAI service is temporarily unavailable. Please try again later.';
        } else if (response.status === 'TIMEOUT_ERROR') {
          errorMessage = 'Request timed out. Please try again.';
        } else if (response.status === 'FETCH_ERROR') {
          errorMessage =
            'Network error. Please check your internet connection.';
        } else if (response.status === 'PARSING_ERROR') {
          errorMessage = 'Invalid response format from OpenAI service.';
        }

        return {
          suggestion: '',
          success: false,
          error: errorMessage,
        };
      },
      invalidatesTags: ['TextSuggestion'],
    }),

    // Generic text generation endpoint for more flexibility
    generateText: builder.mutation<
      { text: string; success: boolean; error?: string },
      { prompt: string; context?: string; maxTokens?: number }
    >({
      query: ({ prompt, context = '', maxTokens = 500 }) => {
        // Get current language and localized system prompt
        const language = getCurrentLanguage();
        const systemPrompt = getLocalizedPrompt(language, 'general');

        const messages: OpenAIMessage[] = [
          {
            role: 'system',
            content: systemPrompt,
          },
        ];

        if (context) {
          messages.push({
            role: 'user',
            content: `Context: ${context}`,
          });
        }

        messages.push({
          role: 'user',
          content: prompt,
        });

        const openAIRequest: OpenAIRequest = {
          model: OPENAI_CONFIG.model,
          messages,
          max_tokens: maxTokens || OPENAI_CONFIG.maxTokens.general,
          temperature: OPENAI_CONFIG.temperature,
        };

        return {
          url: 'chat/completions',
          method: 'POST',
          body: openAIRequest,
        };
      },
      transformResponse: (response: OpenAIResponse) => {
        try {
          const text = response.choices[0]?.message?.content?.trim() || '';

          if (!text) {
            return {
              text: '',
              success: false,
              error: 'No text generated',
            };
          }

          return {
            text,
            success: true,
          };
        } catch {
          return {
            text: '',
            success: false,
            error: 'Failed to parse response',
          };
        }
      },
      transformErrorResponse: response => {
        let errorMessage = 'Failed to generate text';

        if (response.status === 401) {
          errorMessage = 'Invalid API key. Please check your configuration.';
        } else if (response.status === 429) {
          errorMessage = 'Rate limit exceeded. Please try again later.';
        } else if (response.status === 500) {
          errorMessage = 'OpenAI service temporarily unavailable.';
        } else if (response.status === 'TIMEOUT_ERROR') {
          errorMessage = 'Request timed out. Please try again.';
        } else if (response.status === 'FETCH_ERROR') {
          errorMessage = 'Network error. Please check your connection.';
        }

        return {
          text: '',
          success: false,
          error: errorMessage,
        };
      },
      invalidatesTags: ['TextSuggestion'],
    }),
  }),
});

export const { useGenerateTextSuggestionMutation, useGenerateTextMutation } =
  openAIApi;
