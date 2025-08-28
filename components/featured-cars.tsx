"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppSelector } from "@/lib/hooks"
import { Car, Fuel, Calendar, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export function FeaturedCars() {
  const cars = useAppSelector((state) => state.app.cars.filter((car) => car.featured))

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
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Featured Vehicles</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover our handpicked selection of premium vehicles, each offering exceptional quality and performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {cars.map((car) => (
            <Card
              key={car.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 hover:border-accent/50"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={
                    car.images[0] ||
                    `/placeholder.svg?height=250&width=400&query=${car.brand}%20${car.model}%20${car.year}`
                  }
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-black/70 text-white border-0">
                    {car.year}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-3xl font-bold text-accent mb-3">{formatPrice(car.price)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{formatMileage(car.mileage)} miles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4" />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    <span>{car.brand}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 text-sm line-clamp-2">{car.description}</p>

                <div className="flex gap-3">
                  <Link href={`/cars/${car.id}`} className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-accent hover:text-accent-foreground bg-transparent"
                  >
                    <Car className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/cars">
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              View All Cars
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
