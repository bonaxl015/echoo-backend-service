import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

const getUserResponseSchema = z.object({
	id: z.uuid().openapi({ description: 'User unique identifier' }),
	name: z.string().openapi({ description: 'User name' }),
	bio: z.string().optional().openapi({ description: 'User bio' }),
	profilePhoto: z.url().optional().openapi({ description: 'User profile photo' }),
	email: z.email().openapi({ description: 'User email address' }),
	createdAt: z.date().openapi({ description: 'Date of user creation' }),
	updatedAt: z.date().openapi({ description: 'Date of user info update' }),
	profilePhotoPublicId: z.string().openapi({ description: 'Publid ID of the photo in the cloud' })
});

export const getUserListResponseSchema = z.object({
	users: getUserResponseSchema.array()
});

export const getUserByIdResponseSchema = z.object({
	user: getUserResponseSchema
});

export const updateUserProfileResponseSchema = z.object({
	user: getUserResponseSchema
});

export const deleteUserResponseSchema = z.object({
	delete: z.boolean().openapi({ description: 'Whether the user is deleted' })
});

export const userErrorResponseSchema = z.object({
	message: z.string().openapi({ description: 'Error message' })
});
