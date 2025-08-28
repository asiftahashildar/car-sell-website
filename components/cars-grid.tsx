"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, Fuel, Calendar, MapPin, ArrowRight, Heart } from "lucide-react"
import Link from "next/link"
import type { Car as CarType } from "@/lib/store"
import { useState } from "react"

interface CarsGridProps {
  cars: CarType[]
}

export function CarsGrid({ cars }: CarsGridProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

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

  const toggleFavorite = (carId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(carId)) {
      newFavorites.delete(carId)
    } else {
      newFavorites.add(carId)
    }
    setFavorites(newFavorites)
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">No cars found</h3>
        <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cars.map((car) => (
        <Card
          key={car.id}
          className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-accent/50"
        >
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={
                car.images[0] ||
                `/placeholder.svg?height=250&width=400&query=${car.brand || "/placeholder.svg"}%20${car.model}%20${car.year}`
              }
              alt={`${car.brand} ${car.model}`}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Favorite button */}
            <button
              onClick={() => toggleFavorite(car.id)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <Heart className={`h-4 w-4 ${favorites.has(car.id) ? "fill-accent text-accent" : "text-white"}`} />
            </button>

            {/* Featured badge */}
            {car.featured && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-accent text-accent-foreground">Featured</Badge>
              </div>
            )}

            {/* Year badge */}
            <div className="absolute bottom-3 left-3">
              <Badge variant="secondary" className="bg-black/70 text-white border-0">
                {car.year}
              </Badge>
            </div>
          </div>

          <CardContent className="p-5">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-foreground mb-1">
                {car.brand} {car.model}
              </h3>
              <p className="text-2xl font-bold text-accent">{formatPrice(car.price)}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{formatMileage(car.mileage)} mi</span>
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

            <p className="text-muted-foreground mb-5 text-sm line-clamp-2">{car.description}</p>

            <div className="flex gap-2">
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
                onClick={() => {
                  // Add to comparison or quick view functionality
                  console.log("Quick action for car:", car.id)
                }}
              >
                <Car className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
