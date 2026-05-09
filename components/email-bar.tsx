import { EmailForm } from './email-form'

export function EmailBar() {
  return (
    <section
      style={{
        background: '#F5F0E5',
        borderTop: '1px solid rgba(31,61,46,0.08)',
        borderBottom: '1px solid rgba(31,61,46,0.08)',
      }}
    >
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 4vw, 2rem)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          flexWrap: 'wrap',
        }}
      >
        {/* 左側標題 */}
        <div style={{ flex: '1 1 auto', minWidth: 0 }}>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
              fontWeight: 700,
              color: '#1F3D2E',
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            想第一時間試用 EcoMap？
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              color: '#5A6B5E',
              marginTop: '0.25rem',
            }}
          >
            留下 email，公測啟動時第一時間通知你
          </p>
        </div>

        {/* 右側 EmailForm */}
        <div style={{ flex: '1 1 320px', maxWidth: '480px' }}>
          <EmailForm source='hero' variant='light' />
        </div>
      </div>

      {/* 手機 stack */}
      <style>{`
        @media (max-width: 767px) {
          .email-bar-inner {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  )
}
