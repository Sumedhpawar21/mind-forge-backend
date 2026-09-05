import { resetDatabaseService } from "../services/db-reset.service.js";
import { asyncHandler } from "../utils/async.handler.util.js";

export const resetDatabase = asyncHandler(async (_, res) => {
  const deleted = await resetDatabaseService();

  return res.status(200).json({
    success: true,
    message: "Database reset successfully. Plans and migrations were preserved.",
    data: { deleted },
  });
});
