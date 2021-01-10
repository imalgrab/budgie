import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { HomeScreen } from './src/screens/HomeScreen';
import { CreateBudgieScreen } from './src/screens/CreateBudgieScreen';
import { BudgiesProvider } from './src/BudgiesContext';
import { BudgieDetailsScreen } from './src/screens/BudgieDetailsScreen';
import { ExpenseDetailsScreen } from './src/screens/ExpenseDetailsScreen';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { CreateExpenseScreen } from './src/screens/CreateExpenseScreen';

type RootStackParamList = {
  Home: undefined;
  CreateBudgie: undefined;
  BudgieDetails: { id: number };
  ExpenseDetails: undefined;
  CreateExpense: { currency: string; members: string[] };
};

const Stack = createStackNavigator<RootStackParamList>();

export const App = () => {
  let [fontsLoaded] = useFonts({
    NexaBold: require('./assets/fonts/NexaDemo-Bold.ttf'),
    Medium: require('./assets/fonts/NotoSansKR-Medium.otf'),
    Regular: require('./assets/fonts/NotoSansKR-Regular.otf'),
    Light: require('./assets/fonts/NotoSansKR-Light.otf'),
    Thin: require('./assets/fonts/NotoSansKR-Thin.otf'),
    Bold: require('./assets/fonts/NotoSansKR-Bold.otf'),
    Black: require('./assets/fonts/NotoSansKR-Black.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <BudgiesProvider>
      <StatusBar style="dark" backgroundColor={theme.colors.statusBar} />
      <SafeAreaView style={styles.statusBar} />
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CreateBudgie" component={CreateBudgieScreen} />
            <Stack.Screen
              name="BudgieDetails"
              component={BudgieDetailsScreen}
            />
            <Stack.Screen
              name="ExpenseDetails"
              component={ExpenseDetailsScreen}
            />
            <Stack.Screen
              name="CreateExpense"
              component={CreateExpenseScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </BudgiesProvider>
  );
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFF',
    statusBar: '#FFF',
    accent: '#F5DF4D',
    background: '#f0f0f0',
  },
};

const styles = StyleSheet.create({
  statusBar: {
    flex: 0,
    backgroundColor: theme.colors.primary,
  },
});
