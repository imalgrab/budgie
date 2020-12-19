import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './src/screens/HomeScreen';
import { CreateBudgieScreen } from './src/screens/CreateBudgieScreen';
import { BudgiesProvider } from './src/BudgiesContext';
import { BudgieDetailsScreen } from './src/screens/BudgieDetailsScreen';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6A5ACD',
    accent: '#BDCD5A',
    background: 'red',
    statusBar: '#4F4399',
  },
};

type RootStackParamList = {
  Home: undefined;
  CreateBudgie: undefined;
  BudgieDetails: { id: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export const App = () => {
  return (
    <BudgiesProvider>
      {/* <SafeAreaView style={styles.statusBar} /> */}
      {/* <StatusBar style="light" backgroundColor={theme.colors.statusBar} /> */}
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CreateBudgie" component={CreateBudgieScreen} />
            <Stack.Screen
              name="BudgieDetails"
              component={BudgieDetailsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </BudgiesProvider>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    flex: 0,
    backgroundColor: theme.colors.primary,
  },
});
