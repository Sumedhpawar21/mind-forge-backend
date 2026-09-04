import { Router } from "express";
import { getSubscriptionUsage } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router()

subscriptionRouter.get('/usage', getSubscriptionUsage)

export default subscriptionRouter