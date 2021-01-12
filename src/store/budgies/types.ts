import { BudgieType } from '../../types';

export const CREATE_BUDGIE = 'CREATE_BUDGIE';
export const REMOVE_BUDGIE = 'REMOVE_BUDGIE';

interface CreateBudgieAction {
  type: typeof CREATE_BUDGIE;
  payload: { budgie: BudgieType };
}

interface RemoveBudgieAction {
  type: typeof REMOVE_BUDGIE;
  payload: { id: number };
}

export type BudgieActionTypes = CreateBudgieAction | RemoveBudgieAction;
