import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
	PORT: process.env.PORT || 5051,
	DATABASE_URL: process.env.DATABASE_URL || '',
	FRONTEND_URL: process.env.FRONTEND_URL || '',
	JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
	TOKEN_EXPIRATION: Number(process.env.TOKEN_EXPIRATION) || 604800,
	NODE_ENV: process.env.NODE_ENV || 'development',
	GMAIL_USER: process.env.GMAIL_USER || '',
	GMAIL_PASS: process.env.GMAIL_PASS || ''
};
