import { baseApi } from './baseApi';
import type { SituationDescriptionFormData } from '../../schemas';
import type {
  PermitApplicationData,
  PermitSubmissionResponse,
  SituationDescriptionResponse,
  PermitStatusResponse,
  GetPermitResponse,
  StoredPermitData,
} from './types';
import { API_DELAYS } from './constants';
import { generateUniqueId, createApplicationId } from './utils';
import { StorageUtils } from './storage';
import { AnalysisEngine } from './analysis';
import { ApiHelpers } from './helpers';

export const permitApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // Submit situation description
    submitSituationDescription: builder.mutation<
      SituationDescriptionResponse,
      SituationDescriptionFormData
    >({
      queryFn: async (data: SituationDescriptionFormData) => {
        await ApiHelpers.simulateDelay(API_DELAYS.SITUATION_DESCRIPTION);

        const analysis = AnalysisEngine.analyzeSituationDescription(data);

        const result: SituationDescriptionResponse = {
          success: true,
          message: 'Situation description submitted successfully',
          data: {
            id: generateUniqueId(),
            submissionDate: new Date().toISOString(),
            status: analysis.validationScore >= 70 ? 'validated' : 'saved',
            validationScore: analysis.validationScore,
            recommendations: analysis.recommendations,
          },
        };

        return { data: result };
      },
      invalidatesTags: ['Permit'],
    }),

    // Submit complete permit application
    submitPermitApplication: builder.mutation<
      PermitSubmissionResponse,
      PermitApplicationData
    >({
      queryFn: async (data: PermitApplicationData) => {
        await ApiHelpers.simulateDelay(API_DELAYS.PERMIT_APPLICATION);

        const applicationId = createApplicationId();
        const submissionDate = new Date().toISOString();
        const processingDays = ApiHelpers.calculateProcessingDays(data);

        // Generate analysis if situation description exists
        const analysis = data.situationDescription
          ? AnalysisEngine.analyzeSituationDescription(
              data.situationDescription
            )
          : undefined;

        // Create stored permit data
        const storedPermit: StoredPermitData = {
          applicationId,
          submissionDate,
          status: 'pending',
          estimatedProcessingDays: processingDays,
          applicationData: data,
          analysis: analysis
            ? {
                validationScore: analysis.validationScore,
                recommendations: analysis.recommendations,
              }
            : undefined,
        };

        // Save to localStorage
        const saveSuccess = StorageUtils.savePermit(storedPermit);
        if (!saveSuccess) {
          console.warn('Failed to save permit to localStorage');
        }

        return {
          data: {
            success: true,
            message: 'Permit application submitted successfully',
            data: {
              applicationId,
              submissionDate,
              status: 'pending',
              estimatedProcessingDays: processingDays,
            },
          },
        };
      },
      invalidatesTags: ['Permit'],
    }),

    // Get permit by ID
    getPermitById: builder.query<GetPermitResponse, string>({
      queryFn: async (applicationId: string) => {
        await ApiHelpers.simulateDelay(API_DELAYS.GET_PERMIT);

        console.log(`Fetching permit data for application: ${applicationId}`);

        const permitData = StorageUtils.getPermitById(applicationId);

        return {
          data: {
            success: !!permitData,
            message: permitData
              ? 'Permit data retrieved successfully'
              : 'Permit not found',
            data: permitData,
          },
        };
      },
      providesTags: ['Permit'],
    }),

    // Get permit status
    getPermitStatus: builder.query<PermitStatusResponse, string>({
      queryFn: async (applicationId: string) => {
        await ApiHelpers.simulateDelay(API_DELAYS.GET_STATUS);

        console.log(`Fetching status for application: ${applicationId}`);

        const statusData = ApiHelpers.generateStatusScenario();

        return {
          data: {
            success: true,
            message: statusData.message,
            data: {
              status: statusData.status,
              lastUpdated: new Date().toISOString(),
              notes: statusData.notes,
            },
          },
        };
      },
      providesTags: ['Permit'],
    }),
  }),
});

export const {
  useSubmitSituationDescriptionMutation,
  useSubmitPermitApplicationMutation,
  useGetPermitByIdQuery,
  useGetPermitStatusQuery,
} = permitApi;
