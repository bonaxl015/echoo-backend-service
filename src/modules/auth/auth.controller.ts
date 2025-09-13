import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';
import { STATUS_CODE } from '../../enums/statusCodes';
import { errorHandler } from '../../utils/errorHandler';

export const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, email, password } = req.body;

		const result = await authService.registerUser({ name, email, password });

		return res.status(STATUS_CODE.SUCCESS).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;

		const result = await authService.loginUser({ email, password });

		return res.status(200).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};
