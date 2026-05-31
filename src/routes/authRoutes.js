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

router.post('/register', celebrate(registerUserSchema), registerUser);
router.post('/login', celebrate(loginUserSchema), loginUser);
router.post('/refresh', refreshUserSession);
router.post('/logout', logoutUser);
router.post(
  '/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);
router.post('/reset-password', celebrate(resetPasswordSchema), resetPassword);

export default router;
