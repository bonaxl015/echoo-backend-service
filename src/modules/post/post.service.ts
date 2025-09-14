import prisma from '../../config/db';
import { IGetAllPost, ICreatePost, IGetPostById, IUpdatePost, IDeletePost } from './post.types';

export const getAllPost = async ({ pageNumber, pageSize }: IGetAllPost) => {
	const postList = await prisma.post.findMany({
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

	return { posts: postList };
};

export const getPostById = async ({ id }: IGetPostById) => {
	const post = await prisma.post.findUnique({
		where: { id },
		include: {
			author: {
				select: {
					id: true,
					name: true
				}
			}
		}
	});

	if (!post) {
		throw new Error('Post not found');
	}

	return { post };
};

export const createPost = async ({ authorId, content }: ICreatePost) => {
	const postCreated = await prisma.post.create({
		data: { authorId, content }
	});

	if (!postCreated) {
		throw new Error('Failed to create post');
	}

	return { post: postCreated };
};

export const updatePost = async ({ id, authorId, content }: IUpdatePost) => {
	const post = await prisma.post.findUnique({
		where: { id, authorId }
	});

	if (!post) {
		throw new Error('Post not found');
	}

	const updatedPost = await prisma.post.update({
		where: { id, authorId },
		data: { content }
	});

	if (!updatedPost) {
		throw new Error('Failed to update post');
	}

	return { post: updatedPost };
};

export const deletePost = async ({ id, authorId }: IDeletePost) => {
	const post = await prisma.post.findUnique({
		where: { id, authorId }
	});

	if (!post) {
		throw new Error('Post not found');
	}

	const deletedPost = await prisma.post.delete({
		where: { id, authorId }
	});

	if (!deletedPost) {
		throw new Error('Post cannot be updated');
	}

	return { deleted: true };
};
