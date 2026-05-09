'use client'

import { useState, useRef } from 'react'
import { isValidEmail } from '@/lib/validate'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface EmailFormProps {
  source: 'hero' | 'footer'
  variant: 'light' | 'dark'
}

export function EmailForm({ source, variant }: EmailFormProps) {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const isDark = variant === 'dark'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = inputRef.current?.value.trim() ?? ''

    if (!isValidEmail(email)) {
      setErrorMsg('請輸入有效的電子郵件地址')
      setState('error')
      return
    }

    setState('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      const data = (await res.json()) as { ok: boolean; error?: string }

      if (data.ok) {
        setState('success')
      } else if (data.error === 'invalid_email') {
        setErrorMsg('請輸入有效的電子郵件地址')
        setState('error')
      } else {
        setErrorMsg('送出失敗，請稍後再試')
        setState('error')
      }
    } catch {
      setErrorMsg('網路錯誤，請稍後再試')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div
        className={`flex items-center gap-2 rounded-lg px-5 py-4 text-sm font-medium ${
          isDark
            ? 'bg-forest-700 text-cream-50'
            : 'bg-forest-900/10 text-forest-900'
        }`}
      >
        <span className="text-coral-500">✓</span>
        <span>已收到，我們上線時通知你</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <input
            ref={inputRef}
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            aria-label="電子郵件地址"
            disabled={state === 'submitting'}
            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition placeholder:opacity-60 focus:ring-2 disabled:opacity-60 ${
              isDark
                ? 'border-forest-700 bg-forest-700/60 text-cream-50 placeholder:text-cream-50/60 focus:border-cream-50 focus:ring-cream-50/20'
                : 'border-cream-100 bg-white text-ink-900 placeholder:text-ink-600 focus:border-forest-500 focus:ring-forest-500/20'
            }`}
          />
          {state === 'error' && (
            <p className={`mt-1.5 text-xs ${isDark ? 'text-coral-500' : 'text-coral-600'}`}>
              {errorMsg}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="shrink-0 rounded-lg bg-coral-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-coral-600 disabled:opacity-60 active:scale-95 cursor-pointer"
        >
          {state === 'submitting' ? '送出中…' : '加入候補'}
        </button>
      </div>
    </form>
  )
}
