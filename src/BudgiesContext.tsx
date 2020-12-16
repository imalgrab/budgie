import React, { useState, createContext } from 'react';

export const BudgiesContext = createContext();

export const BudgiesProvider = ({ children }) => {
  const [budgies, setBudgies] = useState([
    {
      title: 'Eurotrip 2021',
      description: 'Roundtrip around Europe with Nick',
      currency: 'EUR',
    },
    {
      title: 'Savings',
      description: 'for new bicycle',
      currency: 'USD',
    },
    {
      title: 'College',
      description: 'money for tuition payment',
      currency: 'CHF',
    },
  ]);

  return (
    <BudgiesContext.Provider value={[budgies, setBudgies]}>
      {children}
    </BudgiesContext.Provider>
  );
};
