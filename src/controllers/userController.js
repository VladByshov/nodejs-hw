import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(createHttpError(400, 'No file'));
    }

    const cloudinaryResponse = await saveFileToCloudinary(req.file.buffer);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: cloudinaryResponse.secure_url },
      { new: true },
    );

    if (!updatedUser) {
      return next(createHttpError(404, 'User not found'));
    }

    res.status(200).json({ url: updatedUser.avatar });
  } catch (error) {
    next(error);
  }
};
