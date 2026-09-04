import { db } from "../configs/db.config.js";
import { razorpayClient } from "../configs/razorpay.config.js";
import type { AuthUser } from "../middlewares/auth.middleware.js";

export const getPlansService = async () => {
    return await db.plans.findMany();
}

export const buyPlanService = async (user: AuthUser, planId: string) => {
    const plan = await db.plans.findUnique({ where: { id: planId } });
    const planPrice = Number(plan?.price || 0)
    const order = await razorpayClient.orders.create({
        amount: planPrice * 100,
        currency: "INR", notes: {
            userId: user.userId,
            name: user.name,
            email: user.email
        }
    })
    await db.payments.create({
        data: {
            amount: Number(plan?.price || 0),
            status: "PENDING",
            planId,
            razorpayOrderId: order.id,
            userId: user.userId
        }
    })
    return order
}