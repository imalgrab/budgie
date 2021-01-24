import { BudgieType } from '../../types';
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
      const res = await fetch('http://ff3aaae83ce8.eu.ngrok.io/api/budgies');
      const budgies = await res.json();
      dispatch(fetchBudgiesSuccess(budgies));
    } catch (error) {
      dispatch(fetchBudgiesFailure(error.message));
    }
  };
};

// CREATE BUDGIE
export const createBudgieRequest = () => ({
  type: 'CREATE_BUDGIE_REQUEST',
});

export const createBudgieFailure = (error: string) => ({
  type: 'CREATE_BUDGIE_FAILURE',
  payload: { error },
});

export const createBudgieSuccess = (budgie: any) => ({
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
      await fetch('http://ff3aaae83ce8.eu.ngrok.io/api/budgies', {
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
      dispatch(
        createBudgieSuccess({
          title,
          currency,
          members,
          description,
          category,
        }),
      );
    } catch (error) {
      dispatch(createBudgieFailure(error.message));
    }
  };
};

// CREATE EXPENSE

export const createExpenseRequest = () => ({
  type: 'CREATE_EXPENSE_REQUEST',
});

export const createExpenseSuccess = (expense: any) => ({
  type: 'CREATE_EXPENSE_SUCCES',
  payload: { expense },
});

export const createExpenseFailure = (error: string) => ({
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
  return async function (dispatch: any) {
    dispatch(createExpenseRequest());
    try {
      const expense = { title, amount, date, paidBy, paidFor };
      await fetch(
        `http://ff3aaae83ce8.eu.ngrok.io/api/budgies/${budgieId}/expenses`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            expense,
          }),
        },
      );
      dispatch(createExpenseSuccess(expense));
    } catch (error) {
      dispatch(createExpenseFailure(error.message));
    }
  };
};

// payload: { budgieId, title, amount, date, paidBy, paidFor },
