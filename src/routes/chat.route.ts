import { Router } from "express";
import { deleteChat, getChats } from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.get("/", getChats);
chatRouter.delete("/:chatId", deleteChat);

export default chatRouter;
