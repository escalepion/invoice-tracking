import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import {connect} from 'react-redux';
import firebase from 'firebase';

import i18n from '../locale/i18n';
import keyValues from '../locale/keyValues';

import MainCardContainer from '../common/MainCardContainer';
import MainDefaultMessage from '../common/MainDefaultMessage';

class Index extends Component {
  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;
    this.props.dispatch({ type: 'FETCH_CURRENT_USER_INFO', uid });
  }
  onButtonPress() {
    firebase.auth().signOut()
      .then(() => console.log('logged out') )
      .catch(error => console.log(error));
  }
  render() {
    console.log(this.props.auth.currentUser);
    return (
      <MainCardContainer title={i18n.t(`${keyValues.my_invoices}`)}>
        <MainDefaultMessage />
        <Button
          onPress={() => this.onButtonPress()}
          title='Logout'
        />
      </MainCardContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth : state.auth };
};

export default connect(mapStateToProps, null)(Index);

