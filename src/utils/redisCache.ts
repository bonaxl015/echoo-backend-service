import client from '../config/redis';

export const setCache = async (key: string, value: unknown, ttlSeconds: number = 60) => {
	try {
		await client.setEx(key, ttlSeconds, JSON.stringify(value));
	} catch (error) {
		if (error instanceof Error) {
			console.error('[REDIS] Setting cache error', error.message);
		}
	}
};

export const getCache = async <T>(key: string): Promise<T | null> => {
	try {
		const data = await client.get(key);

		return data ? JSON.parse(data) : null;
	} catch (error) {
		if (error instanceof Error) {
			console.error('[REDIS] Getting cache error', error.message);
		}
		return null;
	}
};

export const deleteCache = async (key: string) => {
	try {
		await client.del(key);
	} catch (error) {
		if (error instanceof Error) {
			console.error('[REDIS] Deleting cache error', error.message);
		}
	}
};

export const buildPageCacheKey = (
	entityLabel: string,
	page: number,
	limit: number,
	filter: string = ''
) => {
	const base = `${entityLabel}:page:${page}:limit:${limit}`;

	return filter ? `${base}:filter:${filter}` : base;
};

export const invalidatePaginationCache = async (entityLabel: string, maxPages = 5, limit = 20) => {
	try {
		const keys = [];

		for (let page = 1; page <= maxPages; page++) {
			keys.push(`${entityLabel}:page:${page}:limit:${limit}`);
		}

		if (keys.length > 0) {
			await client.del(keys);
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error('[REDIS] Invalidating pagination cache error', error.message);
		}
	}
};
