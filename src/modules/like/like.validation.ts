import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const likePostSchema = z
	.object({
		postId: z.uuid('Invalid post id')
	})
	.openapi({ description: 'Like a post' });

export const likeCommentSchema = z
	.object({
		commentId: z.uuid('Invalid comment id'),
		postId: z.uuid('Invalid post id')
	})
	.openapi({ description: 'Like a comment' });

export const unlikePostSchema = z
	.object({
		postId: z.uuid('Invalid post id')
	})
	.openapi({ description: 'Unlike a post' });

export const unlikeCommentSchema = z
	.object({
		commentId: z.uuid('Invalid comment id'),
		postId: z.uuid('Invalid post id')
	})
	.openapi({ description: 'Unlike a comment' });

export const getPostLikeSchema = z
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
	.openapi({ description: 'Get post likes in paging format' });

export const getCommentLikeSchema = z
	.object({
		commentId: z.uuid('Invalid comment id'),
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
	.openapi({ description: 'Get comment likes in paging format' });
