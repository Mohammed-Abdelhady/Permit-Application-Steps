import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PermitPageLayout, SituationDescriptionForm } from '../../components';
import { usePermitSteps, useToast } from '../../hooks';
import { useNavigation } from '../../contexts';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { saveSituationDescription } from '../../store/slices/permitSlice';
import { type SituationDescriptionFormData } from '../../schemas';
import { scrollToTop } from '../../utils/helpers';
const SituationDescriptionPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setDirection } = useNavigation();
  const { steps } = usePermitSteps(3);
  const toast = useToast();
  const dispatch = useAppDispatch();

  // Get saved form data from Redux
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
      // Save form data to Redux
      dispatch(saveSituationDescription(data));

      // Show success message
      toast.success('success.situation_description_saved');

      // Simulate API call for final submission
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success('success.form_submitted');
      setDirection('forward');
      scrollToTop();
      navigate('/');
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('form.errors.saveFailed', 'form.errors.tryAgain');
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
