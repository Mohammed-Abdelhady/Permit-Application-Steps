import { useToast } from '@/hooks';
import { useAppSelector } from '@/store/hooks';
import { type ReactNode, useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RouteGuardProps {
  children: ReactNode;
  requiredStep: number;
}

/**
 * Route guard component that protects form steps based on data availability
 *
 * Step requirements:
 * - Step 1 (personal): No requirements (always accessible)
 * - Step 2 (family-financial): Requires step 1 data
 * - Step 3 (situation): Requires step 1 and step 2 data
 */
export const RouteGuard = ({ children, requiredStep }: RouteGuardProps) => {
  const location = useLocation();
  const toast = useToast();
  const hasShownToast = useRef(false);
  const personalInformation = useAppSelector(
    state => state.permit.personalInformation
  );
  const familyFinancial = useAppSelector(state => state.permit.familyFinancial);
  const isSubmitting = useAppSelector(state => state.permit.isSubmitting);

  // Determine which step to redirect to based on missing data
  const getRedirectPath = (): string => {
    switch (requiredStep) {
      case 2: // Family Financial step
        if (!personalInformation) {
          return '/permit/personal';
        }
        break;
      case 3: // Situation Description step
        if (!personalInformation) {
          return '/permit/personal';
        }
        if (!familyFinancial) {
          return '/permit/family-financial';
        }
        break;
      default:
        // Step 1 or unknown step - allow access
        return '';
    }
    return '';
  };

  // Don't redirect if currently submitting to prevent interference
  const redirectPath = isSubmitting ? '' : getRedirectPath();

  // Show toast notification when redirecting (only once per redirect)
  useEffect(() => {
    if (redirectPath && !hasShownToast.current) {
      const stepNames = {
        1: 'Personal Information',
        2: 'Family Financial',
        3: 'Situation Description',
      };

      // Determine which step is missing
      let missingStep: number | null = null;
      if (requiredStep === 2) {
        missingStep = 1;
      } else if (requiredStep === 3) {
        missingStep = !personalInformation ? 1 : 2;
      }

      if (missingStep) {
        hasShownToast.current = true;
        toast.warning(
          `Please complete the ${stepNames[missingStep as keyof typeof stepNames]} step first`,
          'You must complete previous steps before accessing this page'
        );
      }
    }
  }, [
    redirectPath,
    requiredStep,
    personalInformation,
    familyFinancial,
    isSubmitting,
    toast,
  ]);

  // Reset toast flag when component unmounts or when redirect path changes
  useEffect(() => {
    if (!redirectPath) {
      hasShownToast.current = false;
    }
  }, [redirectPath]);

  // If redirect path is determined, redirect to it
  if (redirectPath) {
    return (
      <Navigate to={redirectPath} replace state={{ from: location.pathname }} />
    );
  }

  // If all requirements are met, render the children
  return <>{children}</>;
};

export default RouteGuard;
