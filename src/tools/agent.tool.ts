import { tool } from "ai";
import { z } from "zod"
import { getMemories } from "../services/rag.service.js";


export const getUserMemoryTool = tool({
    description: "tool returns user memories",
    inputSchema: z.object({
        userId: z.string(),
        query: z.string()
    }),
    execute: async ({ userId, query }) => {
        const result = await getMemories(userId, query)
        return result
    },
})