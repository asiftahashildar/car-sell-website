"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Car, RefreshCw, ShoppingCart } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent z-10" />

      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/luxury-sports-car-in-modern-showroom-with-dramatic.png')`,
        }}
      />

      {/* Hero content */}
      <div className="relative z-20 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              AutoTrade Pro
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-200 text-pretty max-w-2xl mx-auto">
            Experience the future of automotive trading. Buy, sell, and exchange premium vehicles with confidence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/cars">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Buy a Car
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/sell">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg bg-transparent"
              >
                <Car className="mr-2 h-5 w-5" />
                Sell Your Car
              </Button>
            </Link>

            <Link href="/exchange">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                <RefreshCw className="mr-2 h-5 w-5" />
                Exchange
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">500+</div>
              <div className="text-gray-300">Premium Cars</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">1000+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <div className="text-gray-300">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
