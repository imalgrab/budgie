import { Router } from 'express';
import {
  addBudgie,
  editBudgie,
  getBudgieById,
  getBudgies,
  removeBudgie,
} from '../controllers/budgiesController';
import { verifyToken } from './verifyToken';

export const router: Router = Router();

router.route('/').get(verifyToken, getBudgies).post(verifyToken, addBudgie);
router
  .route('/:budgieId')
  .get(getBudgieById)
  .delete(removeBudgie)
  .put(editBudgie);
