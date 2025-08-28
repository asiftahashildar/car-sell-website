"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const faqs = [
    {
      question: "How does the car exchange process work?",
      answer:
        "Our car exchange process is simple: submit your current car details and desired vehicle preferences, get an instant valuation, browse matching vehicles in our inventory, and complete the exchange with our team handling all paperwork.",
    },
    {
      question: "What types of cars do you accept for exchange?",
      answer:
        "We accept most makes and models that are less than 15 years old with reasonable mileage. Our team evaluates each vehicle individually to ensure it meets our quality standards.",
    },
    {
      question: "How do you determine the value of my current car?",
      answer:
        "We use advanced AI algorithms combined with current market data, vehicle condition, mileage, and maintenance history to provide accurate and fair valuations for your vehicle.",
    },
    {
      question: "Is there a warranty on the cars you sell?",
      answer:
        "Yes, all our vehicles come with a comprehensive warranty. The warranty period varies by vehicle age and type, but we ensure every car meets our high-quality standards before sale.",
    },
    {
      question: "Can I finance my purchase through AutoTrade Pro?",
      answer:
        "We work with multiple financing partners to offer competitive rates and flexible terms. Our finance team can help you find the best option for your situation.",
    },
    {
      question: "How long does the exchange process take?",
      answer:
        "Most exchanges are completed within 48-72 hours once all paperwork is submitted. Complex cases may take up to a week, but we keep you informed throughout the process.",
    },
  ]

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Find answers to common questions about our services and processes.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4">{faq.question}</h3>
                  {openItems.has(index) ? (
                    <ChevronUp className="h-5 w-5 text-accent flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-accent flex-shrink-0" />
                  )}
                </button>
                {openItems.has(index) && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
