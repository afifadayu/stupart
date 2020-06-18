import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ HomeScreen }
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Chat"
          component={ ChatScreen }
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ ProfileScreen }
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}