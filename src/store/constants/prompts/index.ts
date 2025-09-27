import { EN_PROMPTS } from './en';
import { AR_PROMPTS } from './ar';

// Supported languages
export type SupportedLanguage = 'en' | 'ar';

// Prompt types
export type PromptType =
  | 'financial'
  | 'employment'
  | 'reason'
  | 'system'
  | 'general';

// Prompts collection
const PROMPTS = {
  en: EN_PROMPTS,
  ar: AR_PROMPTS,
} as const;

/**
 * Get localized prompt based on current language
 * @param language - The language code ('en' or 'ar')
 * @param promptType - The type of prompt to retrieve
 * @returns The localized prompt string
 */
export const getLocalizedPrompt = (
  language: SupportedLanguage,
  promptType: PromptType
): string => {
  // Fallback to English if language is not supported
  const selectedLanguage = language in PROMPTS ? language : 'en';
  return PROMPTS[selectedLanguage][promptType];
};

/**
 * Get current language from i18n or fallback to English
 * This function should be called from components that have access to i18n
 */
export const getCurrentLanguage = (): SupportedLanguage => {
  // Try to get language from various sources
  if (typeof window !== 'undefined') {
    // Check localStorage for i18next language
    const storedLang = localStorage.getItem('i18nextLng');
    if (storedLang === 'ar' || storedLang === 'en') {
      return storedLang;
    }

    // Check document language
    const docLang = document.documentElement.lang;
    if (docLang === 'ar' || docLang === 'en') {
      return docLang as SupportedLanguage;
    }

    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'ar' || browserLang === 'en') {
      return browserLang as SupportedLanguage;
    }
  }

  // Default to English
  return 'en';
};

/**
 * Get field-specific prompts with localization
 * @param language - The language code
 * @returns Object with localized field prompts
 */
export const getFieldPrompts = (language: SupportedLanguage) => ({
  financial: getLocalizedPrompt(language, 'financial'),
  employment: getLocalizedPrompt(language, 'employment'),
  reason: getLocalizedPrompt(language, 'reason'),
});

// Export prompt constants for direct access
export { EN_PROMPTS, AR_PROMPTS, PROMPTS };
