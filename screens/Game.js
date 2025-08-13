// screens/Game.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Game() {
  const [choice, setChoice] = useState('');
  const baseNumber = Math.floor(Math.random() * 100) + 1; // visible
  const score = Math.floor(Math.random() * 100) + 1;      // caché
  const navigation = useNavigation();

  useEffect(() => {
    if (!choice) return;

    const winner =
      (choice === 'higher' && score > baseNumber) ||
      (choice === 'lower' && baseNumber > score);

    Alert.alert(
      winner ? "You've won" : "You've lost",
      `baseNumber was ${baseNumber} and score ${score}`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  }, [choice, baseNumber, score, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>Starting: {baseNumber}</Text>

      <Button title="Higher" onPress={() => setChoice('higher')} />
      <Button title="Lower"  onPress={() => setChoice('lower')} />
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
});
