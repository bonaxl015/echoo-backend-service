declare module 'perfect-express-sanitizer' {
	import { RequestHandler } from 'express';

	interface CleanOptions {
		xss?: boolean;
		sql?: boolean;
		noSql?: boolean;
		sqlLevel?: number;
		noSqlLevel?: number;
		level?: number;
		allowedKeys?: string[];
		sanitizeKeys?: boolean;
	}

	type Part = 'body' | 'query' | 'headers' | 'params';

	const perfectExpressSanitizer: {
		clean(options: CleanOptions, whiteList?: string[], only?: Part[]): RequestHandler;
		prepareSanitize(input: string, options: CleanOptions): string;
		detectXss(input: string): Promise<boolean>;
		detectSqlInjection(input: string, level?: number): Promise<boolean>;
		detectNoSqlInjection(input: string, level?: number): Promise<boolean>;
	};

	export = perfectExpressSanitizer;
}
