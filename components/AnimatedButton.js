// components/AnimatedButton.js
import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, Animated } from 'react-native';

export default function AnimatedButton({ action, onPress }) {
  // Valeur animée pour l’opacité
  const opacity = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.timing(opacity, {
      toValue: 0.6,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        style={[
          styles.button,
          action === 'higher' ? styles.buttongreen : styles.buttonred,
          { opacity },
        ]}
      >
        <Text style={styles.buttonText}>{action}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 15,
    marginVertical: 15,
  },
  buttonred: {
    backgroundColor: 'red',
  },
  buttongreen: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontSize: 26,
    textTransform: 'capitalize',
  },
});
