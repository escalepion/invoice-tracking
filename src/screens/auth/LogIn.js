import React, { Component } from 'react';
import { Header } from 'react-navigation';
import { KeyboardAvoidingView, ScrollView, Picker, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import { Button, FormValidationMessage, Card } from 'react-native-elements';
import { translate } from 'react-i18next';

import i18n from '../../locale/i18n';
import tKeyValues from '../../locale/keyValues';
import { validateEmptyInput, validateMail } from '../../common/forms/functions';
import { renderField } from '../../common/forms/formElements';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: i18n.language
    }
  }

  static navigationOptions = ({ screenProps }) => ({
    title: screenProps.t(`${tKeyValues.pages}:${tKeyValues.login}.${tKeyValues.title}`),
    headerLeft: null
  });

  handleFormSubmit({ email, password }) {
    this.props.dispatch({ type: 'SIGN_IN_REQUEST', email, password });
  }

  handleLoginClicked() {
    this.props.navigation.navigate('Signup');
  }

  handlePicker(itemValue) {
    this.setState({ language: itemValue });
    this.props.i18n.changeLanguage(itemValue);
    this.props.dispatch(reset('login'));
  }

  render() {
    const { handleSubmit, t, auth } = this.props;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 60}
        style={styles.container}
        behavior="padding" >
        <ScrollView keyboardShouldPersistTaps='handled'>
        <Card containerStyle={styles.card}>
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

          <Picker
            selectedValue={this.state.language}
            style={styles.pickerStyle}
            onValueChange={itemValue => this.handlePicker(itemValue)}>
            <Picker.Item label={t(`${tKeyValues.common}:${tKeyValues.turkish}`)} value="tr_TR" />
            <Picker.Item label={t(`${tKeyValues.common}:${tKeyValues.english}`)} value="en_US" />
          </Picker>

          <Button
            raised
            disabled = {auth.signinLoading}
            buttonStyle={styles.submitButton}
            onPress={handleSubmit(this.handleFormSubmit.bind(this))}
            title={auth.signinLoading ? i18n.t(`${tKeyValues.loading}`) : t(`${tKeyValues.forms}:${tKeyValues.form_signin_button}`)}
          />
          <Button 
            buttonStyle={styles.loginButton}
            onPress={this.handleLoginClicked.bind(this)}
            title = { t(`${tKeyValues.forms}:${tKeyValues.form_signup_button}`)} 
          />
          {this.props.errorMessage && <FormValidationMessage>{this.props.errorMessage}</FormValidationMessage>}
        </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const blueColor = '#0000FF';
const loginButtonColor = '#8AC24A';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 20
  },
  submitButton: {
    backgroundColor: blueColor
  },
  card: {
    marginBottom: 20
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

const mapStateToProps = (state) => {
  return { auth : state.auth };
};

const LoginForm = reduxForm({
  form: 'login'
})(Login);

export default translate([`${tKeyValues.pages}`, `${tKeyValues.common}`, `${tKeyValues.forms}`], { wait: true })(connect(mapStateToProps, null)(LoginForm));