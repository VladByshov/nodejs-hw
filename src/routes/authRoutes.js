import { Router } from 'express';
import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
} from '../controllers/authController.js';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';
import { celebrate, Segments } from 'celebrate';

const router = Router();

router.post(
  '/register',
  celebrate({ [Segments.BODY]: registerUserSchema }),
  registerUser,
);
router.post(
  '/login',
  celebrate({ [Segments.BODY]: loginUserSchema }),
  loginUser,
);
router.post('/refresh', refreshUserSession);
router.post('/logout', logoutUser);

export default router;
