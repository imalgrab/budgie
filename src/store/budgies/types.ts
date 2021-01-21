import { BudgieType, ExpenseType } from '../../types';
// Budgies
export const CREATE_BUDGIE = 'CREATE_BUDGIE';
export const REMOVE_BUDGIE = 'REMOVE_BUDGIE';
export const INCREMENT_ID = 'INCREMENT_ID';
// Expenses
export const INCREMENT_EXPENSE_ID = 'INCREMENT_EXPENSE_ID';
export const CREATE_EXPENSE = 'CREATE_EXPENSE';

interface CreateBudgieAction {
  type: typeof CREATE_BUDGIE;
  payload: {
    title: string;
    description?: string;
    category?: string;
    currency: string;
    members: string[];
  };
}

interface RemoveBudgieAction {
  type: typeof REMOVE_BUDGIE;
  payload: { id: number };
}

interface IncrementIdAction {
  type: typeof INCREMENT_ID;
}

interface incrementExpenseId {
  type: typeof INCREMENT_EXPENSE_ID;
  payload: { budgieId: number };
}

export type BudgieActionTypes =
  | CreateBudgieAction
  | RemoveBudgieAction
  | IncrementIdAction
  | incrementExpenseId;

interface CreateExpenseAction {
  type: typeof CREATE_EXPENSE;
  payload: {
    budgieId: number;
    title: string;
    amount: number;
    date: Date;
    paidBy: string;
    paidFor: string[];
  };
}

export type ExpenseActionTypes = CreateExpenseAction;
