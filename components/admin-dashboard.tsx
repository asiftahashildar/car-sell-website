"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { deleteCar, updateCar } from "@/lib/store"
import { Car, Plus, Trash2, Eye, Mail, Phone, BarChart3 } from "lucide-react"
import Link from "next/link"

export function AdminDashboard() {
  const { cars, exchangeInquiries } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()
  const [selectedCar, setSelectedCar] = useState<string | null>(null)

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

  const handleDeleteCar = (carId: string) => {
    if (confirm("Are you sure you want to delete this car?")) {
      dispatch(deleteCar(carId))
    }
  }

  const toggleFeatured = (carId: string) => {
    const car = cars.find((c) => c.id === carId)
    if (car) {
      dispatch(updateCar({ ...car, featured: !car.featured }))
    }
  }

  const totalValue = cars.reduce((sum, car) => sum + car.price, 0)
  const featuredCars = cars.filter((car) => car.featured)
  const recentInquiries = exchangeInquiries.slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Cars</p>
                <p className="text-3xl font-bold text-foreground">{cars.length}</p>
              </div>
              <Car className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Featured Cars</p>
                <p className="text-3xl font-bold text-foreground">{featuredCars.length}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-foreground">{formatPrice(totalValue)}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inquiries</p>
                <p className="text-3xl font-bold text-foreground">{exchangeInquiries.length}</p>
              </div>
              <Mail className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="inventory" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inventory">Car Inventory</TabsTrigger>
          <TabsTrigger value="inquiries">Exchange Inquiries</TabsTrigger>
        </TabsList>

        {/* Car Inventory Tab */}
        <TabsContent value="inventory" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">Car Inventory</h2>
            <Link href="/sell">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Car
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {cars.map((car) => (
              <Card key={car.id} className="group hover:shadow-lg transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={
                      car.images[0] ||
                      `/placeholder.svg?height=200&width=300&query=${car.brand || "/placeholder.svg"}%20${car.model}%20${car.year}`
                    }
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-48 object-cover"
                  />
                  {car.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-foreground">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-xl font-bold text-accent">{formatPrice(car.price)}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-muted-foreground">
                    <span>Year: {car.year}</span>
                    <span>Miles: {formatMileage(car.mileage)}</span>
                    <span>Fuel: {car.fuelType}</span>
                    <span>Added: {car.createdAt}</span>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/cars/${car.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleFeatured(car.id)}
                      className={car.featured ? "bg-accent text-accent-foreground" : ""}
                    >
                      {car.featured ? "Unfeature" : "Feature"}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteCar(car.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {cars.length === 0 && (
            <div className="text-center py-12">
              <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No cars in inventory</h3>
              <p className="text-muted-foreground mb-4">Start by adding your first car to the inventory.</p>
              <Link href="/sell">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Car
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>

        {/* Exchange Inquiries Tab */}
        <TabsContent value="inquiries" className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Exchange Inquiries</h2>

          <div className="space-y-4">
            {exchangeInquiries.map((inquiry) => (
              <Card key={inquiry.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{inquiry.name}</h3>
                      <p className="text-muted-foreground">{inquiry.email}</p>
                    </div>
                    <Badge variant="secondary">{new Date(inquiry.createdAt).toLocaleDateString()}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Car</p>
                      <p className="font-medium">{inquiry.currentCar}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Desired Car</p>
                      <p className="font-medium">{inquiry.desiredCar}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Message</p>
                    <p className="text-foreground">{inquiry.message}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call {inquiry.phone}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {exchangeInquiries.length === 0 && (
            <div className="text-center py-12">
              <Mail className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No inquiries yet</h3>
              <p className="text-muted-foreground">Exchange inquiries will appear here when customers submit them.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
