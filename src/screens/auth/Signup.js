import React, { Component } from 'react';
import { Header } from 'react-navigation';
import { KeyboardAvoidingView, ScrollView, Picker } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import { Button, FormValidationMessage } from 'react-native-elements';
import { translate } from 'react-i18next';

import i18n from '../../locale/i18n';
import tKeyValues from '../../locale/keyValues';
import { validateEmptyInput, validateMail } from '../../common/forms/functions';
import { renderField } from '../../common/forms/formElements';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: i18n.language
    }
  }

  static navigationOptions = ({ screenProps }) => ({
    title: screenProps.t(`${tKeyValues.pages}:${tKeyValues.signup}.${tKeyValues.title}`)
  });

  handleFormSubmit({ email, password, username }) {
    this.props.dispatch({ type: 'SIGN_UP_REQUEST', email, password, username, language: this.state.language });
  }

  handlePicker(itemValue) {
    this.setState({ language: itemValue });
    this.props.i18n.changeLanguage(itemValue);
    this.props.dispatch(reset('signup'));
  }

  render() {
    const { handleSubmit, t, dispatch } = this.props;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 60}
        style={{ flex: 1 }}
        behavior="padding" >
        <ScrollView>

          <Field
            name='username'
            label={t(`${tKeyValues.forms}:${tKeyValues.username}`)}
            placeholder={t(`${tKeyValues.forms}:${tKeyValues.username}`)}
            component={renderField}
            validate={validateEmptyInput}
          />
          <Field
            name='email'
            label={t(`${tKeyValues.forms}:${tKeyValues.email}`)}
            placeholder={t(`${tKeyValues.forms}:${tKeyValues.email}`)}
            keyboardType='email-address'
            component={renderField}
            validate={[validateMail, validateEmptyInput]}
          />
          <Field
            secureTextEntry
            name='password'
            label={t(`${tKeyValues.forms}:${tKeyValues.password}`)}
            placeholder={t(`${tKeyValues.forms}:${tKeyValues.password}`)}
            component={renderField}
            validate={validateEmptyInput}
          />

          <Field
            secureTextEntry
            name='passwordConfirm'
            label={t(`${tKeyValues.forms}:${tKeyValues.password_again}`)}
            placeholder={t(`${tKeyValues.forms}:${tKeyValues.password_again}`)}
            component={renderField}
            validate={validateEmptyInput}
          />

          <Picker
            selectedValue={this.state.language}
            style={{ height: 50, width: '100%' }}
            onValueChange={itemValue => this.handlePicker(itemValue)}>
            <Picker.Item label={t(`${tKeyValues.common}:${tKeyValues.turkish}`)} value="tr_TR" />
            <Picker.Item label={t(`${tKeyValues.common}:${tKeyValues.english}`)} value="en_US" />
          </Picker>

          <Button
            raised
            buttonStyle={{ backgroundColor: 'blue' }}
            onPress={handleSubmit(this.handleFormSubmit.bind(this))}
            title={t(`${tKeyValues.forms}:${tKeyValues.form_signup_button}`)}
          />
          {this.props.errorMessage && <FormValidationMessage>{this.props.errorMessage}</FormValidationMessage>}
        
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

function validate(values) {
  const errors = {};
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = i18n.t(`${tKeyValues.errors}:${tKeyValues.password_confirmation_error}`);
  }

  return errors;
}

const SignupForm = reduxForm({
  form: 'signup',
  validate
})(Signup);

export default translate([`${tKeyValues.pages}`, `${tKeyValues.common}`, `${tKeyValues.forms}`], { wait: true })(connect(null, null)(SignupForm));