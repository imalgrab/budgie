import { BudgieType, ExpenseType } from '../../utils/types';

// Budgies
export const FETCH_BUDGIES_REQUEST = 'FETCH_BUDGIES_REQUEST';
export const FETCH_BUDGIES_SUCCESS = 'FETCH_BUDGIES_SUCCESS';
export const FETCH_BUDGIES_FAILURE = 'FETCH_BUDGIES_FAILURE';
export const CREATE_BUDGIE_REQUEST = 'CREATE_BUDGIE_REQUEST';
export const CREATE_BUDGIE_SUCCESS = 'CREATE_BUDGIE_SUCCESS';
export const CREATE_BUDGIE_FAILURE = 'CREATE_BUDGIE_FAILURE';
export const REMOVE_BUDGIE_REQUEST = 'REMOVE_BUDGIE_REQUEST';
export const REMOVE_BUDGIE_SUCCESS = 'REMOVE_BUDGIE_SUCCESS';
export const REMOVE_BUDGIE_FAILURE = 'REMOVE_BUDGIE_FAILURE';

export const CREATE_BUDGIE = 'CREATE_BUDGIE';
export const REMOVE_BUDGIE = 'REMOVE_BUDGIE';

// Expenses
export const CREATE_EXPENSE_REQUEST = 'CREATE_EXPENSE_REQUEST';
export const CREATE_EXPENSE_SUCCESS = 'CREATE_EXPENSE_SUCCESS';
export const CREATE_EXPENSE_FAILURE = 'CREATE_EXPENSE_FAILURE';

// Users
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

// Status
export const STATUS_IDLE = 'SET_STATUS_IDLE';

type FetchBudgiesAction =
  | FetchBudgiesRequestAction
  | FetchBudgiesSuccessAction
  | FetchBudgiesFailureAction;

type CreateBudgieAction =
  | CreateBudgieRequestAction
  | CreateBudgieSuccessAction
  | CreateBudgieFailureAction;

type RemoveBudgieAction =
  | RemoveBudgieRequestAction
  | RemoveBudgieSuccessAction
  | RemoveBudgieFailureAction;

type CreateExpenseAction =
  | CreateExpenseRequstAction
  | CreateExpenseSuccessAction
  | CreateExpenseFailureAction;

type LoginAction = LoginRequestAction | LoginSuccessAction | LoginFailureAction;

type RegisterAction =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction;

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

export type ExpenseActionTypes = CreateExpenseAction;

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { token: string };
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
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

interface IdleStatusAction {
  type: typeof STATUS_IDLE;
}

type StatusAction = IdleStatusAction;

export type UserActionTypes = LoginAction | RegisterAction | StatusAction;
