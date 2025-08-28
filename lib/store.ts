import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Car {
  id: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid"
  description: string
  images: string[]
  featured: boolean
  createdAt: string
}

export interface ExchangeInquiry {
  id: string
  name: string
  email: string
  phone: string
  currentCar: string
  desiredCar: string
  message: string
  createdAt: string
}

interface AppState {
  cars: Car[]
  exchangeInquiries: ExchangeInquiry[]
  isAdminMode: boolean
  filters: {
    brand: string
    model: string
    yearRange: [number, number]
    priceRange: [number, number]
    fuelType: string
    searchQuery: string
  }
}

const sampleCars: Car[] = [
  {
    id: "1",
    brand: "BMW",
    model: "M3",
    year: 2023,
    price: 75000,
    mileage: 5000,
    fuelType: "Petrol",
    description: "Pristine condition BMW M3 with premium features and exceptional performance.",
    images: ["/bmw-m3-2023-black.png"],
    featured: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    brand: "Tesla",
    model: "Model S",
    year: 2024,
    price: 95000,
    mileage: 1200,
    fuelType: "Electric",
    description: "Latest Tesla Model S with autopilot and premium interior package.",
    images: ["/tesla-model-s-2024-white.png"],
    featured: true,
    createdAt: "2024-02-01",
  },
  {
    id: "3",
    brand: "Mercedes",
    model: "AMG GT",
    year: 2023,
    price: 120000,
    mileage: 3500,
    fuelType: "Petrol",
    description: "Stunning Mercedes AMG GT with carbon fiber package and track performance.",
    images: ["/mercedes-amg-gt-2023-silver.png"],
    featured: true,
    createdAt: "2024-01-20",
  },
  {
    id: "4",
    brand: "Audi",
    model: "RS6",
    year: 2023,
    price: 85000,
    mileage: 8000,
    fuelType: "Petrol",
    description: "High-performance Audi RS6 Avant with quattro all-wheel drive.",
    images: ["/audi-rs6-2023-red.png"],
    featured: false,
    createdAt: "2024-01-10",
  },
]

const initialState: AppState = {
  cars: sampleCars,
  exchangeInquiries: [],
  isAdminMode: false,
  filters: {
    brand: "",
    model: "",
    yearRange: [2020, 2024],
    priceRange: [0, 200000],
    fuelType: "",
    searchQuery: "",
  },
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addCar: (state, action: PayloadAction<Omit<Car, "id" | "createdAt">>) => {
      const newCar: Car = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
      }
      state.cars.push(newCar)
    },
    updateCar: (state, action: PayloadAction<Car>) => {
      const index = state.cars.findIndex((car) => car.id === action.payload.id)
      if (index !== -1) {
        state.cars[index] = action.payload
      }
    },
    deleteCar: (state, action: PayloadAction<string>) => {
      state.cars = state.cars.filter((car) => car.id !== action.payload)
    },
    toggleAdminMode: (state, action: PayloadAction<boolean>) => {
      state.isAdminMode = action.payload
    },
    updateFilters: (state, action: PayloadAction<Partial<AppState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    addExchangeInquiry: (state, action: PayloadAction<Omit<ExchangeInquiry, "id" | "createdAt">>) => {
      const newInquiry: ExchangeInquiry = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      state.exchangeInquiries.push(newInquiry)
    },
  },
})

export const { addCar, updateCar, deleteCar, toggleAdminMode, updateFilters, addExchangeInquiry } = appSlice.actions

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
