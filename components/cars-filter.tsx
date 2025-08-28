"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { updateFilters } from "@/lib/store"
import { Search, RotateCcw } from "lucide-react"

export function CarsFilter() {
  const { filters, cars } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()

  const uniqueBrands = Array.from(new Set(cars.map((car) => car.brand))).sort()
  const uniqueFuelTypes = Array.from(new Set(cars.map((car) => car.fuelType))).sort()

  const handleFilterChange = (key: string, value: any) => {
    dispatch(updateFilters({ [key]: value }))
  }

  const resetFilters = () => {
    dispatch(
      updateFilters({
        brand: "",
        model: "",
        yearRange: [2020, 2024],
        priceRange: [0, 200000],
        fuelType: "",
        searchQuery: "",
      }),
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Filters</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search cars..."
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Brand Filter */}
        <div className="space-y-2">
          <Label>Brand</Label>
          <Select
            value={filters.brand}
            onValueChange={(value) => handleFilterChange("brand", value === "all" ? "" : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {uniqueBrands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Model Filter */}
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            placeholder="Enter model..."
            value={filters.model}
            onChange={(e) => handleFilterChange("model", e.target.value)}
          />
        </div>

        {/* Year Range */}
        <div className="space-y-3">
          <Label>Year Range</Label>
          <div className="px-2">
            <Slider
              value={filters.yearRange}
              onValueChange={(value) => handleFilterChange("yearRange", value)}
              min={2015}
              max={2024}
              step={1}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.yearRange[0]}</span>
            <span>{filters.yearRange[1]}</span>
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label>Price Range</Label>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => handleFilterChange("priceRange", value)}
              min={0}
              max={200000}
              step={5000}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>

        {/* Fuel Type */}
        <div className="space-y-2">
          <Label>Fuel Type</Label>
          <Select
            value={filters.fuelType}
            onValueChange={(value) => handleFilterChange("fuelType", value === "all" ? "" : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Fuel Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Fuel Types</SelectItem>
              {uniqueFuelTypes.map((fuelType) => (
                <SelectItem key={fuelType} value={fuelType}>
                  {fuelType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
