import React, { Component } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Header } from 'react-navigation';

import i18n from '../../locale/i18n';
import keyValues from '../../locale/keyValues';
import MainCardContainer from '../../common/MainCardContainer';
import { renderField } from '../../common/forms/formElements';
import { PrimaryButton } from '../../common/Buttons';
import { validateEmptyInput, normalizeNumber } from '../../common/forms/functions';
import {
  CREATE_INVOICE_FORM_FIELD,
  DELETE_FIELD
} from '../../sagas/types';

class AddInvoice extends Component {
  onDeleteField(fieldId) {
    const uid = firebase.auth().currentUser.uid;
    const categoryId = this.props.categoryId;
    this.props.dispatch({ type: DELETE_FIELD, uid, categoryId, fieldId });
  }
  renderTemplateFields() {
    const currentCategory = this.props.invoices.categoryList.find(item => item.id === this.props.categoryId);
    if (currentCategory.formTemplate) {
      const fieldList = currentCategory.formTemplate;
      const fieldArray = Object.keys(fieldList).map((key) => {
        return { id: key, fieldName: fieldList[key].fieldName, fieldType: fieldList[key].fieldType, required: fieldList[key].required };
      });
      if (fieldArray && fieldArray.length) {
        return fieldArray.map(field => {
          return (
            <View key={field.id}>
              <Field
                name={field.id}
                label={field.fieldName}
                placeholder={field.fieldName}
                component={renderField}
                validate={validateEmptyInput}
              />
              <PrimaryButton
                onPress={() => this.onDeleteField(field.id)}
                title={i18n.t(keyValues.delete_field)}
              />
            </View>
          );
        });
      }
    }
  }
  onAdd() {
    const uid = firebase.auth().currentUser.uid;
    const categoryId = this.props.categoryId;
    const fieldType = 'text';
    const required = false;
    const fieldName = 'Fieldd';
    this.props.dispatch({ type: CREATE_INVOICE_FORM_FIELD, fieldType, fieldName, required, uid, categoryId });
  }
  onSubmit(values) {
    this.props.onSubmit(values);
  }
  renderButtonTitle() {
    switch(this.props.type) {
      case 'add':
        return i18n.t(keyValues.add_invoice)
      case 'update':
        return i18n.t(keyValues.update_invoice)
      default:
        return i18n.t(keyValues.add_invoice)
    }
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
            {this.renderTemplateFields()}
            <View style={styles.buttonContainer}>
              <PrimaryButton
                onPress={this.onAdd.bind(this)}
                title={i18n.t(keyValues.add_field)}
              />
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton
                disabled={invoices.createInvoiceLoading}
                onPress={handleSubmit(this.props.onSubmit.bind(this))}
                title={invoices.createInvoiceLoading || invoices.updateInvoiceLoading ? i18n.t(keyValues.loading) : this.renderButtonTitle()}
              />
            </View>
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
  },
  buttonContainer: {
    marginTop: 15
  }
});

const mapStateToProps = (state) => {
  return { invoices: state.invoices };
};

const AddInvoiceForm = reduxForm({
  form: 'addInvoice',
  enableReinitialize: true
})(AddInvoice);

export default connect(mapStateToProps, null)(AddInvoiceForm);
