import { Router } from 'express';
import { authenticateUser } from '../../middlewares/auth.middleware';
import * as postController from './post.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import {
	createPostSchema,
	deletePostSchema,
	getAllPostSchema,
	getPostByIdSchema,
	getPostByUserSchema,
	updatePostSchema
} from './post.validation';
import { ValidationProperty } from '../../enums/validationProperty';

const router = Router();

router.post(
	'/create',
	authenticateUser,
	validateRequest(createPostSchema),
	postController.createPost
);

router.get(
	'/get-all',
	authenticateUser,
	validateRequest(getAllPostSchema, ValidationProperty.QUERY),
	postController.getAll
);

router.get(
	'/get',
	authenticateUser,
	validateRequest(getPostByIdSchema, ValidationProperty.QUERY),
	postController.getById
);

router.get(
	'/get-by-user',
	authenticateUser,
	validateRequest(getPostByUserSchema, ValidationProperty.QUERY),
	postController.getPostByUserId
);

router.patch(
	'/update',
	authenticateUser,
	validateRequest(updatePostSchema),
	postController.updatePost
);

router.delete(
	'/delete',
	authenticateUser,
	validateRequest(deletePostSchema),
	postController.deletePost
);

export default router;
