import express from 'express';
import {loginUser, registerUser,verifyEmail,authenticateUser,logoutUser} from '../controllers/userController.js';
import auth from '../middlewares/auth.js';
import { createResponse } from '../utils/asyncUtils.js';

const router = express.Router();

// User routes
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/verify/:token',verifyEmail);
router.get('/logout', logoutUser);
router.post('/authenticate', auth , authenticateUser);

export default router;
