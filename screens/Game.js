// screens/Game.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AnimatedButton from '../components/AnimatedButton';

export default function Game() {
  const [choice, setChoice] = useState(null);
  const baseNumber = Math.floor(Math.random() * 100) + 1;
  const score = Math.floor(Math.random() * 100) + 1;
  const navigation = useNavigation();

  useEffect(() => {
    if (!choice) return;

    const won =
      (choice === 'higher' && score > baseNumber) ||
      (choice === 'lower' && score < baseNumber);

    Alert.alert(
      won ? "You've won" : "You've lost",
      `You scored: ${score}`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  }, [choice]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.baseNumber}>Starting: {baseNumber}</Text>

      <AnimatedButton action="higher" onPress={() => setChoice('higher')} />
      <AnimatedButton action="lower" onPress={() => setChoice('lower')} />
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
  baseNumber: {
    fontSize: 30,
    marginBottom: 30,
  },
});
