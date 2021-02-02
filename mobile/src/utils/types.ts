import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export interface ExpenseType {
  _id: string;
  isIncome?: boolean;
  title: string;
  amount: number;
  paidBy: string;
  paidFor: string[];
  category?: string;
  date: Date;
}

export interface BudgieType {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  currency: string;
  members: string[];
  userIds: string[];
  expenses: ExpenseType[];
}

export type RootStackParamList = {
  Unauthorized: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  CreateBudgie: { budgieId: string } | undefined;
  BudgieDetails: { budgieId: string };
  ExpenseDetails: {
    expenseId: string;
    budgieId: string;
    currency: string;
    members: string[];
  };
  CreateExpense: {
    expenseId?: string;
    budgieId: string;
    currency: string;
    members: string[];
  };
};

//UNAUTHORIZED
export type UnauthorizedScreenRouteProp = RouteProp<
  RootStackParamList,
  'Unauthorized'
>;

export type UnauthorizedScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Unauthorized'
>;

//SIGN IN
export type SignInScreenRouteProp = RouteProp<RootStackParamList, 'SignIn'>;

export type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

//SIGN UP
export type SignUpScreenRouteProp = RouteProp<RootStackParamList, 'SignUp'>;

export type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

//HOME
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

//CREATE BUDGIE
export type CreateBudgieRouteProp = RouteProp<
  RootStackParamList,
  'CreateBudgie'
>;

export type CreateBudgieScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateBudgie'
>;

//BUDGIE DETAILS
export type BudgieDetailsRouteProp = RouteProp<
  RootStackParamList,
  'BudgieDetails'
>;

export type BudgieDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BudgieDetails'
>;

//CREATE EXPENSE
export type CreateExpenseRouteProp = RouteProp<
  RootStackParamList,
  'CreateExpense'
>;

export type CreateExpenseScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateExpense'
>;

//EXPENSE DETAILS
export type ExpenseDetailsRouteProp = RouteProp<
  RootStackParamList,
  'ExpenseDetails'
>;

export type ExpenseDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ExpenseDetails'
>;
