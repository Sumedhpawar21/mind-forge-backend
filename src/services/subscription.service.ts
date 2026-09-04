import { db } from "../configs/db.config.js";
import type { AuthUser } from "../middlewares/auth.middleware.js";

export async function getSubscriptionUsageService(user: AuthUser) {
    return await db.subscriptions.findFirst({
        where: {
            userId: user.userId
        },
        select: {
            usage: true,
            plan: {
                select: {
                    max_messages: true
                }
            }
        }
    })
}