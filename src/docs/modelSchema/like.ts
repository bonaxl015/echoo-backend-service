import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const LikeSchema = z
	.object({
		id: z.uuid().openapi({ description: 'Unique identifier' }),
		userId: z.uuid().openapi({ description: 'ID of the user who liked' }),
		postId: z.uuid().nullable().openapi({ description: 'Associated post ID (if applicable)' }),
		commentId: z.uuid().nullable().openapi({ description: 'Associated comment ID (if applicable)' })
	})
	.openapi('Like');
