import { useTranslation } from 'react-i18next';
import { PERMIT_STEP_KEYS, TOTAL_PERMIT_STEPS } from '@/utils/constants';
import { createSteps } from '@/utils/helpers';
import { type PermitStep } from '@/types/step';

/**
 * Custom hook for permit step management
 * @param currentStep Current step number (1-based)
 * @returns Object with steps array and step titles
 */
export const usePermitSteps = (
  currentStep: number
): {
  steps: PermitStep[];
  stepTitles: string[];
} => {
  const { t } = useTranslation();

  const stepTitles = PERMIT_STEP_KEYS.map(key => t(key));
  const steps = createSteps(currentStep, TOTAL_PERMIT_STEPS, stepTitles);

  return {
    steps,
    stepTitles,
  };
};
