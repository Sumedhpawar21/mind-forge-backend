import { buyPlanService, getPlansService } from "../services/plan.service.js";
import { asyncHandler } from "../utils/async.handler.util.js";

export const getPlans = asyncHandler(async (_, res) => {
    const plansData = await getPlansService();
    return res.status(200).json({ status: true, message: "Plans fetched Successfully", data: plansData })
})
export const buyPlan = asyncHandler(async (req, res) => {
    const user = req.user!
    const planId = String(req.params.planId || "")
    if (!planId) {
        throw new Error("planId not provided")
    }
    const data = await buyPlanService(user, planId)
    return res.status(201).json({ success: true, message: "payment initiated", data })
})