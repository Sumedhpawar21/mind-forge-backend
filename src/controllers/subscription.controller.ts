import { getSubscriptionUsageService } from "../services/subscription.service.js";
import { asyncHandler } from "../utils/async.handler.util.js";

export const getSubscriptionUsage = asyncHandler(async (req, res) => {
    const user = req.user!
    const subscriptionUsageData = await getSubscriptionUsageService(user);
    return res.status(200).json({ status: true, message: "Subscription usage fetched Successfully", data: subscriptionUsageData })

})