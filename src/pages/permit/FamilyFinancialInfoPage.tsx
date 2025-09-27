import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PermitPageLayout, FormPlaceholder } from '../../components';
import { usePermitSteps } from '../../hooks';
import { useNavigation } from '../../contexts';
import classNames from 'classnames';

const FamilyFinancialInfoPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { direction, setDirection } = useNavigation();
  const { steps } = usePermitSteps(2);

  const handleNext = () => {
    setDirection('forward');
    navigate('/permit/situation');
  };

  const handlePrevious = () => {
    setDirection('backward');
    navigate('/permit/personal');
  };

  const contentClassName = classNames({
    'ring-2 ring-blue-200': direction === 'forward',
    'ring-2 ring-gray-200': direction === 'backward',
  });

  return (
    <PermitPageLayout
      title={t('permit.steps.familyFinancial')}
      currentStep={2}
      steps={steps}
      direction={direction}
      showPrevious
      showNext
      onPrevious={handlePrevious}
      onNext={handleNext}
      contentClassName={contentClassName}
    >
      <FormPlaceholder
        content={t('permit.placeholders.familyInfo')}
        direction={direction}
      />
    </PermitPageLayout>
  );
};

export default FamilyFinancialInfoPage;
