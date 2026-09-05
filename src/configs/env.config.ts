import "dotenv/config"

function parseCorsOrigins(value: string): string[] {
    return value
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)
}

export const envConfig = {
    PORT: Number(process.env.PORT) || 5000,
    DATABASE_URL: String(process.env.DATABASE_URL) || "",
    JWT_SECRET: String(process.env.JWT_SECRET) || "",
    GOOGLE_CLIENT_ID: String(process.env.GOOGLE_CLIENT_ID) || "",
    NODE_ENV: String(process.env.NODE_ENV) || "development", // development, production
    QDRANT_URL: String(process.env.QDRANT_URL) || "",
    OPENAI_API_KEY: String(process.env.OPENAI_API_KEY) || "",
    CORS_ORIGINS: parseCorsOrigins(String(process.env.CORS_ORIGINS || "")),
    RAZORPAY_KEY_ID: String(process.env.RAZORPAY_KEY_ID || ""),
    RAZORPAY_KEY_SECRET: String(process.env.RAZORPAY_KEY_SECRET || ""),
}