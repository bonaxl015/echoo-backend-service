import prisma from '../../config/db';
import { ICreateComment, IDeleteComment, IGetCommentByPost, IUpdateComment } from './comment.types';

export const getCommentsByPost = async ({
	authorId,
	postId,
	pageNumber,
	pageSize
}: IGetCommentByPost) => {
	const commentList = await prisma.comment.findMany({
		where: { postId },
		skip: (pageNumber - 1) * pageSize,
		take: pageSize,
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			author: {
				select: {
					name: true
				}
			},
			likes: {
				select: {
					userId: true
				}
			},
			_count: {
				select: {
					likes: true
				}
			}
		}
	});

	if (!commentList) {
		throw new Error('Failed to get comments');
	}

	const returnCommentData = commentList.map((item) => ({
		...item,
		authorName: item.author.name,
		likesCount: item._count.likes,
		isLikedByCurrentUser: authorId ? item.likes.some((like) => like.userId === authorId) : false,
		author: undefined,
		_count: undefined,
		likes: undefined
	}));

	return { comments: returnCommentData };
};

export const createComment = async ({ authorId, postId, content }: ICreateComment) => {
	const findPost = await prisma.post.findUnique({
		where: { id: postId }
	});

	if (!findPost) {
		throw new Error('Post not found');
	}

	const createCommentResult = await prisma.comment.create({
		data: { authorId, postId, content }
	});

	if (!createCommentResult) {
		throw new Error('Filed to create comment');
	}

	return { comment: createCommentResult };
};

export const updateComment = async ({ authorId, id, content }: IUpdateComment) => {
	const findCommentResult = await prisma.comment.findUnique({
		where: { id, authorId }
	});

	if (!findCommentResult) {
		throw new Error('Comment not found');
	}

	const updateCommentResult = await prisma.comment.update({
		where: { id, authorId },
		data: { content }
	});

	if (!updateCommentResult) {
		throw new Error('Failed to update comment');
	}

	return { comment: updateCommentResult };
};

export const deleteComment = async ({ id, authorId }: IDeleteComment) => {
	const findCommentResult = await prisma.comment.findUnique({
		where: { id, authorId }
	});

	if (!findCommentResult) {
		throw new Error('Comment not found');
	}

	const deleteCommentResult = await prisma.comment.delete({
		where: { id, authorId }
	});

	if (!deleteCommentResult) {
		throw new Error('Failed to delete comment');
	}

	return { delete: true };
};
