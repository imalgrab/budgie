import { applyMiddleware, configureStore, createStore } from '@reduxjs/toolkit';
import { budgies } from './budgies/budgies';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(
  budgies,
  composeWithDevTools(applyMiddleware(thunk)),
);
