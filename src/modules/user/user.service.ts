import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../config/db';
import { AppError } from '../../middlewares/error.middleware';
import { verifyToken } from '../../utils/tokens';
import { IDeleteUser, IGetUsers, IGetUserById, IUpdateUser } from './user.types';
import { MILLISECOND_TO_SECOND } from '../../constants';

export const getUsers = async ({ pageNumber, pageSize }: IGetUsers) => {
	const findUser = await prisma.user.findMany({
		skip: (pageNumber - 1) * pageSize,
		take: pageSize,
		orderBy: {
			createdAt: 'desc'
		},
		select: {
			id: true,
			name: true,
			email: true,
			profilePhoto: true,
			bio: true,
			createdAt: true,
			updatedAt: true
		}
	});

	if (!findUser) {
		throw new Error('User list not found');
	}

	return { users: findUser };
};

export const getUserById = async ({ id }: IGetUserById) => {
	const findUser = await prisma.user.findUnique({
		where: { id },
		select: {
			id: true,
			name: true,
			email: true,
			profilePhoto: true,
			bio: true,
			createdAt: true,
			updatedAt: true
		}
	});

	if (!findUser) {
		throw new Error('User not found');
	}

	return { user: findUser };
};

export const updateUser = async ({ id, data }: IUpdateUser) => {
	const findUser = await prisma.user.findUnique({
		where: { id }
	});

	if (!findUser) {
		throw new Error('User not found');
	}

	const updateUserResult = await prisma.user.update({
		where: { id },
		data,
		select: {
			id: true,
			name: true,
			email: true,
			profilePhoto: true,
			bio: true,
			createdAt: true,
			updatedAt: true
		}
	});

	if (!updateUserResult) {
		throw new Error('Failed to update user');
	}

	return { user: updateUserResult };
};

export const deleteUser = async ({ id, token }: IDeleteUser) => {
	if (!token) {
		const error: AppError = new Error('Token is required');
		error.statusCode = 403;
		throw error;
	}

	const decoded = verifyToken(token, { ignoreExpiration: true });
	const exp = (decoded as JwtPayload).exp;

	if (!exp) {
		const error: AppError = new Error('Invalid token');
		error.statusCode = 403;
		throw error;
	}

	const findUser = await prisma.user.findUnique({
		where: { id }
	});

	if (!findUser) {
		const error: AppError = new Error('User not found');
		error.statusCode = 404;
		throw error;
	}

	await prisma.revokedToken.create({
		data: {
			token,
			expiresAt: new Date(exp * MILLISECOND_TO_SECOND)
		}
	});

	const deleteUserResult = await prisma.user.delete({
		where: { id }
	});

	if (!deleteUserResult) {
		throw new Error('Failed to delete user');
	}

	return { delete: true };
};
