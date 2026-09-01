import { envConfig } from "../configs/env.config.js";
import { loginService } from "../services/auth.service.js";
import { asyncHandler } from "../utils/async.handler.util.js";
import { loginSchema } from "../validations/auth.validation.js";
export const login = asyncHandler(async (req, res) => {
    const { id_token } = loginSchema.parse(req.body);
    const { token, user } = await loginService(id_token);
    return res.status(200).cookie("gpt-token", token, {
        httpOnly: true,
        secure: envConfig.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "lax",
    }).json({ success: true, message: `Welcome ${user.name}` })
});
