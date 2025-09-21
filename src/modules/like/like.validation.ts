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
		commentId: z.uuid('Invalid post id')
	})
	.openapi({ description: 'Like a comment' });

export const unlikePostSchema = z
	.object({
		postId: z.uuid('Invalid post id')
	})
	.openapi({ description: 'Unlike a post' });

export const unlikeCommentSchema = z
	.object({
		commentId: z.uuid('Invalid post id')
	})
	.openapi({ description: 'Unlike a comment' });
