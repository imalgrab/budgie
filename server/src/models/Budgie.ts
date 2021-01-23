import { Expense } from './Expense';

const mongoose = require('mongoose');

const BudgieSchema = mongoose.Schema({
  title: String,
  description: { type: String, required: false },
  category: { type: String, required: false },
  currency: String,
  members: [String],
  expenses: [Expense],
});

export const Budgie = mongoose.model('Budgie', BudgieSchema);
