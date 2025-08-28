"use client"

import type React from "react"

import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { useEffect } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load state from localStorage on mount
    const savedState = localStorage.getItem("carTradingState")
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        // You could dispatch actions to restore state here if needed
      } catch (error) {
        console.error("Failed to load saved state:", error)
      }
    }

    // Save state to localStorage on changes
    const unsubscribe = store.subscribe(() => {
      const state = store.getState()
      localStorage.setItem("carTradingState", JSON.stringify(state))
    })

    return unsubscribe
  }, [])

  return <Provider store={store}>{children}</Provider>
}
