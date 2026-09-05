import { Router } from "express";
import authRouter from "./auth.route.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import chatRouter from "./chat.route.js";
import messageRouter from "./message.route.js";
import subscriptionRouter from "./subscription.route.js";
import planRouter from "./plan.route.js";
import paymentRouter from "./payment.route.js";
import razorpayRouter from "./razorpay.route.js";
import { seedPlans } from "../controllers/plan.controller.js";
import { resetDatabase } from "../controllers/db-reset.controller.js";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.post("/plans/seed", seedPlans);
mainRouter.get("/reset-database", resetDatabase);
mainRouter.use(authMiddleware)
mainRouter.use("/chat", chatRouter);
mainRouter.use("/messages", messageRouter);
mainRouter.use("/subscription", subscriptionRouter);
mainRouter.use("/plans", planRouter);
mainRouter.use("/payment", paymentRouter);
mainRouter.use("/", razorpayRouter);

export default mainRouter;
