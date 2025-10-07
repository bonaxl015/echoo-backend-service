import { Request, Response, NextFunction } from 'express';
import * as postService from './post.service';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';
import { STATUS_CODE } from '../../enums/statusCodes';
import { errorHandler } from '../../utils/errorHandler';
import { buildPageCacheKey, getCache, setCache } from '../../utils/redisCache';
import { POST_TTL } from '../../constants';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
	const { pageNumber, pageSize } = req.query;
	const { userId } = req as AuthenticatedRequest;

	const pageNumberToInt = Number(pageNumber);
	const pageSizeToInt = Number(pageSize);

	const cacheKey = buildPageCacheKey('posts', pageNumberToInt, pageSizeToInt);

	try {
		const cachedData = await getCache(cacheKey);

		if (cachedData) {
			return res.status(STATUS_CODE.SUCCESS).json(cachedData);
		}

		const result = await postService.getAllPost({
			authorId: userId,
			pageNumber: pageNumberToInt,
			pageSize: pageSizeToInt
		});

		await setCache(cacheKey, result, POST_TTL);

		res.status(STATUS_CODE.SUCCESS).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.query;
	const { userId } = req as AuthenticatedRequest;

	try {
		const result = await postService.getPostById({ authorId: userId, id: id as string });

		res.status(STATUS_CODE.SUCCESS).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const getPostByUserId = async (req: Request, res: Response, next: NextFunction) => {
	const { userId, pageNumber, pageSize } = req.query;

	const pageNumberToInt = Number(pageNumber);
	const pageSizeToInt = Number(pageSize);

	const cacheKey = buildPageCacheKey(`posts:user:${userId}`, pageNumberToInt, pageSizeToInt);

	try {
		const cachedData = await getCache(cacheKey);

		if (cachedData) {
			return res.status(STATUS_CODE.SUCCESS).json(cachedData);
		}

		const result = await postService.getPostByUserId({
			authorId: userId as string,
			pageNumber: pageNumberToInt,
			pageSize: pageSizeToInt
		});

		await setCache(cacheKey, result, POST_TTL);

		res.status(STATUS_CODE.SUCCESS).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req as AuthenticatedRequest;
	const { content } = req.body;

	try {
		const result = await postService.createPost({ authorId: userId, content });

		res.status(STATUS_CODE.CREATED).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req as AuthenticatedRequest;
	const { id, content } = req.body;

	try {
		const result = await postService.updatePost({ authorId: userId, id, content });

		res.status(STATUS_CODE.SUCCESS).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req as AuthenticatedRequest;
	const { id } = req.body;

	try {
		const result = await postService.deletePost({ authorId: userId, id });

		res.status(STATUS_CODE.SUCCESS).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};
