import { z } from "zod";

/**
 * Shared contact-form schema — used by React Hook Form on the client and by
 * the API route on the server, so validation cannot drift between them.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "That name is too long."),
  // zod v4: top-level z.email() replaces the deprecated z.string().email()
  email: z.email("Please enter a valid email address.").trim(),
  subject: z
    .string()
    .trim()
    .max(150, "That subject is too long.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Please give us a little more detail (at least 20 characters).")
    .max(5000, "That message is too long — please trim it down."),
  /**
   * Honeypot. Real users never see this field, so anything in it is a bot.
   * Named innocuously so naive spam scripts fill it in.
   *
   * Deliberately permissive here: the API route checks it *after* validation
   * and returns a normal success response, so a bot never learns it was
   * caught. Failing it as a validation error would advertise the trap.
   */
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
