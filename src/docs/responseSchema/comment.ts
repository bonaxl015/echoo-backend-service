import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

const getCommentResponseSchema = z.object({
	authorName: z.string().openapi({ description: 'User name of the comment creator' }),
	likesCount: z.number().openapi({ description: 'Number of likes in a comment' }),
	isLikedByCurrentUser: z
		.boolean()
		.openapi({ description: 'Whether the current user liked the comment' }),
	content: z.string().openapi({ description: 'Comment content' }),
	id: z.uuid().openapi({ description: 'Unique identifier' }),
	authorId: z.uuid().openapi({ description: 'User ID of the comment creator' }),
	postId: z.uuid().openapi({ description: 'Associated post ID of the comment' }),
	createdAt: z.date().openapi({ description: 'Created date of the comment' }),
	updatedAt: z.date().openapi({ description: 'Updated date of the comment' })
});

const databaseCommentResponseSchema = z.object({
	content: z.string().openapi({ description: 'Comment content' }),
	id: z.uuid().openapi({ description: 'Unique identifier' }),
	authorId: z.uuid().openapi({ description: 'User ID of the comment creator' }),
	postId: z.uuid().openapi({ description: 'Associated post ID of the comment' }),
	createdAt: z.date().openapi({ description: 'Created date of the comment' }),
	updatedAt: z.date().openapi({ description: 'Updated date of the comment' })
});

export const getAllCommentResponseSchema = z.object({
	comments: getCommentResponseSchema.array()
});

export const createCommentResponseSchema = z.object({
	comment: databaseCommentResponseSchema
});

export const updateCommentResponseSchema = z.object({
	comment: databaseCommentResponseSchema
});

export const deleteCommentResponseSchema = z.object({
	deleted: z.boolean().openapi({ description: 'Delete comment success' })
});

export const commentErrorResponseSchema = z.object({
	message: z.string().openapi({ description: 'Error message' })
});
