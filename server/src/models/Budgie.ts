import mongoose, { Document, Model } from 'mongoose';
import { ExpenseSchema, IExpense } from './Expense';

export interface IBudgie extends Document {
  title: string;
  description?: string;
  category?: string;
  currency: string;
  members: string[];
  userIds: string[];
  expenses: IExpense[];
}

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

export const Budgie: Model<IBudgie> = mongoose.model<IBudgie>(
  'Budgie',
  BudgieSchema,
);
