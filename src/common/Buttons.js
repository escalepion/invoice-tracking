import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export const PrimaryButton = ({ onPress, title }) => {
  return (
    <Button
      buttonStyle={styles.PrimaryButton}
      onPress={onPress}
      title={title}
    />
  );
}

const styles = StyleSheet.create({
  PrimaryButton: {
    backgroundColor: '#0000FF'
  }
});