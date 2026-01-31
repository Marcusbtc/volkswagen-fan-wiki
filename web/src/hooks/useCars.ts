import { useState, useCallback } from 'react'
import { getCars, deleteCar } from '@/lib/api'
import { Car } from '@/types/car'

interface UseCarsResult {
  cars: Car[];
  refreshCars: () => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
}

export function useCars(initialCars: Car[]): UseCarsResult {
  const [cars, setCars] = useState(initialCars)

  const refreshCars = useCallback(async () => {
    const data = await getCars()
    setCars(data.cars)
  }, [])

  const handleDelete = useCallback(async (id: number) => {
    await deleteCar(id)
    setCars(prev => prev.filter(car => car.id !== id))
  }, [])

  return { cars, refreshCars, handleDelete }
}
