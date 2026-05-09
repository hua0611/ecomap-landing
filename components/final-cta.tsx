import { Container } from './ui/container'
import { Section } from './ui/section'
import { EmailForm } from './email-form'

export function FinalCta() {
  return (
    <Section className="bg-forest-900">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="mb-6 text-3xl font-bold text-cream-50 md:text-4xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            準備好讓你的城市開始計算循環價值了嗎？
          </h2>
          <p className="mb-8 text-cream-50/70">公測啟動時第一時間通知你</p>

          <div className="mx-auto max-w-md">
            <EmailForm source="footer" variant="dark" />
          </div>
        </div>
      </Container>
    </Section>
  )
}
