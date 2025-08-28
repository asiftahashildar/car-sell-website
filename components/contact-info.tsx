"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Clock, Phone, Mail, MapPin } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-6">Contact Information</h2>
        <p className="text-muted-foreground text-lg mb-8">
          We're here to help you find your perfect vehicle. Reach out to us through any of the following channels.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Phone</h3>
                <p className="text-muted-foreground mb-1">Sales: +1 (555) 123-4567</p>
                <p className="text-muted-foreground">Service: +1 (555) 123-4568</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground mb-1">info@autotradepro.com</p>
                <p className="text-muted-foreground">support@autotradepro.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Address</h3>
                <p className="text-muted-foreground">123 Auto Street</p>
                <p className="text-muted-foreground">Car City, CC 12345</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Business Hours</h3>
                <p className="text-muted-foreground mb-1">Monday - Friday: 9:00 AM - 7:00 PM</p>
                <p className="text-muted-foreground mb-1">Saturday: 9:00 AM - 6:00 PM</p>
                <p className="text-muted-foreground">Sunday: 11:00 AM - 5:00 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Embedded Map */}
      <Card>
        <CardContent className="p-0">
          <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive Map</p>
              <p className="text-sm text-muted-foreground">123 Auto Street, Car City, CC 12345</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
