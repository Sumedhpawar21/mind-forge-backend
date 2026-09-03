import { createOpenAI } from "@ai-sdk/openai"

import { envConfig } from "./env.config.js"

export const openai = createOpenAI({
  apiKey: envConfig.OPENAI_API_KEY,
})

export const chatModel = openai("gpt-4o-mini")
export const titleModel = openai("gpt-4.1-nano")
