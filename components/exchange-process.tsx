"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FileText, Search, Calculator, RefreshCw } from "lucide-react"

export function ExchangeProcess() {
  const steps = [
    {
      icon: FileText,
      title: "Submit Your Details",
      description: "Fill out our simple form with your current car details and desired vehicle preferences.",
      step: "01",
    },
    {
      icon: Calculator,
      title: "Get Instant Valuation",
      description: "Our AI-powered system provides an accurate market valuation for your current vehicle.",
      step: "02",
    },
    {
      icon: Search,
      title: "Find Your Match",
      description: "We'll search our premium inventory to find vehicles that match your preferences and budget.",
      step: "03",
    },
    {
      icon: RefreshCw,
      title: "Complete Exchange",
      description: "Finalize the paperwork and drive away in your new car. It's that simple!",
      step: "04",
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our streamlined exchange process makes upgrading your vehicle simple and transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardContent className="p-8 text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>

                <div className="mb-6 mt-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                    <step.icon className="h-8 w-8 text-accent" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-pretty">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
