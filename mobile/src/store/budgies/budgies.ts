import { BudgieType } from '../../utils/types';
import {
  BudgieActionTypes,
  ExpenseActionTypes,
  UserActionTypes,
} from './types';

export interface BudgieState {
  userToken: string | null;
  budgies: BudgieType[];
  status: 'idle' | 'loading' | 'completed' | 'failed';
  error: string | null;
}

const initialState: BudgieState = {
  userToken: null,
  budgies: [],
  status: 'idle',
  error: null,
};

export function budgies(
  state = initialState,
  action: BudgieActionTypes | ExpenseActionTypes | UserActionTypes,
): BudgieState {
  switch (action.type) {
    case 'SET_STATUS_IDLE': {
      return { ...state, status: 'idle' };
    }
    case 'REGISTER_REQUEST':
    case 'LOGIN_REQUEST':
    case 'REMOVE_BUDGIE_REQUEST':
    case 'FETCH_BUDGIES_REQUEST':
    case 'CREATE_BUDGIE_REQUEST':
    case 'CREATE_EXPENSE_REQUEST': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'REGISTER_FAILURE':
    case 'LOGIN_FAILURE':
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
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        status: 'completed',
        userToken: action.payload.token,
      };
    }
    case 'REGISTER_SUCCESS': {
      return {
        ...state,
        status: 'completed',
      };
    }
    default: {
      return state;
    }
  }
}
