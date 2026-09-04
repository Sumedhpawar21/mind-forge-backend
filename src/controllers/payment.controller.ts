import { verifyPaymentService } from "../services/payment.service.js";
import { asyncHandler } from "../utils/async.handler.util.js";

export const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const data = await verifyPaymentService(razorpay_order_id, razorpay_payment_id, razorpay_signature)
    return res.status(200).json(data)
})