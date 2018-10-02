import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import i18n from '../locale/i18n';
import keyValues from '../locale/keyValues';

const MainDefaultMessage = () => {
  return (
    <View>
      <Image 
        style={styles.image} 
        source={{ uri: 'https://www.ripandscam.com/scam-images/images/pro-forma-invoicing-scam-2.jpg' }} 
        resizeMode="cover"
      />
      <Text style={styles.text}>{i18n.t(keyValues.home_welcome_tex)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200
  },
  text: {
    fontSize: 12,
    marginTop: 10
  }
});

export default MainDefaultMessage;
