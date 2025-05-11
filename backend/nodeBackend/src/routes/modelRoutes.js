import {Router} from 'express';
import { predict } from '../controllers/predictionController.js'; 
import auth from '../middlewares/auth.js';

const router = Router();

router.post("/", auth, predict);

export default router;