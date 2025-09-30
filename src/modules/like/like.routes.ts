import { Router } from 'express';
import { authenticateUser } from '../../middlewares/auth.middleware';
import * as likeController from './like.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import {
	likePostSchema,
	likeCommentSchema,
	unlikePostSchema,
	unlikeCommentSchema,
	getPostLikeSchema,
	getCommentLikeSchema
} from './like.validation';
import { ValidationProperty } from '../../enums/validationProperty';

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

router.get(
	'/get-post-likes',
	authenticateUser,
	validateRequest(getPostLikeSchema, ValidationProperty.QUERY),
	likeController.getPostLikes
);

router.get(
	'/get-comment-likes',
	authenticateUser,
	validateRequest(getCommentLikeSchema, ValidationProperty.QUERY),
	likeController.getCommentLikes
);

export default router;
