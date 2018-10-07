import React, { Component } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Header } from 'react-navigation';

import i18n from '../locale/i18n';
import keyValues from '../locale/keyValues';
import MainCardContainer from '../common/MainCardContainer';
import { renderField } from '../common/forms/formElements';
import { PrimaryButton } from '../common/Buttons';
import { validateEmptyInput } from '../common/forms/functions';
import { CREATE_CATEGORY, CREATE_CATEGORY_SUCCESS } from '../sagas/types';

class AddCategory extends Component {
  componentDidUpdate() {
    if(this.props.invoices.createCategorySuccess) {
      this.props.dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: false });
      this.props.navigation.navigate('Index');
    }
  }
  onSubmit({ categoryName }) {
    const uid = firebase.auth().currentUser.uid;
    this.props.dispatch({ type: CREATE_CATEGORY, categoryName, uid });
  }
  render() {
    const { handleSubmit, invoices } = this.props;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 60}
        style={styles.container}
        behavior="padding"
      >
        <ScrollView keyboardShouldPersistTaps='handled'>
          <MainCardContainer title={i18n.t(keyValues.add_invoice_category_text)}>
            <Field
              name='categoryName'
              label={i18n.t(keyValues.invoice_name)}
              placeholder={i18n.t(keyValues.invoice_name)}
              component={renderField}
              validate={validateEmptyInput}
            />
            <PrimaryButton
            disabled = {invoices.createCategoryLoading}
            onPress={handleSubmit(this.onSubmit.bind(this))}
            title={invoices.createCategoryLoading ? i18n.t(keyValues.loading) :  i18n.t(keyValues.add)}
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

const mapStateToProps = (state) => {
  return {invoices: state.invoices};
};

const AddCategoryForm = reduxForm({
  form: 'addCategory'
})(AddCategory);

export default connect(mapStateToProps, null)(AddCategoryForm);
