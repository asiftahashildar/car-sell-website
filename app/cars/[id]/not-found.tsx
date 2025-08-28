import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Car } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Car className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-4">Car Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The car you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/cars">
            <Button size="lg">Browse All Cars</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
