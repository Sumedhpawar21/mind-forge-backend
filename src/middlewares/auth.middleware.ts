import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../configs/env.config.js";

export interface AuthUser {
    userId: string;
    name: string;
    email: string;
}

export interface AuthRequest extends Request {
    user?: AuthUser;
}

export function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const [scheme, token] = authorization.split(" ");

        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({
                message: "Invalid authorization header",
            });
        }

        const payload = jwt.verify(token, envConfig.JWT_SECRET);

        if (typeof payload !== "object" || payload === null) {
            return res.status(401).json({
                message: "Invalid token",
            });
        }

        if (
            typeof payload.userId !== "string" ||
            typeof payload.name !== "string" ||
            typeof payload.email !== "string"
        ) {
            return res.status(401).json({
                message: "Invalid token payload",
            });
        }

        req.user = {
            userId: payload.userId,
            name: payload.name,
            email: payload.email,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
}
