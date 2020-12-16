import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './src/screens/HomeScreen';
import { CreateBudgieScreen } from './src/screens/CreateBudgieScreen';
import { BudgiesProvider } from './src/BudgiesContext';

const Stack = createStackNavigator();

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6A5ACD',
    accent: '#BDCD5A',
    background: 'red',
  },
};

export const App = () => {
  return (
    <BudgiesProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="#4F4399" />
          <SafeAreaView
            style={{ flex: 0, backgroundColor: theme.colors.primary }}
          />
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CreateBudgie" component={CreateBudgieScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </BudgiesProvider>
  );
};
