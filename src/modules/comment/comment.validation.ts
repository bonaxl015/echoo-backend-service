import { z } from 'zod';

export const getCommentsByPostSchema = z.object({
	postId: z.uuid('Invalid post id'),
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

export const createCommentSchema = z.object({
	postId: z.uuid('Invalid post id'),
	content: z.string().min(1, 'Comment content cannot be empty')
});

export const updateCommentSchema = z.object({
	id: z.uuid('Invalid comment id'),
	content: z.string().min(1, 'Comment content cannot be empty')
});

export const deleteCommentSchema = z.object({
	id: z.uuid('Invalid comment id')
});
