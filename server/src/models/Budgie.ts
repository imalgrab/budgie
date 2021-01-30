import mongoose from 'mongoose';
import { ExpenseSchema } from './Expense';

const BudgieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    category: { type: String, default: '' },
    currency: { type: String, required: true },
    members: { type: [String], required: true },
    userIds: { type: [String], required: true },
    expenses: { type: [ExpenseSchema], default: [] },
  },
  {
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000,
    },
  },
);

export const Budgie = mongoose.model('Budgie', BudgieSchema);
