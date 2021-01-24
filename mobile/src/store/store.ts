import { applyMiddleware, configureStore, createStore } from '@reduxjs/toolkit';
import { budgies } from './budgies/budgies';
import thunk from 'redux-thunk';

export const store = createStore(budgies, applyMiddleware(thunk));
