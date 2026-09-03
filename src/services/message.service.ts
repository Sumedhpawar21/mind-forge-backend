import { chatAgent } from "../agents/chat.agent.js"
import { db } from "../configs/db.config.js"
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

export async function sendMessageService(chatId: string, userMessage: string, user: AuthUser) {
    const chat = await db.chats.findUnique({
        where: { id: chatId },
        select: { title: true },
    })

    if (chat && !chat.title) {
        generateAndSetChatTitle(chatId, userMessage).catch((error) => {
            console.error("Failed to generate chat title:", error)
        })
    }

    const messages = await db.messages.findMany({
        where: {
            chatId
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 11
    })
    const conversation = messages.reverse();
    return chatAgent(conversation, user, userMessage, chatId);

}