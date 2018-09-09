import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'react-native-elements';
import { translate } from 'react-i18next';

import tKeyValues from '../../locale/keyValues';
import { validateEmptyInput, validateMail } from '../../common/forms/functions';
import { renderField } from '../../common/forms/formElements';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language : 'en'
    }
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t(`${tKeyValues.pages}:${tKeyValues.signup}.${tKeyValues.title}`)
  });

  handleFormSubmit(values) {
    console.log(values);
  }

  render() {
    // console.log(this.state.language);
    const { handleSubmit } = this.props;
    const { t, i18n, navigation } = this.props;
    return (
      <View>
        {/* <Text>{t(`${tKeyValues.common}:${tKeyValues.current_language}`, { lng: i18n.language })}</Text> */}
        <Field
          style={{ marginTop: 10 }}
          name='username'
          label = {t(`${tKeyValues.forms}:${tKeyValues.username}`)}
          placeholder= {t(`${tKeyValues.forms}:${tKeyValues.username}`)}
          component={renderField}
          validate={validateEmptyInput}
        />

        <Field
          secureTextEntry
          name='password'
          label={t(`${tKeyValues.forms}:${tKeyValues.password}`)}
          placeholder={t(`${tKeyValues.forms}:${tKeyValues.password}`)}
          component={renderField}
        />

        <Field
          secureTextEntry
          name='passwordConfirm'
          label={t(`${tKeyValues.forms}:${tKeyValues.password_again}`)}
          placeholder={t(`${tKeyValues.forms}:${tKeyValues.password_again}`)}
          component={renderField}
        />

        <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: '100%' }}
          onValueChange={(itemValue, itemIndex) => {this.setState({ language: itemValue }); i18n.changeLanguage(itemValue)}}>
          <Picker.Item label={t(`${tKeyValues.common}:${tKeyValues.turkish}`)} value="tr" />
          <Picker.Item label={t(`${tKeyValues.common}:${tKeyValues.english}`)} value="en_Us" />
        </Picker>

        <Button
          onPress={handleSubmit(this.handleFormSubmit.bind(this))}
          title={t(`${tKeyValues.forms}:${tKeyValues.form_signup_button}`)}
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

export default translate([`${tKeyValues.pages}`, `${tKeyValues.common}`, `${tKeyValues.forms}`], { wait: true })(connect(null, null)(SignupForm));