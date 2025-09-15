import { Router } from 'express';
import { authenticateUser } from '../../middlewares/auth.middleware';
import * as likeController from './like.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import {
	likePostSchema,
	likeCommentSchema,
	unlikePostSchema,
	unlikeCommentSchema
} from './like.validation';

const router = Router();

router.post('/post', authenticateUser, validateRequest(likePostSchema), likeController.likePost);

router.post(
	'/comment',
	authenticateUser,
	validateRequest(likeCommentSchema),
	likeController.likeComment
);

router.delete(
	'/post',
	authenticateUser,
	validateRequest(unlikePostSchema),
	likeController.unlikePost
);

router.delete(
	'/comment',
	authenticateUser,
	validateRequest(unlikeCommentSchema),
	likeController.unlikeComment
);

export default router;
