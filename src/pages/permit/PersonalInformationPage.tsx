import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PermitPageLayout, PersonalInformationForm } from '../../components';
import { usePermitSteps, useToast } from '../../hooks';
import { useNavigation } from '../../contexts';
import { type PersonalInformationFormData } from '../../schemas';

const PersonalInformationPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setDirection } = useNavigation();
  const { steps } = usePermitSteps(1);
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PersonalInformationFormData | null>(
    null
  );
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef<{
    submitForm: () => Promise<boolean>;
    isValid: boolean;
  }>(null);

  const handleFormSubmit = async (data: PersonalInformationFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store form data
      setFormData(data);

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
    if (isFormValid) {
      setDirection('forward');
      navigate('/permit/family-financial');
    } else if (formRef.current) {
      const isValid = await formRef.current.submitForm();
      if (!isValid) {
        toast.warning('form.validation.pleaseFixErrors');
      }
    }
  };

  const handleFormValidationChange = (isValid: boolean) => {
    setIsFormValid(isValid);
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
        initialData={formData || undefined}
        isSubmitting={isSubmitting}
        onValidationChange={handleFormValidationChange}
      />
    </PermitPageLayout>
  );
};

export default PersonalInformationPage;
