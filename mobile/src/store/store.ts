import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { budgies } from './budgies/budgies';
import thunk from 'redux-thunk';

export const store = createStore(budgies, applyMiddleware(thunk));

async function fetchBudgies() {
  const budgies = await fetch('localhost:5000/api/budgies').then(res =>
    res.json(),
  );
  
}
