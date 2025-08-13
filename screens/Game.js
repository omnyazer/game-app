import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AnimatedButton from '../components/AnimatedButton';

export default function Game() {
  const navigation = useNavigation();

  const baseNumber = useRef(Math.floor(Math.random() * 100) + 1).current;
  const score = useRef(Math.floor(Math.random() * 100) + 1).current;

  const [choice, setChoice] = useState(null); 

  useEffect(() => {
    if (!choice) return;

    const won =
      (choice === 'higher' && score > baseNumber) ||
      (choice === 'lower' && score < baseNumber);

    Alert.alert(
      won ? "You've won" : "You've lost",
      `You scored: ${score}`,
      [
        {
          text: 'OK',
          onPress: () => {
            
            navigation.navigate('Result', {
              winner: won,
              baseNumber,
              score,
            });
            
            setChoice(null);
          },
        },
      ]
    );
  }, [choice, navigation, baseNumber, score]);

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
