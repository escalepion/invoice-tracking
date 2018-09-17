import keyValues from './keyValues';

export default {
  [keyValues.pages] : {
    [keyValues.signup]: {
      [keyValues.title] : 'Signup'
    },
    [keyValues.login]: {
      [keyValues.title] : 'Login'
    }
  },
  [keyValues.common]: {
    [keyValues.current_language]: 'The current language is "{{lng}}"',
    [keyValues.turkish]: 'Türkçe',
    [keyValues.english]: 'English',
    [keyValues.loading]: 'Loading'
  },
  [keyValues.forms]: {
    [keyValues.username]: 'Username',
    [keyValues.email]: 'E-mail',
    [keyValues.password]: 'Password',
    [keyValues.password_again]: 'Retype Password',
    [keyValues.form_signup_button]: 'Join Us',
    [keyValues.form_signin_button]: 'Signin'
  },
  [keyValues.errors]: {
    [keyValues.email_form_type_error]: 'E-mail is not valid',
    [keyValues.input_form_empty_error]: `This field can't be empty`,
    [keyValues.password_confirmation_error]: `Passwords must match`,
  }
}