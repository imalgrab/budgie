import { BudgieType } from '../../types';
import { BudgieActionTypes } from './types';

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
}

const initialState: BudgieState = {
  budgies: [
    {
      id: 0,
      title: 'Eurotrip 2021',
      description: 'Summer Vacay',
      category: 'Holiday',
      currency: 'EUR',
      members: ['Adam, Paul'],
      history: [
        {
          amount: 2500,
          title: 'Flight tickets',
          payedBy: 'Adam',
          payedFor: ['Adam', 'Paul'],
          date: new Date(2020, 8, 23),
        },
        {
          amount: 1100,
          title: 'Hotel',
          payedBy: 'Paul',
          payedFor: ['Adam', 'Paul'],
          date: new Date(2020, 8, 25),
        },
        {
          amount: 90,
          title: 'Sunglasses',
          payedBy: 'Adam',
          payedFor: ['Adam'],
          date: new Date(2020, 8, 25),
        },
      ],
    },
  ],
};

export function budgies(
  state = initialState,
  action: BudgieActionTypes,
): BudgieState {
  switch (action.type) {
    case 'CREATE_BUDGIE':
      return {
        ...state,
        budgies: [...state.budgies, action.payload.budgie],
      };
    case 'REMOVE_BUDGIE':
      return {
        ...state,
        budgies: [...state.budgies].filter(
          budgie => budgie.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
}
