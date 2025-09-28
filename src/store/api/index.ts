// Re-export all types and interfaces
export type {
  AnalysisResult,
  GetPermitResponse,
  PermitApplicationData,
  PermitStatusResponse,
  PermitSubmissionResponse,
  SituationDescriptionResponse,
  StoredPermitData,
} from '@/types/permit';

// Re-export constants
export {
  API_DELAYS,
  PERMITS_STORAGE_KEY,
  PROCESSING_CONFIG,
  RECOMMENDATIONS,
  SCORING_CONFIG,
} from '@/store/constants/api';

// Re-export utilities
export {
  createApplicationId,
  generateUniqueId,
  simulateDelay,
} from '@/utils/api';

// Re-export storage functions
export { StorageUtils } from '@/store/services/storage';

// Re-export analysis engine
export { AnalysisEngine } from '@/store/services/analysis';

// Re-export API helpers
export { ApiHelpers } from '@/store/helpers/api';

// Re-export main API
export {
  permitApi,
  useGetPermitByIdQuery,
  useGetPermitStatusQuery,
  useSubmitPermitApplicationMutation,
  useSubmitSituationDescriptionMutation,
} from './permitApi';

// Re-export OpenAI API
export {
  openAIApi,
  useGenerateTextMutation,
  useGenerateTextSuggestionMutation,
} from './openAIApi';

// Re-export OpenAI types
export { DEFAULT_OPENAI_CONFIG } from '@/types/openAI';
export type {
  GenerateGenericTextRequest,
  GenerateGenericTextResponse,
  GenerateTextRequest,
  GenerateTextResponse,
  OpenAIConfig,
  OpenAIError,
  OpenAIErrorCode,
  OpenAIMessage,
  OpenAIRequest,
  OpenAIResponse,
  SuggestionFieldType,
} from '@/types/openAI';

// Re-export base API
export { baseApi } from './baseApi';
