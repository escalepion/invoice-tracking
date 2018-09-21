import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

import MainCardContainer from '../common/MainCardContainer';
import MainDefaultMessage from '../common/MainDefaultMessage';

class Index extends Component {
  onButtonPress() {
    firebase.auth().signOut()
      .then(() => console.log('logged out') )
      .catch(error => console.log(error));
  }
  render() {
    console.log(firebase.auth().currentUser);
    return (
      <MainCardContainer title="Faturalarım">
        <MainDefaultMessage />
        <Button
          onPress={() => this.onButtonPress()}
          title='Logout'
        />
      </MainCardContainer>
    );
  }
}

export default Index;

