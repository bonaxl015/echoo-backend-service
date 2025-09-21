import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const CommentSchema = z
	.object({
		id: z.uuid().openapi({ description: 'Unique identifier' }),
		content: z.string().openapi({ description: 'Comment content' }),
		authorId: z.uuid().openapi({ description: "Author's user ID" }),
		postId: z.uuid().openapi({ description: 'Associated post ID' }),
		likeCount: z.number().openapi({ description: 'Number of likes in a comment' }),
		isLikedByCurrentUser: z.boolean().openapi({ description: 'Was liked by current user' })
	})
	.openapi('Comment');
