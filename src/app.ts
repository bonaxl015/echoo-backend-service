import express, { Express } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import xssClean from 'xss-clean';

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

// test route
app.use('/', (req, res) => {
	res.send('hello test');
});

export default app;
