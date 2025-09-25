import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

const getPostResponseSchema = z.object({
	authorName: z.string().openapi({ description: 'User name of the post creator' }),
	authorProfilePhoto: z.url().openapi({ description: "URL of poster's profile photo" }),
	commentsCount: z.number().openapi({ description: 'Number of comments in a post' }),
	likesCount: z.number().openapi({ description: 'Number of likes in a post' }),
	isLikedByCurrentUser: z
		.boolean()
		.openapi({ description: 'Whether the current user liked the post' }),
	content: z.string().openapi({ description: 'Post content' }),
	id: z.uuid().openapi({ description: 'Post ID' }),
	authorId: z.uuid().openapi({ description: 'User ID of th post creator' }),
	createdAt: z.date().openapi({ description: 'Created date of the post' }),
	updatedAt: z.date().openapi({ description: 'Updated date of the post' })
});

const databasePostResponseSchema = z.object({
	content: z.string().openapi({ description: 'Post content' }),
	id: z.uuid().openapi({ description: 'Post ID' }),
	authorId: z.uuid().openapi({ description: 'User ID of th post creator' }),
	createdAt: z.date().openapi({ description: 'Created date of the post' }),
	updatedAt: z.date().openapi({ description: 'Updated date of the post' })
});

export const getAllPostResponseSchema = z.object({
	posts: getPostResponseSchema.array()
});

export const getPostByIdResponseSchema = z.object({
	post: getPostResponseSchema
});

export const getPostsByUserResponseSchema = z.object({
	posts: getPostResponseSchema.array()
});

export const createPostResponseSchema = z.object({
	post: databasePostResponseSchema
});

export const updatePostResponseSchema = z.object({
	post: databasePostResponseSchema
});

export const deletePostResponseSchema = z.object({
	deleted: z.boolean().openapi({ description: 'Delete post success' })
});

export const postErrorResponseSchema = z.object({
	message: z.string().openapi({ description: 'Error message' })
});
