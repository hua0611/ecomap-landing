import type { Metadata } from 'next'
import { Noto_Serif_TC, Noto_Sans_TC } from 'next/font/google'
import './globals.css'

const notoSerifTC = Noto_Serif_TC({
  variable: '--font-noto-serif-tc',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cycmap-landing.vercel.app'
  ),
  title: 'EcoMap — 讓每一個容器，都被看見它的循環價值',
  description:
    'EcoMap 把外送與外帶包材的循環數據，變成一張人人都看得懂的政策儀表板。加入候補名單，公測時搶先試用。',
  openGraph: {
    title: 'EcoMap — 循環容器經濟儀表板',
    description: 'EcoMap 把外送與外帶包材的循環數據，變成一張人人都看得懂的政策儀表板。',
    type: 'website',
    locale: 'zh_TW',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EcoMap Landing Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EcoMap — 循環容器經濟儀表板',
    description: 'EcoMap 把外送與外帶包材的循環數據，變成一張人人都看得懂的政策儀表板。',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${notoSerifTC.variable} ${notoSansTC.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  )
}
