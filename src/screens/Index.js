import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import {connect} from 'react-redux';
import firebase from 'firebase';

import i18n from '../locale/i18n';
import keyValues from '../locale/keyValues';
import { FETCH_CATEGORIES } from '../sagas/types';

import MainCardContainer from '../common/MainCardContainer';
import MainDefaultMessage from '../common/MainDefaultMessage';
import Categories from '../components/Categories';
import FullPageSpinner from '../common/FullPageSpinner';

class Index extends Component {
  static navigationOptions = ({ screenProps }) => ({
    title: screenProps.t(`${keyValues.pages}:${keyValues.home}.${keyValues.home}`)
  });
  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;
    this.props.dispatch({ type: 'FETCH_CURRENT_USER_INFO', uid });
    this.props.dispatch({ type: FETCH_CATEGORIES, uid });
  }
  componentDidUpdate(prevProps) {
    console.log(prevProps.invoices.categoryList);
    console.log(this.props.invoices.categoryList);
  }
  renderScreen() {
    if(this.props.invoices.categoryList.length === 0) {
      return (
        <View style={styles.container}>
          <MainCardContainer title={i18n.t(keyValues.my_invoices)}>
            <MainDefaultMessage />
            <Button
              buttonStyle= {styles.addButtonText}
              onPress={() => this.props.navigation.navigate('AddCategory')}
              title={i18n.t(keyValues.add_invoice_category_text)}
            />
          </MainCardContainer>
        </View>
      );
    }
    return <View style={styles.container}><Categories categoryList={this.props.invoices.categoryList}/></View>
  }
  render() {
    if(this.props.invoices.categoriesLoading) {
      return <View style={styles.container}><FullPageSpinner /></View>
    }
    return this.renderScreen();
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
  return { auth : state.auth, invoices: state.invoices };
};

export default connect(mapStateToProps, null)(Index);

