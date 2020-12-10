import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { HomeScreen } from './src/screens/HomeScreen';
import { CreateBudgieScreen } from './src/screens/CreateBudgieScreen';

const Stack = createStackNavigator();

export const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CreateBudgie" component={CreateBudgieScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
