import { envConfig } from "../configs/env.config.js";
import { constants } from "../constants/constants.js";
import { getProfileService, loginService } from "../services/auth.service.js";
import { asyncHandler } from "../utils/async.handler.util.js";
import { loginSchema } from "../validations/auth.validation.js";

export const login = asyncHandler(async (req, res) => {
    const { id_token } = loginSchema.parse(req.body);
    const { token, user } = await loginService(id_token);
    return res.status(200).cookie(constants.authCookie, token, {
        httpOnly: true,
        secure: envConfig.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "lax",
    }).json({ success: true, message: `Welcome ${user.name}` })
});
export const logout = asyncHandler(async (req, res) => {
    return res.status(200).clearCookie(constants.authCookie, {
        httpOnly: true,
        secure: envConfig.NODE_ENV === "production",
        sameSite: "lax",
    }).json({ success: true, message: `Logout Successfull` })
})
export const getProfile = asyncHandler(async (req, res) => {
    const user = req.user!

    const userData = await getProfileService(user?.userId)
    return res.status(200).json({ success: true, message: "profile fetched Successfully", data: userData })
})