import { z } from "zod";

export const sendMessageSchema = z.object({
  matchId: z.string().min(1),
  content: z.string().min(1, "Message cannot be empty").max(2000),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
