'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from './ui/container'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream-50/95 shadow-sm backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-forest-900"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            <Image src="/logo.svg" alt="EcoMap Logo" width={28} height={28} priority />
            EcoMap
          </Link>
          <a
            href="#demo"
            className="rounded-lg border border-forest-900 px-4 py-2 text-sm font-medium text-forest-900 transition hover:bg-forest-900 hover:text-cream-50"
          >
            查看 Demo
          </a>
        </div>
      </Container>
    </nav>
  )
}
