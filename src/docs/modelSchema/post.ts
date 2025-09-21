import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const PostSchema = z
	.object({
		id: z.uuid().openapi({ description: 'Unique identifier' }),
		content: z.string().openapi({ description: 'Post content' }),
		authorId: z.uuid().openapi({ description: "Author's user ID" }),
		commentCount: z.number().openapi({ description: 'Number of comments in a post' }),
		likeCount: z.number().openapi({ description: 'Number of likes in a post' }),
		isLikedByCurrentUser: z.boolean().openapi({ description: 'Was liked by current user' })
	})
	.openapi('Post');
