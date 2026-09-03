import { Router } from "express";
import authRouter from "./auth.route.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import chatRouter from "./chat.route.js";
import messageRouter from "./message.route.js";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use(authMiddleware)
mainRouter.use("/chat", chatRouter);
mainRouter.use("/messages", messageRouter);

export default mainRouter;
