import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en.json';
import ar from './ar.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async (callback: (lang: string) => void) => {
    try {
      const savedLanguage = await AsyncStorage.getItem('app_language');
      if (savedLanguage) {
        callback(savedLanguage);
        return;
      }

      const locales = RNLocalize.getLocales();
      const deviceLanguage = locales[0].languageCode === 'ar' ? 'ar' : 'en';
      callback(deviceLanguage);
    } catch (error) {
      callback('en');
    }
  },
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem('app_language', language);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
  });

export const setAppLanguage = async (language: 'en' | 'ar') => {
  try {
    await i18n.changeLanguage(language);
    await AsyncStorage.setItem('app_language', language);

    // Set RTL for Arabic
    const isRTL = language === 'ar';
    I18nManager.forceRTL(isRTL);

    return true;
  } catch (error) {
    console.error('Error changing language:', error);
    return false;
  }
};

export const getCurrentLanguage = (): 'en' | 'ar' => {
  const currentLang = i18n.language;
  return currentLang === 'ar' ? 'ar' : 'en';
};

export default i18n;
