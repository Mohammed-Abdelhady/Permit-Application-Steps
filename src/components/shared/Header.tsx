import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { Button } from '@/components';

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
      transition={{ duration: 0.6 }}
    >
      {/* Main Header Container */}
      <div className="relative w-full overflow-hidden rounded-3xl bg-white/80 shadow-xl ring-1 ring-gray-100 backdrop-blur-sm transition-all duration-300 hover:bg-white/90 hover:shadow-2xl">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300"></div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-4 md:px-6 md:py-5 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Brand Section */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Brand Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>

              {/* Brand Text */}
              <div className="block">
                <motion.button
                  data-testid="home-button"
                  onClick={handleHomeClick}
                  className="group bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent transition-all duration-300 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:text-xl md:text-2xl lg:text-3xl"
                  whileHover={{ scale: 1.02, y: -1 }}
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
              className="flex items-center gap-3 md:gap-4 lg:gap-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Language Toggle */}
              <Button
                data-testid="language-toggle-button"
                onClick={toggleLanguage}
                aria-label={`${t('language.switch')} - ${i18n.language === 'en' ? 'Switch to Arabic' : 'Switch to English'}`}
                variant="primary"
                colorScheme="blue"
                size="md"
                leftIcon={
                  <Globe
                    size={18}
                    className="transition-transform duration-200 group-hover:rotate-12"
                  />
                }
                className="group"
              >
                <span className="hidden sm:inline">{t('language.switch')}</span>
                <span className="sm:hidden">
                  {i18n.language === 'en' ? 'ع' : 'EN'}
                </span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
