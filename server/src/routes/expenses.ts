import { Router } from 'express';
import {
  createExpense,
  removeExpense,
  getBudgieExpenses,
  // getBudgieExpenseById,
} from '../controllers/expensesController';
import { verifyToken } from './verifyToken';

export const router: Router = Router({ mergeParams: true });

router
  .route('/')
  .post(verifyToken, createExpense)
  .get(verifyToken, getBudgieExpenses);
router.route('/:expenseId').delete(removeExpense); //.get(getBudgieExpenseById);
