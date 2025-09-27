import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PermitPageLayout, PersonalInformationForm } from '../../components';
import { usePermitSteps, useToast } from '../../hooks';
import { useNavigation } from '../../contexts';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { savePersonalInformation } from '../../store/slices/permitSlice';
import { type PersonalInformationFormData } from '../../schemas';

const PersonalInformationPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setDirection } = useNavigation();
  const { steps } = usePermitSteps(1);
  const toast = useToast();
  const dispatch = useAppDispatch();

  // Get saved form data from Redux
  const savedPersonalInfo = useAppSelector(
    state => state.permit.personalInformation
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<{
    submitForm: () => Promise<boolean>;
    isValid: boolean;
  }>(null);

  const handleFormSubmit = async (data: PersonalInformationFormData) => {
    setIsSubmitting(true);
    try {
      // Save form data to Redux
      dispatch(savePersonalInformation(data));

      // Show success message
      toast.success('success.personal_info_saved');

      // Move to next step automatically
      setDirection('forward');
      navigate('/permit/family-financial');
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('form.errors.saveFailed', 'form.errors.tryAgain');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
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

  return (
    <PermitPageLayout
      title={t('permit.steps.personal')}
      currentStep={1}
      steps={steps}
      direction="forward"
      showNext
      onNext={handleNext}
      isSubmitting={isSubmitting}
      contentClassName={steps[0]?.isCompleted ? 'opacity-90' : ''}
    >
      <PersonalInformationForm
        ref={formRef}
        onSubmit={handleFormSubmit}
        initialData={savedPersonalInfo || undefined}
        isSubmitting={isSubmitting}
      />
    </PermitPageLayout>
  );
};

export default PersonalInformationPage;
