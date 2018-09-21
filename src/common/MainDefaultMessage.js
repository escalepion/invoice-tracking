import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const MainDefaultMessage = () => {
  return (
    <View>
      <Image 
        style={styles.image} 
        source={{ uri: 'https://www.ripandscam.com/scam-images/images/pro-forma-invoicing-scam-2.jpg' }} 
        resizeMode="cover"
      />
      <Text>Welcome</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200
  }
});

export default MainDefaultMessage;
