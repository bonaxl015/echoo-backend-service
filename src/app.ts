import express, { Express } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import xssClean from 'xss-clean';
import authRoutes from './modules/auth/auth.routes';
import postRoutes from './modules/post/post.routes';
import commentRoutes from './modules/comment/comment.routes';
import { errorHandler } from './middlewares/error.middleware';

const app: Express = express();

// body parser into json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// added security for headers
app.use(helmet());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Prevent cross site scripting attacks
app.use(xssClean());

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/comment', commentRoutes);

// Register global error handler
app.use(errorHandler);

export default app;
