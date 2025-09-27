import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

interface ErrorActionsProps {
  firstFocusableRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}

const ErrorActions = ({ firstFocusableRef, onClose }: ErrorActionsProps) => {
  const { t } = useTranslation();

  return (
    <footer className="flex justify-end gap-4 border-t border-gray-200 bg-gray-50 p-6">
      <motion.button
        type="button"
        onClick={onClose}
        className="group flex cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-gray-700 hover:to-gray-800 hover:shadow-xl focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        ref={firstFocusableRef}
        autoFocus
      >
        <X
          className="mr-2 h-4 w-4 transition-transform group-hover:scale-110"
          aria-hidden="true"
        />
        {t('common.close', 'Close')}
      </motion.button>
    </footer>
  );
};

export default ErrorActions;
