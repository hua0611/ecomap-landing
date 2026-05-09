import { z } from 'zod'

export const subscribeSchema = z.object({
  email: z.email({ message: 'invalid_email' }),
  source: z.enum(['hero', 'footer'], { message: 'invalid_source' }),
})

export type SubscribeInput = z.infer<typeof subscribeSchema>

/** 客端輕量版 email regex 預檢 */
export const EMAIL_REGEX = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim())
}
