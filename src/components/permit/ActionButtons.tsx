import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

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

  return (
    <motion.div
      className={classNames(
        'mt-8 flex gap-4',
        isRTL ? 'flex-row-reverse' : 'flex-row',
        'flex-col sm:flex-row'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <motion.button
        onClick={handleBackToHome}
        className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {t('common.back_to_home')}
      </motion.button>

      <motion.button
        onClick={handleNewApplication}
        className="flex-1 rounded-lg border-2 border-blue-600 bg-white px-6 py-3 font-medium text-blue-600 shadow-md transition-all duration-200 hover:bg-blue-50 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {t('permit.new_application')}
      </motion.button>
    </motion.div>
  );
};

export default ActionButtons;
