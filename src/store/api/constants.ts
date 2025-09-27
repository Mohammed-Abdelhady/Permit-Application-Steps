// Constants for API operations
export const PERMITS_STORAGE_KEY = 'dge_permits';

export const API_DELAYS = {
  SITUATION_DESCRIPTION: 1000,
  PERMIT_APPLICATION: 1500,
  GET_PERMIT: 600,
  GET_STATUS: 800,
} as const;

// Scoring criteria configuration
export const SCORING_CONFIG = {
  FINANCIAL_LENGTH: { threshold: 100, points: 30 },
  EMPLOYMENT_LENGTH: { threshold: 100, points: 25 },
  REASON_LENGTH: { threshold: 150, points: 25 },
  INCOME_KEYWORD: { points: 20 },
  CONTRACT_KEYWORD: { points: 15 },
} as const;

// Keyword-based recommendations
export const RECOMMENDATIONS = {
  debt: 'Consider providing debt management documentation',
  unemployed: 'Include job search documentation or unemployment benefits info',
  urgent: 'Provide supporting documents for urgent circumstances',
  lowScore: 'Consider providing more detailed information in all sections',
  highScore: 'Application appears complete and well-documented',
} as const;

// Processing time configuration
export const PROCESSING_CONFIG = {
  BASE_DAYS: 14,
  PERSONAL_INFO_REDUCTION: 2,
  FINANCIAL_INFO_REDUCTION: 2,
  SITUATION_DESC_REDUCTION: 3,
  URGENT_EXPEDITE: 3,
  MINIMUM_DAYS: 5,
} as const;
