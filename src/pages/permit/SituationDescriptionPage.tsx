import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PermitPageLayout, SituationDescriptionForm } from '../../components';
import { usePermitSteps, useToast } from '../../hooks';
import { useNavigation } from '../../contexts';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { saveSituationDescription } from '../../store/slices/permitSlice';
import {
  useSubmitSituationDescriptionMutation,
  useSubmitPermitApplicationMutation,
} from '../../store/api/permitApi';
import { type SituationDescriptionFormData } from '../../schemas';
import { scrollToTop } from '../../utils/helpers';
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<{
    submitForm: () => Promise<boolean>;
    isValid: boolean;
  }>(null);

  const handleFormSubmit = async (data: SituationDescriptionFormData) => {
    setIsSubmitting(true);
    try {
      // Save form data to Redux first
      dispatch(saveSituationDescription(data));

      // Submit situation description to API
      const situationResponse = await submitSituationDescription(data).unwrap();

      // Show validation results
      if (situationResponse.success) {
        toast.success('success.situation_description_saved');

        // Show validation score and recommendations if available
        if (situationResponse.data.recommendations.length > 0) {
          console.log(
            'API Recommendations:',
            situationResponse.data.recommendations
          );
          toast.info(
            `Validation Score: ${situationResponse.data.validationScore}%`
          );
        }

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

          // Log the application details for debugging
          console.log('Application submitted:', {
            applicationId: applicationResponse.data.applicationId,
            status: applicationResponse.data.status,
            estimatedProcessingDays:
              applicationResponse.data.estimatedProcessingDays,
          });

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
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (formRef.current) {
      const isValid = await formRef.current.submitForm();
      if (!isValid) {
        toast.warning('form.validation.pleaseFixErrors');
      } else {
        // If form is valid, it will be saved via handleFormSubmit
        // and navigation will happen automatically
      }
    }
  };

  const handlePrevious = () => {
    setDirection('backward');
    scrollToTop();
    navigate('/permit/family-financial');
  };

  return (
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
  );
};

export default SituationDescriptionPage;
