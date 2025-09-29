import { Request, Response, NextFunction } from 'express';
import * as commentService from './comment.service';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';
import { STATUS_CODE } from '../../enums/statusCodes';
import { errorHandler } from '../../utils/errorHandler';
import { buildPageCacheKey, getCache, setCache } from '../../utils/redisCache';
import { COMMENT_TTL } from '../../constants';

export const getByPost = async (req: Request, res: Response, next: NextFunction) => {
	const { postId, pageNumber, pageSize } = req.query;
	const { userId } = req as AuthenticatedRequest;

	const pageNumberToInt = Number(pageNumber);
	const pageSizeToInt = Number(pageSize);

	const cacheKey = buildPageCacheKey(`comments:posts:${postId}`, pageNumberToInt, pageSizeToInt);

	try {
		const cachedData = await getCache(cacheKey);

		if (cachedData) {
			return res.status(STATUS_CODE.SUCCESS).json(cachedData);
		}

		const result = await commentService.getCommentsByPost({
			authorId: userId,
			postId: postId as string,
			pageNumber: pageNumberToInt,
			pageSize: pageSizeToInt
		});

		await setCache(cacheKey, result, COMMENT_TTL);

		res.status(STATUS_CODE.SUCCESS).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req as AuthenticatedRequest;
	const { postId, content } = req.body;

	try {
		const result = await commentService.createComment({ authorId: userId, postId, content });

		res.status(STATUS_CODE.CREATED).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req as AuthenticatedRequest;
	const { id, content, postId } = req.body;

	try {
		const result = await commentService.updateComment({ authorId: userId, id, content, postId });

		res.status(STATUS_CODE.SUCCESS).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req as AuthenticatedRequest;
	const { id, postId } = req.body;

	try {
		const result = await commentService.deleteComment({ authorId: userId, id, postId });

		res.status(STATUS_CODE.SUCCESS).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};
