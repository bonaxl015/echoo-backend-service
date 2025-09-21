import {
	getUserSchema,
	getUserByIdSchema,
	updateUserSchema,
	deleteUserSchema
} from '../../modules/user/user.validation';
import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
	getUserListResponseSchema,
	getUserByIdResponseSchema,
	updateUserProfileResponseSchema,
	deleteUserResponseSchema,
	userErrorResponseSchema
} from '../responseSchema';

export const getUsersPath: RouteConfig = {
	method: 'get',
	path: '/api/v1/user/get-all-users',
	tags: ['User'],
	request: {
		query: getUserSchema
	},
	responses: {
		200: {
			description: 'User successfully registered',
			content: {
				'application/json': { schema: getUserListResponseSchema }
			}
		},
		400: {
			description: 'User failed to register',
			content: {
				'application/json': { schema: userErrorResponseSchema }
			}
		}
	}
};

export const getUserByIdPath: RouteConfig = {
	method: 'get',
	path: '/api/v1/user/profile',
	tags: ['User'],
	request: {
		query: getUserByIdSchema
	},
	responses: {
		200: {
			description: 'User successfully logged in',
			content: {
				'application/json': { schema: getUserByIdResponseSchema }
			}
		},
		400: {
			description: 'User failed to log in',
			content: {
				'application/json': { schema: userErrorResponseSchema }
			}
		}
	}
};

export const updateUserProfilePath: RouteConfig = {
	method: 'patch',
	path: '/api/v1/user/profile/update',
	tags: ['User'],
	request: {
		body: {
			content: {
				'application/json': { schema: updateUserSchema }
			}
		}
	},
	responses: {
		200: {
			description: 'Email notification for forgot password is sent successfully',
			content: {
				'application/json': { schema: updateUserProfileResponseSchema }
			}
		},
		400: {
			description: 'Forgot password email failed to send',
			content: {
				'application/json': { schema: userErrorResponseSchema }
			}
		}
	}
};

export const deleteUserPath: RouteConfig = {
	method: 'delete',
	path: '/api/v1/user/delete',
	tags: ['User'],
	request: {
		body: {
			content: {
				'application/json': { schema: deleteUserSchema }
			}
		}
	},
	responses: {
		200: {
			description: 'Reset password successful',
			content: {
				'application/json': { schema: deleteUserResponseSchema }
			}
		},
		400: {
			description: 'User failed to reset password',
			content: {
				'application/json': { schema: userErrorResponseSchema }
			}
		}
	}
};
