import keyValues from './keyValues';

export default {
  [keyValues.pages] : {
    [keyValues.signup]: {
      [keyValues.title] : 'Üye Ol'
    }
  },
  [keyValues.common]: {
    [keyValues.current_language]: 'Geçerli dil : "{{lng}}"',
    [keyValues.turkish]: 'Türkçe',
    [keyValues.english]: 'English',
  },
  [keyValues.forms]: {
    [keyValues.username]: 'Kullanıcı Adı',
    [keyValues.password]: 'Şifre',
    [keyValues.password_again]: 'Şifre Tekrarı',
    [keyValues.form_signup_button]: 'Üye Ol',
    [keyValues.form_signin_button]: 'Giriş Yap'
  }
};