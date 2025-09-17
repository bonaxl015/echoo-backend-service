import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary';
import { v4 as uuidV4 } from 'uuid';
import { ONE_MEGABYTE } from '../constants';

const storage = new CloudinaryStorage({
	cloudinary,
	params: async (_req, file) => {
		const originalName = file.originalname.replace(/\s+/g, '_');

		return {
			folder: 'profile_photos',
			publid_id: `${uuidV4()}-${originalName.split('.')[0]}`,
			format: file.mimetype.split('/')[1],
			resource_type: 'image'
		};
	}
});

export const upload = multer({
	storage,
	limits: { fileSize: ONE_MEGABYTE },
	fileFilter: (_req, file, cb) => {
		const allowedExtensions = ['image/png', 'image/jpg', 'image/jpeg'];

		if (!allowedExtensions.includes(file.mimetype)) {
			return cb(new Error('Only .png, .jpg and .jpeg formats are allowed'));
		}

		cb(null, true);
	}
});
