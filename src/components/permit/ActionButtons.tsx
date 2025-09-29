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
        'mt-12 flex gap-6',
        isRTL ? 'flex-row-reverse' : 'flex-row',
        'flex-col sm:flex-row'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <motion.button
        onClick={handleBackToHome}
        className="group relative flex-1 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        <div className="relative flex items-center justify-center gap-3">
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
          {t('common.back_to_home')}
        </div>
      </motion.button>

      <motion.button
        onClick={handleNewApplication}
        className="group border-gradient-to-r relative flex-1 overflow-hidden rounded-2xl border-2 bg-white from-emerald-500 to-teal-500 px-8 py-4 font-semibold text-emerald-600 shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:shadow-xl focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        style={{
          background:
            'linear-gradient(white, white) padding-box, linear-gradient(45deg, #10b981, #14b8a6) border-box',
          border: '2px solid transparent',
        }}
      >
        <div className="relative flex items-center justify-center gap-3">
          {t('permit.new_application')}
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
        </div>
      </motion.button>
    </motion.div>
  );
};

export default ActionButtons;
