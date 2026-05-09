import { Container } from './ui/container'
import { Section } from './ui/section'
import { DemoFrame } from './demo-frame'

const highlights = [
  {
    icon: '🏪',
    title: '店家加入',
    desc: '餐飲業者一鍵加入容器循環計畫，即時追蹤旗下門市的循環率。',
  },
  {
    icon: '📦',
    title: '容器旅程',
    desc: '從借出到歸還，每一個容器的完整旅程都在地圖上可視化呈現。',
  },
  {
    icon: '📊',
    title: '政策成效',
    desc: '政策制定者可即時查看城市減塑成效，輔助決策與資源分配。',
  },
]

export function SolutionDemo() {
  const demoUrl = process.env.NEXT_PUBLIC_DEMO_URL ?? 'https://ecomap-demo.zeabur.app/'

  return (
    <Section id="demo" className="bg-cream-50">
      <Container>
        <div className="mb-12 text-center">
          <h2
            className="mb-4 text-3xl font-bold text-forest-900 md:text-4xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            一張表，看懂全城循環容器的流轉。
          </h2>
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.title} className="text-center">
                <div className="mb-2 text-3xl">{item.icon}</div>
                <h3 className="mb-1 font-semibold text-forest-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Demo iframe */}
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            <DemoFrame demoUrl={demoUrl} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
