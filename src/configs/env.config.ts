import "dotenv/config"
export const envConfig = {
    PORT: Number(process.env.PORT) || 5000,
    DATABASE_URL: String(process.env.DATABASE_URL) || "",
    JWT_SECRET: String(process.env.JWT_SECRET) || "",
    GOOGLE_CLIENT_ID: String(process.env.GOOGLE_CLIENT_ID) || "",
    NODE_ENV: String(process.env.NODE_ENV) || "development", // development, production
}