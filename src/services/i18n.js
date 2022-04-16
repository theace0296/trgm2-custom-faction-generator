import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng  : 'en',
    interpolation: {
      escapeValue: false,
    },
    ns       : ['shared'],
    defaultNS: 'shared',
    backend  : {
      loadPath: '/trgm2-custom-faction-generator/locales/{{lng}}/{{ns}}.json',
    },
    parseMissingKeyHandler: s => {
      if (!s?.length) {
        return '';
      }
      console.warn(`Misisng Translation for key: [${s}]!`);
      return <span>{`[${s}]`}</span>;
    },
  });

export default i18n;
