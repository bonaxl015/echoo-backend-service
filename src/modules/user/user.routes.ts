import { Router } from 'express';
import { authenticateUser } from '../../middlewares/auth.middleware';
import * as userController from './user.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import { upload } from '../../middlewares/upload.middleware';
import {
	getUserSchema,
	getUserByIdSchema,
	updateUserSchema,
	deleteUserSchema
} from './user.validation';
import { ValidationProperty } from '../../enums/validationProperty';

const router = Router();

router.get(
	'/get-all-users',
	authenticateUser,
	validateRequest(getUserSchema, ValidationProperty.QUERY),
	userController.getUsers
);

router.get(
	'/profile',
	authenticateUser,
	validateRequest(getUserByIdSchema, ValidationProperty.QUERY),
	userController.getById
);

router.patch(
	'/profile/update',
	authenticateUser,
	validateRequest(updateUserSchema),
	userController.updateUser
);

router.patch(
	'/profile/update/photo',
	authenticateUser,
	upload.single('photo'),
	userController.updateUserProfilePhoto
);

router.delete(
	'/delete',
	authenticateUser,
	validateRequest(deleteUserSchema),
	userController.deleteUser
);

export default router;
