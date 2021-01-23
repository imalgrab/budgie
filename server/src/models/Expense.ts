const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({
  income: { type: Boolean, default: false },
  amount: { type: Number, required: true },
  title: { type: String, required: true },
  paidBy: { type: String, required: true },
  paidFor: { type: [String], required: true },
  category: String,
  date: { type: Date, default: Date.now },
});

export const Expense = mongoose.model('Expense', ExpenseSchema);
