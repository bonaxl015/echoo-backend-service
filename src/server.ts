import app from './app';
import { ENV } from './config/env';

app.listen(ENV.PORT, () => {
	console.log(`[server] Server running at port ${ENV.PORT}`);
	console.log(`[server] Running on: http://localhost:${ENV.PORT}`);
});
