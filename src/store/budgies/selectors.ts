import { BudgieState } from './budgies';

export const getState = (state: BudgieState) => state;

export const getId = (state: BudgieState) => state.id;

export const getBudgieById = (state: BudgieState, id: number) =>
  getState(state).budgies.find(budgie => budgie.id === id);
