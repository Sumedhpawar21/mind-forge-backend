import { db } from "../configs/db.config.js";
import { razorpayClient } from "../configs/razorpay.config.js";
import type { AuthUser } from "../middlewares/auth.middleware.js";

export const getPlansService = async () => {
    return await db.plans.findMany();
}

export const seedPlansService = async () => {
    const existing = await db.plans.count();
    if (existing > 0) {
        return { seeded: false, message: "Plans already exist", count: existing };
    }

    const plans = [
        {
            name: "Starter",
            description:
                "Perfect for trying things out. Get 5 AI messages to explore chats and see how the assistant works — ideal for light, one-off questions.",
            price: 100,
            max_messages: 5,
        },
        {
            name: "Plus",
            description:
                "A solid everyday plan with 20 AI messages. Great for regular conversations, drafting, and getting more done without upgrading to the top tier.",
            price: 300,
            max_messages: 20,
        },
        {
            name: "Pro",
            description:
                "Our most generous plan with 40 AI messages. Built for power users who chat often, iterate on ideas, and need room to explore longer threads.",
            price: 500,
            max_messages: 40,
        },
    ];

    const created = await db.plans.createMany({ data: plans });
    return { seeded: true, count: created.count };
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