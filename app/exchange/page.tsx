"use client"

import { Navigation } from "@/components/navigation"
import { ExchangeHero } from "@/components/exchange-hero"
import { ExchangeProcess } from "@/components/exchange-process"
import { ExchangeForm } from "@/components/exchange-form"
import { ExchangeBenefits } from "@/components/exchange-benefits"
import { Footer } from "@/components/footer"

export default function ExchangePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <ExchangeHero />
        <ExchangeProcess />
        <ExchangeBenefits />
        <ExchangeForm />
      </main>
      <Footer />
    </div>
  )
}
