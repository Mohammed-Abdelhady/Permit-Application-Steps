// Step-related types for permit process
export interface PermitStep {
  number: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

export type StepNumber = 1 | 2 | 3;

export interface StepData {
  id: string;
  title: string;
  route: string;
  isRequired: boolean;
}

// Step configuration for the permit process
export const PERMIT_STEPS: Record<StepNumber, StepData> = {
  1: {
    id: 'personal',
    title: 'permit.steps.personal',
    route: '/permit/personal',
    isRequired: true,
  },
  2: {
    id: 'family-financial',
    title: 'permit.steps.familyFinancial',
    route: '/permit/family-financial',
    isRequired: true,
  },
  3: {
    id: 'situation',
    title: 'permit.steps.situation',
    route: '/permit/situation',
    isRequired: true,
  },
};
