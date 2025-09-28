// Common component types and interfaces
import { type ReactNode } from 'react';
import { type NavigationDirection } from '@/contexts/NavigationTypes';
import { type PermitStep } from './step';

// Layout component props
export interface PermitPageLayoutProps {
  children: ReactNode;
  title: string;
  currentStep: number;
  steps: PermitStep[];
  direction?: NavigationDirection;
  showPrevious?: boolean;
  showNext?: boolean;
  showSubmit?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  containerClassName?: string;
  contentClassName?: string;
}

// Form placeholder component props
export interface FormPlaceholderProps {
  content: string;
  className?: string;
  direction?: NavigationDirection;
}

// Progress indicator component props
export interface ProgressIndicatorProps {
  steps: PermitStep[];
  currentStep: number;
}

// Navigation component props
export interface NavigationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  showPrevious?: boolean;
  showNext?: boolean;
  showSubmit?: boolean;
  isSubmitting?: boolean;
}

// Animated page wrapper props
export interface AnimatedPageWrapperProps {
  children: ReactNode;
  direction?: NavigationDirection;
}
