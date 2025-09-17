import path from 'path';
import fs from 'fs';

export const removeFileFromPath = (filePath?: string | null) => {
	if (filePath) {
		const oldPhotoPath = path.join(__dirname, '../../', filePath);

		fs.unlink(oldPhotoPath, (error) => {
			if (error) {
				console.error(`Failed to delete old profile photo: ${oldPhotoPath}`, error.message);
			}
		});
	}
};
