// / Library
import { Router } from 'express';
// / Controller
import { updateUserAvatar } from '../controllers/userController.js';
// / Middlewares
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

export default router;
