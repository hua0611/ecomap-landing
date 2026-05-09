'use client'

import { useState } from 'react'
import { EmailForm } from './email-form'

interface DemoFrameProps {
  demoUrl: string | undefined
}

export function DemoFrame({ demoUrl }: DemoFrameProps) {
  const [loaded, setLoaded] = useState(false)
  const hasUrl = !!demoUrl && demoUrl !== 'https://ecomap-demo.example.com'

  return (
    <div className="overflow-hidden rounded-xl border border-cream-100 shadow-2xl">
      {/* Mac-style window chrome */}
      <div className="flex items-center gap-2 bg-cream-100 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <div className="mx-4 flex-1 rounded-md bg-cream-50 px-3 py-1 text-center text-xs text-ink-600">
          {hasUrl ? demoUrl : 'ecomap.vercel.app/demo'}
        </div>
      </div>

      {/* Iframe container */}
      <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
        {hasUrl ? (
          <>
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-cream-50">
                <div className="flex flex-col items-center gap-4">
                  <svg
                    className="animate-spin-slow h-10 w-10 text-forest-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-label="載入中"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  <span className="text-sm text-ink-600">Demo 載入中…</span>
                </div>
              </div>
            )}
            <iframe
              src={demoUrl}
              className="h-full w-full border-0"
              title="EcoMap Demo"
              onLoad={() => setLoaded(true)}
              style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
              allow="fullscreen"
            />
          </>
        ) : (
          /* Fallback when demo URL is not set */
          <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-forest-900 px-6 text-center">
            <div className="text-5xl">🗺️</div>
            <div>
              <h3
                className="mb-3 text-2xl font-bold text-cream-50"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Demo 即將上線
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-cream-50/70">
                我們正在準備最好的體驗給你。
                <br />
                留下 email，上線時第一時間通知你。
              </p>
            </div>
            <div className="w-full max-w-sm">
              <EmailForm source="footer" variant="dark" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile note */}
      <div className="flex items-center justify-center gap-2 bg-cream-100 px-4 py-2 text-xs text-ink-600 md:hidden">
        <span>↔</span>
        <span>建議以桌面版瀏覽 Demo 以獲得最佳體驗</span>
      </div>
    </div>
  )
}
