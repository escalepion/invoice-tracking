import React, { Component } from 'react';
import { Header } from 'react-navigation';
import { KeyboardAvoidingView, ScrollView, Picker, StyleSheet, Text } from 'react-native';
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

  handleLoginClicked() {
    this.props.navigation.navigate('LogIn');
  }

  handlePicker(itemValue) {
    this.setState({ language: itemValue });
    this.props.i18n.changeLanguage(itemValue);
    this.props.dispatch(reset('signup'));
  }

  render() {
    const { handleSubmit, t, auth } = this.props;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 60}
        style={styles.container}
        behavior="padding" >
        <ScrollView keyboardShouldPersistTaps='handled'>

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
            style={styles.pickerStyle}
            onValueChange={itemValue => this.handlePicker(itemValue)}>
            <Picker.Item label={t(`${tKeyValues.common}:${tKeyValues.turkish}`)} value="tr_TR" />
            <Picker.Item label={t(`${tKeyValues.common}:${tKeyValues.english}`)} value="en_US" />
          </Picker>

          <Button
            raised
            disabled = {auth.signupLoading}
            buttonStyle={styles.submitButton}
            onPress={handleSubmit(this.handleFormSubmit.bind(this))}
            title={auth.signupLoading ? i18n.t(`${tKeyValues.loading}`) : t(`${tKeyValues.forms}:${tKeyValues.form_signup_button}`)}
          />
          <Button 
            buttonStyle={styles.loginButton}
            onPress={this.handleLoginClicked.bind(this)}
            title = {i18n.t(`${tKeyValues.pages}:${tKeyValues.login}.${tKeyValues.title}`)} 
          />
          {this.props.errorMessage && <FormValidationMessage>{this.props.errorMessage}</FormValidationMessage>}
        
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const blueColor = '#0000FF';
const loginButtonColor = '#8AC24A';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  submitButton: {
    backgroundColor: blueColor
  },
  pickerStyle: {
    height: 50,
    marginRight: 10,
    marginLeft: 10
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: loginButtonColor
  }
});

function validate(values) {
  const errors = {};
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = i18n.t(`${tKeyValues.errors}:${tKeyValues.password_confirmation_error}`);
  }

  return errors;
}

const mapStateToProps = (state) => {
  return { auth : state.auth };
};

const SignupForm = reduxForm({
  form: 'signup',
  validate
})(Signup);

export default translate([`${tKeyValues.pages}`, `${tKeyValues.common}`, `${tKeyValues.forms}`], { wait: true })(connect(mapStateToProps, null)(SignupForm));