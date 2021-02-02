import { BudgieType, ExpenseType } from '../../utils/types';
import { ADDR } from '../../utils/constants';
import {
  BudgieActionTypes,
  ExpenseActionTypes,
  UserActionTypes,
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// FETCH BUDGIES
export const fetchBudgiesRequest = (): BudgieActionTypes => ({
  type: 'FETCH_BUDGIES_REQUEST',
});

export const fetchBudgiesFailure = (error: string): BudgieActionTypes => ({
  type: 'FETCH_BUDGIES_FAILURE',
  payload: { error },
});

export const fetchBudgiesSuccess = (
  budgies: BudgieType[],
): BudgieActionTypes => ({
  type: 'FETCH_BUDGIES_SUCCESS',
  payload: { budgies },
});

export const fetchBudgies = (token: string) => {
  return async (dispatch: any) => {
    dispatch(fetchBudgiesRequest());
    try {
      const res = await fetch(`${ADDR}/api/budgies`, {
        headers: { 'auth-token': token },
      });
      const budgies = await res.json();
      dispatch(fetchBudgiesSuccess(budgies));
    } catch (error) {
      dispatch(fetchBudgiesFailure(error.message));
    }
  };
};

// CREATE BUDGIE

export const createBudgieRequest = (): BudgieActionTypes => ({
  type: 'CREATE_BUDGIE_REQUEST',
});

export const createBudgieFailure = (error: string): BudgieActionTypes => ({
  type: 'CREATE_BUDGIE_FAILURE',
  payload: { error },
});

export const createBudgieSuccess = (budgie: BudgieType): BudgieActionTypes => ({
  type: 'CREATE_BUDGIE_SUCCESS',
  payload: { budgie },
});

export const createBudgie = (
  token: string,
  title: string,
  currency: string,
  members: string[],
  description?: string,
  category?: string,
) => {
  return async (dispatch: any) => {
    dispatch(createBudgieRequest());
    try {
      const res = await fetch(`${ADDR}/api/budgies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify({
          title,
          currency,
          members,
          description,
          category,
        }),
      });
      const budgie = await res.json();
      dispatch(createBudgieSuccess(budgie));
    } catch (error) {
      dispatch(createBudgieFailure(error.message));
    }
  };
};

// EDIT BUDGIE

export const editBudgieRequest = () => ({
  type: 'EDIT_BUDGIE_REQUEST',
});

export const editBudgieFailure = (error: string) => ({
  type: 'EDIT_BUDGIE_FAILURE',
  payload: { error },
});

export const editBudgieSuccess = (
  budgieId: string,
  updatedBudgie: BudgieType,
) => ({
  type: 'EDIT_BUDGIE_SUCCESS',
  payload: { budgieId, updatedBudgie },
});

export const editBudgie = (
  token: string,
  budgieId: string,
  title: string,
  currency: string,
  members: string[],
  description?: string,
  category?: string,
) => {
  return async function (dispatch: any) {
    dispatch(editBudgieRequest());
    try {
      const res = await fetch(`${ADDR}/api/budgies/${budgieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify({
          title,
          currency,
          members,
          description,
          category,
        }),
      });
      const updatedBudgie = await res.json();
      dispatch(editBudgieSuccess(budgieId, updatedBudgie));
    } catch (error) {
      dispatch(editBudgieFailure(error.message));
    }
  };
};

// REMOVE BUDGIE

export const removeBudgieRequest = (): BudgieActionTypes => ({
  type: 'REMOVE_BUDGIE_REQUEST',
});

export const removeBudgieSuccess = (budgieId: string): BudgieActionTypes => ({
  type: 'REMOVE_BUDGIE_SUCCESS',
  payload: { budgieId },
});

export const removeBudgieFailure = (error: string): BudgieActionTypes => ({
  type: 'REMOVE_BUDGIE_FAILURE',
  payload: { error },
});

export const removeBudgie = (budgieId: string) => {
  return async function (dispatch: any) {
    dispatch(removeBudgieRequest());
    try {
      const res = await fetch(`${ADDR}/api/budgies/${budgieId}`, {
        method: 'DELETE',
      });
      dispatch(removeBudgieSuccess(budgieId));
    } catch (error) {
      dispatch(removeBudgieFailure(error.message));
    }
  };
};

// CREATE EXPENSE

export const createExpenseRequest = (): ExpenseActionTypes => ({
  type: 'CREATE_EXPENSE_REQUEST',
});

export const createExpenseSuccess = (
  budgieId: string,
  expense: ExpenseType,
): ExpenseActionTypes => ({
  type: 'CREATE_EXPENSE_SUCCESS',
  payload: { budgieId, expense },
});

export const createExpenseFailure = (error: string): ExpenseActionTypes => ({
  type: 'CREATE_EXPENSE_FAILURE',
  payload: { error },
});

export const createExpense = (
  token: string,
  budgieId: string,
  title: string,
  amount: number,
  date: Date,
  paidBy: string,
  paidFor: string[],
  income?: boolean,
  category?: string,
) => {
  return async (dispatch: any) => {
    dispatch(createExpenseRequest());
    try {
      const res = await fetch(`${ADDR}/api/budgies/${budgieId}/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify({
          title,
          amount,
          date,
          paidBy,
          paidFor,
          income,
          category,
        }),
      });
      const expense = await res.json();
      dispatch(createExpenseSuccess(budgieId, expense));
    } catch (error) {
      dispatch(createExpenseFailure(error.message));
    }
  };
};

// EDIT EXPENSE

export const editExpenseRequest = (): ExpenseActionTypes => ({
  type: 'CREATE_EXPENSE_REQUEST',
});

export const editExpenseSuccess = (
  budgieId: string,
  updatedBudgie: BudgieType,
): ExpenseActionTypes => ({
  type: 'EDIT_EXPENSE_SUCCESS',
  payload: { budgieId, updatedBudgie },
});

export const editExpenseFailure = (error: string): ExpenseActionTypes => ({
  type: 'EDIT_EXPENSE_FAILURE',
  payload: { error },
});

export const editExpense = (
  token: string,
  budgieId: string,
  expenseId: string,
  title: string,
  amount: number,
  date: Date,
  paidBy: string,
  paidFor: string[],
  income?: boolean,
  category?: string,
) => {
  return async (dispatch: any) => {
    dispatch(editExpenseRequest());
    try {
      const res = await fetch(
        `${ADDR}/api/budgies/${budgieId}/expenses/${expenseId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
          body: JSON.stringify({
            title,
            amount,
            date,
            paidBy,
            paidFor,
            income,
            category,
          }),
        },
      );
      const updatedBudgie = await res.json();
      dispatch(editExpenseSuccess(budgieId, updatedBudgie));
    } catch (error) {
      dispatch(editExpenseFailure(error.message));
    }
  };
};

// REMOVE EXPENSE

export const removeExpenseRequest = (): ExpenseActionTypes => ({
  type: 'REMOVE_EXPENSE_REQUEST',
});

export const removeExpenseSuccess = (
  expenseId: string,
  budgieId: string,
): ExpenseActionTypes => ({
  type: 'REMOVE_EXPENSE_SUCCESS',
  payload: { expenseId, budgieId },
});

export const removeExpenseFailure = (error: string): ExpenseActionTypes => ({
  type: 'REMOVE_EXPENSE_FAILURE',
  payload: { error },
});

export const removeExpense = (expenseId: string, budgieId: string) => {
  return async function (dispatch: any) {
    dispatch(removeExpenseRequest());
    try {
      const res = await fetch(
        `${ADDR}/api/budgies/${budgieId}/expenses/${expenseId}`,
        {
          method: 'DELETE',
        },
      );
      const data = await res.json();
      dispatch(removeExpenseSuccess(expenseId, budgieId));
    } catch (error) {
      dispatch(removeExpenseFailure(error.message));
    }
  };
};

// LOGIN

export const loginRequest = (): UserActionTypes => ({
  type: 'LOGIN_REQUEST',
});

export const loginFailure = (error: string): UserActionTypes => ({
  type: 'LOGIN_FAILURE',
  payload: { error },
});

export const loginSuccess = (token: string): UserActionTypes => ({
  type: 'LOGIN_SUCCESS',
  payload: { token },
});

export const login = (email: string, password: string) => {
  return async function (dispatch: any) {
    dispatch(loginRequest());
    try {
      const res = await fetch(`${ADDR}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.error) {
        dispatch(loginFailure(data.error));
      } else if (data.token) {
        dispatch(loginSuccess(data.token));
        await AsyncStorage.setItem('userToken', data.token);
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    } finally {
      dispatch(setStatusIdle());
    }
  };
};

// LOGOUT

export const logoutRequest = (): UserActionTypes => ({
  type: 'LOGOUT_REQUEST',
});

export const logoutFailure = (error: string): UserActionTypes => ({
  type: 'LOGOUT_FAILURE',
  payload: { error },
});

export const logoutSuccess = (): UserActionTypes => ({
  type: 'LOGOUT_SUCCESS',
});

export const logout = () => {
  return async function (dispatch: any) {
    dispatch(logoutRequest());
    try {
      await dispatch(logoutSuccess());
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      dispatch(logoutFailure(error.message));
    }
  };
};

// REGISTER

export const registerRequest = () => ({
  type: 'REGISTER_REQUEST',
});

export const registerFailure = (error: string): UserActionTypes => ({
  type: 'REGISTER_FAILURE',
  payload: { error },
});

export const registerSuccess = (): UserActionTypes => ({
  type: 'REGISTER_SUCCESS',
});

export const register = (email: string, username: string, password: string) => {
  return async function (dispatch: any) {
    dispatch(registerRequest());
    try {
      const res = await fetch(`${ADDR}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await res.json();
      if (data.error) {
        dispatch(registerFailure(data.error));
      } else {
        dispatch(registerSuccess());
      }
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  };
};

// RESTORE TOKEN

export const restoreTokenRequest = (): UserActionTypes => ({
  type: 'RESTORE_TOKEN_REQUEST',
});

export const restoreTokenFailure = (error: string): UserActionTypes => ({
  type: 'RESTORE_TOKEN_FAILURE',
  payload: { error },
});

export const restoreTokenSuccess = (token: string): UserActionTypes => ({
  type: 'RESTORE_TOKEN_SUCCESS',
  payload: { token },
});

export const restoreToken = () => {
  return async function (dispatch: any) {
    dispatch(restoreTokenRequest());
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        dispatch(restoreTokenSuccess(userToken));
      } else {
        dispatch(restoreTokenFailure('No token'));
      }
    } catch (error) {
      dispatch(restoreTokenFailure(error.message));
    } finally {
      dispatch(setStatusIdle());
    }
  };
};

// SET STATUS

export const setStatusIdle = (): UserActionTypes => ({
  type: 'SET_STATUS_IDLE',
});
