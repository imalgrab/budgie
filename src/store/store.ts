import { createStore } from '@reduxjs/toolkit';
import { budgies } from './budgies/budgies';

export const store = createStore(budgies);
