import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { registry } from './swagger.registry';

const generator = new OpenApiGeneratorV3(registry.definitions);

export const swaggerSpec = generator.generateDocument({
	openapi: '3.0.0',
	info: {
		title: 'Echoo Backend Service',
		version: '1.0.0',
		description: 'API documentation for Echoo Backend Service'
	},
	servers: [{ url: 'http://localhost:5051' }],
	security: [{ bearerAuth: [] }]
});
