import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const getUserSchema = z
	.object({
		pageNumber: z
			.string()
			.min(1, 'Page number must not be empty')
			.transform((val) => {
				const num = Number(val);

				if (isNaN(num)) throw new Error('Page number be a valid number');

				return num;
			})
			.refine((val) => val > 0, { message: 'Page number must be positive' }),
		pageSize: z
			.string()
			.min(1, 'Page number must not be empty')
			.transform((val) => {
				const num = Number(val);

				if (isNaN(num)) throw new Error('Page number be a valid number');

				return num;
			})
			.refine((val) => val > 0, { message: 'Page number must be positive' })
	})
	.openapi({ description: 'Get users list in paging format' });

export const getUserByIdSchema = z
	.object({
		id: z.uuid('Invalid user id')
	})
	.openapi({ description: 'Get user profile' });

export const updateUserSchema = z
	.object({
		bio: z.string().optional(),
		name: z.string().optional(),
		profilePhoto: z.string().optional()
	})
	.openapi({ description: 'Update user profile' });

export const deleteUserSchema = z
	.object({
		id: z.uuid('Invalid user id')
	})
	.openapi({ description: 'Delete own account' });
