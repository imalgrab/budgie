import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { COLORS } from '../theme/theme';
import { StatusBar } from 'expo-status-bar';

// screens
import { BudgieDetailsScreen } from '../screens/BudgieDetailsScreen';
import { CreateBudgieScreen } from '../screens/CreateBudgieScreen';
import { CreateExpenseScreen } from '../screens/CreateExpenseScreen';
import { ExpenseDetailsScreen } from '../screens/ExpenseDetailsScreen';
import { HomeScreen } from '../screens/HomeScreen';

type RootStackParamList = {
  Home: undefined;
  CreateBudgie: undefined;
  BudgieDetails: { id: number };
  ExpenseDetails: undefined;
  CreateExpense: {
    id: number;
    currency: string;
    members: string[];
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export const ApplicationNavigator = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <SafeAreaView style={styles.statusBar} />
        <StatusBar style="dark" backgroundColor={COLORS.border} />
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CreateBudgie" component={CreateBudgieScreen} />
          <Stack.Screen name="BudgieDetails" component={BudgieDetailsScreen} />
          <Stack.Screen
            name="ExpenseDetails"
            component={ExpenseDetailsScreen}
          />
          <Stack.Screen name="CreateExpense" component={CreateExpenseScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    flex: 0,
    backgroundColor: COLORS.white,
  },
});

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    accent: COLORS.secondary,
    placeholder: COLORS.placeholder,
  },
};
