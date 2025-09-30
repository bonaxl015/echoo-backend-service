import { Request, Response, NextFunction } from 'express';
import * as likeService from './like.service';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';
import { STATUS_CODE } from '../../enums/statusCodes';
import { errorHandler } from '../../utils/errorHandler';
import { buildPageCacheKey, getCache, setCache } from '../../utils/redisCache';
import { LIKE_TTL } from '../../constants';

export const likePost = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req as AuthenticatedRequest;
	const { postId } = req.body;

	try {
		const result = await likeService.likePost({ userId, postId });

		res.status(STATUS_CODE.CREATED).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const likeComment = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req as AuthenticatedRequest;
	const { commentId } = req.body;

	try {
		const result = await likeService.likeComment({ userId, commentId });

		res.status(STATUS_CODE.CREATED).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const unlikePost = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req as AuthenticatedRequest;
	const { postId } = req.body;

	try {
		const result = await likeService.unlikePost({ postId, userId });

		res.status(STATUS_CODE.SUCCESS).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const unlikeComment = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req as AuthenticatedRequest;
	const { commentId } = req.body;

	try {
		const result = await likeService.unlikeComment({ commentId, userId });

		res.status(STATUS_CODE.SUCCESS).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const getPostLikes = async (req: Request, res: Response, next: NextFunction) => {
	const { postId, pageNumber, pageSize } = req.query;

	const pageNumberToInt = Number(pageNumber);
	const pageSizeToInt = Number(pageSize);

	const cacheKey = buildPageCacheKey(`likes:posts:${postId}`, pageNumberToInt, pageSizeToInt);

	try {
		const cachedData = await getCache(cacheKey);

		if (cachedData) {
			return res.status(STATUS_CODE.SUCCESS).json(cachedData);
		}

		const result = await likeService.getPostLikes({
			postId: postId as string,
			pageNumber: pageNumberToInt,
			pageSize: pageSizeToInt
		});

		await setCache(cacheKey, result, LIKE_TTL);

		res.status(STATUS_CODE.SUCCESS).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const getCommentLikes = async (req: Request, res: Response, next: NextFunction) => {
	const { commentId, pageNumber, pageSize } = req.query;

	const pageNumberToInt = Number(pageNumber);
	const pageSizeToInt = Number(pageSize);

	const cacheKey = buildPageCacheKey(`likes:comments:${commentId}`, pageNumberToInt, pageSizeToInt);

	try {
		const cachedData = await getCache(cacheKey);

		if (cachedData) {
			return res.status(STATUS_CODE.SUCCESS).json(cachedData);
		}

		const result = await likeService.getCommentLikes({
			commentId: commentId as string,
			pageNumber: pageNumberToInt,
			pageSize: pageSizeToInt
		});

		await setCache(cacheKey, result, LIKE_TTL);

		res.status(STATUS_CODE.SUCCESS).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};
