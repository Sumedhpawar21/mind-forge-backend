import { generateText } from "ai"

import { titleModel } from "../configs/ai.config.js"
import { db } from "../configs/db.config.js"

export async function generateChatTitle(userMessage: string): Promise<string> {
  const { text } = await generateText({
    model: titleModel,
    prompt: `Generate a short chat title (max 6 words) for a conversation that starts with this user message. Return only the title, no quotes or punctuation.

User message: ${userMessage}`,
  })

  return text.trim().replace(/^["']|["']$/g, "").slice(0, 100)
}

export async function generateAndSetChatTitle(
  chatId: string,
  userMessage: string
): Promise<void> {
  const chat = await db.chats.findUnique({
    where: { id: chatId },
    select: { title: true },
  })

  if (!chat || chat.title) {
    return
  }

  const title = await generateChatTitle(userMessage)

  await db.chats.update({
    where: { id: chatId },
    data: { title },
  })
}
