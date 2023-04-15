import i18next from 'i18next';
import english from './english.json';
import kinyarwanda from './kinya.json';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import i18nDetector from 'i18next-browser-languagedetector';
import IntlPluralRules from 'intl-pluralrules';

i18next.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: english,
    kinya: kinyarwanda,
  },

  interpolation: {
    escapeValue: false,
  },
  pluralResolver: (count, options) => {
    const pluralRules = new IntlPluralRules(options.lng);
    return pluralRules.select(count);
  },
});

export default i18next;
