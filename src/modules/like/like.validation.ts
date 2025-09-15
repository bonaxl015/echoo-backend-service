import { z } from 'zod';

export const likePostSchema = z.object({
	postId: z.uuid('Invalid post id')
});

export const likeCommentSchema = z.object({
	commentId: z.uuid('Invalid post id')
});

export const unlikePostSchema = z.object({
	postId: z.uuid('Invalid post id')
});

export const unlikeCommentSchema = z.object({
	commentId: z.uuid('Invalid post id')
});
