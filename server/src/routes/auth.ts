import { Router } from 'express';
import { createUser, signInUser } from '../controllers/authController';

export const router: Router = Router();

router.route('/register').post(createUser);
router.route('/login').post(signInUser);
