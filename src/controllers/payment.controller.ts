import { verifyPaymentService } from "../services/razorpay.service.js"
import { asyncHandler } from "../utils/async.handler.util.js"
import { verifyPaymentSchema } from "../validations/razorpay.validation.js"

export const verifyPayment = asyncHandler(async (req, res) => {
  const body = verifyPaymentSchema.parse(req.body)
  const result = await verifyPaymentService(
    body.razorpay_order_id,
    body.razorpay_payment_id,
    body.razorpay_signature
  )

  if (!result.success) {
    return res.status(400).json(result)
  }

  return res.status(200).json(result)
})
