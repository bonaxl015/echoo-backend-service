import { Request, Response, NextFunction } from 'express';
import { STATUS_CODE } from '../enums/statusCodes';
import { verifyToken } from '../utils/tokens';
import prisma from '../config/db';

export interface AuthenticatedRequest extends Request {
	userId: string;
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(STATUS_CODE.UNAUTHORIZED).json({ message: 'Unauthorized' });
	}

	try {
		const token = authHeader.split(' ')[1];

		const isRevoked = await prisma.revokedToken.findUnique({
			where: { token }
		});

		if (isRevoked) {
			return res.status(STATUS_CODE.UNAUTHORIZED).json({ message: 'Token is revoked' });
		}

		const decoded = verifyToken(token) as { userId: string };

		(req as AuthenticatedRequest).userId = decoded.userId;

		next();
	} catch {
		return res.status(STATUS_CODE.UNAUTHORIZED).json({ message: 'Invalid token' });
	}
};
