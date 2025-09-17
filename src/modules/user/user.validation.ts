import { z } from 'zod';

export const getUserSchema = z.object({
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
});

export const getUserByIdSchema = z.object({
	id: z.uuid('Invalid user id')
});

export const updateUserSchema = z.object({
	bio: z.string().optional(),
	name: z.string().optional(),
	profilePhoto: z.string().optional()
});

export const deleteUserSchema = z.object({
	id: z.uuid('Invalid user id')
});
