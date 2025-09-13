import { Request, Response, NextFunction } from 'express';
import { STATUS_CODE } from '../enums/statusCodes';

export interface AppError extends Error {
	statusCode?: number;
	details?: unknown;
}

type ErrorResponse = {
	message: string;
	details?: unknown;
};

/**
 * Express global error handler
 * Catches thrown errors from controller and services
 */
export const errorHandler = (err: AppError, _req: Request, res: Response, _next: NextFunction) => {
	const statusCode = err.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR;
	const message = err.message || 'Internal Server Error';

	const errorResponse: ErrorResponse = {
		message,
		details: err.details
	};

	res.status(statusCode).json(errorResponse);
};
