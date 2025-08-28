"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { toggleAdminMode } from "@/lib/store"
import { Car, Settings, Home, ShoppingCart, RefreshCw, Phone } from "lucide-react"

export function Navigation() {
  const isAdminMode = useAppSelector((state) => state.app.isAdminMode)
  const dispatch = useAppDispatch()

  const handleAdminToggle = () => {
    const password = prompt("Enter admin password:")
    if (password === "admin123") {
      dispatch(toggleAdminMode(!isAdminMode))
    } else if (password !== null) {
      alert("Incorrect password")
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-foreground">AutoTrade Pro</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-1 text-foreground hover:text-accent transition-colors">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/cars"
              className="flex items-center space-x-1 text-foreground hover:text-accent transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Buy Cars</span>
            </Link>
            <Link
              href="/sell"
              className="flex items-center space-x-1 text-foreground hover:text-accent transition-colors"
            >
              <Car className="h-4 w-4" />
              <span>Sell Your Car</span>
            </Link>
            <Link
              href="/exchange"
              className="flex items-center space-x-1 text-foreground hover:text-accent transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Exchange</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center space-x-1 text-foreground hover:text-accent transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Contact</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAdminMode && (
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin Dashboard
                </Button>
              </Link>
            )}
            <Button variant={isAdminMode ? "destructive" : "secondary"} size="sm" onClick={handleAdminToggle}>
              {isAdminMode ? "Exit Admin" : "Admin Mode"}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
