import React from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

const Login = () => {
  return (
    <View>
      <FormLabel>Username</FormLabel>
      <FormInput placeholder="Enter Username" />
      <FormValidationMessage>Error message</FormValidationMessage>
      
      <FormLabel>Username</FormLabel>
      <FormInput placeholder="Enter Username" />
      <FormValidationMessage>Error message</FormValidationMessage>
    </View>
  );
};

export default Login;
