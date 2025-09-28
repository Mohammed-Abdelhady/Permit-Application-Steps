// Main types index - re-exports all organized types
export * from './components';
export * from './pages';
export * from './step';

// Import types for use in this file
import type {
  FamilyFinancialData,
  PersonalInformationData,
  SituationDescriptionData,
} from './pages';

// API Response Types
export interface AnalysisResult {
  score: number;
  recommendations: string[];
  status: 'approved' | 'pending' | 'rejected';
}

export interface GetPermitResponse {
  success: boolean;
  data: StoredPermitData;
  message?: string;
}

export interface PermitStatusResponse {
  success: boolean;
  data: {
    applicationId: string;
    status: 'pending' | 'approved' | 'rejected';
    lastUpdated: string;
  };
  message?: string;
}

export interface PermitSubmissionResponse {
  success: boolean;
  data: {
    applicationId: string;
    status: 'submitted';
    estimatedProcessingDays: number;
  };
  message?: string;
}

export interface SituationDescriptionResponse {
  success: boolean;
  data: {
    validationScore: number;
    recommendations: string[];
  };
  message?: string;
}

export interface StoredPermitData {
  applicationId: string;
  personalInformation: PersonalInformationData;
  familyFinancial: FamilyFinancialData;
  situationDescription: SituationDescriptionData;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  analysis?: AnalysisResult;
}

// Legacy types (kept for backward compatibility)
export interface PersonalInfo {
  name: string;
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
