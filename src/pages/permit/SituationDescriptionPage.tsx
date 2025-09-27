import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PermitPageLayout, FormPlaceholder } from '../../components';
import { usePermitSteps } from '../../hooks';
import { useNavigation } from '../../contexts';
import { scrollToTop } from '../../utils/helpers';
const SituationDescriptionPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { direction, setDirection } = useNavigation();
  const { steps } = usePermitSteps(3);

  const handlePrevious = () => {
    setDirection('backward');
    scrollToTop();
    navigate('/permit/family-financial');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(t('success.form_submitted'));
      setDirection('forward');
      scrollToTop();
      navigate('/');
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PermitPageLayout
      title={t('permit.steps.situation')}
      currentStep={3}
      steps={steps}
      direction={direction}
      showPrevious
      showSubmit
      onPrevious={handlePrevious}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      <FormPlaceholder
        content={t('permit.placeholders.situationInfo')}
        className={isSubmitting ? 'opacity-75' : ''}
      />
    </PermitPageLayout>
  );
};

export default SituationDescriptionPage;
