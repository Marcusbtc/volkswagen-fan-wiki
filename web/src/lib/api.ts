import axios, { AxiosError } from 'axios'
import { Car } from '@/types/car'
import { CarSchema, CarsResponseSchema } from '@/types/schemas'
import { CONFIG } from './config'

class ApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message)
    this.name = 'ApiError'
  }
}

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (retries === 0) throw error
    await new Promise(resolve => setTimeout(resolve, delay))
    return withRetry(fn, retries - 1, delay * 2)
  }
}

function handleApiError(error: unknown): never {
  if (error instanceof AxiosError) {
    const status = error.response?.status
    const message = error.response?.data?.detail || error.message
    throw new ApiError(message, status)
  }
  throw new ApiError('Unknown error occurred')
}

export const api = axios.create({
  baseURL: CONFIG.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getCars(): Promise<{ cars: Car[] }> {
  return withRetry(async () => {
    try {
      const response = await api.get('/api/cars')
      return CarsResponseSchema.parse(response.data)
    } catch (error) {
      handleApiError(error)
    }
  })
}

export async function getCar(id: number): Promise<Car> {
  return withRetry(async () => {
    try {
      const response = await api.get(`/api/cars/${id}`)
      return CarSchema.parse(response.data)
    } catch (error) {
      handleApiError(error)
    }
  })
}

export async function createCar(car: Omit<Car, 'id'>): Promise<Car> {
  try {
    const response = await api.post('/api/cars', car)
    return CarSchema.parse(response.data)
  } catch (error) {
    handleApiError(error)
  }
}

export async function updateCar(id: number, car: Car): Promise<Car> {
  try {
    const response = await api.put(`/api/cars/${id}`, car)
    return CarSchema.parse(response.data)
  } catch (error) {
    handleApiError(error)
  }
}

export async function deleteCar(id: number): Promise<void> {
  try {
    await api.delete(`/api/cars/${id}`)
  } catch (error) {
    handleApiError(error)
  }
}
