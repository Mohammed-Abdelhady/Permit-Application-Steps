import { useTranslation } from 'react-i18next';
import type { Toast } from '@/types/toast';

export const getToastStyles = (type: Toast['type']) => {
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

interface ToastIconProps {
  type: Toast['type'];
}

export const ToastIcon = ({ type }: ToastIconProps) => {
  const { t } = useTranslation();

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
          aria-hidden="true"
          role="img"
          aria-label={t('common.error')}
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
          aria-hidden="true"
          role="img"
          aria-label={t('common.warning')}
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
          aria-hidden="true"
          role="img"
          aria-label={t('common.info')}
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
