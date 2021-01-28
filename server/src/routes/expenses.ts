import { Router } from 'express';
import {
  createExpense,
  getBudgieExpenseById,
  getBudgieExpenses,
} from '../controllers/expensesController';

export const router: Router = Router({ mergeParams: true });

router.route('/').post(createExpense).get(getBudgieExpenses);
router.route('/:expenseId').get(getBudgieExpenseById);
