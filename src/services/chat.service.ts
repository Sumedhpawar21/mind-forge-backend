import { db } from "../configs/db.config.js"

export async function getChatService(page: number, limit: number, where: any) {
    const skip = (page - 1) * limit

    const [chats, chatCount] = await Promise.all([
        db.chats.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                updatedAt: "desc",
            },
        }),

        db.chats.count({
            where
        }),
    ])

    const hasMore = skip + chats.length < chatCount
    return { chats, chatCount, hasMore }

}

export async function deleteChatService(chatId: string) {
    return await db.chats.delete({
        where: {
            id: chatId,
        }
    })
}