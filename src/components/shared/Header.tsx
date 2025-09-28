import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Globe } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <motion.header
      data-testid="header"
      className={`${className} relative`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Header Container */}
      <div className="relative w-full rounded-2xl border border-white/20 bg-white/90 shadow-lg shadow-blue-100/50 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-4 py-3 md:px-6 md:py-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Brand Section */}
            <motion.div
              className="flex items-center space-x-3 md:space-x-4"
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Brand Text */}
              <div className="block">
                <motion.button
                  data-testid="home-button"
                  onClick={handleHomeClick}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-sm font-bold text-transparent transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:text-lg md:text-xl lg:text-2xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={t('navigation.home')}
                >
                  {t('permit.title')}
                </motion.button>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              data-testid="header-navigation"
              className="flex items-center space-x-2 md:space-x-4 lg:space-x-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Language Toggle */}
              <motion.button
                data-testid="language-toggle-button"
                onClick={toggleLanguage}
                aria-label={`${t('language.switch')} - ${i18n.language === 'en' ? 'Switch to Arabic' : 'Switch to English'}`}
                className="flex items-center space-x-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-2 py-1.5 text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none md:space-x-2 md:px-4 md:py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe size={16} className="md:h-[18px] md:w-[18px]" />
                <span className="hidden text-xs font-medium sm:inline md:text-sm">
                  {t('language.switch')}
                </span>
                <span className="text-xs font-medium sm:hidden md:text-sm">
                  {i18n.language === 'en' ? 'ع' : 'EN'}
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
