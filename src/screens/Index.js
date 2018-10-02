import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import {connect} from 'react-redux';
import firebase from 'firebase';

import i18n from '../locale/i18n';
import keyValues from '../locale/keyValues';

import MainCardContainer from '../common/MainCardContainer';
import MainDefaultMessage from '../common/MainDefaultMessage';

class Index extends Component {
  static navigationOptions = ({ screenProps }) => ({
    title: screenProps.t(`${keyValues.pages}:${keyValues.home}.${keyValues.home}`)
  });
  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;
    this.props.dispatch({ type: 'FETCH_CURRENT_USER_INFO', uid });
  }
  render() {
    console.log('current user: ',this.props.auth.currentUser);
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
  return { auth : state.auth };
};

export default connect(mapStateToProps, null)(Index);

