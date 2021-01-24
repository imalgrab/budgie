import { Router } from 'express';
import {
  addBudgie,
  getBudgieById,
  getBudgies,
} from '../controllers/budgiesController';

export const router: Router = Router();

router.route('/').get(getBudgies).post(addBudgie);
router.route('/:budgieId').get(getBudgieById);
