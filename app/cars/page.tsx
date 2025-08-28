"use client"

import { Navigation } from "@/components/navigation"
import { CarsFilter } from "@/components/cars-filter"
import { CarsGrid } from "@/components/cars-grid"
import { Footer } from "@/components/footer"
import { useAppSelector } from "@/lib/hooks"
import { useMemo } from "react"

export default function CarsPage() {
  const { cars, filters } = useAppSelector((state) => state.app)

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // Brand filter
      if (filters.brand && car.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false
      }

      // Model filter
      if (filters.model && !car.model.toLowerCase().includes(filters.model.toLowerCase())) {
        return false
      }

      // Year range filter
      if (car.year < filters.yearRange[0] || car.year > filters.yearRange[1]) {
        return false
      }

      // Price range filter
      if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) {
        return false
      }

      // Fuel type filter
      if (filters.fuelType && car.fuelType !== filters.fuelType) {
        return false
      }

      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        const searchableText = `${car.brand} ${car.model} ${car.description}`.toLowerCase()
        if (!searchableText.includes(query)) {
          return false
        }
      }

      return true
    })
  }, [cars, filters])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Browse Our Cars</h1>
          <p className="text-xl text-muted-foreground">Discover your perfect vehicle from our premium collection</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <CarsFilter />
          </div>

          {/* Cars Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {filteredCars.length} of {cars.length} cars
              </p>
            </div>
            <CarsGrid cars={filteredCars} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
