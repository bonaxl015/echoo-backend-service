import { v4 as uuidv4 } from 'uuid';
import prisma from '../../config/db';
import { hashPassword, comparePassword } from '../../utils/password';
import { generateToken } from '../../utils/tokens';
import {
	IForgotPasswordService,
	ILoginUserService,
	ILogoutUserService,
	IRegisterUserService,
	IResetPasswordService
} from './auth.types';
import { MILLISECOND_TO_SECOND, ONE_HOUR_IN_SECONDS } from '../../constants';
import { ENV } from '../../config/env';
import { sendEmail } from '../../utils/sendEmail';

export const registerUser = async ({ name, email, password }: IRegisterUserService) => {
	const isUserExisting = await prisma.user.findUnique({
		where: { email }
	});

	if (isUserExisting) {
		throw new Error('Email already in use');
	}

	const hashedPassword = await hashPassword(password);
	const userCreated = await prisma.user.create({
		data: { name, email, password: hashedPassword },
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

	return { token: generateToken(userCreated.id), user: userCreated };
};

export const loginUser = async ({ email, password }: ILoginUserService) => {
	const user = await prisma.user.findUnique({
		where: { email }
	});

	if (!user) {
		throw new Error('Email not found');
	}

	const isValid = await comparePassword(password, user.password);

	if (!isValid) {
		throw new Error('Incorrect password');
	}

	const userData = {
		id: user.id,
		name: user.name,
		email: user.email,
		profilePhoto: user.profilePhoto,
		bio: user.bio,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt
	};

	user.password = '';

	return { token: generateToken(user.id), user: userData };
};

export const forgotPassword = async ({ email }: IForgotPasswordService) => {
	const user = await prisma.user.findUnique({
		where: { email }
	});

	if (!user) {
		throw new Error('No account found');
	}

	const resetToken = uuidv4();
	const expiry = new Date(Date.now() + ONE_HOUR_IN_SECONDS);

	await prisma.user.update({
		where: { email },
		data: {
			resetToken,
			resetTokenExpiry: expiry
		}
	});

	const resetLink = `${ENV.FRONTEND_URL}/reset-password/${resetToken}`;

	await sendEmail({
		from: '"Echoo Support" <echoo_support@gmail.com>',
		to: email,
		subject: 'Password Reset',
		text: `Click here to reset your password ${resetLink}`
	});

	return { message: 'Password reset email sent' };
};

export const resetPassword = async ({ token, newPassword }: IResetPasswordService) => {
	const user = await prisma.user.findFirst({
		where: {
			resetToken: token,
			resetTokenExpiry: { gt: new Date() }
		}
	});

	if (!user) {
		throw new Error('Invalid or expired token');
	}

	await prisma.user.update({
		where: { id: user.id },
		data: {
			password: await hashPassword(newPassword),
			resetToken: null,
			resetTokenExpiry: null
		}
	});

	return { message: 'Password successfully reset' };
};

export const logoutUser = async ({ token, expiresIn }: ILogoutUserService) => {
	const expiryDate = new Date(Date.now() + expiresIn * MILLISECOND_TO_SECOND);

	await prisma.revokedToken.create({
		data: {
			token,
			expiresAt: expiryDate
		}
	});

	return { message: 'Logged out successfully' };
};
