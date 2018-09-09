import keyValues from './keyValues';

export default {
  [keyValues.pages] : {
    [keyValues.signup]: {
      [keyValues.title] : 'Signup'
    }
  },
  [keyValues.common]: {
    [keyValues.current_language]: 'The current language is "{{lng}}"',
    [keyValues.turkish]: 'Türkçe',
    [keyValues.english]: 'English',
  },
  [keyValues.forms]: {
    [keyValues.username]: 'Username',
    [keyValues.password]: 'Password',
    [keyValues.password_again]: 'Retype Password',
    [keyValues.form_signup_button]: 'Join Us',
    [keyValues.form_signin_button]: 'Signin'
  }
}