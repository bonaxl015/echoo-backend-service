import prisma from '../../config/db';
import { invalidatePaginationCache } from '../../utils/redisCache';
import {
	IGetCommentLikes,
	IGetPostLikes,
	ILikeComment,
	ILikePost,
	IUnlikeComment,
	IUnlikePost
} from './like.types';

export const likePost = async ({ userId, postId }: ILikePost) => {
	const existingLike = await prisma.like.findFirst({
		where: { userId, postId }
	});

	if (existingLike) {
		throw new Error('You have already liked the post');
	}

	const likeResult = await prisma.like.create({
		data: { userId, postId }
	});

	if (!likeResult) {
		throw new Error('Failed to like post');
	}

	await invalidatePaginationCache(`likes:posts:${postId}`, 3);
	await invalidatePaginationCache(`posts:user:${userId}`, 3);
	await invalidatePaginationCache('posts', 3);

	return { like: true };
};

export const likeComment = async ({ userId, commentId, postId }: ILikeComment) => {
	const existingLike = await prisma.like.findFirst({
		where: { userId, commentId }
	});

	if (existingLike) {
		throw new Error('You have already liked the comment');
	}

	const likeResult = await prisma.like.create({
		data: { userId, commentId }
	});

	if (!likeResult) {
		throw new Error('Failed to like comment');
	}

	await invalidatePaginationCache(`likes:comments:${commentId}`, 3);
	await invalidatePaginationCache(`comments:posts:${postId}`, 3);

	return { like: true };
};

export const unlikePost = async ({ postId, userId }: IUnlikePost) => {
	const existingLike = await prisma.like.findFirst({
		where: { userId, postId }
	});

	if (!existingLike) {
		throw new Error('You have already unliked the post');
	}

	const unlikeResult = await prisma.like.delete({
		where: { id: existingLike.id }
	});

	if (!unlikeResult) {
		throw new Error('Failed to unlike');
	}

	await invalidatePaginationCache(`likes:posts:${postId}`, 3);
	await invalidatePaginationCache(`posts:user:${userId}`, 3);
	await invalidatePaginationCache('posts', 3);

	return { unlike: true };
};

export const unlikeComment = async ({ commentId, userId, postId }: IUnlikeComment) => {
	const existingLike = await prisma.like.findFirst({
		where: { userId, commentId }
	});

	if (!existingLike) {
		throw new Error('You have already unliked the comment');
	}

	const unlikeResult = await prisma.like.delete({
		where: { id: existingLike.id }
	});

	if (!unlikeResult) {
		throw new Error('Failed to unlike');
	}

	await invalidatePaginationCache(`likes:comments:${commentId}`, 3);
	await invalidatePaginationCache(`comments:posts:${postId}`, 3);

	return { unlike: true };
};

export const getPostLikes = async ({ postId, pageNumber, pageSize }: IGetPostLikes) => {
	const getPostLikeList = await prisma.like.findMany({
		where: { postId },
		skip: (pageNumber - 1) * pageSize,
		take: pageSize,
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			user: {
				select: {
					name: true,
					profilePhoto: true
				}
			}
		}
	});

	if (!getPostLikeList) {
		throw new Error('Unable to get likes list');
	}

	const returnData = getPostLikeList.map((item) => ({
		...item,
		userName: item.user.name,
		userProfilePhoto: item.user.profilePhoto,
		user: undefined
	}));

	return { likes: returnData };
};

export const getCommentLikes = async ({ commentId, pageNumber, pageSize }: IGetCommentLikes) => {
	const getCommentLikeList = await prisma.like.findMany({
		where: { commentId },
		skip: (pageNumber - 1) * pageSize,
		take: pageSize,
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			user: {
				select: {
					name: true,
					profilePhoto: true
				}
			}
		}
	});

	if (!getCommentLikeList) {
		throw new Error('Unable to get likes list');
	}

	const returnData = getCommentLikeList.map((item) => ({
		...item,
		userName: item.user.name,
		userProfilePhoto: item.user.profilePhoto,
		user: undefined
	}));

	return { likes: returnData };
};
