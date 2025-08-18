import React from 'react';
import { StyleSheet, View, Text, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';

export default function Home() {
  const navigation = useNavigation();

  const longPress = Gesture.LongPress()
    .minDuration(400)
    .onEnd((_e, success) => { if (success) navigation.navigate('Game'); });

  const tap = Gesture.Tap()
    .requireExternalGestureToFail(longPress)
    .onEnd((_e, success) => { if (success) Alert.alert('Long press to start the game'); });

  const composed = Gesture.Simultaneous(tap, longPress);

  return (
    <View style={styles.container}>
      <View style={styles.animWrap} pointerEvents="none">
        {Platform.OS !== 'web' && (
          <LottieView
            autoPlay
            loop
            style={styles.anim}
            source={require('../assets/play.json')}
          />
        )}
      </View>

      <View style={styles.titleStack} pointerEvents="none">
        <Text style={[styles.title, styles.glowOuter]}>
          <Text style={styles.titleGame}>GAME </Text>
          <Text style={styles.titleApp}>APP</Text>
        </Text>
        <Text style={[styles.title, styles.glowInner]}>
          <Text style={styles.titleGame}>GAME </Text>
          <Text style={styles.titleApp}>APP</Text>
        </Text>
        <Text style={styles.titleTop}>
          <Text style={styles.titleGame}>GAME </Text>
          <Text style={styles.titleApp}>APP</Text>
        </Text>
      </View>

      <GestureDetector gesture={composed}>
        <View style={styles.ctaOuter}>
          <View style={styles.ctaInner}>
            <Text style={styles.ctaText}>START GAME</Text>
          </View>
        </View>
      </GestureDetector>

      <View style={styles.hintFreeWrap} pointerEvents="none">
        <Text style={[styles.hint, styles.hintGlowOuter]}>PRESS THE BUTTON</Text>
        <Text style={[styles.hint, styles.hintGlowInner]}>PRESS THE BUTTON</Text>
        <Text style={[styles.hint, styles.hintTop]}>PRESS THE BUTTON</Text>
      </View>
    </View>
  );
}

const VIOLET = '#6B4CF6';
const WHITE  = '#FFFFFF';
const YELLOW = '#FFD43B';
const PINK   = '#FF6EC7';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VIOLET,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

 
  animWrap: {
    marginTop: -170,
    marginBottom: 20, 
  },
  anim: {
    width: 200,
    height: 200,
  },

  titleStack: {
    alignItems: 'center',
    marginBottom: 46,
    position: 'relative',
  },
  title: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  titleTop: {
    textAlign: 'center',
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 6,
  },
  glowOuter: {
    textShadowColor: 'rgba(123,72,255,0.9)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  glowInner: {
    textShadowColor: 'rgba(255,255,255,0.9)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  titleGame: { color: YELLOW },
  titleApp:  { color: WHITE  },

  ctaOuter: {
    width: 280,
    borderRadius: 22,
    borderWidth: 4,
    borderColor: WHITE,
    backgroundColor: PINK,
    padding: 6,
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 14,
    elevation: 8,
  },
  ctaInner: {
    borderRadius: 16,
    backgroundColor: '#FF8FD6',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: WHITE,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
  },

  hintFreeWrap: {
    position: 'absolute',
    bottom: 86,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  hint: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2,
    color: WHITE,
    textTransform: 'uppercase',
  },
  hintGlowOuter: {
    textShadowColor: 'rgba(107,76,246,0.9)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  hintGlowInner: {
    textShadowColor: 'rgba(255,255,255,0.9)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  hintTop: {
    color: YELLOW,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
});
