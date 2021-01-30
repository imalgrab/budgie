import { Router } from 'express';
import {
  createExpense,
  getBudgieExpenseById,
  getBudgieExpenses,
} from '../controllers/expensesController';
import { verifyToken } from './verifyToken';

export const router: Router = Router({ mergeParams: true });

router.route('/').post(verifyToken, createExpense).get(getBudgieExpenses);
router.route('/:expenseId').get(getBudgieExpenseById);
