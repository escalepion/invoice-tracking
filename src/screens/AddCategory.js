import React, { Component } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { Header } from 'react-navigation';

import i18n from '../locale/i18n';
import keyValues from '../locale/keyValues';
import MainCardContainer from '../common/MainCardContainer';
import { renderField } from '../common/forms/formElements';
import { validateEmptyInput } from '../common/forms/functions';

class AddCategory extends Component {
  render() {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 60}
        style={styles.container}
        behavior="padding"
      >
        <ScrollView keyboardShouldPersistTaps='handled'>
          <MainCardContainer title={i18n.t(keyValues.add_invoice_category_text)}>
            <Field
              name='username'
              label={i18n.t(keyValues.invoice_name)}
              placeholder={i18n.t(keyValues.invoice_name)}
              component={renderField}
              validate={validateEmptyInput}
            />
          </MainCardContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingTop: 10
  }
});

const AddCategoryForm = reduxForm({
  form: 'addCategory'
})(AddCategory);

export default AddCategoryForm;
