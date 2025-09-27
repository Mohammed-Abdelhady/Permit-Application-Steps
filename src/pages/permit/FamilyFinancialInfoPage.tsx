import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PermitPageLayout, FamilyFinancialForm } from '../../components';
import { usePermitSteps, useToast, useRefreshWarning } from '../../hooks';
import { useNavigation } from '../../contexts';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { saveFamilyFinancial } from '../../store/slices/permitSlice';
import { type FamilyFinancialFormData } from '../../schemas';
import { scrollToTop } from '../../utils/helpers';

const FamilyFinancialInfoPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setDirection } = useNavigation();
  const { steps } = usePermitSteps(2);
  const toast = useToast();
  const dispatch = useAppDispatch();

  // Get saved form data from Redux
  const savedFamilyFinancial = useAppSelector(
    state => state.permit.familyFinancial
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<{
    submitForm: () => Promise<boolean>;
    isValid: boolean;
  }>(null);

  // Enable refresh warning for unsaved form data
  useRefreshWarning();

  const handleFormSubmit = async (data: FamilyFinancialFormData) => {
    setIsSubmitting(true);
    try {
      // Save form data to Redux
      dispatch(saveFamilyFinancial(data));

      // Show success message
      toast.success('success.family_financial_saved');

      // Move to next step automatically
      setDirection('forward');
      scrollToTop();
      navigate('/permit/situation');
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
      }
    }
  };

  const handlePrevious = () => {
    setDirection('backward');
    scrollToTop();
    navigate('/permit/personal');
  };

  return (
    <PermitPageLayout
      title={t('permit.steps.familyFinancial')}
      currentStep={2}
      steps={steps}
      direction="forward"
      showPrevious
      showNext
      onPrevious={handlePrevious}
      onNext={handleNext}
      isSubmitting={isSubmitting}
      contentClassName={steps[1]?.isCompleted ? 'opacity-90' : ''}
    >
      <FamilyFinancialForm
        ref={formRef}
        onSubmit={handleFormSubmit}
        initialData={savedFamilyFinancial || undefined}
        isSubmitting={isSubmitting}
      />
    </PermitPageLayout>
  );
};

export default FamilyFinancialInfoPage;
