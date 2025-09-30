import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '@/components';

interface ActionButtonsProps {
  isRTL: boolean;
}

const ActionButtons = ({ isRTL }: ActionButtonsProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleNewApplication = () => {
    navigate('/permit/personal');
  };

  const leftArrowIcon = (
    <svg
      className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  );

  const plusIcon = (
    <svg
      className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );

  return (
    <motion.div
      className={classNames(
        'mt-12 flex gap-6',
        isRTL ? 'flex-row-reverse' : 'flex-row',
        'flex-col sm:flex-row'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <Button
        onClick={handleBackToHome}
        data-testid="back-to-home-button"
        variant="primary"
        colorScheme="blue"
        size="lg"
        fullWidth
        leftIcon={leftArrowIcon}
        className="group"
        animated={false}
      >
        {t('common.back_to_home')}
      </Button>

      <Button
        onClick={handleNewApplication}
        data-testid="new-application-button"
        variant="outline"
        colorScheme="emerald"
        size="lg"
        fullWidth
        rightIcon={plusIcon}
        className="group border-2"
        animated={false}
        style={{
          background:
            'linear-gradient(white, white) padding-box, linear-gradient(45deg, #10b981, #14b8a6) border-box',
          border: '2px solid transparent',
        }}
      >
        {t('permit.new_application')}
      </Button>
    </motion.div>
  );
};

export default ActionButtons;
