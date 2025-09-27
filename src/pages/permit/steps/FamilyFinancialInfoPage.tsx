import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PermitPageLayout, FamilyFinancialForm } from '../../../components';
import { usePermitSteps, useToast, useRefreshWarning } from '../../../hooks';
import { useNavigation } from '../../../contexts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { saveFamilyFinancial } from '../../../store/slices/permitSlice';
import { type FamilyFinancialFormData } from '../../../schemas';
import { scrollToTop } from '../../../utils/helpers';

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
    <div data-testid="family-financial-page">
      <PermitPageLayout
        steps={steps}
        currentStep={2}
        onPrevious={handlePrevious}
        onNext={handleNext}
        showNext
        showPrevious
        isSubmitting={isSubmitting}
        title={t('permit.steps.familyFinancial')}
      >
        <FamilyFinancialForm
          ref={formRef}
          onSubmit={handleFormSubmit}
          initialData={savedFamilyFinancial || undefined}
          isSubmitting={isSubmitting}
        />
      </PermitPageLayout>
    </div>
  );
};

export default FamilyFinancialInfoPage;
