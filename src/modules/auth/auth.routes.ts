import { Router } from 'express';
import * as authController from './auth.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import {
	registerSchema,
	loginSchema,
	forgotPasswordSchema,
	resetPasswordSchema
} from './auth.validation';

const router = Router();

router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/login', validateRequest(loginSchema), authController.login);
router.post(
	'/forgot-password',
	validateRequest(forgotPasswordSchema),
	authController.forgotPassword
);
router.post('/reset-password', validateRequest(resetPasswordSchema), authController.resetPassword);

export default router;
