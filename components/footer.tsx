import Image from 'next/image'
import { Container } from './ui/container'

export function Footer() {
  return (
    <footer className="border-t border-cream-100 bg-cream-50 py-10">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Logo + copyright */}
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="EcoMap Logo" width={22} height={22} />
            <span
              className="font-bold text-forest-900"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              EcoMap
            </span>
            <span className="text-sm text-ink-600">© 2026 EcoMap</span>
          </div>

          {/* Right: Contact */}
          <a
            href="mailto:hello@ecomap.example"
            className="text-sm text-ink-600 transition hover:text-forest-900"
          >
            hello@ecomap.example
          </a>
        </div>

        {/* Data source note */}
        <p className="mt-6 text-xs text-ink-600/50">
          * 數據來源：環保署容器管理統計（估計值），外送平台公開年報，循環台灣基金會報告。實際數字以政府公告為準。
        </p>
      </Container>
    </footer>
  )
}
