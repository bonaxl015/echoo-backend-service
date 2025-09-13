import { NextFunction } from 'express';
import { AppError } from '../middlewares/error.middleware';
import { STATUS_CODE } from '../enums/statusCodes';

export const errorHandler = (error: unknown, next: NextFunction) => {
	if (error instanceof Error) {
		const err: AppError = new Error(error.message);

		err.statusCode = STATUS_CODE.BAD_REQUEST;
		err.details = error.message;

		next(err);
	}
};
