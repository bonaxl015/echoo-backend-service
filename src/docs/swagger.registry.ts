import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { CommentSchema, LikeSchema, PostSchema, UserSchema } from './modelSchema';
import {
	registerPath,
	loginPath,
	forgotPasswordPath,
	resetPasswordPath,
	logoutPath,
	getAllPostPath,
	getPostByIdPath,
	createPostPath,
	updatePostPath,
	deletePostPath,
	getUsersPath,
	getUserByIdPath,
	getCurrentUserInfo,
	updateUserProfilePath,
	deleteUserPath,
	getAllCommentPath,
	createCommentPath,
	updateCommentPath,
	deleteCommentPath,
	likeCommentPath,
	likePostPath,
	unlikeCommentPath,
	unlikePostPath
} from './paths';

export const registry = new OpenAPIRegistry();

// Schemas
registry.register('User', UserSchema);
registry.register('Post', PostSchema);
registry.register('Comment', CommentSchema);
registry.register('Like', LikeSchema);

// Auth endpoint paths
registry.registerPath(registerPath);
registry.registerPath(loginPath);
registry.registerPath(forgotPasswordPath);
registry.registerPath(resetPasswordPath);
registry.registerPath(logoutPath);

// User endpoint paths
registry.registerPath(getUsersPath);
registry.registerPath(getUserByIdPath);
registry.registerPath(getCurrentUserInfo);
registry.registerPath(updateUserProfilePath);
registry.registerPath(deleteUserPath);

// Post endpoint paths
registry.registerPath(getAllPostPath);
registry.registerPath(getPostByIdPath);
registry.registerPath(createPostPath);
registry.registerPath(updatePostPath);
registry.registerPath(deletePostPath);

// Comment endpoint paths
registry.registerPath(getAllCommentPath);
registry.registerPath(createCommentPath);
registry.registerPath(updateCommentPath);
registry.registerPath(deleteCommentPath);

// Comment endpoint paths
registry.registerPath(likeCommentPath);
registry.registerPath(likePostPath);
registry.registerPath(unlikeCommentPath);
registry.registerPath(unlikePostPath);
