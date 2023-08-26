import express from 'express';
import { getAllUsers, submitUserData } from '../controllers/users';
import firebaseAuthMiddleware from '../middlewares/auth';

const router = express.Router();

router.use(firebaseAuthMiddleware);

router.post('/submitUserData', firebaseAuthMiddleware, submitUserData);
router.get('/getUserData', getAllUsers);

export default router;