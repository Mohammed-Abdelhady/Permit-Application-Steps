// Page-specific types and interfaces
import { type NavigationDirection } from '../contexts/NavigationTypes';
import { type PermitStep } from './step';

// Base page props that all permit pages share
export interface BasePermitPageProps {
  steps: PermitStep[];
  direction: NavigationDirection;
  setDirection: (direction: NavigationDirection) => void;
}

// Personal Information Page specific types
export interface PersonalInformationData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  email: string;
  phoneNumber: string;
}

// Family Financial Information Page specific types
export interface FamilyFinancialData {
  monthlyIncome: number;
  familySize: number;
  hasSpouse: boolean;
  spouseIncome?: number;
  hasChildren: boolean;
  numberOfChildren?: number;
  monthlyExpenses: number;
  savingsAmount: number;
}

// Situation Description Page specific types
export interface SituationDescriptionData {
  reasonForApplication: string;
  currentSituation: string;
  futureGoals: string;
  additionalDocuments: File[];
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
    email: string;
  };
}

// Combined form data type
export interface PermitApplicationData {
  personalInformation: PersonalInformationData;
  familyFinancial: FamilyFinancialData;
  situationDescription: SituationDescriptionData;
  submissionDate?: string;
  status?: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected';
}
