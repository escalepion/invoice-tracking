import React from 'react';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

const Logout = () => {
  return (
    <Button
    onPress={() => firebase.auth().signOut()}
    title='Logout'
  />
  );
};

export default Logout;
