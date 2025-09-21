import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const registerResponseSchema = z.object({
	token: z.jwt().openapi({ description: "Current registered user's JWT" })
});

export const loginResponseSchema = z.object({
	token: z.jwt().openapi({ description: "Current logged in user's JWT" })
});

export const forgotPasswordResponseSchema = z.object({
	message: z.string().openapi({ description: 'Message notification that email is already sent' })
});

export const resetPasswordResponseSchema = z.object({
	message: z.string().openapi({ description: 'Message notification that password has been reset' })
});

export const logoutResponseSchema = z.object({
	message: z.string().openapi({ description: 'Message notification that user has logged out' })
});

export const authErrorResponseSchema = z.object({
	message: z.string().openapi({ description: 'Error message' })
});
