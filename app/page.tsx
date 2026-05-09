import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { EmailBar } from '@/components/email-bar'
import { ProblemStats } from '@/components/problem-stats'
import { SolutionDemo } from '@/components/solution-demo'
import { FeatureCards } from '@/components/feature-cards'
import { FinalCta } from '@/components/final-cta'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <EmailBar />
        <ProblemStats />
        <SolutionDemo />
        <FeatureCards />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
