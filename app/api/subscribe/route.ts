import { type NextRequest } from 'next/server'
import { subscribeSchema } from '@/lib/validate'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json(
      { ok: false, error: 'invalid_json' },
      { status: 400 }
    )
  }

  const parsed = subscribeSchema.safeParse(body)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]
    const errorCode =
      firstIssue?.message === 'invalid_email' || firstIssue?.path[0] === 'email'
        ? 'invalid_email'
        : 'invalid_source'
    return Response.json({ ok: false, error: errorCode }, { status: 400 })
  }

  const { email, source } = parsed.data
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL

  if (!webhookUrl) {
    console.warn('[subscribe] GOOGLE_SHEET_WEBHOOK_URL is not set — email will not be stored.')
    return Response.json({ ok: true })
  }

  try {
    const userAgent = request.headers.get('user-agent') ?? 'unknown'
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source,
        timestamp: new Date().toISOString(),
        user_agent: userAgent,
      }),
    })
    if (!res.ok) {
      console.error(
        `[subscribe] Webhook responded with ${res.status} — email: ${email}`
      )
    }
  } catch (err) {
    console.error('[subscribe] Webhook request failed:', err)
  }

  // Fail-soft: always return ok:true to avoid awkward demo moments
  return Response.json({ ok: true })
}
