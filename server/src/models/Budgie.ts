import mongoose from 'mongoose';
import { ExpenseSchema } from './Expense';

const BudgieSchema = new mongoose.Schema({
  title: String,
  description: { type: String, default: '' },
  category: { type: String, default: '' },
  currency: { type: String, required: true },
  members: [String],
  expenses: { type: [ExpenseSchema], default: [] },
});

export const Budgie = mongoose.model('Budgie', BudgieSchema);
