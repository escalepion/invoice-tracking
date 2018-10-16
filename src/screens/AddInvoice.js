import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';

import AddInvoiceForm from '../components/Invoices/AddInvoiceForm';
import {
  CREATE_INVOICE,
  CREATE_INVOICE_SUCCESS
} from '../sagas/types';

class AddInvoice extends Component {
  componentDidUpdate() {
    if (this.props.invoices.createInvoiceSuccess) {
      const id = this.props.navigation.getParam('categoryId', 'noid');
      this.props.dispatch({ type: CREATE_INVOICE_SUCCESS, payload: false });
      this.props.navigation.navigate('CategoryDetail', { id });
    }
  }
  onSubmit(values) {
    const uid = firebase.auth().currentUser.uid;
    const categoryId = this.props.navigation.getParam('categoryId', 'noid');
    this.props.dispatch({ type: CREATE_INVOICE, values, uid, categoryId });
  }
  render() {
    const categoryId = this.props.navigation.getParam('categoryId', 'noid');
    return (
      <AddInvoiceForm categoryId={categoryId} onSubmit={this.onSubmit.bind(this)} type='add'/>
    );
  }
}

const mapStateToProps = (state) => {
  return { invoices: state.invoices };
};

export default connect(mapStateToProps, null)(AddInvoice);
