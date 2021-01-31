import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { COLORS, theme } from '../theme/theme';
import { StatusBar } from 'expo-status-bar';

// screens
import { BudgieDetailsScreen } from '../screens/BudgieDetailsScreen';
import { CreateBudgieScreen } from '../screens/CreateBudgieScreen';
import { CreateExpenseScreen } from '../screens/CreateExpenseScreen';
import { ExpenseDetailsScreen } from '../screens/ExpenseDetailsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { useSelector } from 'react-redux';
import { BudgieState } from '../store/budgies/budgies';
import { UnauthorizedScreen } from '../screens/UnauthorizedScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';

type RootStackParamList = {
  Unauthorized: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  CreateBudgie: { id: string } | undefined;
  BudgieDetails: { id: string };
  ExpenseDetails: undefined;
  CreateExpense: {
    id: string;
    currency: string;
    members: string[];
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export const ApplicationNavigator = () => {
  const userToken = useSelector((state: BudgieState) => state.userToken);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <SafeAreaView
          style={userToken ? styles.statusBar : styles.statusBarUnauthorized}
        />
        <StatusBar style="dark" backgroundColor={COLORS.shadow} />
        <Stack.Navigator headerMode="none">
          {userToken ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="CreateBudgie"
                component={CreateBudgieScreen}
              />
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
            </>
          ) : (
            <>
              <Stack.Screen
                name="Unauthorized"
                component={UnauthorizedScreen}
              />
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          )}
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
  statusBarUnauthorized: {
    flex: 0,
    backgroundColor: DefaultTheme.colors.background,
  },
});
