import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export interface MemberType {
  name: string;
  userId: string;
}

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
  members: MemberType[];
  expenses: ExpenseType[];
}

export type RootStackParamList = {
  Unauthorized: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  CreateBudgie: { budgieId: string } | undefined;
  ConfirmBudgieCreation:
    | { budgieId: string | ((dispatch: any) => Promise<any>) }
    | undefined;
  BudgieDetails: { budgieId: string };
  ExpenseDetails: {
    expenseId: string;
    budgieId: string;
    currency: string;
    members: MemberType[];
  };
  CreateExpense: {
    expenseId?: string;
    budgieId: string;
    currency: string;
    members: MemberType[];
  };
  ExpenseCategory: { setCategory: any };
  JoinBudgie: undefined;
};

//JOIN BUDGIE
export type JoinBudgieScreenRouteProp = RouteProp<
  RootStackParamList,
  'Unauthorized'
>;

export type JoinBudgieScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Unauthorized'
>;

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
export type CreateBudgieScreenRouteProp = RouteProp<
  RootStackParamList,
  'CreateBudgie'
>;

export type CreateBudgieScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateBudgie'
>;

//CONFIRM BUDGIE CREATION
export type ConfirmBudgieCreationScreenRouteProp = RouteProp<
  RootStackParamList,
  'CreateBudgie'
>;

export type ConfirmBudgieCreationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateBudgie'
>;

//BUDGIE DETAILS
export type BudgieDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'BudgieDetails'
>;

export type BudgieDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BudgieDetails'
>;

//CREATE EXPENSE
export type CreateExpenseScreenRouteProp = RouteProp<
  RootStackParamList,
  'CreateExpense'
>;

export type CreateExpenseScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateExpense'
>;

//EXPENSE DETAILS
export type ExpenseDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'ExpenseDetails'
>;

export type ExpenseDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ExpenseDetails'
>;

//EXPENSE CATEGORY
export type ExpenseCategoryScreenRouteProp = RouteProp<
  RootStackParamList,
  'ExpenseCategory'
>;

export type ExpenseCategoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ExpenseCategory'
>;

// REDUX

// Budgies
export const FETCH_BUDGIES_REQUEST = 'FETCH_BUDGIES_REQUEST';
export const FETCH_BUDGIES_SUCCESS = 'FETCH_BUDGIES_SUCCESS';
export const FETCH_BUDGIES_FAILURE = 'FETCH_BUDGIES_FAILURE';
export const CREATE_BUDGIE_REQUEST = 'CREATE_BUDGIE_REQUEST';
export const CREATE_BUDGIE_SUCCESS = 'CREATE_BUDGIE_SUCCESS';
export const CREATE_BUDGIE_FAILURE = 'CREATE_BUDGIE_FAILURE';
export const EDIT_BUDGIE_REQUEST = 'EDIT_BUDGIE_REQUEST';
export const EDIT_BUDGIE_SUCCESS = 'EDIT_BUDGIE_SUCCESS';
export const EDIT_BUDGIE_FAILURE = 'EDIT_BUDGIE_FAILURE';
export const REMOVE_BUDGIE_REQUEST = 'REMOVE_BUDGIE_REQUEST';
export const REMOVE_BUDGIE_SUCCESS = 'REMOVE_BUDGIE_SUCCESS';
export const REMOVE_BUDGIE_FAILURE = 'REMOVE_BUDGIE_FAILURE';

export const CREATE_BUDGIE = 'CREATE_BUDGIE';
export const REMOVE_BUDGIE = 'REMOVE_BUDGIE';

// Expenses
export const CREATE_EXPENSE_REQUEST = 'CREATE_EXPENSE_REQUEST';
export const CREATE_EXPENSE_SUCCESS = 'CREATE_EXPENSE_SUCCESS';
export const CREATE_EXPENSE_FAILURE = 'CREATE_EXPENSE_FAILURE';
export const REMOVE_EXPENSE_REQUEST = 'REMOVE_EXPENSE_REQUEST';
export const REMOVE_EXPENSE_SUCCESS = 'REMOVE_EXPENSE_SUCCESS';
export const REMOVE_EXPENSE_FAILURE = 'REMOVE_EXPENSE_FAILURE';
export const EDIT_EXPENSE_REQUEST = 'EDIT_EXPENSE_REQUEST';
export const EDIT_EXPENSE_SUCCESS = 'EDIT_EXPENSE_SUCCESS';
export const EDIT_EXPENSE_FAILURE = 'EDIT_EXPENSE_FAILURE';

// Users
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const RESTORE_TOKEN_REQUEST = 'RESTORE_TOKEN_REQUEST';
export const RESTORE_TOKEN_FAILURE = 'RESTORE_TOKEN_FAILURE';
export const RESTORE_TOKEN_SUCCESS = 'RESTORE_TOKEN_SUCCESS';

// Status
export const STATUS_IDLE = 'SET_STATUS_IDLE';
export const STATUS_LOADING = 'SET_STATUS_LOADING';

type FetchBudgiesAction =
  | FetchBudgiesRequestAction
  | FetchBudgiesSuccessAction
  | FetchBudgiesFailureAction;

type CreateBudgieAction =
  | CreateBudgieRequestAction
  | CreateBudgieSuccessAction
  | CreateBudgieFailureAction;

type EditBudgieAction =
  | EditBudgieRequestAction
  | EditBudgieSuccessAction
  | EditBudgieFailureAction;

type RemoveBudgieAction =
  | RemoveBudgieRequestAction
  | RemoveBudgieSuccessAction
  | RemoveBudgieFailureAction;

type CreateExpenseAction =
  | CreateExpenseRequstAction
  | CreateExpenseSuccessAction
  | CreateExpenseFailureAction;

type EditExpenseAction =
  | EditExpenseRequestAction
  | EditExpenseSuccessAction
  | EditExpenseFailureAction;

type RemoveExpenseAction =
  | RemoveExpenseRequestAction
  | RemoveExpenseSuccessAction
  | RemoveExpenseFailureAction;

type LoginAction = LoginRequestAction | LoginSuccessAction | LoginFailureAction;
type LogoutAction =
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailureAction;

type RegisterAction =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction;

type RestoreTokenAction =
  | RestoreTokenRequestAction
  | RestoreTokenSuccessAction
  | RestoreTokenFailureAction;

type StatusAction = IdleStatusAction | LoadingStatusAction;

interface RemoveBudgieRequestAction {
  type: typeof REMOVE_BUDGIE_REQUEST;
}

interface RemoveBudgieSuccessAction {
  type: typeof REMOVE_BUDGIE_SUCCESS;
  payload: { budgieId: string };
}

interface RemoveBudgieFailureAction {
  type: typeof REMOVE_BUDGIE_FAILURE;
  payload: { error: string };
}

interface CreateBudgieRequestAction {
  type: typeof CREATE_BUDGIE_REQUEST;
}

interface CreateBudgieSuccessAction {
  type: typeof CREATE_BUDGIE_SUCCESS;
  payload: { budgie: BudgieType };
}

interface CreateBudgieFailureAction {
  type: typeof CREATE_BUDGIE_FAILURE;
  payload: { error: string };
}

interface EditBudgieRequestAction {
  type: typeof EDIT_BUDGIE_REQUEST;
}

interface EditBudgieSuccessAction {
  type: typeof EDIT_BUDGIE_SUCCESS;
  payload: { budgieId: string; updatedBudgie: BudgieType };
}

interface EditBudgieFailureAction {
  type: typeof EDIT_BUDGIE_FAILURE;
  payload: { error: string };
}

interface FetchBudgiesRequestAction {
  type: typeof FETCH_BUDGIES_REQUEST;
}
interface FetchBudgiesSuccessAction {
  type: typeof FETCH_BUDGIES_SUCCESS;
  payload: { budgies: BudgieType[] };
}
interface FetchBudgiesFailureAction {
  type: typeof FETCH_BUDGIES_FAILURE;
  payload: { error: string };
}

export type BudgieActionTypes =
  | FetchBudgiesAction
  | CreateBudgieAction
  | EditBudgieAction
  | RemoveBudgieAction;

interface CreateExpenseRequstAction {
  type: typeof CREATE_EXPENSE_REQUEST;
}

interface CreateExpenseSuccessAction {
  type: typeof CREATE_EXPENSE_SUCCESS;
  payload: {
    budgieId: string;
    expense: ExpenseType;
  };
}

interface CreateExpenseFailureAction {
  type: typeof CREATE_EXPENSE_FAILURE;
  payload: { error: string };
}

interface EditExpenseRequestAction {
  type: typeof EDIT_EXPENSE_REQUEST;
}

interface EditExpenseSuccessAction {
  type: typeof EDIT_EXPENSE_SUCCESS;
  payload: { budgieId: string; updatedBudgie: BudgieType };
}

interface EditExpenseFailureAction {
  type: typeof EDIT_EXPENSE_FAILURE;
  payload: { error: string };
}

interface RemoveExpenseRequestAction {
  type: typeof REMOVE_EXPENSE_REQUEST;
}

interface RemoveExpenseSuccessAction {
  type: typeof REMOVE_EXPENSE_SUCCESS;
  payload: { expenseId: string; budgieId: string };
}

interface RemoveExpenseFailureAction {
  type: typeof REMOVE_EXPENSE_FAILURE;
  payload: { error: string };
}

export type ExpenseActionTypes =
  | CreateExpenseAction
  | RemoveExpenseAction
  | EditExpenseAction;

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { token: string; userId: string };
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: { error: string };
}

interface LogoutRequestAction {
  type: typeof LOGOUT_REQUEST;
}

interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

interface LogoutFailureAction {
  type: typeof LOGOUT_FAILURE;
  payload: { error: string };
}

interface RegisterRequestAction {
  type: typeof REGISTER_REQUEST;
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
}

interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  payload: { error: string };
}

interface RestoreTokenRequestAction {
  type: typeof RESTORE_TOKEN_REQUEST;
}

interface RestoreTokenSuccessAction {
  type: typeof RESTORE_TOKEN_SUCCESS;
  payload: { token: string; userId: string };
}

interface RestoreTokenFailureAction {
  type: typeof RESTORE_TOKEN_FAILURE;
  payload: { error: string };
}

interface IdleStatusAction {
  type: typeof STATUS_IDLE;
}

interface LoadingStatusAction {
  type: typeof STATUS_LOADING;
}

export type UserActionTypes =
  | LoginAction
  | LogoutAction
  | RegisterAction
  | StatusAction
  | RestoreTokenAction;
