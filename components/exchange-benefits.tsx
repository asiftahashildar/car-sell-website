"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, DollarSign, Award, Users, Zap } from "lucide-react"

export function ExchangeBenefits() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Fair Market Value",
      description: "Get the best possible value for your current vehicle with our transparent pricing system.",
    },
    {
      icon: Clock,
      title: "Quick Process",
      description: "Complete your exchange in as little as 48 hours with our streamlined process.",
    },
    {
      icon: Shield,
      title: "Guaranteed Quality",
      description: "All vehicles undergo comprehensive inspection and come with our quality guarantee.",
    },
    {
      icon: Zap,
      title: "Instant Approval",
      description: "Get pre-approved instantly and know exactly what you can afford before you shop.",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Our experienced team guides you through every step of the exchange process.",
    },
    {
      icon: Award,
      title: "Premium Selection",
      description: "Access to our exclusive inventory of premium and luxury vehicles.",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Our Exchange Program</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Experience the benefits of our premium car exchange service designed with your convenience in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:border-accent/50 border-border/50"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                    <benefit.icon className="h-8 w-8 text-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground text-pretty">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
