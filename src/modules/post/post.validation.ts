import { z } from 'zod';

export const getAllPostSchema = z.object({
	pageNumber: z
		.string()
		.min(1, 'Must not be empty')
		.transform((val) => {
			const num = Number(val);

			if (isNaN(num)) throw new Error('Page number be a valid number');

			return num;
		})
		.refine((val) => val > 0, { message: 'Page number must be positive' }),
	pageSize: z
		.string()
		.min(1, 'Must not be empty')
		.transform((val) => {
			const num = Number(val);

			if (isNaN(num)) throw new Error('Page number be a valid number');

			return num;
		})
		.refine((val) => val > 0, { message: 'Page number must be positive' })
});

export const getPostByIdSchema = z.object({
	id: z.uuid('Invalid post id')
});

export const createPostSchema = z.object({
	content: z.string().min(1, 'Post content cannot be empty')
});

export const updatePostSchema = z.object({
	id: z.uuid('Invalid post id'),
	content: z.string().min(1, 'Post content cannot be empty')
});

export const deletePostSchema = z.object({
	id: z.uuid('Invalid post id')
});
