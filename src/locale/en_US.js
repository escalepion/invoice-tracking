import keyValues from './keyValues';

export default {
  [keyValues.pages] : {
    [keyValues.signup]: {
      [keyValues.title] : 'Signup'
    },
    [keyValues.login]: {
      [keyValues.title] : 'Login'
    },
    [keyValues.home]: {
      [keyValues.home] : 'Home'
    }
  },
  [keyValues.common]: {
    [keyValues.current_language]: 'The current language is "{{lng}}"',
    [keyValues.turkish]: 'Türkçe',
    [keyValues.english]: 'English',
    [keyValues.loading]: 'Loading',
    [keyValues.home_welcome_tex]: "Hey !!! You don't have any invoices added yet. You can start adding new one.",
    [keyValues.my_invoices]: 'My Incoives',
    [keyValues.add_invoice_category_text]: 'Add Invoice Category',
    [keyValues.add_invoice_text]: 'Add Invoice',
    [keyValues.add_invoice]: 'Add Invoice',
    [keyValues.invoice_name]: 'Invoice Name',
    [keyValues.invoice_price]: 'Invoice Price',
    [keyValues.invoice_category_name]: 'Invoice Category Name',
    [keyValues.add]: 'Add',
    [keyValues.delete]: 'Delete',
    [keyValues.invoices]: 'Invoices',
    [keyValues.add_field]: 'Add Field',
    [keyValues.delete_field]: 'Delete Field',
  },
  [keyValues.forms]: {
    [keyValues.username]: 'Username',
    [keyValues.email]: 'E-mail',
    [keyValues.password]: 'Password',
    [keyValues.password_again]: 'Retype Password',
    [keyValues.form_signup_button]: 'Join Us',
    [keyValues.form_signin_button]: 'Login'
  },
  [keyValues.errors]: {
    [keyValues.email_form_type_error]: 'E-mail is not valid',
    [keyValues.input_form_empty_error]: `This field can't be empty`,
    [keyValues.password_confirmation_error]: `Passwords must match`,
  }
}