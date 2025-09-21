import express, { Express } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import xssClean from 'xss-clean';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/user/user.routes';
import postRoutes from './modules/post/post.routes';
import commentRoutes from './modules/comment/comment.routes';
import likeRoutes from './modules/like/like.routes';
import healthRoutes from './modules/health/health.routes';
import { errorHandler } from './middlewares/error.middleware';
import sanitizer from 'perfect-express-sanitizer';
import cookieParser from 'cookie-parser';
import expressRateLimit from 'express-rate-limit';
import { TEN_MINUTES } from './constants';
import swaggerUI from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';

const app: Express = express();

// body parser into json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// added security for headers
app.use(helmet());

// Rate limiter
app.use(
	expressRateLimit({
		windowMs: TEN_MINUTES,
		max: 100
	})
);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Prevent cross site scripting attacks
app.use(xssClean());

// Sanitizer
app.use(
	sanitizer.clean(
		{
			sql: true,
			sanitizeKeys: true
		},
		['/health'],
		['body', 'query', 'params']
	)
);

// Healthcheck
app.use('/health', healthRoutes);

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/comment', commentRoutes);
app.use('/api/v1/like', likeRoutes);

// Documentation
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Register global error handler
app.use(errorHandler);

export default app;
