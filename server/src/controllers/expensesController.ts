import { Request, Response } from 'express';
import { Budgie } from '../models/Budgie';
import { Expense } from '../models/Expense';

// export async function getBudgieExpenses(req: Request, res: Response) {
//   const { budgieId } = req.params;
//   try {
//     const budgieExpenses = await Budgie.findById(budgieId).select('expenses');
//     res.send(budgieExpenses);
//   } catch (error) {
//     res.status(500).json({ error: 'serverError' });
//   }
// }

// export async function getBudgieExpenseById(req: Request, res: Response) {
//   const { budgieId, expenseId } = req.params;
//   try {
//     const expense = await Budgie.findById(budgieId);
//     res.json(expense);
//   } catch (error) {
//     res.status(500).json({ error: 'serverError' });
//   }
// }

export async function createExpense(req: Request, res: Response) {
  const { budgieId } = req.params;
  const { income, title, amount, paidBy, paidFor, category, date } = req.body;
  const expense = new Expense({
    income,
    amount,
    title,
    paidBy,
    paidFor,
    category,
    date,
  });
  try {
    await Budgie.updateOne({ _id: budgieId }, { $push: { expenses: expense } });
    return res.status(201).json(expense);
  } catch (error) {
    return res.status(500).json({ error: 'serverError' });
  }
}

export async function removeExpense(req: Request, res: Response) {
  const { budgieId, expenseId } = req.params;
  try {
    const removedExpense = await Budgie.findOneAndUpdate(
      { _id: budgieId },
      { $pull: { expenses: { _id: expenseId } } },
      { new: true },
    );
    return res.status(200).json(removedExpense);
  } catch (error) {
    return res.status(500).json({ error: 'serverError' });
  }
}
