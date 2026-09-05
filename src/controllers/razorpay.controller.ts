import {
  createOrderService,
  RazorpayApiError,
  RazorpayConfigError,
  verifyPaymentService,
} from "../services/razorpay.service.js"
import { asyncHandler } from "../utils/async.handler.util.js"
import {
  createOrderSchema,
  verifyPaymentSchema,
} from "../validations/razorpay.validation.js"

export const createOrder = asyncHandler(async (req, res) => {
  const user = req.user!
  const body = createOrderSchema.parse(req.body)

  try {
    const data = await createOrderService(user, body)
    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      data,
    })
  } catch (error) {
    if (error instanceof RazorpayConfigError) {
      return res.status(500).json({ success: false, message: error.message })
    }
    if (error instanceof RazorpayApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      })
    }
    throw error
  }
})

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
