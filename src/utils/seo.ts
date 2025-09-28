import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  titleKey: string;
  descriptionKey: string;
  keywordsKey?: string;
}

export const useSEO = ({ titleKey, descriptionKey, keywordsKey }: SEOProps) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const title = t(titleKey);
    const description = t(descriptionKey);
    const keywords = keywordsKey ? t(keywordsKey) : undefined;

    // Update HTML lang attribute based on current language
    document.documentElement.lang = i18n.language;

    // Update HTML dir attribute for RTL support
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

    // Update document title
    document.title = title;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update or create meta keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Add Open Graph meta tags for better social sharing
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      const ogTitleMeta = document.createElement('meta');
      ogTitleMeta.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitleMeta);
    }
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', title);

    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (!ogDescription) {
      const ogDescriptionMeta = document.createElement('meta');
      ogDescriptionMeta.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescriptionMeta);
    }
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', description);

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = t('permit.seo.app.title', 'DGE Permit Application');
    };
  }, [titleKey, descriptionKey, keywordsKey, t, i18n.language]);
};

// SEO translation keys for each page
export const SEO_KEYS = {
  app: {
    titleKey: 'permit.seo.app.title',
    descriptionKey: 'permit.seo.app.description',
    keywordsKey: 'permit.seo.app.keywords',
  },
  personal: {
    titleKey: 'permit.seo.personal.title',
    descriptionKey: 'permit.seo.personal.description',
    keywordsKey: 'permit.seo.personal.keywords',
  },
  familyFinancial: {
    titleKey: 'permit.seo.familyFinancial.title',
    descriptionKey: 'permit.seo.familyFinancial.description',
    keywordsKey: 'permit.seo.familyFinancial.keywords',
  },
  situation: {
    titleKey: 'permit.seo.situation.title',
    descriptionKey: 'permit.seo.situation.description',
    keywordsKey: 'permit.seo.situation.keywords',
  },
  success: {
    titleKey: 'permit.seo.success.title',
    descriptionKey: 'permit.seo.success.description',
    keywordsKey: 'permit.seo.success.keywords',
  },
} as const;
