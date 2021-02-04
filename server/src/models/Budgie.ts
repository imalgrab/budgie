import mongoose, { Document, Model } from 'mongoose';
import { ExpenseSchema, IExpense } from './Expense';

interface Member {
  name: string;
  userId?: string;
}

export interface IBudgie extends Document {
  title: string;
  description?: string;
  category?: string;
  currency: string;
  members: Member[];
  expenses: IExpense[];
}

const MemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, default: '' },
  },
  { _id: false },
);

const BudgieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    category: { type: String, default: '' },
    currency: { type: String, required: true },
    members: {
      type: [MemberSchema],
      required: true,
    },
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
