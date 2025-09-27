import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useToast } from '../../hooks/useToast';
import type { Toast } from '../../types/toast';

interface ToastItemProps {
  toast: Toast;
}

const ToastItem = ({ toast }: ToastItemProps) => {
  const { t, i18n } = useTranslation();
  const { removeToast } = useToast();
  const isRTL = i18n.language === 'ar';

  const getToastStyles = (type: Toast['type']) => {
    const baseStyles = 'border-l-4 shadow-lg backdrop-blur-sm';

    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-50/90 border-l-green-500 text-green-800`;
      case 'error':
        return `${baseStyles} bg-red-50/90 border-l-red-500 text-red-800`;
      case 'warning':
        return `${baseStyles} bg-yellow-50/90 border-l-yellow-500 text-yellow-800`;
      case 'info':
        return `${baseStyles} bg-blue-50/90 border-l-blue-500 text-blue-800`;
      default:
        return `${baseStyles} bg-gray-50/90 border-l-gray-500 text-gray-800`;
    }
  };

  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return (
          <svg
            className="h-5 w-5 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
            role="img"
            aria-label={t('common.success')}
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'error':
        return (
          <svg
            className="h-5 w-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg
            className="h-5 w-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'info':
        return (
          <svg
            className="h-5 w-5 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleClose = () => {
    removeToast(toast.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.4,
      }}
      className={classNames(
        'relative w-full max-w-lg min-w-[320px] rounded-lg p-4 sm:min-w-[400px]',
        getToastStyles(toast.type),
        {
          'ml-auto': !isRTL,
          'mr-auto': isRTL,
        }
      )}
      whileHover={{ scale: 1.02 }}
      layout
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{getIcon(toast.type)}</div>

        <div
          className={classNames('ml-3 min-w-0 flex-1', { 'mr-3 ml-0': isRTL })}
        >
          <motion.p
            className="text-sm font-medium break-words"
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t(toast.title)}
          </motion.p>

          {toast.message && (
            <motion.p
              className="mt-1 text-sm break-words opacity-90"
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t(toast.message)}
            </motion.p>
          )}

          {toast.action && (
            <motion.div
              className="mt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={toast.action.onClick}
                className="rounded-md bg-white/20 px-3 py-1 text-sm font-medium transition-colors hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none"
              >
                {t(toast.action.label)}
              </button>
            </motion.div>
          )}
        </div>

        <div
          className={classNames('ml-4 flex flex-shrink-0', {
            'mr-4 ml-0': isRTL,
          })}
        >
          <motion.button
            onClick={handleClose}
            aria-label={`${t('common.dismiss')} ${toast.type} ${t('common.notification')}`}
            className="inline-flex rounded-md p-1.5 transition-colors hover:bg-black/10 focus:ring-2 focus:ring-white/50 focus:outline-none"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="sr-only">{t('common.dismiss')}</span>
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div className="pointer-events-none fixed top-0 right-0 z-50 flex w-full max-w-lg flex-col items-end justify-start space-y-4 p-4 sm:p-6">
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <motion.div key={toast.id} className="pointer-events-auto" layout>
            <ToastItem toast={toast} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
