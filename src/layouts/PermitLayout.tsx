import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PermitLayout = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="mx-auto mb-8 flex max-w-4xl items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          {t('permit.title')}
        </h1>
        <button
          onClick={toggleLanguage}
          className="rounded-lg bg-white px-4 py-2 text-sm shadow-md transition-colors hover:bg-gray-50"
        >
          {t('language.switch')}
        </button>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl">
        <Outlet />
      </div>
    </div>
  );
};

export default PermitLayout;
