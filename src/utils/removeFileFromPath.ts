import cloudinary from '../config/cloudinary';

export const removeFileFromPath = (publicId?: string | null) => {
	if (publicId) {
		cloudinary.uploader
			.destroy(publicId)
			.then(() => {
				console.log(`[CLOUDINARY] Deleted old profile photo: ${publicId}`);
			})
			.catch((error) => {
				console.error(
					`[CLOUDINARY] Failed to delete old profile photo: ${publicId}`,
					error.message
				);
			});
	}
};
