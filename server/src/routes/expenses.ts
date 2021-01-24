import { Router } from 'express';
import {
  addExpense,
  getBudgieExpenseById,
  getBudgieExpenses,
} from '../controllers/expensesController';

export const router: Router = Router({ mergeParams: true });

router.route('/').post(addExpense).get(getBudgieExpenses);
router.route('/:expenseId').get(getBudgieExpenseById);
