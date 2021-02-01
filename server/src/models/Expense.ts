import mongoose, { Document, Model } from 'mongoose';

export interface IExpense extends Document {
  income?: boolean;
  title: string;
  amount: number;
  paidBy: string;
  paidFor: string;
  category?: string;
  date: Date;
}

export const ExpenseSchema = new mongoose.Schema(
  {
    income: { type: Boolean, default: false },
    amount: { type: Number, required: true },
    title: { type: String, required: true },
    paidBy: { type: String, required: true },
    paidFor: { type: [String], required: true },
    category: { type: String, default: '' },
    date: { type: Date, default: Date.now },
  },
  {
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000,
    },
  },
);

export const Expense: Model<IExpense> = mongoose.model<IExpense>(
  'Expense',
  ExpenseSchema,
);
