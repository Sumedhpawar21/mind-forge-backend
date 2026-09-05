import { Router } from "express";
import { getPlans, buyPlan } from "../controllers/plan.controller.js";

const planRouter = Router()

planRouter.get('/', getPlans)
planRouter.post('/buy/:planId', buyPlan)


export default planRouter