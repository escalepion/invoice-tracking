import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Button } from 'react-native-elements';

import { FETCH_INVOICES } from '../sagas/types';
import i18n from '../locale/i18n';
import keyValues from '../locale/keyValues';
import MainCardContainer from '../common/MainCardContainer';

class Invoices extends Component {
  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;
    const categoryId = this.props.navigation.getParam('id');
    this.props.dispatch({ type: FETCH_INVOICES, uid, categoryId });
  }
  render() {
    console.log(this.props.invoices.invoiceList);
    const categoryId = this.props.navigation.getParam('id', 'noid');
    return (
      <View style={styles.container}>
        <MainCardContainer title={i18n.t(keyValues.my_invoices)}>
          <View><Text>Henüz bir fatura eklemediniz. Bir tane ekleyerek başlayabilirsiniz.</Text></View>
          <Button
            buttonStyle={styles.addButtonText}
            onPress={() => this.props.navigation.navigate('AddInvoice', { categoryId })}
            title={i18n.t(keyValues.add_invoice)}
          />
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
  return {invoices : state.invoices};
};

export default connect(mapStateToProps, null)(Invoices);
