import { db } from "../configs/db.config.js";

export const resetDatabaseService = async () => {
  const result = await db.$transaction(async (tx) => {
    const messages = await tx.messages.deleteMany();
    const chats = await tx.chats.deleteMany();
    const subscriptions = await tx.subscriptions.deleteMany();
    const payments = await tx.payments.deleteMany();
    const users = await tx.user.deleteMany();

    return {
      messages: messages.count,
      chats: chats.count,
      subscriptions: subscriptions.count,
      payments: payments.count,
      users: users.count,
    };
  });

  return result;
};
