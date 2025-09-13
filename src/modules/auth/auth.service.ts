import prisma from '../../config/db';
import { hashPassword, comparePassword } from '../../utils/password';
import { generateToken } from '../../utils/tokens';
import { ILoginUserService, IRegisterUserService } from './auth.types';

export const registerUser = async ({ name, email, password }: IRegisterUserService) => {
	const isUserExisting = await prisma.user.findUnique({
		where: { email }
	});

	if (isUserExisting) {
		throw new Error('Email already in use');
	}

	const hashedPassword = await hashPassword(password);
	const userCreated = await prisma.user.create({
		data: { name, email, password: hashedPassword }
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

	return { token: generateToken(user.id), user };
};
