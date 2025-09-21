import {
	likeCommentSchema,
	unlikeCommentSchema,
	likePostSchema,
	unlikePostSchema
} from '../../modules/like/like.validation';
import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
	likeCommentResponseSchema,
	unlikeCommentResponseSchema,
	likePostResponseSchema,
	unlikePostResponseSchema,
	likeErrorResponseSchema
} from '../responseSchema';

export const likeCommentPath: RouteConfig = {
	method: 'post',
	path: '/api/v1/like/comment',
	tags: ['Like'],
	request: {
		body: {
			content: {
				'application/json': { schema: likeCommentSchema }
			}
		}
	},
	responses: {
		200: {
			description: 'Like comment success',
			content: {
				'application/json': { schema: likeCommentResponseSchema }
			}
		},
		400: {
			description: 'Like comment failed',
			content: {
				'application/json': { schema: likeErrorResponseSchema }
			}
		}
	}
};

export const likePostPath: RouteConfig = {
	method: 'post',
	path: '/api/v1/like/post',
	tags: ['Like'],
	request: {
		body: {
			content: {
				'application/json': { schema: likePostSchema }
			}
		}
	},
	responses: {
		200: {
			description: 'Like post success',
			content: {
				'application/json': { schema: likePostResponseSchema }
			}
		},
		400: {
			description: 'Like post failed',
			content: {
				'application/json': { schema: likeErrorResponseSchema }
			}
		}
	}
};

export const unlikeCommentPath: RouteConfig = {
	method: 'delete',
	path: '/api/v1/like/comment',
	tags: ['Like'],
	request: {
		body: {
			content: {
				'application/json': { schema: unlikeCommentSchema }
			}
		}
	},
	responses: {
		200: {
			description: 'Unlike comment success',
			content: {
				'application/json': { schema: unlikeCommentResponseSchema }
			}
		},
		400: {
			description: 'Unlike comment failed',
			content: {
				'application/json': { schema: likeErrorResponseSchema }
			}
		}
	}
};

export const unlikePostPath: RouteConfig = {
	method: 'delete',
	path: '/api/v1/like/post',
	tags: ['Like'],
	request: {
		body: {
			content: {
				'application/json': { schema: unlikePostSchema }
			}
		}
	},
	responses: {
		200: {
			description: 'Unlike post success',
			content: {
				'application/json': { schema: unlikePostResponseSchema }
			}
		},
		400: {
			description: 'Unlike post failed',
			content: {
				'application/json': { schema: likeErrorResponseSchema }
			}
		}
	}
};
