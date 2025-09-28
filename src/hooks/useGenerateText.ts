import { useGenerateTextMutation } from '@/store/api';

/**
 * Hook for general text generation using OpenAI API
 * This is a more flexible hook compared to useTextSuggestion
 * which is specifically for form field suggestions
 */
export const useGenerateText = () => {
  const [generateText, { isLoading, error, data }] = useGenerateTextMutation();

  const generate = async (
    prompt: string,
    context?: string,
    maxTokens?: number
  ) => {
    try {
      const result = await generateText({
        prompt,
        context,
        maxTokens,
      }).unwrap();

      return {
        text: result.text,
        success: result.success,
        error: result.error,
      };
    } catch (err) {
      console.error('Failed to generate text:', err);
      return {
        text: '',
        success: false,
        error: 'Failed to generate text',
      };
    }
  };

  return {
    generate,
    isLoading,
    error,
    data,
  };
};
