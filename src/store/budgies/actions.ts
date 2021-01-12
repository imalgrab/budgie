import { BudgieType } from '../../types';
import { BudgieActionTypes } from './types';

export const createBudgie = (budgie: BudgieType): BudgieActionTypes => ({
  type: 'CREATE_BUDGIE',
  payload: { budgie },
});

export const removeBudgie = (id: number): BudgieActionTypes => ({
  type: 'REMOVE_BUDGIE',
  payload: { id },
});
