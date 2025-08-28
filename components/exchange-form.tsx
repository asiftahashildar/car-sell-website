"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAppDispatch } from "@/lib/hooks"
import { addExchangeInquiry } from "@/lib/store"
import { RefreshCw, CheckCircle } from "lucide-react"

export function ExchangeForm() {
  const dispatch = useAppDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentCar: "",
    desiredCar: "",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.currentCar || !formData.desiredCar) {
        alert("Please fill in all required fields")
        return
      }

      // Add inquiry to Redux store
      dispatch(addExchangeInquiry(formData))

      // Reset form and show success
      setFormData({
        name: "",
        email: "",
        phone: "",
        currentCar: "",
        desiredCar: "",
        message: "",
      })
      setIsSubmitted(true)

      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      console.error("Error submitting inquiry:", error)
      alert("Error submitting inquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="exchange-form" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-accent/50">
              <CardContent className="p-12 text-center">
                <CheckCircle className="h-16 w-16 text-accent mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Inquiry Submitted Successfully!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for your interest in our exchange program. Our team will review your inquiry and contact you
                  within 24 hours with a personalized exchange proposal.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                  Submit Another Inquiry
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="exchange-form" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-4">Start Your Exchange</h2>
            <p className="text-xl text-muted-foreground">
              Fill out the form below and we'll get back to you with a personalized exchange proposal.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Exchange Inquiry Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Vehicle Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Vehicle Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="currentCar">Current Vehicle *</Label>
                    <Input
                      id="currentCar"
                      value={formData.currentCar}
                      onChange={(e) => handleInputChange("currentCar", e.target.value)}
                      placeholder="e.g., 2020 BMW 3 Series, 45,000 miles"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="desiredCar">Desired Vehicle *</Label>
                    <Input
                      id="desiredCar"
                      value={formData.desiredCar}
                      onChange={(e) => handleInputChange("desiredCar", e.target.value)}
                      placeholder="e.g., Tesla Model S, Mercedes AMG GT"
                      required
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-2">
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell us about your current vehicle's condition, any specific requirements for your desired car, or any questions you have about the exchange process..."
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                      Submitting Inquiry...
                    </>
                  ) : (
                    "Submit Exchange Inquiry"
                  )}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By submitting this form, you agree to be contacted by our team regarding your exchange inquiry.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
