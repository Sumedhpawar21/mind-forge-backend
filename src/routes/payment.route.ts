import { Router } from "express";
import { verifyPayment } from "../controllers/payment.controller.js";

const paymentRouter = Router();

paymentRouter.post('/verify', verifyPayment)


export default paymentRouter