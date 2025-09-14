import { Router } from 'express';
import { authenticateUser } from '../../middlewares/auth.middleware';
import * as commentController from './comment.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import {
	getCommentsByPostSchema,
	createCommentSchema,
	updateCommentSchema,
	deleteCommentSchema
} from './comment.validation';
import { ValidationProperty } from '../../enums/validationProperty';

const router = Router();

router.post(
	'/create',
	authenticateUser,
	validateRequest(createCommentSchema),
	commentController.createComment
);

router.get(
	'/get-all',
	authenticateUser,
	validateRequest(getCommentsByPostSchema, ValidationProperty.QUERY),
	commentController.getByPost
);

router.patch(
	'/update',
	authenticateUser,
	validateRequest(updateCommentSchema),
	commentController.updateComment
);

router.delete(
	'/delete',
	authenticateUser,
	validateRequest(deleteCommentSchema),
	commentController.deleteComment
);

export default router;
