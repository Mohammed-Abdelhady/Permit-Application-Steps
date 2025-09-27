import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  OpenAIMessage,
  OpenAIRequest,
  OpenAIResponse,
  GenerateTextRequest,
  GenerateTextResponse,
} from '../types/openAI';

// Field-specific prompt templates
const FIELD_PROMPTS = {
  financial: `You are helping someone write about their current financial situation for a government assistance application. 
Write a clear, honest, and professional description of their financial circumstances. 
Focus on: current income, expenses, financial challenges, and how assistance would help.
Keep it concise (2-3 sentences) and appropriate for an official application.`,

  employment: `You are helping someone describe their employment circumstances for a government assistance application.
Write a clear, professional description of their work situation.
Focus on: employment status, job challenges, work history, and how their situation affects their finances.
Keep it concise (2-3 sentences) and appropriate for an official application.`,

  reason: `You are helping someone explain why they are applying for government assistance.
Write a clear, respectful, and compelling reason that explains their need for assistance.
Focus on: specific circumstances, how assistance will help, and their commitment to improvement.
Keep it concise (2-3 sentences) and appropriate for an official application.`,
};

// RTK Query API for OpenAI
export const openAIApi = createApi({
  reducerPath: 'openAIApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openai.com/v1/',
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

        // Create field-specific prompt
        const fieldPrompt = FIELD_PROMPTS[fieldType];
        const promptText = `${fieldPrompt}
Current text: "${currentText}"
Additional context: "${context}"`;

        const messages: OpenAIMessage[] = [
          {
            role: 'system',
            content:
              'You are a helpful assistant that writes professional, clear, and appropriate text for government assistance applications. Always maintain a respectful and honest tone.',
          },
          {
            role: 'user',
            content: promptText,
          },
        ];

        const openAIRequest: OpenAIRequest = {
          model: 'gpt-3.5-turbo',
          messages,
          max_tokens: 150,
          temperature: 0.7,
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
        const messages: OpenAIMessage[] = [
          {
            role: 'system',
            content:
              'You are a helpful assistant that helps users write clear, professional, and detailed descriptions for government permit applications. Provide helpful, accurate, and relevant suggestions that would be appropriate for official documentation.',
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
          model: 'gpt-3.5-turbo',
          messages,
          max_tokens: maxTokens,
          temperature: 0.7,
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
