"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { useAppSelector } from "@/lib/hooks"
import { Car, Fuel, Calendar, MapPin, ArrowLeft, Heart, Share2, Phone } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface CarDetailPageProps {
  params: {
    id: string
  }
}

export default function CarDetailPage({ params }: CarDetailPageProps) {
  const car = useAppSelector((state) => state.app.cars.find((c) => c.id === params.id))

  if (!car) {
    notFound()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("en-US").format(mileage)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/cars">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cars
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Car Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={
                  car.images[0] ||
                  `/placeholder.svg?height=400&width=600&query=${car.brand || "/placeholder.svg"}%20${car.model}%20${car.year}`
                }
                alt={`${car.brand} ${car.model}`}
                className="w-full h-96 object-cover"
              />
              {car.featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                </div>
              )}
            </div>
          </div>

          {/* Car Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {car.brand} {car.model}
              </h1>
              <p className="text-3xl font-bold text-accent mb-4">{formatPrice(car.price)}</p>
            </div>

            {/* Key Specs */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Key Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Year</p>
                      <p className="font-semibold">{car.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Mileage</p>
                      <p className="font-semibold">{formatMileage(car.mileage)} miles</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Fuel className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Fuel Type</p>
                      <p className="font-semibold">{car.fuelType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Car className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Brand</p>
                      <p className="font-semibold">{car.brand}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{car.description}</p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1 bg-accent hover:bg-accent/90">
                <Phone className="h-5 w-5 mr-2" />
                Contact Seller
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
