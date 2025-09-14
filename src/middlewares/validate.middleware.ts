import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';
import { AppError } from './error.middleware';
import { ValidationProperty } from '../enums/validationProperty';
import { STATUS_CODE } from '../enums/statusCodes';

export const validateRequest =
	(schema: ZodSchema, property: ValidationProperty = ValidationProperty.BODY) =>
	(req: Request, _res: Response, next: NextFunction) => {
		try {
			schema.parse(req[property]);

			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const err: AppError = new Error('Validation Error');

				err.statusCode = STATUS_CODE.BAD_REQUEST;
				err.details = error.issues.map((e) => ({
					path: e.path.join('.'),
					message: e.message
				}));

				return next(err);
			}

			next(error);
		}
	};
