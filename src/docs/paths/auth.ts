import {
	registerSchema,
	loginSchema,
	forgotPasswordSchema,
	resetPasswordSchema
} from '../../modules/auth/auth.validation';
import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
	registerResponseSchema,
	loginResponseSchema,
	forgotPasswordResponseSchema,
	resetPasswordResponseSchema,
	logoutResponseSchema,
	authErrorResponseSchema
} from '../responseSchema';

export const registerPath: RouteConfig = {
	method: 'post',
	path: '/api/v1/auth/register',
	tags: ['Auth'],
	request: {
		body: {
			content: {
				'application/json': { schema: registerSchema }
			}
		}
	},
	responses: {
		200: {
			description: 'User successfully registered',
			content: {
				'application/json': { schema: registerResponseSchema }
			}
		},
		400: {
			description: 'User failed to register',
			content: {
				'application/json': { schema: authErrorResponseSchema }
			}
		}
	}
};

export const loginPath: RouteConfig = {
	method: 'post',
	path: '/api/v1/auth/login',
	tags: ['Auth'],
	request: {
		body: {
			content: {
				'application/json': { schema: loginSchema }
			}
		}
	},
	responses: {
		200: {
			description: 'User successfully logged in',
			content: {
				'application/json': { schema: loginResponseSchema }
			}
		},
		400: {
			description: 'User failed to log in',
			content: {
				'application/json': { schema: authErrorResponseSchema }
			}
		}
	}
};

export const forgotPasswordPath: RouteConfig = {
	method: 'post',
	path: '/api/v1/auth/forgot-password',
	tags: ['Auth'],
	request: {
		body: {
			content: {
				'application/json': { schema: forgotPasswordSchema }
			}
		}
	},
	responses: {
		200: {
			description: 'Email notification for forgot password is sent successfully',
			content: {
				'application/json': { schema: forgotPasswordResponseSchema }
			}
		},
		400: {
			description: 'Forgot password email failed to send',
			content: {
				'application/json': { schema: authErrorResponseSchema }
			}
		}
	}
};

export const resetPasswordPath: RouteConfig = {
	method: 'post',
	path: '/api/v1/auth/reset-password',
	tags: ['Auth'],
	request: {
		body: {
			content: {
				'application/json': { schema: resetPasswordSchema }
			}
		}
	},
	responses: {
		200: {
			description: 'Reset password successful',
			content: {
				'application/json': { schema: resetPasswordResponseSchema }
			}
		},
		400: {
			description: 'User failed to reset password',
			content: {
				'application/json': { schema: authErrorResponseSchema }
			}
		}
	}
};

export const logoutPath: RouteConfig = {
	method: 'post',
	path: '/api/v1/auth/logout',
	tags: ['Auth'],
	request: {},
	responses: {
		200: {
			description: 'Log out successful',
			content: {
				'application/json': { schema: logoutResponseSchema }
			}
		},
		400: {
			description: 'User failed to reset password',
			content: {
				'application/json': { schema: authErrorResponseSchema }
			}
		}
	}
};
