import { BudgieState } from './budgies';

export const selectToken = (state: BudgieState) => state.userToken;

export const selectStatus = (state: BudgieState) => state.status;

export const selectError = (state: BudgieState) => state.error;

export const selectUserId = (state: BudgieState) => state.userId;

export const selectBudgies = (state: BudgieState) => state.budgies;

export const selectBudgieById = (state: BudgieState, budgieId: string) =>
  state.budgies.find(budgie => budgie._id === budgieId);

export const selectBudgieExpenses = (state: BudgieState, budgieId: string) => {
  const budgie = selectBudgieById(state, budgieId);
  if (budgie) {
    return budgie.expenses;
  }
};
