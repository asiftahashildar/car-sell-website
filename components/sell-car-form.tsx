"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppDispatch } from "@/lib/hooks"
import { addCar } from "@/lib/store"
import { Car, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export function SellCarForm() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    fuelType: "Petrol" as "Petrol" | "Diesel" | "Electric" | "Hybrid",
    description: "",
    featured: false,
  })

  const [images, setImages] = useState<string[]>([])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageAdd = () => {
    const imageUrl = prompt("Enter image URL (or leave empty for placeholder):")
    if (imageUrl !== null) {
      const finalUrl =
        imageUrl.trim() || `/placeholder.svg?height=300&width=400&query=${formData.brand}%20${formData.model}`
      setImages((prev) => [...prev, finalUrl])
    }
  }

  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.brand || !formData.model || !formData.price) {
        alert("Please fill in all required fields")
        return
      }

      // Add car to Redux store
      dispatch(
        addCar({
          ...formData,
          images:
            images.length > 0
              ? images
              : [`/placeholder.svg?height=300&width=400&query=${formData.brand}%20${formData.model}`],
        }),
      )

      // Reset form
      setFormData({
        brand: "",
        model: "",
        year: new Date().getFullYear(),
        price: 0,
        mileage: 0,
        fuelType: "Petrol",
        description: "",
        featured: false,
      })
      setImages([])

      alert("Car added successfully!")
      router.push("/admin")
    } catch (error) {
      console.error("Error adding car:", error)
      alert("Error adding car. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          Car Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                placeholder="e.g., BMW, Mercedes, Tesla"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
                placeholder="e.g., M3, S-Class, Model S"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => handleInputChange("year", Number.parseInt(e.target.value))}
                min="1990"
                max={new Date().getFullYear() + 1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", Number.parseInt(e.target.value))}
                placeholder="50000"
                min="0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mileage">Mileage</Label>
              <Input
                id="mileage"
                type="number"
                value={formData.mileage}
                onChange={(e) => handleInputChange("mileage", Number.parseInt(e.target.value))}
                placeholder="25000"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Fuel Type</Label>
            <Select value={formData.fuelType} onValueChange={(value: any) => handleInputChange("fuelType", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Petrol">Petrol</SelectItem>
                <SelectItem value="Diesel">Diesel</SelectItem>
                <SelectItem value="Electric">Electric</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the car's condition, features, and any additional details..."
              rows={4}
            />
          </div>

          {/* Images Section */}
          <div className="space-y-4">
            <Label>Images</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Car image ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleImageAdd}
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg h-24 flex items-center justify-center hover:border-accent transition-colors"
              >
                <div className="text-center">
                  <Plus className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Add Image</span>
                </div>
              </button>
            </div>
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => handleInputChange("featured", checked)}
            />
            <Label htmlFor="featured">Mark as featured car</Label>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding Car..." : "Add Car to Inventory"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
