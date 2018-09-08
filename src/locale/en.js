import keyValues from './keyValues';

export default {
  home: {
    title: 'Welcome',
    introduction: 'This text comes from i18next and is provided in english.'
  },
  page2: {
    title: 'Page 2',
    introduction: 'This text on page two.'
  },
  common: {
    [keyValues.common.currentLanguage]: 'The current language is "{{lng}}"',
    actions: {
      toggleToTurkish: 'Türkçe',
      toggleToEnglish: 'English',
      goToPage2: 'Open page 2'
    },
    infoText: "<0><0>Eins </O><1>Zwei </1><2>Drei </2><3>Vier </3><4>Fünf</4></O>"
  }
}