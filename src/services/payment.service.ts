import crypto from "crypto";
import { db } from "../configs/db.config.js";
import { envConfig } from "../configs/env.config.js";
import { razorpayClient } from "../configs/razorpay.config.js";

export async function verifyPaymentService(razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string,
) {
    let success: boolean = false
    let message: string = ""
    const sign = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto.createHmac("sha256", envConfig.RAZORPAY_KEY_SECRET).update(sign.toString()).digest("hex")
    if (razorpay_signature === expectedSignature) {
        const paymentDetails = await razorpayClient.payments.fetch(razorpay_payment_id)
        if (paymentDetails.status === "captured" || paymentDetails.status === "authorized") {
            const payment = await db.payments.update({ data: { status: "SUCCESS", paymentId: razorpay_payment_id }, where: { razorpayOrderId: razorpay_order_id } })
            await db.subscriptions.create({ data: { usage: 0, planId: payment.planId, userId: payment.userId } })
            success = true
            message = "Subscription bought successfully"
        }
        if (paymentDetails.status === "failed") {
            await db.payments.update({ data: { status: "FAIL" }, where: { razorpayOrderId: razorpay_order_id } })
            success = false
            message = "Payment failed"
        }
    } else {
        success = false
        message = "payment verification failed"
    }
    return { success, message }
}