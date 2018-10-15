import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Button } from 'react-native-elements';

import { FETCH_INVOICES } from '../sagas/types';
import i18n from '../locale/i18n';
import keyValues from '../locale/keyValues';
import MainCardContainer from '../common/MainCardContainer';
import InvoiceList from '../components/Invoices';

class Invoices extends Component {
  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;
    const categoryId = this.props.navigation.getParam('id');
    this.props.dispatch({ type: FETCH_INVOICES, uid, categoryId });
  }
  renderScreen() {
    const categoryId = this.props.navigation.getParam('id', 'noid');
    const invoiceList = this.props.invoices.invoiceList;
    console.log(invoiceList.length);
    if (invoiceList.length === 0) {
      return (
      <View>
        <Text>Henüz bir fatura eklemediniz. Bir tane ekleyerek başlayabilirsiniz.</Text>
        <Button
          buttonStyle={styles.addButtonText}
          onPress={() => this.props.navigation.navigate('AddInvoice', { categoryId })}
          title={i18n.t(keyValues.add_invoice)}
        />
      </View>
      );
    }
    return <InvoiceList invoiceList={invoiceList} categoryId={categoryId} />
  }
  render() {
    return (
      <View style={styles.container}>
        <MainCardContainer title={i18n.t(keyValues.my_invoices)}>
          {this.renderScreen()}
        </MainCardContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingTop: 10
  },
  addButtonText: {
    backgroundColor: '#0000FF',
    marginTop: 10
  }
});

const mapStateToProps = (state) => {
  return { invoices: state.invoices };
};

export default connect(mapStateToProps, null)(Invoices);
