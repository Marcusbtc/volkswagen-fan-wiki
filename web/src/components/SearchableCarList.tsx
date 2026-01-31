'use client'

import { useState, useCallback, createContext, useContext, useEffect, ReactNode } from 'react'
import { CarCard } from './CarCard'
import { getCars, deleteCar } from '@/lib/api'
import { AddCarForm } from './AddCarForm'
import { useToast } from './Toast'

interface Car {
  id: number;
  name: string;
  production_start: string | null;
  production_end: string | null;
  image_url?: string | null;
}

interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('vw-favorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('vw-favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }, [])

  const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites])

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return context
}

interface SearchableCarListProps {
  initialCars: Car[];
}

type SortOption = 'name' | 'year-asc' | 'year-desc'

export function SearchableCarList({ initialCars }: SearchableCarListProps) {
  const [cars, setCars] = useState(initialCars)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [currentPage, setCurrentPage] = useState(1)
  const { showToast } = useToast()
  const { isFavorite, toggleFavorite } = useFavorites()
  const itemsPerPage = 50

  const refreshCars = useCallback(async () => {
    const data = await getCars()
    setCars(data.cars)
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteCar(id)
      setCars(cars.filter(car => car.id !== id))
      showToast('Car deleted successfully', 'success')
    } catch (error) {
      showToast('Failed to delete car', 'error')
    }
  }

  const sortedAndFilteredCars = cars
    .filter(car => 
      car.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'year-asc':
          return (parseInt(a.production_start || '0') || 0) - (parseInt(b.production_start || '0') || 0)
        case 'year-desc':
          return (parseInt(b.production_start || '0') || 0) - (parseInt(a.production_start || '0') || 0)
        default:
          return 0
      }
    })

  const totalPages = Math.ceil(sortedAndFilteredCars.length / itemsPerPage)
  const paginatedCars = sortedAndFilteredCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showMax = 5
    
    if (totalPages <= showMax + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage, '...', totalPages)
      }
    }
    return pages
  }

  return (
    <div className="space-y-8">
      <AddCarForm onCarAdded={refreshCars} />
      
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <input
          type="text"
          placeholder="Search cars..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setCurrentPage(1)
          }}
          className="flex-1 max-w-md px-5 py-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/30 outline-none transition-all duration-300"
        />
        
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/30 text-white focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/30 outline-none transition-all cursor-pointer"
          >
            <option value="name" className="bg-[#001E50]">Sort by Name</option>
            <option value="year-asc" className="bg-[#001E50]">Year: Oldest First</option>
            <option value="year-desc" className="bg-[#001E50]">Year: Newest First</option>
          </select>
          
          <p className="text-white/60 text-sm font-medium whitespace-nowrap">
            {sortedAndFilteredCars.length} cars
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {paginatedCars.map((car: Car) => (
          <CarCard 
            key={car.id}
            id={car.id}
            name={car.name}
            production_start={car.production_start}
            production_end={car.production_end}
            image_url={car.image_url}
            onDelete={handleDelete}
            isFavorite={isFavorite(car.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white disabled:opacity-30 hover:bg-white/20 transition-all"
          >
            ←
          </button>
          
          <div className="flex gap-1 items-center">
            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="px-2 text-white/50">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page as number)}
                  className={`w-10 h-10 rounded-xl backdrop-blur-md border transition-all ${
                    currentPage === page
                      ? 'bg-[#00B0F0] border-[#00B0F0] text-white'
                      : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
                  }`}
                >
                  {page}
                </button>
              )
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white disabled:opacity-30 hover:bg-white/20 transition-all"
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}