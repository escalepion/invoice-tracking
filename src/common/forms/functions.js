import i18n from '../../locale/i18n';
import tKeyValues from '../../locale/keyValues';

export const validateEmptyInput = (value) => {
  return !value && i18n.t(`${tKeyValues.errors}:${tKeyValues.input_form_empty_error}`);
}

export const validateMail = (value) => {
  if(value) {
      const re = /\S+@\S+\.\S+/;
      return !re.test(value) ? i18n.t(`${tKeyValues.errors}:${tKeyValues.email_form_type_error}`) : undefined; 
  }
}