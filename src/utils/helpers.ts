import type { PermitStep } from '@/types/step';

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

/**
 * Scrolls to the top of the page with smooth animation
 * @param behavior Scroll behavior (default: 'smooth')
 */
export const scrollToTop = (behavior: ScrollBehavior = 'smooth') => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior,
  });
};
