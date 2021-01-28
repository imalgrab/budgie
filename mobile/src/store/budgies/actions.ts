import { BudgieType, ExpenseType } from '../../types';
import { ADDR } from '../../utils/constants';
import { BudgieActionTypes, ExpenseActionTypes } from './types';

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

export const fetchBudgies = () => {
  return async (dispatch: any) => {
    dispatch(fetchBudgiesRequest());
    try {
      const res = await fetch(`${ADDR}/api/budgies`);
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
      dispatch(removeBudgieFailure(error));
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
  budgieId: string,
  title: string,
  amount: number,
  date: Date,
  paidBy: string,
  paidFor: string[],
) => {
  return async (dispatch: any) => {
    dispatch(createExpenseRequest());
    try {
      const res = await fetch(`${ADDR}/api/budgies/${budgieId}/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, amount, date, paidBy, paidFor }),
      });
      const expense = await res.json();
      dispatch(createExpenseSuccess(budgieId, expense));
    } catch (error) {
      dispatch(createExpenseFailure(error.message));
    }
  };
};
