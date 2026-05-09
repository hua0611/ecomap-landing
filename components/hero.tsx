'use client'

import { useState, useSyncExternalStore, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type MotionValue,
} from 'framer-motion'

type SlideKey = 'dashboard' | 'tracking' | 'merchant' | 'policy'

interface SlideContent {
  badge: string
  titleLines: string[]
  subtitle: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  gradient: string
  hasOverlay: boolean
}

const SLIDE_KEYS: SlideKey[] = ['dashboard', 'tracking', 'merchant', 'policy']

const SLIDES_CONFIG: Record<SlideKey, SlideContent> = {
  dashboard: {
    badge: '即時更新 • Live',
    titleLines: ['看見一座城市的', '循環呼吸。'],
    subtitle:
      '每分鐘更新的容器流轉、減塑成效、店家加入率 — 所有政策數據，一張表掌握。',
    ctaPrimary: { label: '查看 Demo', href: '#demo' },
    ctaSecondary: { label: '加入候補名單', href: '#cta' },
    gradient: `
      radial-gradient(ellipse at 18% 25%, rgba(31,61,46,0.08) 0%, transparent 48%),
      radial-gradient(ellipse at 88% 82%, rgba(107,142,111,0.12) 0%, transparent 48%),
      #F5F0E5
    `,
    hasOverlay: false,
  },
  tracking: {
    badge: '從借出到歸還 • Tracking',
    titleLines: ['每一個容器，', '都有自己的故事。'],
    subtitle:
      'QR Code 掃碼追蹤 — 它去過哪些店、用過幾次、洗了幾次、減了多少 CO₂，全部可追溯。',
    ctaPrimary: { label: '了解技術', href: '#features' },
    ctaSecondary: { label: '查看 Demo', href: '#demo' },
    gradient: `
      radial-gradient(ellipse at 75% 30%, rgba(224,120,86,0.18) 0%, transparent 50%),
      radial-gradient(ellipse at 20% 80%, rgba(31,61,46,0.45) 0%, transparent 60%),
      linear-gradient(135deg, #1F3D2E 0%, #2A5240 100%)
    `,
    hasOverlay: true,
  },
  merchant: {
    badge: '給合作店家 • Operators',
    titleLines: ['免押金、免清洗、', '免操心。'],
    subtitle:
      '店家不買容器、不收押金、不用洗 — 掃 QR 出餐，平台處理所有後勤物流。',
    ctaPrimary: { label: '成為合作店家', href: '#cta' },
    ctaSecondary: { label: '看店家後台', href: '#demo' },
    gradient: `
      radial-gradient(ellipse at 25% 30%, rgba(107,142,111,0.18) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 75%, rgba(234,227,210,0.6) 0%, transparent 55%),
      #F5F0E5
    `,
    hasOverlay: false,
  },
  policy: {
    badge: '給政策制定者 • Policy',
    titleLines: ['把減塑成果，', '變成政策證明。'],
    subtitle:
      '自動產出減塑量、CO₂ 減排、回收率報告 — 符合 ESG 申報格式，一鍵下載。',
    ctaPrimary: { label: '下載樣本報告', href: '#cta' },
    ctaSecondary: { label: '聯繫顧問', href: 'mailto:hello@ecomap.example' },
    gradient: `
      radial-gradient(ellipse at 70% 25%, rgba(244,196,48,0.20) 0%, transparent 55%),
      radial-gradient(ellipse at 15% 75%, rgba(31,61,46,0.55) 0%, transparent 60%),
      linear-gradient(135deg, #1F3D2E 0%, #1a3326 100%)
    `,
    hasOverlay: true,
  },
}

const AUTO_INTERVAL = 6000

// ── AnimatedTitle: 逐字 stagger 進場 ──
interface AnimatedTitleProps {
  lines: string[]
  hasOverlay: boolean
}

function AnimatedTitle({ lines, hasOverlay }: AnimatedTitleProps) {
  return (
    <h1
      style={{
        fontFamily: 'var(--font-serif)',
        fontWeight: 900,
        lineHeight: 1.08,
        fontSize: 'clamp(2.5rem, 5.5vw, 6rem)',
        color: hasOverlay ? '#ffffff' : '#1F3D2E',
        textShadow: hasOverlay ? '0 2px 20px rgba(0,0,0,0.6)' : 'none',
      }}
    >
      {lines.map((line, lineIdx) => {
        const chars = line.split('')
        return (
          <span key={lineIdx} style={{ display: 'block' }}>
            {chars.map((char, charIdx) => (
              <motion.span
                key={`${lineIdx}-${charIdx}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.38,
                  delay: lineIdx * 0.06 + charIdx * 0.025,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ display: 'inline-block' }}
              >
                {char === ' ' ? ' ' : char}
              </motion.span>
            ))}
          </span>
        )
      })}
    </h1>
  )
}

// ── SlideText: 單張 slide 的文字區塊 ──
interface SlideTextProps {
  slideKey: SlideKey
  hasOverlay: boolean
}

function SlideText({ slideKey, hasOverlay }: SlideTextProps) {
  const slide = SLIDES_CONFIG[slideKey]

  return (
    <motion.div
      key={slideKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <AnimatedTitle lines={slide.titleLines} hasOverlay={hasOverlay} />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.35, ease: 'easeOut' }}
        style={{
          maxWidth: '480px',
          fontFamily: 'var(--font-sans)',
          fontSize: '1.0625rem',
          lineHeight: 1.75,
          color: hasOverlay ? 'rgba(255,255,255,0.88)' : '#5A6B5E',
          textShadow: hasOverlay ? '0 1px 8px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        {slide.subtitle}
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.48, ease: 'easeOut' }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}
      >
        {/* 主 CTA — 珊瑚橘漸層 + shimmer */}
        <Link
          href={slide.ctaPrimary.href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            borderRadius: '0.5rem',
            padding: '0.875rem 1.75rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9375rem',
            fontWeight: 700,
            color: '#ffffff',
            background: 'linear-gradient(135deg, #E07856 0%, #C8633F 100%)',
            boxShadow: '0 4px 16px rgba(224,120,86,0.35)',
            position: 'relative',
            overflow: 'hidden',
            textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.transform = 'scale(1.02)'
            el.style.boxShadow = '0 8px 24px rgba(224,120,86,0.45)'
            const shimmer = el.querySelector<HTMLSpanElement>('.hero-shimmer')
            if (shimmer) shimmer.style.transform = 'translateX(250%)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.transform = 'scale(1)'
            el.style.boxShadow = '0 4px 16px rgba(224,120,86,0.35)'
            const shimmer = el.querySelector<HTMLSpanElement>('.hero-shimmer')
            if (shimmer) shimmer.style.transform = 'translateX(-100%)'
          }}
        >
          <span
            className='hero-shimmer'
            aria-hidden='true'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '55%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%)',
              transform: 'translateX(-100%)',
              transition: 'transform 0.45s ease',
              pointerEvents: 'none',
            }}
          />
          {slide.ctaPrimary.label}
        </Link>

        {/* 次 CTA — outline 風格 */}
        <Link
          href={slide.ctaSecondary.href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            borderRadius: '0.5rem',
            border: `1.5px solid ${hasOverlay ? 'rgba(255,255,255,0.8)' : '#1F3D2E'}`,
            padding: '0.875rem 1.75rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9375rem',
            fontWeight: 700,
            color: hasOverlay ? '#ffffff' : '#1F3D2E',
            background: hasOverlay ? 'rgba(255,255,255,0.10)' : 'transparent',
            textDecoration: 'none',
            transition: 'transform 0.2s, background 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)'
            e.currentTarget.style.background = hasOverlay
              ? 'rgba(255,255,255,0.18)'
              : 'rgba(31,61,46,0.06)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.background = hasOverlay ? 'rgba(255,255,255,0.10)' : 'transparent'
          }}
        >
          {slide.ctaSecondary.label}
        </Link>
      </motion.div>
    </motion.div>
  )
}

// ── GlowFollower: 滑鼠跟隨光暈 ──
interface GlowFollowerProps {
  normX: MotionValue<number>
  normY: MotionValue<number>
  hasOverlay: boolean
}

const noop = () => () => {}
const getClientTrue = () => true
const getServerFalse = () => false

function GlowFollower({ normX, normY, hasOverlay }: GlowFollowerProps) {
  const mounted = useSyncExternalStore(noop, getClientTrue, getServerFalse)

  const glowSize = 480
  const leftVal = useTransform(normX, (v) => `calc(${v * 100}vw - ${glowSize / 2}px)`)
  const topVal = useTransform(normY, (v) => `calc(${v * 100}vh - ${glowSize / 2}px)`)

  if (!mounted) return null

  const glowColor = hasOverlay
    ? 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 45%, transparent 70%)'
    : 'radial-gradient(circle, rgba(107,142,111,0.20) 0%, rgba(245,240,229,0.06) 45%, transparent 70%)'

  return (
    <motion.div
      aria-hidden
      style={{
        position: 'absolute',
        left: leftVal,
        top: topVal,
        pointerEvents: 'none',
        zIndex: 3,
        width: `${glowSize}px`,
        height: `${glowSize}px`,
        borderRadius: '50%',
        background: glowColor,
        filter: 'blur(50px)',
        transition: 'left 0.15s ease-out, top 0.15s ease-out',
      }}
    />
  )
}

// ── Hero: 主元件 ──
export function Hero() {
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  const normX = useMotionValue(0.35)
  const normY = useMotionValue(0.4)

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDE_KEYS.length)
  }, [])

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDE_KEYS.length) % SLIDE_KEYS.length)
  }, [])

  const goTo = useCallback((index: number) => {
    setCurrent(index)
  }, [])

  // Autoplay
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(goNext, AUTO_INTERVAL)
    return () => clearInterval(timer)
  }, [isPlaying, goNext])

  // Mouse glow tracking
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      normX.set((e.clientX - rect.left) / rect.width)
      normY.set((e.clientY - rect.top) / rect.height)
    }
    section.addEventListener('mousemove', handleMouseMove)
    return () => section.removeEventListener('mousemove', handleMouseMove)
  }, [normX, normY])

  const currentKey = SLIDE_KEYS[current]
  const slide = SLIDES_CONFIG[currentKey]
  const { hasOverlay } = slide

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        height: '100vh',
        minHeight: '600px',
      }}
    >
      {/* Animated gradient background */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentKey + '-bg'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            background: slide.gradient,
            zIndex: 0,
          }}
        />
      </AnimatePresence>

      {/* Glow follower */}
      <GlowFollower normX={normX} normY={normY} hasOverlay={hasOverlay} />

      {/* Foreground content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(1.5rem, 4vw, 6rem)',
          paddingTop: '5rem',
          paddingBottom: '3rem',
        }}
      >
        <div style={{ maxWidth: '600px' }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            key={currentKey + '-badge'}
            style={{
              marginBottom: '1.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderRadius: '9999px',
              border: `1px solid ${hasOverlay ? 'rgba(255,255,255,0.4)' : 'rgba(107,142,111,0.4)'}`,
              background: hasOverlay ? 'rgba(255,255,255,0.12)' : 'rgba(107,142,111,0.08)',
              padding: '0.5rem 1rem',
            }}
          >
            <span
              style={{
                width: '0.5rem',
                height: '0.5rem',
                borderRadius: '50%',
                background: hasOverlay ? '#ffffff' : '#6B8E6F',
                animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: hasOverlay ? '#ffffff' : '#2A5240',
              }}
            >
              {slide.badge}
            </span>
          </motion.div>

          {/* Slide text (AnimatePresence for smooth exit) */}
          <div style={{ minHeight: '280px' }}>
            <AnimatePresence mode='wait'>
              <SlideText key={currentKey} slideKey={currentKey} hasOverlay={hasOverlay} />
            </AnimatePresence>
          </div>

          {/* Navigation controls */}
          <div
            style={{
              marginTop: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            <button
              onClick={() => { goPrev(); setIsPlaying(false) }}
              aria-label='上一張'
              style={{
                display: 'flex',
                width: '2.5rem',
                height: '2.5rem',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                border: `1px solid ${hasOverlay ? 'rgba(255,255,255,0.5)' : 'rgba(31,61,46,0.3)'}`,
                color: hasOverlay ? '#ffffff' : '#1F3D2E',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'transform 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.10)'
                e.currentTarget.style.background = hasOverlay
                  ? 'rgba(255,255,255,0.12)'
                  : 'rgba(31,61,46,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                <path d='M10 3L5 8L10 13' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </button>

            {/* Progress bar indicators */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {SLIDE_KEYS.map((key, i) => (
                <button
                  key={key}
                  onClick={() => { goTo(i); setIsPlaying(false) }}
                  aria-label={`切到第 ${i + 1} 張`}
                  style={{
                    position: 'relative',
                    height: '0.25rem',
                    width: i === current ? '2.5rem' : '0.75rem',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'width 0.3s ease',
                    background: i === current
                      ? (hasOverlay ? '#ffffff' : '#1F3D2E')
                      : (hasOverlay ? 'rgba(255,255,255,0.4)' : 'rgba(31,61,46,0.25)'),
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => { goNext(); setIsPlaying(false) }}
              aria-label='下一張'
              style={{
                display: 'flex',
                width: '2.5rem',
                height: '2.5rem',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                border: `1px solid ${hasOverlay ? 'rgba(255,255,255,0.5)' : 'rgba(31,61,46,0.3)'}`,
                color: hasOverlay ? '#ffffff' : '#1F3D2E',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'transform 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.10)'
                e.currentTarget.style.background = hasOverlay
                  ? 'rgba(255,255,255,0.12)'
                  : 'rgba(31,61,46,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                <path d='M6 3L11 8L6 13' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive: 手機標題縮字 */}
      <style>{`
        @media (max-width: 767px) {
          .hero-title-h1 {
            font-size: clamp(2rem, 8vw, 3rem) !important;
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  )
}
