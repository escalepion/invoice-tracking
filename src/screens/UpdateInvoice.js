import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';

import AddInvoiceForm from '../components/Invoices/AddInvoiceForm';
import { UPDATE_INVOICE, UPDATE_INVOICE_SUCCESS } from '../sagas/types';

class UpdateInvoice extends Component {
  componentDidUpdate() {
    if (this.props.invoices.updateInvoiceSuccess) {
      const id = this.props.navigation.getParam('categoryId', 'noid');
      this.props.dispatch({ type: UPDATE_INVOICE_SUCCESS, payload: false });
      this.props.navigation.navigate('CategoryDetail', { id });
    }
  }
  onSubmit(values) {
    const uid = firebase.auth().currentUser.uid;
    const categoryId = this.props.navigation.getParam('categoryId', 'noid');
    const invoiceId = this.props.navigation.getParam('invoiceDetails').id;
    this.props.dispatch({ type: UPDATE_INVOICE, values, uid, categoryId, invoiceId });
  }
  render() {
    const invoiceDetails = this.props.navigation.getParam('invoiceDetails')
    const categoryId = this.props.navigation.getParam('categoryId', 'noid');
    return(
      <AddInvoiceForm 
      initialValues={invoiceDetails.fields} 
      categoryId={categoryId} 
      onSubmit={this.onSubmit.bind(this)}
      type='update'
      />
    );
  }
}

const mapStateToProps = (state) => {
  return { invoices: state.invoices };
}

export default connect(mapStateToProps, null)(UpdateInvoice);
