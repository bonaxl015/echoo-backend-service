import {
	getCommentsByPostSchema,
	createCommentSchema,
	updateCommentSchema,
	deleteCommentSchema
} from '../../modules/comment/comment.validation';
import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
	getAllCommentResponseSchema,
	createCommentResponseSchema,
	updateCommentResponseSchema,
	deleteCommentResponseSchema,
	commentErrorResponseSchema
} from '../responseSchema';

export const getAllCommentPath: RouteConfig = {
	method: 'get',
	path: '/api/v1/comment/get-all',
	tags: ['Comment'],
	request: {
		query: getCommentsByPostSchema
	},
	responses: {
		200: {
			description: 'Returns comment list',
			content: {
				'application/json': { schema: getAllCommentResponseSchema }
			}
		},
		400: {
			description: 'Failed to get comemnt list',
			content: {
				'application/json': { schema: commentErrorResponseSchema }
			}
		}
	}
};

export const createCommentPath: RouteConfig = {
	method: 'post',
	path: '/api/v1/comment/create',
	tags: ['Comment'],
	request: {
		body: {
			content: {
				'application/json': { schema: createCommentSchema }
			}
		}
	},
	responses: {
		200: {
			description: 'Comment created successfully',
			content: {
				'application/json': { schema: createCommentResponseSchema }
			}
		},
		400: {
			description: 'Failed to create comment',
			content: {
				'application/json': { schema: commentErrorResponseSchema }
			}
		}
	}
};

export const updateCommentPath: RouteConfig = {
	method: 'patch',
	path: '/api/v1/comment/update',
	tags: ['Comment'],
	request: {
		body: {
			content: {
				'application/json': { schema: updateCommentSchema }
			}
		}
	},
	responses: {
		200: {
			description: 'Update comment successful',
			content: {
				'application/json': { schema: updateCommentResponseSchema }
			}
		},
		400: {
			description: 'Failed to update comment',
			content: {
				'application/json': { schema: commentErrorResponseSchema }
			}
		}
	}
};

export const deleteCommentPath: RouteConfig = {
	method: 'delete',
	path: '/api/v1/comment/delete',
	tags: ['Comment'],
	request: {
		body: {
			content: {
				'application/json': { schema: deleteCommentSchema }
			}
		}
	},
	responses: {
		200: {
			description: 'Delete comment successful',
			content: {
				'application/json': { schema: deleteCommentResponseSchema }
			}
		},
		400: {
			description: 'Failed to delete comment',
			content: {
				'application/json': { schema: commentErrorResponseSchema }
			}
		}
	}
};
