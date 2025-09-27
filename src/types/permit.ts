// Common types for the permit application

export interface PermitStep {
  number: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationalId: string;
}

export interface FamilyFinancialInfo {
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  numberOfDependents: number;
  monthlyIncome: number;
  employmentStatus: 'employed' | 'unemployed' | 'self-employed' | 'retired';
  employer?: string;
}

export interface SituationDescription {
  reasonForApplication: string;
  urgencyLevel: 'low' | 'medium' | 'high' | 'urgent';
  additionalDocuments: string[];
  description: string;
}

export interface PermitApplication {
  personalInfo: PersonalInfo;
  familyFinancialInfo: FamilyFinancialInfo;
  situationDescription: SituationDescription;
  submittedAt?: Date;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
}

export interface NavigationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  showPrevious?: boolean;
  showNext?: boolean;
  showSubmit?: boolean;
  isSubmitting?: boolean;
}

export interface ProgressIndicatorProps {
  steps: PermitStep[];
  currentStep: number;
}
