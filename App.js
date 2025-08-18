import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Result from './screens/Result';
import Home from './screens/Home';
import Game from './screens/Game';

const Stack = createNativeStackNavigator();
const VIOLET = '#6B4CF6';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: VIOLET,
    card: VIOLET,
  },
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="light" backgroundColor={VIOLET} />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: VIOLET },
            headerTintColor: '#FFFFFF',              
            headerTitleStyle: { fontWeight: '800' }, 
            headerShadowVisible: false,              
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="Result" component={Result} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
