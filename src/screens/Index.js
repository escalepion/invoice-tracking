import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

class Index extends Component {
  onButtonPress() {
    firebase.auth().signOut()
      .then(() => console.log('logged out') )
      .catch(error => console.log(error));
  }
  render() {
    console.log(firebase.auth().currentUser);
    return (
      <View>
        <Button
          onPress={() => this.onButtonPress()}
          title='Logout'
        />
      </View>
    );
  }
};

export default Index;

