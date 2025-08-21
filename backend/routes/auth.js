// backend/routes/auth.js
import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/admin/login', authController.adminLogin);
router.post('/register', authController.register);

export default router;