import { Request, Response, NextFunction } from 'express';
import * as userService from './user.service';
import { STATUS_CODE } from '../../enums/statusCodes';
import { errorHandler } from '../../utils/errorHandler';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';
import { removeFileFromPath } from '../../utils/removeFileFromPath';
import { optimizeImage } from '../../utils/optimizeImage';
import { getDefaultProfileUrl } from '../../utils/getDefaultProfileUrl';
import { buildPageCacheKey, getCache, setCache } from '../../utils/redisCache';
import { USER_TTL } from '../../constants';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	const { pageNumber, pageSize } = req.query;

	const pageNumberToInt = Number(pageNumber);
	const pageSizeToInt = Number(pageSize);

	const cacheKey = buildPageCacheKey('users', pageNumberToInt, pageSizeToInt);

	try {
		const cachedData = await getCache(cacheKey);

		if (cachedData) {
			return res.status(STATUS_CODE.SUCCESS).json(cachedData);
		}

		const result = await userService.getUsers({
			pageNumber: pageNumberToInt,
			pageSize: pageSizeToInt
		});

		const returnResult = {
			users: result.users.map((item) => ({
				...item,
				profilePhoto: item.profilePhotoPublicId
					? optimizeImage(item.profilePhotoPublicId, 400)
					: getDefaultProfileUrl(item.name, 400),
				profilePhotoPublicId: undefined
			}))
		};

		await setCache(cacheKey, returnResult, USER_TTL);

		res.status(STATUS_CODE.SUCCESS).json(returnResult);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.query;

	try {
		const result = await userService.getUserById({ id: id as string });

		const optimizedImageUrl = optimizeImage(result.user.profilePhotoPublicId, 400);
		const returnData = {
			user: {
				...result.user,
				profilePhoto: result.user.profilePhotoPublicId
					? optimizedImageUrl
					: getDefaultProfileUrl(result.user.name, 400),
				profilePhotoPublicId: undefined
			}
		};

		res.status(STATUS_CODE.SUCCESS).json(returnData);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const getCurrentUserInfo = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req as AuthenticatedRequest;

	try {
		const result = await userService.getUserById({ id: userId });

		const optimizedImageUrl = optimizeImage(result.user.profilePhotoPublicId, 400);
		const returnData = {
			user: {
				...result.user,
				profilePhoto: result.user.profilePhotoPublicId
					? optimizedImageUrl
					: getDefaultProfileUrl(result.user.name, 400),
				profilePhotoPublicId: undefined
			}
		};

		res.status(STATUS_CODE.SUCCESS).json(returnData);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	const { name, bio, profilePhoto } = req.body;
	const { userId } = req as AuthenticatedRequest;

	try {
		const result = await userService.updateUser({
			id: userId,
			data: { name, bio, profilePhoto }
		});

		res.status(STATUS_CODE.SUCCESS).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const updateUserProfilePhoto = async (req: Request, res: Response, next: NextFunction) => {
	const { userId, file } = req as AuthenticatedRequest;

	if (!file) {
		return res.status(400).json({ message: 'No file uploaded' });
	}

	try {
		const currentUser = await userService.getUserById({ id: userId });

		removeFileFromPath(currentUser.user.profilePhotoPublicId);

		const result = await userService.updateUser({
			id: userId,
			data: {
				profilePhoto: file.path,
				profilePhotoPublicId: file.filename
			}
		});

		res.status(STATUS_CODE.SUCCESS).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.body;
	const { userId } = req as AuthenticatedRequest;
	const { authorization } = req.headers;

	if (userId !== id) {
		return res
			.status(STATUS_CODE.FORBIDDEN)
			.json({ message: 'You can only delete your own account' });
	}

	const token = authorization?.startsWith('Bearer ') ? authorization.split(' ')[1] : null;

	try {
		const result = await userService.deleteUser({ id, token });

		res.status(STATUS_CODE.SUCCESS).json(result);
	} catch (error) {
		errorHandler(error, next);
	}
};
