import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { envConfig } from "../configs/env.config.js";
import { chatModel } from "../configs/ai.config.js";
import { constants } from "../constants/constants.js";
import { generateText, Output } from "ai";
import z from "zod";
import { Document } from "langchain";

export async function getMemories(userId: string, query: string) {
    const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-small",
    });

    const vectorStore = new QdrantVectorStore(embeddings, {
        url: envConfig.QDRANT_URL,
        collectionName: constants.rag_collection_name,
    });

    const retriever = vectorStore.asRetriever({
        k: 8,
        filter: {
            must: [
                {
                    key: "userId",
                    match: {
                        value: userId,
                    },
                },
            ],
        },
    });
    const results = await retriever.invoke(query);
    return results.map(m => m.pageContent);
}
export async function generateMemories(
    userQuery: string,
) {
    const result = await generateText({
        model: chatModel,
        instructions: `
You are a memory extraction system.

Extract useful, long-term information about the user
from their message.

Only extract information that is explicitly stated.

Examples of useful memories:
- User preferences
- User interests
- Long-term goals
- Occupation
- Skills
- Projects
- Important personal facts
- Likes and dislikes
- Communication preferences

Do not extract:
- Temporary requests
- Questions
- General knowledge
- Assumptions
- Information about other people unless relevant to the user

If there is nothing worth remembering, return an empty array.
        `.trim(),
        prompt: userQuery,
        output: Output.object({
            schema: z.object({
                memories: z.array(z.string()),
            }),
        }),
    });

    return result.output.memories;
}

export async function saveMemories(
    userId: string,
    memories: string[],
) {
    const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-small",
    });
    const vectorStore = new QdrantVectorStore(embeddings, {
        url: envConfig.QDRANT_URL,
        collectionName: constants.rag_collection_name,
    });
    if (!memories.length) {
        return;
    }
    const documents = memories.map(
        (memory) =>
            new Document({
                pageContent: memory,
                metadata: {
                    userId,
                },
            }),
    );
    await vectorStore.addDocuments(documents);
}
