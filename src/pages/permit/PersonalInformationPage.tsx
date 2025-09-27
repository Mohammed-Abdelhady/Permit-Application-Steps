import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ProgressIndicator from '../../components/shared/ProgressIndicator';
import Navigation from '../../components/shared/Navigation';
import { usePermitSteps } from '../../hooks/usePermitSteps';

const PersonalInformationPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { steps } = usePermitSteps(1);
  const handleNext = () => {
    navigate('/permit/family-financial');
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        {t('permit.steps.personal')}
      </h2>

      <ProgressIndicator steps={steps} currentStep={1} />

      {/* Form Content Placeholder */}
      <div className="mb-8 space-y-4">
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
          <p className="text-gray-500">
            {t('permit.placeholders.personalInfo')}
          </p>
        </div>
      </div>

      <Navigation showNext onNext={handleNext} />
    </div>
  );
};

export default PersonalInformationPage;
