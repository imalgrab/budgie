import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
  CreateExpense: { currency: string; members: string[] };
};

const Stack = createStackNavigator<RootStackParamList>();

export const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor={COLORS.primary} />
      <SafeAreaView style={styles.statusBar} />
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateBudgie" component={CreateBudgieScreen} />
        <Stack.Screen name="BudgieDetails" component={BudgieDetailsScreen} />
        <Stack.Screen name="ExpenseDetails" component={ExpenseDetailsScreen} />
        <Stack.Screen name="CreateExpense" component={CreateExpenseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    flex: 0,
    backgroundColor: COLORS.background,
  },
});
