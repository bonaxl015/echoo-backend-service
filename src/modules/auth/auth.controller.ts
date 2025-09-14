import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';
import { STATUS_CODE } from '../../enums/statusCodes';
import { errorHandler } from '../../utils/errorHandler';
import { verifyToken } from '../../utils/tokens';
import { JwtPayload } from 'jsonwebtoken';
import { MILLISECOND_TO_SECOND } from '../../constants';

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

		return res.status(STATUS_CODE.SUCCESS).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email } = req.body;

		const result = await authService.forgotPassword({ email });

		return res.status(STATUS_CODE.SUCCESS).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { token, newPassword } = req.body;

		const result = await authService.resetPassword({ token, newPassword });

		return res.status(STATUS_CODE.SUCCESS).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			res.status(STATUS_CODE.UNAUTHORIZED).json({ message: 'Unauthorized' });
		}
		const token = authHeader?.split(' ')[1] || '';

		const decoded = verifyToken(token, { ignoreExpiration: true }) as JwtPayload;
		const expiresIn = (Number(decoded.exp) - Math.floor(Date.now())) / MILLISECOND_TO_SECOND;

		await authService.logoutUser({ token, expiresIn });

		return res.status(STATUS_CODE.SUCCESS).json({ message: 'Logout success' });
	} catch (error) {
		errorHandler(error, next);
	}
};
