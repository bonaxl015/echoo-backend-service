import prisma from '../../config/db';
import { ICreateComment, IDeleteComment, IGetCommentByPost, IUpdateComment } from './comment.types';

export const getCommentsByPost = async ({ postId, pageNumber, pageSize }: IGetCommentByPost) => {
	const getCommentResult = await prisma.comment.findMany({
		where: { postId },
		skip: (pageNumber - 1) * pageSize,
		take: pageSize,
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			author: {
				select: {
					id: true,
					name: true
				}
			}
		}
	});

	if (!getCommentResult) {
		throw new Error('Failed to get comments');
	}

	return { comments: getCommentResult };
};

export const createComment = async ({ authorId, postId, content }: ICreateComment) => {
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
