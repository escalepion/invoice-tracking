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
import { validateEmptyInput, normalizeNumber } from '../common/forms/functions';
import { CREATE_INVOICE, CREATE_INVOICE_SUCCESS } from '../sagas/types';

class AddInvoice extends Component {
  componentDidUpdate() {
    if(this.props.invoices.createInvoiceSuccess) {
      this.props.dispatch({ type: CREATE_INVOICE_SUCCESS, payload: false });
      this.props.navigation.navigate('Index');
    }
  }
  onSubmit({ invoicePrice }) {
    const uid = firebase.auth().currentUser.uid;
    const categoryId = this.props.navigation.getParam('categoryId', 'noid');
    this.props.dispatch({ type: CREATE_INVOICE, invoicePrice, uid, categoryId });
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
          <MainCardContainer title={i18n.t(keyValues.add_invoice_text)}>
            <Field
              name='invoicePrice'
              label={i18n.t(keyValues.invoice_price)}
              placeholder={i18n.t(keyValues.invoice_price)}
              keyboardType='numeric'
              component={renderField}
              validate={validateEmptyInput}
              normalize={normalizeNumber}
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

const AddInvoiceForm = reduxForm({
  form: 'addInvoice'
})(AddInvoice);

export default connect(mapStateToProps, null)(AddInvoiceForm);
