import prisma from '../../config/db';
import { ILikeComment, ILikePost, IUnlikeComment, IUnlikePost } from './like.types';

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

	return { like: true };
};

export const likeComment = async ({ userId, commentId }: ILikeComment) => {
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

	return { unlike: true };
};

export const unlikeComment = async ({ commentId, userId }: IUnlikeComment) => {
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

	return { unlike: true };
};
