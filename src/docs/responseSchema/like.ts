import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const likePostResponseSchema = z.object({
	like: z.boolean().openapi({ description: 'Status of liking post' })
});

export const unlikePostResponseSchema = z.object({
	unlike: z.boolean().openapi({ description: 'Status of unliking post' })
});

export const likeCommentResponseSchema = z.object({
	like: z.boolean().openapi({ description: 'Status of liking comment' })
});

export const unlikeCommentResponseSchema = z.object({
	unlike: z.boolean().openapi({ description: 'Status of unliking comment' })
});

export const likeErrorResponseSchema = z.object({
	message: z.string().openapi({ description: 'Error message' })
});
