// screens/Home.js
import React from 'react';
import { StyleSheet, View, StatusBar, TouchableHighlight, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TouchableHighlight
        underlayColor="#9b59b6"
        onPress={() => navigation.navigate('Game')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Start game!</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 300,
    height: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    backgroundColor: 'purple',
  },
  buttonText: {
    color: 'white',
    fontSize: 40,
  },
});
