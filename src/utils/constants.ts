// Constants for permit application
export const PERMIT_STEP_KEYS = [
  'permit.steps.personal',
  'permit.steps.familyFinancial',
  'permit.steps.situation',
] as const;

export const PERMIT_ROUTES = {
  PERSONAL: '/permit/personal',
  FAMILY_FINANCIAL: '/permit/family-financial',
  SITUATION: '/permit/situation',
} as const;

export const TOTAL_PERMIT_STEPS = 3;
