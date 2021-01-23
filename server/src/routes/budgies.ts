import { Router } from 'express';
import { addBudige, getBudgies } from '../controllers/budgiesController';

export const router: Router = Router();

router.route('/').get(getBudgies).post(addBudige);
