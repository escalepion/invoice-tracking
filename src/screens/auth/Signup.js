import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { translate } from 'react-i18next';

import { validateEmptyInput, validateMail } from '../../common/forms/functions';

const renderField = ({ input, placeholder, keyboardType, secureTextEntry, meta: { touched, error } }) => (
  <View>
    <FormLabel>{placeholder}</FormLabel>
    <FormInput
      {...input}
      keyboardType={keyboardType}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
    {touched && error && <FormValidationMessage>{error}</FormValidationMessage>}
  </View>
);

class Signup extends Component {
  handleFormSubmit(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;
    const { t, i18n, navigation } = this.props;
    return (
      <View>
        <Text>{t('common:currentLanguage', { lng: i18n.language })}</Text>
        <Text>{t('introduction')}</Text>
        <Field
          style={{ marginTop: 10 }}
          name='username'
          placeholder="Kullanıcı Adı"
          component={renderField}
          validate={validateEmptyInput}
        />

        <Field
          secureTextEntry
          name='password'
          placeholder="Şifre"
          component={renderField}
        />

        <Field
          secureTextEntry
          name='passwordConfirm'
          placeholder="Şifre Tekrarı"
          component={renderField}
        />

        <Button
          onPress={handleSubmit(this.handleFormSubmit.bind(this))}
          title='ÜYE OL'
        />
        <Button
          onPress={() => { i18n.changeLanguage('en') }}
          title={t('common:actions.toggleToEnglish')}
        />
        <Button
          onPress={() => { i18n.changeLanguage('de') }}
          title={t('common:actions.toggleToGerman')}
        />
        {this.props.errorMessage && <FormValidationMessage>{this.props.errorMessage}</FormValidationMessage>}

      </View>
    );
  }
}

function validate(values) {
  const errors = {};
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Password must match!';
  }

  return errors;
}

const SignupForm = reduxForm({
  form: 'signup',
  validate
})(Signup);

export default translate(['home', 'common'], { wait: true })(connect(null, null)(SignupForm));