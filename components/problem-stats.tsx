import { Container } from './ui/container'
import { Section } from './ui/section'

const stats = [
  {
    number: '80 億',
    label: '一次性飲料杯',
    description: '台灣每年估計丟棄的一次性飲料杯數量，填滿多座體育館',
  },
  {
    number: '38%',
    label: '外送訂單佔比',
    description: '外送平台訂單佔餐飲業比例（估計），且持續上升中',
  },
  {
    number: '<3%',
    label: '進入循環系統',
    description: '目前實際進入循環回收系統的外送容器比例，缺口巨大',
  },
]

export function ProblemStats() {
  return (
    <Section className="bg-cream-100">
      <Container>
        <div className="mb-12 text-center">
          <h2
            className="text-3xl font-bold text-forest-900 md:text-4xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            為什麼這件事重要？
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-cream-100 bg-cream-50 p-8 text-center shadow-sm transition hover:shadow-md"
            >
              <div
                className="mb-2 text-5xl font-bold text-forest-900 md:text-6xl"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {stat.number}
              </div>
              <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-forest-500">
                {stat.label}
              </div>
              <p className="text-sm leading-relaxed text-ink-600">{stat.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-ink-600/60">
          * 數字為估計值，實際數據請參閱資料來源。
        </p>
      </Container>
    </Section>
  )
}
