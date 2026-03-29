import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
});

export const predictionSchema = z.object({
  market: z.string().min(3, "Market name is required"),
  prediction: z.enum(["yes", "no"]),
  confidence: z.number().min(1).max(100),
});

export const forumTopicSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be at most 100 characters"),
  body: z.string().min(10, "Body must be at least 10 characters").max(300, "Body must be at most 300 characters"),
  tag: z.enum(["high_volatility", "macro", "alpha_signal", "general"]),
});

export const forumReplySchema = z.object({
  topic_id: z.string().uuid("Invalid topic ID"),
  body: z.string().min(1, "Reply cannot be empty").max(300, "Reply must be at most 300 characters"),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type PredictionInput = z.infer<typeof predictionSchema>;
export type ForumTopicInput = z.infer<typeof forumTopicSchema>;
export type ForumReplyInput = z.infer<typeof forumReplySchema>;
