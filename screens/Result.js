import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function Result() {
  const navigation = useNavigation();
  const route = useRoute();
  const { winner, baseNumber, score } = route.params;

  const titleText = winner ? 'Level Complete!' : 'Failed!';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardGlossTop} />
        <View style={styles.cardGlossSide} />
        <View style={styles.cardHalo} />

        <View style={styles.titleWrap}>
          <Text style={[styles.title, styles.titleGlowOuter]}>{titleText}</Text>
          <Text style={[styles.title, styles.titleGlowInner]}>{titleText}</Text>
          <Text style={styles.titleTop}>{titleText}</Text>
        </View>

        <Text style={styles.message}>
          baseNumber:{' '}
          <Text style={[styles.value, styles.valueYellow]}>{baseNumber}</Text>
          {'\n'}
          score:{' '}
          <Text style={[styles.value, styles.valuePink]}>{score}</Text>
        </Text>
      </View>

      {winner ? (
        <LottieView
          autoPlay
          loop
          style={{ width: 260, height: 260, marginTop: 20 }}
          source={require('../assets/winner.json')}
        />
      ) : (
        <LottieView
          autoPlay
          loop
          style={{ width: 260, height: 260, marginTop: 20 }}
          source={require('../assets/loser.json')}
        />
      )}

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.reset({
            index: 1,
            routes: [{ name: 'Home' }, { name: 'Game' }],
          });
        }}
        style={styles.retryBtnWrap}
      >
        <View style={styles.retryBtnOuter}>
          <View style={styles.retryBtnInner}>
            <Text style={styles.retryBtnText}>RETRY !</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const VIOLET = '#6B4CF6';
const WHITE  = '#FFFFFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VIOLET,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  card: {
    width: '86%',
    backgroundColor: WHITE,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: WHITE,
    paddingVertical: 26,
    paddingHorizontal: 20,
    shadowColor: WHITE,
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
    left: -12,
    right: -12,
    bottom: -12,
    height: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },

  titleWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    minHeight: 40,
    position: 'relative',
    width: '100%',
  },
  title: {
    position: 'absolute',
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.8,
  },
  titleGlowOuter: {
    color: 'transparent',
    textShadowColor: 'rgba(123,72,255,0.9)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  titleGlowInner: {
    color: 'transparent',
    textShadowColor: 'rgba(255,255,255,0.95)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  titleTop: {
    fontSize: 30,
    fontWeight: '900',
    color: VIOLET,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.08)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },

  message: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4A4A4A',
    textAlign: 'center',
    lineHeight: 28,
    letterSpacing: 0.3,
  },
  value: { fontWeight: '900' },
  valueYellow: {
    color: '#FFD43B',
    textShadowColor: 'rgba(255,230,120,0.9)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  valuePink: {
    color: '#FF6EC7',
    textShadowColor: 'rgba(255,110,199,0.85)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },

  retryBtnOuter: {
    borderRadius: 22,
    borderWidth: 4,
    borderColor: WHITE,
    backgroundColor: '#FF6EC7',  
    padding: 8,                   
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 12,
    elevation: 6,
  },
  retryBtnInner: {
    borderRadius: 16,
    backgroundColor: '#FF8FD6',   
    paddingVertical: 18,          
    paddingHorizontal: 46,        
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryBtnText: {
    color: WHITE,
    fontSize: 20,                
    fontWeight: '900',
    letterSpacing: 1.5,
  }

});
