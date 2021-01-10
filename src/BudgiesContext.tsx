import React, { useState, createContext } from 'react';
import { BudgieType } from '../types';

export interface Budgies {
  budgies: BudgieType[];
  createBudgie: (budgie: BudgieType) => void;
  removeBudgie: (id: number) => void;
  getBudgieById: (id: number) => BudgieType | undefined;
}

export const BudgiesContext = createContext();

// isIncome?: boolean;
//   amount: number;
//   title: string;
//   payedBy: string;
//   payedFor: string[];
//   category?: string;
//   date: Date;

export const BudgiesProvider = ({ children }: any) => {
  const [id, setId] = useState<number>(3);
  const [budgies, setBudgies] = useState<BudgieType[]>([
    {
      id: 0,
      title: 'Eurotrip 2021',
      description: 'Roundtrip around Europe with Nick',
      currency: 'EUR',
      members: ['Igor', 'Magda'],
      history: [
        {
          amount: 2500,
          title: 'Flight tickets',
          payedBy: 'Igor',
          payedFor: ['Igor', 'Magda'],
          date: new Date(2020, 7, 13),
        },
        {
          amount: 1300,
          title: 'Hotel',
          payedBy: 'Magda',
          payedFor: ['Igor', 'Magda'],
          date: new Date(2020, 10, 22),
        },
      ],
    },
    {
      id: 1,
      title: 'Savings',
      description: 'for new bicycle',
      currency: 'USD',
      members: ['Igor'],
      history: [],
    },
    {
      id: 2,
      title: 'College',
      description: 'money for tuition payment',
      currency: 'CHF',
      members: ['Igor'],
      history: [],
    },
  ]);

  const createBudgie = (budgie: BudgieType) => {
    setBudgies(prevBudgies => [...prevBudgies, { ...budgie, id: id + 1 }]);
    setId(id + 1);
  };

  const removeBudgie = (id: number) =>
    setBudgies(prevBudgies => prevBudgies.filter(budgie => budgie.id !== id));

  const getBudgieById = (id: number) =>
    budgies.find(budgie => budgie.id === id);

  return (
    <BudgiesContext.Provider
      value={{ budgies, createBudgie, removeBudgie, getBudgieById }}>
      {children}
    </BudgiesContext.Provider>
  );
};
