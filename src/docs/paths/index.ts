export { registerPath, loginPath, forgotPasswordPath, resetPasswordPath, logoutPath } from './auth';
export {
	getUsersPath,
	getUserByIdPath,
	getCurrentUserInfo,
	updateUserProfilePath,
	deleteUserPath
} from './user';
export {
	getAllPostPath,
	getPostByIdPath,
	getPostsByUserPath,
	createPostPath,
	updatePostPath,
	deletePostPath
} from './post';
export {
	getAllCommentPath,
	createCommentPath,
	updateCommentPath,
	deleteCommentPath
} from './comment';
export {
	likeCommentPath,
	likePostPath,
	unlikeCommentPath,
	unlikePostPath,
	getPostLikesPath,
	getCommentLikesPath
} from './like';
