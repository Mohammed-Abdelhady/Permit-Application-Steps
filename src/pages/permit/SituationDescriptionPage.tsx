import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ProgressIndicator from '../../components/shared/ProgressIndicator';
import Navigation from '../../components/shared/Navigation';
import { usePermitSteps } from '../../hooks/usePermitSteps';

const SituationDescriptionPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { steps } = usePermitSteps(3);
  const handlePrevious = () => {
    navigate('/permit/family-financial');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(t('success.form_submitted'));
      navigate('/');
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        {t('permit.steps.situation')}
      </h2>

      <ProgressIndicator steps={steps} currentStep={3} />

      {/* Form Content Placeholder */}
      <div className="mb-8 space-y-4">
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
          <p className="text-gray-500">
            {t('permit.placeholders.situationInfo')}
          </p>
        </div>
      </div>

      <Navigation
        showPrevious
        showSubmit
        onPrevious={handlePrevious}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default SituationDescriptionPage;
