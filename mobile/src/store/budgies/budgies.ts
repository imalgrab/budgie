import { BudgieType } from '../../types';
import { BudgieActionTypes, ExpenseActionTypes } from './types';

// BudgieType
// id: number;
// title: string;
// description?: string;
// category?: string;
// currency: string;
// members: string[];
// history: ExpenseType[];

// ExpenseType
// isIncome?: boolean;
// amount: number;
// title: string;
// payedBy: string;
// payedFor: string[];
// category?: string;
// date: Date;

export interface BudgieState {
  budgies: BudgieType[];
  status: 'idle' | 'loading' | 'completed' | 'failed';
  error: string | null;
}

const initialState: BudgieState = {
  budgies: [],
  status: 'idle',
  error: null,
};

export function budgies(
  state = initialState,
  action: BudgieActionTypes | ExpenseActionTypes,
): BudgieState {
  switch (action.type) {
    case 'REMOVE_BUDGIE_REQUEST':
    case 'FETCH_BUDGIES_REQUEST':
    case 'CREATE_BUDGIE_REQUEST':
    case 'CREATE_EXPENSE_REQUEST': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'REMOVE_BUDGIE_FAILURE':
    case 'FETCH_BUDGIES_FAILURE':
    case 'CREATE_BUDGIE_FAILURE':
    case 'CREATE_EXPENSE_FAILURE': {
      return {
        ...state,
        status: 'failed',
        error: action.payload.error,
      };
    }
    case 'FETCH_BUDGIES_SUCCESS': {
      return {
        ...state,
        status: 'completed',
        budgies: action.payload.budgies,
      };
    }
    case 'CREATE_BUDGIE_SUCCESS': {
      return {
        ...state,
        status: 'completed',
        budgies: [...state.budgies, action.payload.budgie],
      };
    }
    case 'REMOVE_BUDGIE_SUCCESS': {
      console.log(action.payload.budgieId, ' from reducer');
      return {
        ...state,
        status: 'completed',
        budgies: [...state.budgies].filter(
          budgie => budgie._id !== action.payload.budgieId,
        ),
      };
    }
    case 'CREATE_EXPENSE_SUCCESS': {
      const updatedBudgies = [...state.budgies];
      const id = state.budgies.findIndex(
        budgie => budgie._id === action.payload.budgieId,
      );
      if (id >= 0) {
        updatedBudgies[id] = {
          ...updatedBudgies[id],
          expenses: [...updatedBudgies[id].expenses, action.payload.expense],
        };
        return {
          ...state,
          status: 'completed',
          budgies: updatedBudgies,
        };
      }
      return state;
    }
    default: {
      return state;
    }
  }
}
