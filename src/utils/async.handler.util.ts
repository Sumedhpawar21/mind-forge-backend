import { type NextFunction, type Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.js";

type Controller = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => Promise<unknown>;

export const asyncHandler =
  (controller: Controller) =>
    async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
