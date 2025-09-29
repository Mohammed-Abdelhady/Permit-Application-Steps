import { PermitPageLayout, SituationDescriptionForm } from '@/components';
import { useNavigation } from '@/contexts';
import { usePermitSteps, useRefreshWarning, useToast } from '@/hooks';
import { type SituationDescriptionFormData } from '@/schemas';
import {
  useSubmitPermitApplicationMutation,
  useSubmitSituationDescriptionMutation,
} from '@/store/api/permitApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  saveSituationDescription,
  setSubmitting,
} from '@/store/slices/permitSlice';
import { scrollToTop } from '@/utils/helpers';
import { SEO_KEYS, useSEO } from '@/utils/seo';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
const SituationDescriptionPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setDirection } = useNavigation();
  const { steps } = usePermitSteps(3);
  const toast = useToast();
  const dispatch = useAppDispatch();

  // RTK Query mutations
  const [submitSituationDescription] = useSubmitSituationDescriptionMutation();
  const [submitPermitApplication] = useSubmitPermitApplicationMutation();

  // Get saved form data from Redux for complete application
  const personalInformation = useAppSelector(
    state => state.permit.personalInformation
  );
  const familyFinancial = useAppSelector(state => state.permit.familyFinancial);
  const savedSituationDescription = useAppSelector(
    state => state.permit.situationDescription
  );
  const isSubmitting = useAppSelector(state => state.permit.isSubmitting);
  const formRef = useRef<{
    submitForm: () => Promise<boolean>;
    isValid: boolean;
  }>(null);

  // Enable refresh warning for unsaved form data
  useRefreshWarning();

  // Set SEO data
  useSEO(SEO_KEYS.situation);

  const handleFormSubmit = async (data: SituationDescriptionFormData) => {
    dispatch(setSubmitting(true));
    try {
      // Save form data to Redux first
      dispatch(saveSituationDescription(data));

      // Submit situation description to API
      const situationResponse = await submitSituationDescription(data).unwrap();

      // Show validation results
      if (situationResponse.success) {
        // Now submit the complete permit application
        const completeApplication = {
          personalInformation,
          familyFinancial,
          situationDescription: data,
        };

        const applicationResponse =
          await submitPermitApplication(completeApplication).unwrap();

        if (applicationResponse.success) {
          toast.success('success.form_submitted');

          setDirection('forward');
          scrollToTop();
          navigate(`/permit/success/${applicationResponse.data.applicationId}`);
        }
      }
    } catch (error: unknown) {
      console.error('Form submission error:', error);

      // Show specific error message if available from API
      const errorObj = error as {
        data?: { message?: string };
        message?: string;
      };
      const errorMessage =
        errorObj?.data?.message ||
        errorObj?.message ||
        'form.errors.saveFailed';
      toast.error(errorMessage, 'form.errors.tryAgain');
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  const handleSubmit = async () => {
    if (formRef.current) {
      const isValid = await formRef.current.submitForm();
      if (!isValid) {
        toast.warning('form.validation.pleaseFixErrors');
      }
    }
  };

  const handlePrevious = () => {
    setDirection('backward');
    scrollToTop();
    navigate('/permit/family-financial');
  };

  return (
    <div data-testid="situation-description-page">
      <PermitPageLayout
        title={t('permit.steps.situation')}
        currentStep={3}
        steps={steps}
        direction="forward"
        showPrevious
        showSubmit
        onPrevious={handlePrevious}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        contentClassName={steps[2]?.isCompleted ? 'opacity-90' : ''}
      >
        <SituationDescriptionForm
          ref={formRef}
          onSubmit={handleFormSubmit}
          initialData={savedSituationDescription || undefined}
          isSubmitting={isSubmitting}
        />
      </PermitPageLayout>
    </div>
  );
};

export default SituationDescriptionPage;
