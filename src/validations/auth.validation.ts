import { z } from "zod";

export const loginSchema = z.object({
    id_token: z.string().min(1),
});