import { chatAgent } from "../agents/chat.agent.js"
import { db } from "../configs/db.config.js"
import type { Chats } from "../generated/prisma/client.js"
import type { AuthUser } from "../middlewares/auth.middleware.js"
import { generateAndSetChatTitle } from "./title.service.js"

export async function getMessagesService(page: number, limit: number, where: any) {

    const skip = (page - 1) * limit

    const [messages, messageCount] = await Promise.all([
        db.messages.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
        }),

        db.messages.count({
            where
        }),
    ])

    const hasMore = skip + messages.length < messageCount
    return { messages, messageCount, hasMore }
}

export async function sendMessageService(chat: Chats, userMessage: string, user: AuthUser) {

    if (chat && !chat.title) {
        generateAndSetChatTitle(chat.id, userMessage).catch((error) => {
            console.error("Failed to generate chat title:", error)
        })
    }

    const messages = await db.messages.findMany({
        where: {
            chatId: chat.id
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 11
    })
    const conversation = messages.reverse();
    return chatAgent(conversation, user, userMessage, chat.id);

}