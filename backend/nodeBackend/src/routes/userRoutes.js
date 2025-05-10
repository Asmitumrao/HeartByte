import express from 'express';
import {loginUser, registerUser,verifyEmail} from '../controllers/userController.js';

const router = express.Router();

// User routes
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/verify/:token',verifyEmail);
export default router;
