import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const getAllPostSchema = z
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
	.openapi({ description: 'Get posts list in paging format' });

export const getPostByUserSchema = z
	.object({
		userId: z.uuid('Invalid user id'),
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
	.openapi({ description: 'Get post list by userId in paging format' });

export const getPostByIdSchema = z
	.object({
		id: z.uuid('Invalid post id')
	})
	.openapi({ description: 'Get post based on postId' });

export const createPostSchema = z
	.object({
		content: z.string().min(1, 'Post content cannot be empty')
	})
	.openapi({ description: 'Create new post' });

export const updatePostSchema = z
	.object({
		id: z.uuid('Invalid post id'),
		content: z.string().min(1, 'Post content cannot be empty')
	})
	.openapi({ description: 'Update post' });

export const deletePostSchema = z
	.object({
		id: z.uuid('Invalid post id')
	})
	.openapi({ description: 'Delete post' });
