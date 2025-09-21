import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const UserSchema = z
	.object({
		id: z.uuid().openapi({ description: 'Unique identifier' }),
		name: z.string().openapi({ description: 'Name' }),
		email: z.email().openapi({ description: 'Email address' }),
		profilePhoto: z.url().openapi({ description: 'Profile photo URL' }),
		bio: z.string().optional().openapi({ description: 'Short bio' })
	})
	.openapi('User');
