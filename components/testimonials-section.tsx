"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Owner",
      content:
        "AutoTrade Pro made selling my old car and buying a new one incredibly easy. The exchange process was seamless and I got a great deal!",
      rating: 5,
      image: "/professional-woman-diverse.png",
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content:
        "I was impressed by the quality of cars and the transparent pricing. The team was professional and helped me find exactly what I was looking for.",
      rating: 5,
      image: "/professional-man.png",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      content:
        "The car exchange program saved me so much time and hassle. I traded my sedan for an SUV in just two days. Highly recommend!",
      rating: 5,
      image: "/professional-woman-smiling.png",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50">
              <CardContent className="p-8">
                <div className="mb-6">
                  <Quote className="h-8 w-8 text-accent mb-4" />
                  <p className="text-muted-foreground text-pretty leading-relaxed">{testimonial.content}</p>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
