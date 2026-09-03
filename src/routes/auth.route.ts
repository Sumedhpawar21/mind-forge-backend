import { Router } from "express";
import { login, logout, getProfile } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post('/login', login)
authRouter.post('/logout', logout)

authRouter.get('/me',authMiddleware,getProfile)

export default authRouter;