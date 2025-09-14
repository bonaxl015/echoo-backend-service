import { z } from 'zod';

export const registerSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters'),
	email: z.email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters')
});

export const loginSchema = z.object({
	email: z.email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters')
});

export const forgotPasswordSchema = z.object({
	email: z.email('Invalid email address')
});

export const resetPasswordSchema = z.object({
	token: z.uuid('Invalid token'),
	newPassword: z.string().min(6, 'Password must be at least 6 characters')
});
