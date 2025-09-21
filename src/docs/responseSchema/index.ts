export {
	registerResponseSchema,
	loginResponseSchema,
	forgotPasswordResponseSchema,
	resetPasswordResponseSchema,
	logoutResponseSchema,
	authErrorResponseSchema
} from './auth';

export {
	getUserListResponseSchema,
	getUserByIdResponseSchema,
	updateUserProfileResponseSchema,
	deleteUserResponseSchema,
	userErrorResponseSchema
} from './user';

export {
	getAllPostResponseSchema,
	getPostByIdResponseSchema,
	createPostResponseSchema,
	updatePostResponseSchema,
	deletePostResponseSchema,
	postErrorResponseSchema
} from './post';

export {
	getAllCommentResponseSchema,
	createCommentResponseSchema,
	updateCommentResponseSchema,
	deleteCommentResponseSchema,
	commentErrorResponseSchema
} from './comment';

export {
	likePostResponseSchema,
	unlikePostResponseSchema,
	likeCommentResponseSchema,
	unlikeCommentResponseSchema,
	likeErrorResponseSchema
} from './like';
