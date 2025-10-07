import {
	getAllPostSchema,
	getPostByIdSchema,
	getPostByUserSchema,
	createPostSchema,
	updatePostSchema,
	deletePostSchema
} from '../../modules/post/post.validation';
import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
	getAllPostResponseSchema,
	getPostByIdResponseSchema,
	createPostResponseSchema,
	updatePostResponseSchema,
	deletePostResponseSchema,
	postErrorResponseSchema,
	getPostsByUserResponseSchema
} from '../responseSchema';

export const getAllPostPath: RouteConfig = {
	method: 'get',
	path: '/api/v1/post/get-all',
	tags: ['Post'],
	request: {
		query: getAllPostSchema
	},
	responses: {
		200: {
			description: 'Returns post list',
			content: {
				'application/json': { schema: getAllPostResponseSchema }
			}
		},
		400: {
			description: 'Failed to get post list',
			content: {
				'application/json': { schema: postErrorResponseSchema }
			}
		}
	}
};

export const getPostByIdPath: RouteConfig = {
	method: 'get',
	path: '/api/v1/post/get',
	tags: ['Post'],
	request: {
		query: getPostByIdSchema
	},
	responses: {
		200: {
			description: 'Successfully returns post by its ID',
			content: {
				'application/json': { schema: getPostByIdResponseSchema }
			}
		},
		400: {
			description: 'Failed to get post',
			content: {
				'application/json': { schema: postErrorResponseSchema }
			}
		}
	}
};

export const getPostsByUserPath: RouteConfig = {
	method: 'get',
	path: '/api/v1/post/get-by-user',
	tags: ['Post'],
	request: {
		query: getPostByUserSchema
	},
	responses: {
		200: {
			description: 'Returns post list created by user',
			content: {
				'application/json': { schema: getPostsByUserResponseSchema }
			}
		},
		400: {
			description: 'Failed to get post list',
			content: {
				'application/json': { schema: postErrorResponseSchema }
			}
		}
	}
};

export const createPostPath: RouteConfig = {
	method: 'post',
	path: '/api/v1/post/create',
	tags: ['Post'],
	request: {
		body: {
			content: {
				'application/json': { schema: createPostSchema }
			}
		}
	},
	responses: {
		200: {
			description: 'Post created successfully',
			content: {
				'application/json': { schema: createPostResponseSchema }
			}
		},
		400: {
			description: 'Failed to create post',
			content: {
				'application/json': { schema: postErrorResponseSchema }
			}
		}
	}
};

export const updatePostPath: RouteConfig = {
	method: 'patch',
	path: '/api/v1/post/update',
	tags: ['Post'],
	request: {
		body: {
			content: {
				'application/json': { schema: updatePostSchema }
			}
		}
	},
	responses: {
		200: {
			description: 'Update post successful',
			content: {
				'application/json': { schema: updatePostResponseSchema }
			}
		},
		400: {
			description: 'Failed to update post',
			content: {
				'application/json': { schema: postErrorResponseSchema }
			}
		}
	}
};

export const deletePostPath: RouteConfig = {
	method: 'delete',
	path: '/api/v1/post/delete',
	tags: ['Post'],
	request: {
		body: {
			content: {
				'application/json': { schema: deletePostSchema }
			}
		}
	},
	responses: {
		200: {
			description: 'Delete post successful',
			content: {
				'application/json': { schema: deletePostResponseSchema }
			}
		},
		400: {
			description: 'Failed to delete post',
			content: {
				'application/json': { schema: postErrorResponseSchema }
			}
		}
	}
};
