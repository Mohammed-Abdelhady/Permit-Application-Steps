import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-bold text-gray-800"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {t('permit.title')}
      </motion.h1>
      <motion.button
        onClick={toggleLanguage}
        aria-label={`${t('language.switch')} - ${i18n.language === 'en' ? 'Switch to Arabic' : 'Switch to English'}`}
        className="rounded-lg bg-white px-4 py-2 text-sm shadow-md transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span aria-hidden="true">{t('language.switch')}</span>
      </motion.button>
    </motion.div>
  );
};

export default Header;
