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
    case 'EDIT_EXPENSE_REQUEST':
    case 'REMOVE_EXPENSE_REQUEST':
    case 'EDIT_BUDGIE_REQUEST':
    case 'LOGOUT_REQUEST':
    case 'RESTORE_TOKEN_REQUEST':
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
    case 'RESTORE_TOKEN_FAILURE': {
      return {
        ...state,
        status: 'completed',
      };
    }
    case 'EDIT_EXPENSE_FAILURE':
    case 'REMOVE_EXPENSE_FAILURE':
    case 'EDIT_BUDGIE_FAILURE':
    case 'LOGOUT_FAILURE':
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
    case 'EDIT_BUDGIE_SUCCESS': {
      return {
        ...state,
        status: 'completed',
        budgies: [
          ...[...state.budgies].filter(
            budgie => budgie._id !== action.payload.budgieId,
          ),
          action.payload.updatedBudgie,
        ],
      };
    }
    case 'REMOVE_BUDGIE_SUCCESS': {
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
    case 'EDIT_EXPENSE_SUCCESS': {
      const { budgieId, updatedBudgie } = action.payload;
      const prevBudgies = [...state.budgies].filter(
        budgie => budgie._id !== budgieId,
      );
      return {
        ...state,
        status: 'completed',
        budgies: [...prevBudgies, updatedBudgie],
      };
    }
    case 'RESTORE_TOKEN_SUCCESS':
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        status: 'completed',
        userToken: action.payload.token,
      };
    }
    case 'LOGOUT_SUCCESS': {
      return {
        ...state,
        status: 'completed',
        userToken: null,
        budgies: [],
      };
    }
    case 'REGISTER_SUCCESS': {
      return {
        ...state,
        status: 'completed',
      };
    }
    case 'REMOVE_EXPENSE_SUCCESS': {
      const newBudgies = [...state.budgies].map(budgie => {
        if (budgie._id === action.payload.budgieId) {
          const newExpenses = budgie.expenses.filter(
            expense => expense._id !== action.payload.expenseId,
          );
          budgie.expenses = newExpenses;
          return budgie;
        }
        return budgie;
      });
      return {
        ...state,
        status: 'completed',
        budgies: newBudgies,
      };
    }
    default: {
      return state;
    }
  }
}
