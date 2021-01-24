import { BudgieType } from '../../types';
// Budgies
export const FETCH_BUDGIES_REQUEST = 'FETCH_BUDGIES_REQUEST';
export const FETCH_BUDGIES_SUCCESS = 'FETCH_BUDGIES_SUCCESS';
export const FETCH_BUDGIES_FAILURE = 'FETCH_BUDGIES_FAILURE';
export const CREATE_BUDGIE_REQUEST = 'CREATE_BUDGIE_REQUEST';
export const CREATE_BUDGIE_SUCCESS = 'CREATE_BUDGIE_SUCCESS';
export const CREATE_BUDGIE_FAILURE = 'CREATE_BUDGIE_FAILURE';

export const CREATE_BUDGIE = 'CREATE_BUDGIE';
export const REMOVE_BUDGIE = 'REMOVE_BUDGIE';
// Expenses
export const CREATE_EXPENSE = 'CREATE_EXPENSE';

type FetchBudgiesAction =
  | FetchBudgiesRequestAction
  | FetchBudgiesSuccessAction
  | FetchBudgiesFailureAction;

type CreateBudgieAction =
  | CreateBudgieRequestAction
  | CreateBudgieSuccessAction
  | CreateBudgieFailureAction;

interface CreateBudgieRequestAction {
  type: typeof CREATE_BUDGIE_REQUEST;
}

interface CreateBudgieSuccessAction {
  type: typeof CREATE_BUDGIE_SUCCESS;
  payload: { budgie: any };
}

interface CreateBudgieFailureAction {
  type: typeof CREATE_BUDGIE_FAILURE;
  payload: { error: string };
}

interface RemoveBudgieAction {
  type: typeof REMOVE_BUDGIE;
  payload: { id: number };
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
