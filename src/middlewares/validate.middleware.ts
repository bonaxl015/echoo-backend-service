import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';
import { AppError } from './error.middleware';

export const validateRequest =
	(schema: ZodSchema, property: 'body' | 'query' | 'params' = 'body') =>
	(req: Request, _res: Response, next: NextFunction) => {
		try {
			schema.parse(req[property]);

			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const err: AppError = new Error('Validation Error');

				err.statusCode = 400;
				err.details = error.issues.map((e) => ({
					path: e.path.join('.'),
					message: e.message
				}));

				return next(err);
			}

			next(error);
		}
	};
