import type { PermitApplicationData } from './types';
import { PROCESSING_CONFIG } from './constants';
import { simulateDelay } from './utils';

// Helper functions for API operations
export const ApiHelpers = {
  calculateProcessingDays(data: PermitApplicationData): number {
    let days = PROCESSING_CONFIG.BASE_DAYS;

    // Reduce time based on completeness
    if (data.personalInformation)
      days -= PROCESSING_CONFIG.PERSONAL_INFO_REDUCTION;
    if (data.familyFinancial)
      days -= PROCESSING_CONFIG.FINANCIAL_INFO_REDUCTION;
    if (data.situationDescription)
      days -= PROCESSING_CONFIG.SITUATION_DESC_REDUCTION;

    // Expedited processing for urgent cases
    if (
      data.situationDescription?.reasonForApplying
        .toLowerCase()
        .includes('urgent')
    ) {
      days -= PROCESSING_CONFIG.URGENT_EXPEDITE;
    }

    return Math.max(days, PROCESSING_CONFIG.MINIMUM_DAYS);
  },

  simulateDelay,

  generateStatusScenario(): {
    status: 'pending' | 'approved' | 'rejected' | 'under_review';
    message: string;
    notes: string;
  } {
    const random = Math.random();

    if (random < 0.6) {
      return {
        status: 'under_review',
        message:
          'Your permit application is currently under review by our team.',
        notes:
          'Application is being processed according to standard procedures.',
      };
    }
    if (random < 0.85) {
      return {
        status: 'approved',
        message: 'Congratulations! Your permit application has been approved.',
        notes:
          'All requirements met. Permit will be issued within 2 business days.',
      };
    }
    if (random < 0.95) {
      return {
        status: 'pending',
        message: 'Your permit application is pending additional documentation.',
        notes:
          'Application is being processed according to standard procedures.',
      };
    }
    return {
      status: 'rejected',
      message:
        'Your permit application has been rejected. Please contact support for details.',
      notes: 'Missing required documentation for family financial information.',
    };
  },
};
