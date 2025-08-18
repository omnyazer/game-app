import React, { useMemo, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Alert, Platform, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AnimatedButton from '../components/AnimatedButton';

export default function Game() {
  const navigation = useNavigation();

  const baseNumber = useMemo(() => Math.floor(Math.random() * 100) + 1, []);
  const score = useMemo(() => Math.floor(Math.random() * 100) + 1, []);

  const floatHigher = useRef(new Animated.Value(0)).current;
  const floatLower  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const makeLoop = (val) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(val, { toValue: -6, duration: 650, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(val, { toValue:  0, duration: 650, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(val, { toValue:  6, duration: 650, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(val, { toValue:  0, duration: 650, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      );

    const loop1 = makeLoop(floatHigher);
    const loop2 = makeLoop(floatLower);

    loop1.start();
    const delay = setTimeout(() => loop2.start(), 300);

    return () => {
      loop1.stop();
      loop2.stop();
      clearTimeout(delay);
    };
  }, [floatHigher, floatLower]);

  const handlePress = (choice) => {
    const won =
      (choice === 'higher' && score > baseNumber) ||
      (choice === 'lower' && score < baseNumber);

    const title = won ? "You've won" : "You've lost";
    const message = `baseNumber: ${baseNumber}\nscore: ${score}`;

    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
      navigation.navigate('Result', { winner: won, baseNumber, score });
    } else {
      Alert.alert(title, message, [
        { text: 'OK', onPress: () => navigation.navigate('Result', { winner: won, baseNumber, score }) },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.titleRow}>
        <View style={styles.titleStack} pointerEvents="none">
          <Text style={[styles.title, styles.titleGlowOuter]}>
            <Text style={styles.titleWhite}>LET'S </Text>
            <Text style={styles.titleYellow}>PLAY !</Text>
          </Text>
          <Text style={[styles.title, styles.titleGlowInner]}>
            <Text style={styles.titleWhite}>LET'S </Text>
            <Text style={styles.titleYellow}>PLAY !</Text>
          </Text>
          <Text style={styles.titleTop}>
            <Text style={styles.titleWhite}>LET'S </Text>
            <Text style={styles.titleYellow}>PLAY !</Text>
          </Text>
        </View>

        <LottieView
          autoPlay
          loop
          style={styles.titleAnim}
          source={require('../assets/game.json')}
        />
      </View>

      <View style={styles.card}>
        <View style={styles.cardGlossTop} />
        <View style={styles.cardGlossSide} />
        <View style={styles.cardHalo} />

        <View style={styles.startingWrap}>
          <Text style={styles.startingLabelSolo}>Starting</Text>

          <View style={styles.numberStack} pointerEvents="none">
            <Text style={[styles.numberLayer, styles.glowOuter]}>{baseNumber}</Text>
            <Text style={[styles.numberLayer, styles.glowInner]}>{baseNumber}</Text>
            <Text style={styles.numberTop}>{baseNumber}</Text>
          </View>
        </View>

        <View style={styles.buttonsCol}>
          <Animated.View style={[styles.buttonGlowWrap, styles.glowGreen, { transform: [{ translateY: floatHigher }] }]}>
            <View style={styles.buttonScale}>
              <AnimatedButton action="higher" onPress={() => handlePress('higher')} />
            </View>
          </Animated.View>

          <Animated.View style={[styles.buttonGlowWrap, styles.glowPink, { transform: [{ translateY: floatLower }] }]}>
            <View style={styles.buttonScale}>
              <AnimatedButton action="lower" onPress={() => handlePress('lower')} />
            </View>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

  const VIOLET = '#6B4CF6';
  const WHITE  = '#FFFFFF';
  const YELLOW = '#FFD43B';
  const GREEN  = '#33D17A';
  const PINK   = '#FF6EC7';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: VIOLET,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },

    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',

      marginBottom: 90, 
    },
    titleStack: {
      alignItems: 'center',
      position: 'relative',
    },
    title: {
      position: 'absolute',
      textAlign: 'center',
      fontSize: 40,
      fontWeight: '900',
      letterSpacing: 1.2,
    },
    titleTop: {
      textAlign: 'center',
      fontSize: 40,
      fontWeight: '900',
      letterSpacing: 1.2,
      textShadowColor: 'rgba(0,0,0,0.25)',
      textShadowOffset: { width: 2, height: 3 },
      textShadowRadius: 6,
    },
    titleGlowOuter: {
      color: 'transparent',
      textShadowColor: 'rgba(123,72,255,0.9)',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 20,
    },
    titleGlowInner: {
      color: 'transparent',
      textShadowColor: 'rgba(255,255,255,0.95)',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
    },
    titleYellow: { color: YELLOW },
    titleWhite:  { color: WHITE  },
    titleAnim: {
      width: 56,
      height: 56,
      marginLeft: 6,
    },

    card: {
      width: '88%',
      backgroundColor: WHITE,
      borderRadius: 26,
      borderWidth: 4,
      borderColor: WHITE,
      paddingVertical: 28,
      paddingHorizontal: 20,

      shadowColor: '#FFFFFF',
      shadowOpacity: 0.55,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 24,
      elevation: 10,

      alignItems: 'center',
      position: 'relative',
      overflow: 'visible',
    },
    cardGlossTop: {
      position: 'absolute',
      top: 10,
      left: 18,
      right: 18,
      height: 12,
      borderRadius: 8,
      backgroundColor: 'rgba(255,255,255,0.8)',
    },
    cardGlossSide: {
      position: 'absolute',
      top: 30,
      bottom: 30,
      left: 12,
      width: 8,
      borderRadius: 8,
      backgroundColor: 'rgba(255,255,255,0.35)',
    },
    cardHalo: {
      position: 'absolute',
      left: -10,
      right: -10,
      bottom: -10,
      height: 20,
      borderRadius: 20,
      backgroundColor: 'rgba(255,255,255,0.25)',
    },

    startingWrap: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
    },
    startingLabelSolo: {
      fontSize: 23,
      fontWeight: '900',
      color: VIOLET,
      marginBottom: 4,
      textShadowColor: 'rgba(0,0,0,0.06)',
      textShadowOffset: { width: 1, height: 2 },
      textShadowRadius: 3,
    },
    numberStack: {
      alignItems: 'center',
      position: 'relative',
      minHeight: 40,
    },
    numberLayer: {
      position: 'absolute',
      fontSize: 28,
      fontWeight: '900',
      letterSpacing: 0.5,
    },
    glowOuter: {
      textShadowColor: 'rgba(255, 230, 120, 0.95)',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 18,
      color: 'transparent',
    },
    glowInner: {
      textShadowColor: 'rgba(255,255,255,0.9)',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
      color: 'transparent',
    },
    numberTop: {
      fontSize: 28,
      fontWeight: '900',
      letterSpacing: 0.5,
      color: YELLOW,
      textShadowColor: 'rgba(255, 230, 120, 0.85)',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
    },

    buttonsCol: {
      width: '100%',
      alignItems: 'center',
      gap: 10,
    },
    buttonGlowWrap: {
      width: '100%',
      alignItems: 'center',
    },
    buttonScale: {
      transform: [{ scale: 1.22 }],
      alignSelf: 'center',
    },
    glowGreen: {
      shadowColor: GREEN,
      shadowOpacity: 0.7,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 18,
      borderRadius: 22,
      backgroundColor: 'transparent',
    },
    glowPink: {
      shadowColor: PINK,
      shadowOpacity: 0.7,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 18,
      borderRadius: 22,
      backgroundColor: 'transparent',
    },
  });
