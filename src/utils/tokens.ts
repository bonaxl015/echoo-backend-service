import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

export const generateToken = (userId: string) => {
	return jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn: ENV.TOKEN_EXPIRATION });
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, ENV.JWT_SECRET);
};
