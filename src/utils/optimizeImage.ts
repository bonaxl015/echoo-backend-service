import cloudinary from '../config/cloudinary';

export const optimizeImage = (filename: string | null, width: number) => {
	if (filename) {
		return cloudinary.url(filename, {
			transformation: [{ width, crop: 'limit' }, { fetch_format: 'auto' }, { quality: 'auto' }]
		});
	}
};
