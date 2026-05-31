import { Router } from 'express';
import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
  resetPassword,
  requestResetEmail,
} from '../controllers/authController.js';
import {
  registerUserSchema,
  loginUserSchema,
  resetPasswordSchema,
  requestResetEmailSchema,
} from '../validations/authValidation.js';
import { celebrate } from 'celebrate';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/auth/login', celebrate(loginUserSchema), loginUser);
router.post('/auth/refresh', refreshUserSession);
router.post('/auth/logout', logoutUser);
router.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);
router.post(
  '/auth/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword,
);

export default router;
