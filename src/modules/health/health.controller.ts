import { Request, Response } from 'express';
import { STATUS_CODE } from '../../enums/statusCodes';

export const healthCheck = async (_req: Request, res: Response) => {
	return res.status(STATUS_CODE.SUCCESS).json({ message: 'ok' });
};
