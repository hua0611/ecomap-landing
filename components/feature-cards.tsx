import { Container } from './ui/container'
import { Section } from './ui/section'

const features = [
  {
    icon: '🏪',
    title: '為店家',
    bullets: ['免押金、免清洗，按次計費', '加入即享循環補貼資格', '數據即時反映門市表現'],
  },
  {
    icon: '🧋',
    title: '為消費者',
    bullets: [
      '掃 QR Code 輕鬆借還',
      '累積環保里程與獎勵',
      '一個 App 管理所有循環容器',
    ],
  },
  {
    icon: '🏛️',
    title: '為政策制定者',
    bullets: [
      '即時儀表板看城市減塑成效',
      '跨區域數據比對與趨勢分析',
      '政策評估報告一鍵匯出',
    ],
  },
]

export function FeatureCards() {
  return (
    <Section className="bg-cream-100">
      <Container>
        <div className="mb-12 text-center">
          <h2
            className="text-3xl font-bold text-forest-900 md:text-4xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            每個角色，都在 EcoMap 找到自己的位置
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-cream-50 p-8 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3
                className="mb-4 text-xl font-bold text-forest-900"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {feature.title}
              </h3>
              <ul className="space-y-2">
                {feature.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-ink-600">
                    <span className="mt-0.5 text-forest-500">✓</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
