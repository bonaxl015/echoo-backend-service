import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { ONE_MEGABYTE } from '../constants';

// Make sure upload folder exists
const uploadPath = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadPath)) {
	fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => cb(null, uploadPath),
	filename: (_req, file, cb) => {
		const safeName = file.originalname.replace(/\s+/g, '_');
		const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
		cb(null, `${uniqueSuffix}-${safeName}`);
	}
});

export const upload = multer({
	storage,
	limits: { fileSize: ONE_MEGABYTE },
	fileFilter: (_req, file, cb) => {
		const ext = path.extname(file.originalname).toLowerCase();
		const allowedExtensions = ['.png', '.jpg', '.jpeg'];

		if (!allowedExtensions.includes(ext)) {
			return cb(new Error('Only .png, .jpg and .jpeg formats are allowed'));
		}

		cb(null, true);
	}
});
