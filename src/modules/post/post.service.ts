import prisma from '../../config/db';
import { invalidatePaginationCache } from '../../utils/redisCache';
import {
	IGetAllPost,
	ICreatePost,
	IGetPostById,
	IUpdatePost,
	IDeletePost,
	IGetPostByUser
} from './post.types';

export const getAllPost = async ({ authorId, pageNumber, pageSize }: IGetAllPost) => {
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
					name: true,
					profilePhoto: true
				}
			},
			likes: {
				select: {
					userId: true
				}
			},
			_count: {
				select: {
					comments: true,
					likes: true
				}
			}
		}
	});

	if (!postList) {
		throw new Error('Failed to get posts');
	}

	const returnPostData = postList.map((item) => ({
		...item,
		authorId: item.author.id,
		authorName: item.author.name,
		authorProfilePhoto: item.author.profilePhoto,
		commentsCount: item._count.comments,
		likesCount: item._count.likes,
		isLikedByCurrentUser: authorId ? item.likes.some((like) => like.userId === authorId) : false,
		_count: undefined,
		likes: undefined,
		author: undefined
	}));

	return { posts: returnPostData };
};

export const getPostById = async ({ id, authorId }: IGetPostById) => {
	const post = await prisma.post.findUnique({
		where: { id },
		include: {
			author: {
				select: {
					id: true,
					name: true,
					profilePhoto: true
				}
			},
			likes: {
				select: {
					userId: true
				}
			},
			_count: {
				select: {
					comments: true,
					likes: true
				}
			}
		}
	});

	if (!post) {
		throw new Error('Post not found');
	}

	const returnPostData = {
		...post,
		authorId: post.author.id,
		authorName: post.author.name,
		authorProfilePhoto: post.author.profilePhoto,
		commentsCount: post._count.comments,
		likesCount: post._count.likes,
		isLikedByCurrentUser: authorId ? post.likes.some((like) => like.userId === authorId) : false,
		_count: undefined,
		likes: undefined,
		author: undefined
	};

	return { post: returnPostData };
};

export const getPostByUserId = async ({ authorId, pageNumber, pageSize }: IGetPostByUser) => {
	const postList = await prisma.post.findMany({
		where: { authorId },
		skip: (pageNumber - 1) * pageSize,
		take: pageSize,
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			author: {
				select: {
					id: true,
					name: true,
					profilePhoto: true
				}
			},
			likes: {
				select: {
					userId: true
				}
			},
			_count: {
				select: {
					comments: true,
					likes: true
				}
			}
		}
	});

	if (!postList) {
		throw new Error('Failed to get posts');
	}

	const returnPostData = postList.map((item) => ({
		...item,
		authorId: item.author.id,
		authorName: item.author.name,
		authorProfilePhoto: item.author.profilePhoto,
		commentsCount: item._count.comments,
		likesCount: item._count.likes,
		isLikedByCurrentUser: authorId ? item.likes.some((like) => like.userId === authorId) : false,
		_count: undefined,
		likes: undefined,
		author: undefined
	}));

	return { posts: returnPostData };
};

export const createPost = async ({ authorId, content }: ICreatePost) => {
	const postCreated = await prisma.post.create({
		data: { authorId, content }
	});

	if (!postCreated) {
		throw new Error('Failed to create post');
	}

	await invalidatePaginationCache('posts', 3);

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

	await invalidatePaginationCache('posts', 3);

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
		throw new Error('Post cannot be deleted');
	}

	await invalidatePaginationCache('posts', 3);

	return { deleted: true };
};
