import { createTextStreamResponse, toTextStream } from "ai";
import { db } from "../configs/db.config.js";
import { getChatService } from "../services/chat.service.js";
import { getMessagesService, sendMessageService } from "../services/message.service.js";
import { asyncHandler } from "../utils/async.handler.util.js";

export const getMessages = asyncHandler(async (req, res) => {
    const chatId = String(req.params.chatId);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);

    const where = {
        chatId: chatId
    }
    const { messages, messageCount, hasMore } = await getMessagesService(page, limit, where);

    return res.status(200).json({
        success: true, message: "messages fetched Successfully", data: {
            messages,
            pagination: {
                page,
                limit,
                total: messageCount,
                hasMore,
            },
        },
    })
})

export const sendMessages = asyncHandler(async (req, res) => {
    const user = req.user!

    let { user_message, chatId } = req.body
    if (!chatId) {
        const newChat = await db.chats.create({
            data: {
                userId: user.userId
            }
        })
        chatId = newChat.id
    }

    const result = await sendMessageService(
        chatId,
        user_message,
        user,
    );

    res.setHeader(
        "Content-Type",
        "text/plain; charset=utf-8",
    );

    res.setHeader(
        "Cache-Control",
        "no-cache",
    );

    res.setHeader(
        "Connection",
        "keep-alive",
    );

    const textStream = toTextStream(result);

    for await (const chunk of textStream) {
        res.write(chunk);
    }
    res.end();
})


