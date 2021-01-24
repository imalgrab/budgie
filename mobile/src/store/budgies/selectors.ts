import { BudgieState } from './budgies';

export const getBudgieById = (state: BudgieState, id: string) =>
  state.budgies.find(budgie => budgie._id === id);

export const getBudgieExpenses = (state: BudgieState, id: string) => {
  const budgie = getBudgieById(state, id);
  if (budgie) {
    return budgie.expenses;
  }
};

export const selectBudgies = (state: BudgieState) => state.budgies;

export const selectBudgieById = (state: BudgieState, budgieId: string) =>
  state.budgies.find(budgie => budgie._id === budgieId);
