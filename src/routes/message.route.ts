import { Router } from "express";
import { getMessages, sendMessages } from "../controllers/message.controller.js";

const messageRouter = Router()

messageRouter.get('/:chatId', getMessages)
messageRouter.post('/', sendMessages)

export default messageRouter