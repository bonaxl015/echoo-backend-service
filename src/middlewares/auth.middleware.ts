import { Request, Response, NextFunction } from 'express';
import { STATUS_CODE } from '../enums/statusCodes';
import { verifyToken } from '../utils/tokens';

interface ExtendedRequest extends Request {
	userId: string;
}

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(STATUS_CODE.UNAUTHORIZED).json({ message: 'Unauthorized' });
	}

	try {
		const token = authHeader.split(' ')[1];
		const decoded = verifyToken(token) as { userId: string };

		(req as ExtendedRequest).userId = decoded.userId;

		next();
	} catch {
		return res.status(STATUS_CODE.UNAUTHORIZED).json({ message: 'Invalid token' });
	}
};
