// Re-export all types and interfaces
export type {
  PermitApplicationData,
  PermitSubmissionResponse,
  SituationDescriptionResponse,
  PermitStatusResponse,
  StoredPermitData,
  GetPermitResponse,
  AnalysisResult,
} from '../types/permit';

// Re-export constants
export {
  PERMITS_STORAGE_KEY,
  API_DELAYS,
  SCORING_CONFIG,
  RECOMMENDATIONS,
  PROCESSING_CONFIG,
} from '../constants/api';

// Re-export utilities
export {
  generateUniqueId,
  createApplicationId,
  simulateDelay,
} from '../utils/api';

// Re-export storage functions
export { StorageUtils } from '../services/storage';

// Re-export analysis engine
export { AnalysisEngine } from '../services/analysis';

// Re-export API helpers
export { ApiHelpers } from '../helpers/api';

// Re-export main API
export {
  permitApi,
  useSubmitSituationDescriptionMutation,
  useSubmitPermitApplicationMutation,
  useGetPermitByIdQuery,
  useGetPermitStatusQuery,
} from './permitApi';

// Re-export OpenAI API
export {
  openAIApi,
  useGenerateTextSuggestionMutation,
  useGenerateTextMutation,
} from './openAIApi';

// Re-export OpenAI types
export type {
  OpenAIMessage,
  OpenAIRequest,
  OpenAIResponse,
  GenerateTextRequest,
  GenerateTextResponse,
  GenerateGenericTextRequest,
  GenerateGenericTextResponse,
  SuggestionFieldType,
  OpenAIConfig,
  OpenAIError,
  OpenAIErrorCode,
} from '../types/openAI';
export { DEFAULT_OPENAI_CONFIG } from '../types/openAI';

// Re-export base API
export { baseApi } from './baseApi';
