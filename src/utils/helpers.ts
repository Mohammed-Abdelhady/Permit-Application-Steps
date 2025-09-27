import type { PermitStep } from '../types/permit';

/**
 * Creates step configuration for progress indicator
 * @param currentStepNumber Current active step (1-based)
 * @param totalSteps Total number of steps
 * @param stepTitles Array of step titles
 * @returns Array of PermitStep objects
 */
export const createSteps = (
  currentStepNumber: number,
  totalSteps: number,
  stepTitles: string[]
): PermitStep[] => {
  return Array.from({ length: totalSteps }, (_, index) => {
    const stepNumber = index + 1;
    return {
      number: stepNumber,
      title: stepTitles[index] || `Step ${stepNumber}`,
      isActive: stepNumber === currentStepNumber,
      isCompleted: stepNumber < currentStepNumber,
    };
  });
};
