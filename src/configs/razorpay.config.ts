import Razorpay from "razorpay"
import { envConfig } from "./env.config.js"

export const razorpayClient = new Razorpay({
    key_id: envConfig.RAZORPAY_KEY_ID,
    key_secret: envConfig.RAZORPAY_KEY_SECRET,
})