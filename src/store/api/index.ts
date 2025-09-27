// Re-export all types and interfaces
export type {
  PermitApplicationData,
  PermitSubmissionResponse,
  SituationDescriptionResponse,
  PermitStatusResponse,
  StoredPermitData,
  GetPermitResponse,
  AnalysisResult,
} from './types';

// Re-export constants
export {
  PERMITS_STORAGE_KEY,
  API_DELAYS,
  SCORING_CONFIG,
  RECOMMENDATIONS,
  PROCESSING_CONFIG,
} from './constants';

// Re-export utilities
export { generateUniqueId, createApplicationId, simulateDelay } from './utils';

// Re-export storage functions
export { StorageUtils } from './storage';

// Re-export analysis engine
export { AnalysisEngine } from './analysis';

// Re-export API helpers
export { ApiHelpers } from './helpers';

// Re-export main API
export {
  permitApi,
  useSubmitSituationDescriptionMutation,
  useSubmitPermitApplicationMutation,
  useGetPermitByIdQuery,
  useGetPermitStatusQuery,
} from './permitApi';
