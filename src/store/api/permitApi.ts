import type { SituationDescriptionFormData } from '@/schemas';
import { API_DELAYS } from '@/store/constants/api';
import { ApiHelpers } from '@/store/helpers/api';
import { AnalysisEngine } from '@/store/services/analysis';
import { StorageUtils } from '@/store/services/storage';
import { clearAllFormData } from '@/store/slices/permitSlice';
import type {
  GetPermitResponse,
  PermitApplicationData,
  PermitStatusResponse,
  PermitSubmissionResponse,
  SituationDescriptionResponse,
  StoredPermitData,
} from '@/store/types/permit';
import { createApplicationId, generateUniqueId } from '@/utils/api';
import { baseApi } from './baseApi';

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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          // Wait for the submission to complete successfully
          const result = await queryFulfilled;

          // Only clear form data if this is a final submission (status is 'validated')
          if (result.data.data.status === 'validated') {
            dispatch(clearAllFormData());
            StorageUtils.clearFormData();
          }
        } catch {
          // If submission failed, don't clear the form data
          console.log(
            'Situation description submission failed, keeping form data'
          );
        }
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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          // Wait for the submission to complete successfully
          await queryFulfilled;

          // Clear all form data after successful submission
          dispatch(clearAllFormData());
          StorageUtils.clearFormData();
        } catch {
          // If submission failed, don't clear the form data
          console.log('Permit submission failed, keeping form data');
        }
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
              applicationId,
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
