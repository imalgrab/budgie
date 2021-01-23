import { BudgieState } from './budgies';

export const getState = (state: BudgieState) => state;

export const getId = (state: BudgieState) => state.id;

export const getBudgieIds = (state: BudgieState) =>
  state.budgies.map(budgie => budgie.id);

export const getBudgieById = (state: BudgieState, id: number) =>
  getState(state).budgies.find(budgie => budgie.id === id);

export const getBudgieExpenses = (state: BudgieState, id: number) => {
  const budgie = getBudgieById(state, id);
  if (budgie) {
    return budgie.history.expenses;
  }
};
