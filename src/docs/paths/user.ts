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
			description: 'Get all the list of users',
			content: {
				'application/json': { schema: getUserListResponseSchema }
			}
		},
		400: {
			description: 'Failed to get user list',
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
			description: 'Get user data by its user ID',
			content: {
				'application/json': { schema: getUserByIdResponseSchema }
			}
		},
		400: {
			description: 'Failed to get the user data',
			content: {
				'application/json': { schema: userErrorResponseSchema }
			}
		}
	}
};

export const getCurrentUserInfo: RouteConfig = {
	method: 'get',
	path: '/api/v1/user/info',
	tags: ['User'],
	request: {},
	responses: {
		200: {
			description: 'Get current logged in user data',
			content: {
				'application/json': { schema: getUserByIdResponseSchema }
			}
		},
		400: {
			description: 'Failed to get user data',
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
			description: 'Update user data successfully',
			content: {
				'application/json': { schema: updateUserProfileResponseSchema }
			}
		},
		400: {
			description: 'Failed to update user data',
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
			description: 'Delete user data successful',
			content: {
				'application/json': { schema: deleteUserResponseSchema }
			}
		},
		400: {
			description: 'Unable to delete user data',
			content: {
				'application/json': { schema: userErrorResponseSchema }
			}
		}
	}
};
