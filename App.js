import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Result from './screens/Result';
import Home from './screens/Home';
import Game from './screens/Game';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="auto" />
     <Stack.Navigator initialRouteName="Home">
  <Stack.Screen name="Home" component={Home} />
  <Stack.Screen name="Game" component={Game} />
<Stack.Screen name="Result" component={Result} />
</Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
