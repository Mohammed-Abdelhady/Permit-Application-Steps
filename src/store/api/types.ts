import type {
  PersonalInformationFormData,
  FamilyFinancialFormData,
  SituationDescriptionFormData,
} from '../../schemas';

// Complete permit application data
export interface PermitApplicationData {
  personalInformation?: PersonalInformationFormData | null;
  familyFinancial?: FamilyFinancialFormData | null;
  situationDescription?: SituationDescriptionFormData;
}

// API response interfaces
export interface PermitSubmissionResponse {
  success: boolean;
  message: string;
  data: {
    applicationId: string;
    submissionDate: string;
    status: 'pending' | 'approved' | 'rejected';
    estimatedProcessingDays: number;
  };
}

export interface SituationDescriptionResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    submissionDate: string;
    status: 'saved' | 'validated';
    validationScore: number;
    recommendations: string[];
  };
}

export interface PermitStatusResponse {
  success: boolean;
  message: string;
  data: {
    status: 'pending' | 'approved' | 'rejected' | 'under_review';
    lastUpdated: string;
    notes: string;
  };
}

// Stored permit data interface for localStorage
export interface StoredPermitData {
  applicationId: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  estimatedProcessingDays: number;
  applicationData: PermitApplicationData;
  analysis?: {
    validationScore: number;
    recommendations: string[];
  };
}

// Get permit by ID response
export interface GetPermitResponse {
  success: boolean;
  message: string;
  data: StoredPermitData | null;
}

// Analysis result interface
export interface AnalysisResult {
  validationScore: number;
  recommendations: string[];
}
