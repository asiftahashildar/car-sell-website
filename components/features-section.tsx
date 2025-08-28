"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Users, Award, Clock, HeadphonesIcon } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Verified Quality",
      description: "Every vehicle undergoes comprehensive inspection and verification process.",
    },
    {
      icon: Zap,
      title: "Instant Valuation",
      description: "Get accurate market value for your vehicle in seconds with our AI-powered system.",
    },
    {
      icon: Users,
      title: "Trusted Community",
      description: "Join thousands of satisfied customers in our premium automotive marketplace.",
    },
    {
      icon: Award,
      title: "Premium Selection",
      description: "Curated collection of luxury and performance vehicles from top brands.",
    },
    {
      icon: Clock,
      title: "Quick Process",
      description: "Streamlined buying and selling process that saves you time and effort.",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Expert support team available around the clock to assist you.",
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose AutoTrade Pro</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Experience the future of automotive trading with our cutting-edge platform and premium services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:border-accent/50 border-border/50"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                    <feature.icon className="h-8 w-8 text-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground text-pretty">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
