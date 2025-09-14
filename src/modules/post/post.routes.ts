import { Router } from 'express';
import { authenticateUser } from '../../middlewares/auth.middleware';
import * as postController from './post.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import {
	createPostSchema,
	deletePostSchema,
	getAllPostSchema,
	getPostByIdSchema,
	updatePostSchema
} from './post.validation';

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
	validateRequest(getAllPostSchema, 'query'),
	postController.getAll
);

router.get(
	'/get',
	authenticateUser,
	validateRequest(getPostByIdSchema, 'query'),
	postController.getById
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
