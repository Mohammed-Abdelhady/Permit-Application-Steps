# OpenAI Services Migration to RTK Query

## Overview

Successfully migrated OpenAI services from standalone service classes to RTK Query within the Redux store architecture.

## What Was Changed

### 🗂️ File Structure Changes

- **Removed**: `/src/services/openai.ts` (old service class)
- **Removed**: `/src/services/openAIApi.ts` (old RTK Query implementation)
- **Removed**: `/src/services/` directory (now empty)
- **Added**: `/src/store/api/openAIApi.ts` (new RTK Query implementation)
- **Added**: `/src/store/api/openAITypes.ts` (comprehensive type definitions)
- **Added**: `/src/hooks/useGenerateText.ts` (general-purpose text generation hook)

### 📦 Redux Store Integration

- **Updated**: `/src/store/store.ts` - Changed import path for openAIApi
- **Updated**: `/src/store/api/index.ts` - Added exports for OpenAI API and types
- OpenAI API is now properly integrated into the Redux store alongside other APIs

### 🔧 Hooks & Components

- **Updated**: `/src/hooks/useTextSuggestion.ts` - Updated import to use new API location
- **Updated**: `/src/hooks/index.ts` - Added export for new useGenerateText hook
- All existing components continue to work without changes

## API Endpoints Available

### 1. Text Suggestions for Form Fields

```typescript
const { generateSuggestion, isLoading, error } = useGenerateTextSuggestionMutation();

// Generate field-specific suggestions
await generateSuggestion({
  fieldType: 'financial' | 'employment' | 'reason',
  currentText?: string,
  context?: string,
});
```

### 2. General Text Generation

```typescript
const { generate, isLoading } = useGenerateText();

// Generate any text with custom prompts
await generate(prompt, context?, maxTokens?);
```

## Type Safety Improvements

### Comprehensive Type Definitions

- `OpenAIMessage`, `OpenAIRequest`, `OpenAIResponse`
- `GenerateTextRequest`, `GenerateTextResponse`
- `GenerateGenericTextRequest`, `GenerateGenericTextResponse`
- `SuggestionFieldType` union type
- `OpenAIErrorCode` for specific error handling
- `OpenAIConfig` for configuration management

### Better Error Handling

- Specific error codes for different failure scenarios
- Proper error transformation in RTK Query
- User-friendly error messages

## Usage Examples

### For Form Field Suggestions (Existing Usage)

```typescript
import { useTextSuggestion } from '../hooks';

const MyComponent = () => {
  const textSuggestion = useTextSuggestion({
    fieldType: 'financial',
    currentValue: formData.financialSituation,
    onSuggestionAccepted: (text) => updateField(text),
  });

  return (
    <button onClick={textSuggestion.handleHelpMeWrite}>
      Get AI Suggestion
    </button>
  );
};
```

### For General Text Generation (New)

```typescript
import { useGenerateText } from '../hooks';

const MyComponent = () => {
  const { generate, isLoading } = useGenerateText();

  const handleGenerate = async () => {
    const result = await generate(
      'Write a professional email about...',
      'Additional context here'
    );

    if (result.success) {
      console.log(result.text);
    }
  };
};
```

### Direct RTK Query Usage

```typescript
import { useGenerateTextMutation } from '../store/api';

const MyComponent = () => {
  const [generateText] = useGenerateTextMutation();

  const handleGenerate = async () => {
    try {
      const result = await generateText({
        prompt: 'Your prompt here',
        context: 'Optional context',
        maxTokens: 300,
      }).unwrap();

      console.log(result.text);
    } catch (error) {
      console.error('Generation failed:', error);
    }
  };
};
```

## Benefits of This Migration

### ✅ Better Architecture

- Centralized API management in Redux store
- Consistent with other API services in the app
- Proper RTK Query caching and invalidation

### ✅ Enhanced Type Safety

- Comprehensive TypeScript types
- Better error handling and validation
- Intellisense support throughout the app

### ✅ Improved Developer Experience

- Clean import paths through index files
- Multiple hook options for different use cases
- Better debugging with Redux DevTools

### ✅ Future Scalability

- Easy to add new OpenAI endpoints
- Modular structure for additional AI services
- Configuration management for different models

### ✅ Performance Benefits

- RTK Query caching reduces unnecessary API calls
- Background refetching and synchronization
- Optimistic updates support

## Configuration

The API uses environment variables for configuration:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

Default configuration can be customized via `DEFAULT_OPENAI_CONFIG` in `openAITypes.ts`:

```typescript
export const DEFAULT_OPENAI_CONFIG: OpenAIConfig = {
  model: 'gpt-3.5-turbo',
  maxTokens: 150,
  temperature: 0.7,
};
```

## Migration Impact

### ✅ Zero Breaking Changes

- All existing components continue to work
- Same hook interfaces maintained
- No changes needed in UI components

### ✅ Backward Compatibility

- `useTextSuggestion` hook unchanged
- Same API response formats
- Existing error handling preserved

### ✅ Enhanced Functionality

- New `useGenerateText` hook for flexibility
- Better error messages and handling
- Improved type safety throughout
