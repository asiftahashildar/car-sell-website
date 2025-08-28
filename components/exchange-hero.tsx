"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw, ArrowRight } from "lucide-react"

export function ExchangeHero() {
  const scrollToForm = () => {
    document.getElementById("exchange-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-muted/30 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-6">
              <RefreshCw className="h-10 w-10 text-accent" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">Car Exchange Program</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
              Upgrade your ride seamlessly. Trade your current vehicle for your dream car with our hassle-free exchange
              program.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" onClick={scrollToForm} className="px-8 py-4 text-lg">
              Start Exchange Process
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg bg-transparent">
              Learn More
            </Button>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">48hrs</div>
              <div className="text-muted-foreground">Average Process Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">95%</div>
              <div className="text-muted-foreground">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">$0</div>
              <div className="text-muted-foreground">Hidden Fees</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
