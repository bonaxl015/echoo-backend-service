import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const getCommentsByPostSchema = z
	.object({
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
	})
	.openapi({ description: 'Get comments based on postId in paging format' });

export const createCommentSchema = z
	.object({
		postId: z.uuid('Invalid post id'),
		content: z.string().min(1, 'Comment content cannot be empty')
	})
	.openapi({ description: 'Create new comment' });

export const updateCommentSchema = z
	.object({
		id: z.uuid('Invalid comment id'),
		postId: z.uuid('Invalid post id'),
		content: z.string().min(1, 'Comment content cannot be empty')
	})
	.openapi({ description: 'Update comment' });

export const deleteCommentSchema = z
	.object({
		id: z.uuid('Invalid comment id'),
		postId: z.uuid('Invalid post id')
	})
	.openapi({ description: 'Delete comment' });
