// Main types index - re-exports all organized types
export * from './step';
export * from './components';
export * from './pages';

// Legacy types (kept for backward compatibility)
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
