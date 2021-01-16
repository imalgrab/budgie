import { ExpenseType } from '../../types';
import { BudgieActionTypes, ExpenseActionTypes } from './types';

export const incrementId = (): BudgieActionTypes => ({
  type: 'INCREMENT_ID',
});

export const createBudgie = (
  title: string,
  currency: string,
  members: string[],
  description?: string,
  category?: string,
): BudgieActionTypes => ({
  type: 'CREATE_BUDGIE',
  payload: {
    title,
    description,
    category,
    currency,
    members,
  },
});

export const removeBudgie = (id: number): BudgieActionTypes => ({
  type: 'REMOVE_BUDGIE',
  payload: { id },
});

export const incrementExpenseId = (budgieId: number): BudgieActionTypes => ({
  type: 'INCREMENT_EXPENSE_ID',
  payload: { budgieId },
});

export const createExpense = (
  budgieId: number,
  expense: ExpenseType,
): ExpenseActionTypes => ({
  type: 'CREATE_EXPENSE',
  payload: { budgieId, expense },
});
