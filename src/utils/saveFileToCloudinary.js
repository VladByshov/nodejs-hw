import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import path from 'node:path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const saveFileToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const fileWithoutExt = path.parse(file.originalname).name;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'avatars',
        resource_type: 'image',
        public_id: fileWithoutExt,
        overwrite: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);

    readableStream.pipe(uploadStream);
  });
};
