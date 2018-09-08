import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
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
  constructor(props) {
    super(props);
    this.state = {
      language : 'en'
    }
  }

  handleFormSubmit(values) {
    console.log(values);
  }

  render() {
    // console.log(this.state.language);
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

        <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => {this.setState({ language: itemValue }); i18n.changeLanguage(itemValue)}}>
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Turkish" value="tr" />
        </Picker>

        <Button
          onPress={handleSubmit(this.handleFormSubmit.bind(this))}
          title='ÜYE OL'
        />
        <Button
          onPress={() => { i18n.changeLanguage('en') }}
          title={t('common:actions.toggleToEnglish')}
        />
        <Button
          onPress={() => { i18n.changeLanguage('tr') }}
          title={t('common:actions.toggleToTurkish')}
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