import React, { useState, createContext } from 'react';
import { Budgie } from '../types';

export interface Budgies {
  budgies: Budgie[];
  createBudgie: (budgie: Budgie) => void;
  removeBudgie: (id: number) => void;
  getBudgieById: (id: number) => Budgie | undefined;
}

export const BudgiesContext = createContext<Budgies>(null);

export const BudgiesProvider = ({ children }) => {
  const [id, setId] = useState(3);
  const [budgies, setBudgies] = useState<Budgie[]>([
    {
      id: 0,
      title: 'Eurotrip 2021',
      description: 'Roundtrip around Europe with Nick',
      currency: 'EUR',
      members: ['Igor', 'Magda'],
    },
    {
      id: 1,
      title: 'Savings',
      description: 'for new bicycle',
      currency: 'USD',
      members: ['Igor'],
    },
    {
      id: 2,
      title: 'College',
      description: 'money for tuition payment',
      currency: 'CHF',
      members: ['Igor'],
    },
  ]);

  const createBudgie = (budgie: Budgie) => {
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
