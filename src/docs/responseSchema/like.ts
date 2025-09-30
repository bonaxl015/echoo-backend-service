import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

const getLikesSchema = z.object({
	userName: z.string().openapi({ description: 'Name of the user' }),
	userProfilePhoto: z.url().openapi({ description: "URL of user's profile photo" }),
	userId: z.uuid().openapi({ description: 'Unique ID of the user' }),
	postId: z.uuid().openapi({ description: 'Unique ID of the post' }),
	commentId: z.uuid().openapi({ description: 'Unique ID of the comment' }),
	id: z.uuid().openapi({ description: 'Unique ID of the like' }),
	createdAt: z.date().openapi({ description: 'Created date of the like' }),
	updatedAt: z.date().openapi({ description: 'Updated date of the like' })
});

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

export const getPostLikeResponseSchema = z.object({
	likes: getLikesSchema.array()
});

export const getCommentLikeResponseSchema = z.object({
	likes: getLikesSchema.array()
});

export const likeErrorResponseSchema = z.object({
	message: z.string().openapi({ description: 'Error message' })
});
