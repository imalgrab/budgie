import { createAsyncThunk } from '@reduxjs/toolkit';
import { BudgieType } from '../../types';
import { fetchBudgiesSuccess } from './actions';
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
  action: BudgieActionTypes | ExpenseActionTypes | any,
): BudgieState {
  switch (action.type) {
    case 'CREATE_BUDGIE_REQUEST':
    case 'FETCH_BUDGIES_REQUEST': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'FETCH_BUDGIES_FAILURE':
    case 'CREATE_BUDGIE_FAILURE': {
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
    // case 'INCREMENT_ID': {
    //   return {
    //     ...state,
    //     id: state.id + 1,
    //   };
    // }
    // case 'CREATE_BUDGIE':
    //   const {
    //     title,
    //     description,
    //     category,
    //     currency,
    //     members,
    //   } = action.payload;
    //   return {
    //     ...state,
    //     id: state.id + 1,
    //     budgies: [
    //       ...state.budgies,
    //       {
    //         id: state.id,
    //         title,
    //         description,
    //         category,
    //         currency,
    //         members,
    //         history: { id: 0, expenses: [] },
    //       },
    //     ],
    //   };
    // case 'REMOVE_BUDGIE':
    //   return {
    //     ...state,
    //     budgies: [...state.budgies].filter(
    //       budgie => budgie.id !== action.payload.id,
    //     ),
    //   };
    // case 'INCREMENT_EXPENSE_ID': {
    //   const index = state.budgies.findIndex(
    //     budgie => budgie.id === action.payload.budgieId,
    //   );
    //   const newBudgies = [...state.budgies];
    //   newBudgies[index].history.id += 1;
    //   return {
    //     ...state,
    //     budgies: newBudgies,
    //   };
    // }
    // case 'CREATE_EXPENSE': {
    //   const { budgieId } = action.payload;
    //   const index = state.budgies.findIndex(budgie => budgie.id === budgieId);
    //   const budgie = state.budgies.find(budgie => budgie.id === budgieId);

    //   if (index && budgie) {
    //     const { title, amount, date, paidBy, paidFor } = action.payload;
    //     budgie.history = {
    //       ...budgie.history,
    //       id: budgie.history.id + 1,
    //       expenses: [
    //         ...budgie.history.expenses,
    //         {
    //           id: budgie.history.id,
    //           title,
    //           amount,
    //           date,
    //           paidBy,
    //           paidFor,
    //         },
    //       ],
    //     };
    //     const newBudgies = [...state.budgies];
    //     newBudgies.splice(index, 1, budgie);
    //     return { ...state, budgies: newBudgies };
    //   }

    //   return state;
    // }
    default:
      return state;
  }
}
