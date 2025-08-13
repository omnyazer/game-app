import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function Home() {
  const navigation = useNavigation();

  const longPress = Gesture.LongPress()
    .minDuration(600)
    .onEnd((_e, success) => {
      if (success) {
        navigation.navigate('Game');
      }
    });

  const tap = Gesture.Tap()
    .requireExternalGestureToFail(longPress)
    .onEnd((_e, success) => {
      if (success) {
        Alert.alert('Long press to start the game');
      }
    });

  const composed = Gesture.Simultaneous(tap, longPress);

  return (
    <View style={styles.container}>
      <GestureDetector gesture={composed}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Start game!</Text>
        </View>
      </GestureDetector>
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
    borderRadius: 150,
    backgroundColor: 'purple',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    textTransform: 'capitalize',
  },
});
