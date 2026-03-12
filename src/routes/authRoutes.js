// / Libraries
import { Router } from 'express';
import { celebrate } from 'celebrate';
// / Validations
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
} from '../validations/authValidation.js';
// / Controllers
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
  requestResetEmail,
} from '../controllers/authController.js';

const router = Router();

// ! Register
router.post('/auth/register', celebrate(registerUserSchema), registerUser);
// ! Login
router.post('/auth/login', celebrate(loginUserSchema), loginUser);
// ! Logout
router.post('/auth/logout', logoutUser);
// ! Refresh
router.post('/auth/refresh', refreshUserSession);
// ! Password reset email
router.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);

export default router;
