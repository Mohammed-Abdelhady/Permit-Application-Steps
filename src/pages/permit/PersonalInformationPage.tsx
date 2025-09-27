import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PermitPageLayout, FormPlaceholder } from '../../components';
import { usePermitSteps } from '../../hooks';
import { useNavigation } from '../../contexts';

const PersonalInformationPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setDirection } = useNavigation();
  const { steps } = usePermitSteps(1);

  const handleNext = () => {
    setDirection('forward');
    navigate('/permit/family-financial');
  };

  return (
    <PermitPageLayout
      title={t('permit.steps.personal')}
      currentStep={1}
      steps={steps}
      direction="forward"
      showNext
      onNext={handleNext}
      contentClassName={steps[0]?.isCompleted ? 'opacity-90' : ''}
    >
      <FormPlaceholder content={t('permit.placeholders.personalInfo')} />
    </PermitPageLayout>
  );
};

export default PersonalInformationPage;
