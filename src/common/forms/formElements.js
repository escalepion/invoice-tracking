import React from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

export const renderField = ({ label, input, placeholder, keyboardType, secureTextEntry, meta: { touched, error } }) => (
  <View>
    <FormLabel>{label}</FormLabel>
    <FormInput
      {...input}
      keyboardType={keyboardType}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
    {touched && error && <FormValidationMessage>{error}</FormValidationMessage>}
  </View>
);
