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
  id: number;
  budgies: BudgieType[];
}

const initialState: BudgieState = {
  id: 2,
  budgies: [
    {
      id: 0,
      title: 'Eurotrip 2021',
      description: 'Summer Vacay',
      category: 'Holiday',
      currency: 'EUR',
      members: ['Adam', 'Paul'],
      history: {
        id: 3,
        expenses: [
          {
            id: 0,
            amount: 2500,
            title: 'Flight tickets',
            paidBy: 'Adam',
            paidFor: ['Adam', 'Paul'],
            date: new Date(2020, 8, 23),
          },
          {
            id: 1,
            amount: 1100,
            title: 'Hotel',
            paidBy: 'Paul',
            paidFor: ['Adam', 'Paul'],
            date: new Date(2020, 8, 25),
          },
          {
            id: 2,
            amount: 90,
            title: 'Sunglasses',
            paidBy: 'Adam',
            paidFor: ['Adam'],
            date: new Date(2020, 8, 25),
          },
        ],
      },
    },
    {
      id: 1,
      title: 'Tesla model S',
      description: 'Savings for a new whip',
      currency: 'USD',
      members: ['Elon'],
      history: {
        id: 4,
        expenses: [
          {
            id: 0,
            isIncome: true,
            amount: 5000,
            title: 'November salary',
            paidBy: 'Elon',
            paidFor: ['Elon'],
            date: new Date(2020, 10, 1),
          },
          {
            id: 1,
            isIncome: true,
            amount: 5000,
            title: 'December salary',
            paidBy: 'Elon',
            paidFor: ['Elon'],
            date: new Date(2020, 11, 1),
          },
          {
            id: 2,
            isIncome: true,
            amount: 5000,
            title: 'January salary',
            paidBy: 'Elon',
            paidFor: ['Elon'],
            date: new Date(2021, 0, 1),
          },
          {
            id: 3,
            isIncome: true,
            amount: 1300,
            title: 'Stock bonus',
            paidBy: 'Elon',
            paidFor: ['Elon'],
            date: new Date(2020, 0, 5),
          },
        ],
      },
    },
  ],
};

export function budgies(
  state = initialState,
  action: BudgieActionTypes | ExpenseActionTypes,
): BudgieState {
  switch (action.type) {
    // case 'INCREMENT_ID': {
    //   return {
    //     ...state,
    //     id: state.id + 1,
    //   };
    // }
    case 'CREATE_BUDGIE':
      const {
        title,
        description,
        category,
        currency,
        members,
      } = action.payload;
      return {
        ...state,
        id: state.id + 1,
        budgies: [
          ...state.budgies,
          {
            id: state.id,
            title,
            description,
            category,
            currency,
            members,
            history: { id: 0, expenses: [] },
          },
        ],
      };
    case 'REMOVE_BUDGIE':
      return {
        ...state,
        budgies: [...state.budgies].filter(
          budgie => budgie.id !== action.payload.id,
        ),
      };
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
    case 'CREATE_EXPENSE': {
      const { budgieId } = action.payload;
      const index = state.budgies.findIndex(budgie => budgie.id === budgieId);
      const budgie = state.budgies.find(budgie => budgie.id === budgieId);

      if (index && budgie) {
        const { title, amount, date, paidBy, paidFor } = action.payload;
        budgie.history = {
          ...budgie.history,
          id: budgie.history.id + 1,
          expenses: [
            ...budgie.history.expenses,
            {
              id: budgie.history.id,
              title,
              amount,
              date,
              paidBy,
              paidFor,
            },
          ],
        };
        const newBudgies = [...state.budgies];
        newBudgies.splice(index, 1, budgie);
        return { ...state, budgies: newBudgies };
      }

      return state;
    }
    default:
      return state;
  }
}
