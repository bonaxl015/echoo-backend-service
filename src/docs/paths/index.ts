export { registerPath, loginPath, forgotPasswordPath, resetPasswordPath, logoutPath } from './auth';
export { getUsersPath, getUserByIdPath, updateUserProfilePath, deleteUserPath } from './user';
export {
	getAllPostPath,
	getPostByIdPath,
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
export { likeCommentPath, likePostPath, unlikeCommentPath, unlikePostPath } from './like';
