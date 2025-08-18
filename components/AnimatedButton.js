import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, Animated } from 'react-native';

export default function AnimatedButton({ action, onPress }) {
  const opacity = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.timing(opacity, {
      toValue: 0.85,
      duration: 90,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 90,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[
          styles.button,
          action === 'higher' ? styles.buttongreen : styles.buttonpink,
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginVertical: 10,
    borderRadius: 28,                 
    minWidth: 150,
    borderWidth: 3,                   
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
  },
  buttongreen: {
    backgroundColor: '#33D17A',     
  },
  buttonpink: {
    backgroundColor: '#FF6EC7',      
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
});
