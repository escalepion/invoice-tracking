import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import Expo from 'expo';

import en_US from './en_US';
import tr_TR from './tr_TR';

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: (callback) => { return /*'en'; */ Expo.DangerZone.Localization.getCurrentLocaleAsync().then(lng => { callback(lng); }) },
  init: () => {},
  cacheUserLanguage: () => {}
}

i18n
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en_US',

    resources: {
      tr_TR,
      en_US
    },

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: true,

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    }
  });


export default i18n;
