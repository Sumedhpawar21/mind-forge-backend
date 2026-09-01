import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { envConfig } from "./env.config.js";
const adapter = new PrismaPg({ connectionString: envConfig.DATABASE_URL });
const dbClient = new PrismaClient({ adapter });
export { dbClient as db };