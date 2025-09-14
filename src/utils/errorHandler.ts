import { NextFunction } from 'express';
import { AppError } from '../middlewares/error.middleware';
import { STATUS_CODE } from '../enums/statusCodes';

export const errorHandler = (error: unknown, next: NextFunction) => {
	if (error instanceof Error) {
		const err: AppError = new Error(error.message);

		const isNotFound = error.message.includes('not found');

		err.statusCode = isNotFound ? STATUS_CODE.NOT_FOUND : STATUS_CODE.BAD_REQUEST;
		err.details = error.message;

		next(err);
	}
};
