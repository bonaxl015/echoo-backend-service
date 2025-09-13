import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
	PORT: process.env.PORT || 5051,
	DATABASE_URL: process.env.DATABASE_URL || ''
};
