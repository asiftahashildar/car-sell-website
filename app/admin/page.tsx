"use client"

import { Navigation } from "@/components/navigation"
import { AdminDashboard } from "@/components/admin-dashboard"
import { Footer } from "@/components/footer"
import { useAppSelector } from "@/lib/hooks"
import { Card, CardContent } from "@/components/ui/card"
import { Lock } from "lucide-react"

export default function AdminPage() {
  const isAdminMode = useAppSelector((state) => state.app.isAdminMode)

  if (!isAdminMode) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <Card>
              <CardContent className="p-8">
                <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-foreground mb-4">Admin Access Required</h1>
                <p className="text-muted-foreground">
                  You need to be in admin mode to access the dashboard. Please enable admin mode from the navigation.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground">Manage your car inventory and view inquiries</p>
        </div>
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  )
}
