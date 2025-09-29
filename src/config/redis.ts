import { createClient } from 'redis';
import { ENV } from './env';

const client = createClient({
	url: ENV.REDIS_URL
});

client.on('connect', () => {
	console.log('[REDIS] client is connected');
});

client.on('error', (error) => {
	console.error('[REDIS] connection failed', error.message);
});

(async () => {
	client.connect();
})();

export default client;
