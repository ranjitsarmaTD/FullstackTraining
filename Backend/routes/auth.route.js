import express from 'express'
import { login, verifyUser } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/login', login)
authRouter.get('/verify', verifyUser);

export default authRouter;