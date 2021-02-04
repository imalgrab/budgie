import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';

// screens
import { BudgieDetailsScreen } from '../screens/BudgieDetailsScreen';
import { CreateBudgieScreen } from '../screens/CreateBudgieScreen';
import { CreateExpenseScreen } from '../screens/CreateExpenseScreen';
import { ExpenseDetailsScreen } from '../screens/ExpenseDetailsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { UnauthorizedScreen } from '../screens/UnauthorizedScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';

// misc
import { restoreToken } from '../store/budgies/actions';
import { BudgieState } from '../store/budgies/budgies';
import { RootStackParamList } from '../utils/types';
import { COLORS, theme } from '../theme/theme';
import { ExpenseCategoryScreen } from '../screens/ExpenseCategoryScreen';

const Stack = createStackNavigator<RootStackParamList>();

export const ApplicationNavigator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreToken());
  }, []);

  const userToken = useSelector<BudgieState>(state => state.userToken);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <SafeAreaView
          style={userToken ? styles.statusBar : styles.statusBarUnauthorized}
        />
        <StatusBar style="dark" backgroundColor={COLORS.statusBar} />
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
              <Stack.Screen
                name="ExpenseCategory"
                component={ExpenseCategoryScreen}
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
    backgroundColor: COLORS.background,
  },
});
