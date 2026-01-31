'use client'

import { useState } from 'react'
import { CarCard } from './CarCard'
import { AddCarForm } from './AddCarForm'
import { useToast } from './Toast'
import { useFavorites } from '@/context/FavoritesContext'
import { useCars } from '@/hooks/useCars'
import { Car } from '@/types/car'
import { 
  sortCars, 
  filterCarsByQuery, 
  getPageNumbers, 
  paginate,
  SortOption 
} from '@/lib/carUtils'
import { CONFIG } from '@/lib/config'

interface SearchableCarListProps {
  initialCars: Car[];
}

export function SearchableCarList({ initialCars }: SearchableCarListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddForm, setShowAddForm] = useState(false)
  
  const { cars, refreshCars, handleDelete } = useCars(initialCars)
  const { showToast } = useToast()
  const { isFavorite, toggleFavorite } = useFavorites()

  function handleSearchChange(value: string) {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  function handleCarAdded() {
    refreshCars()
    setShowAddForm(false)
    showToast('Car added successfully', 'success')
  }

  function handleCarDelete(id: number) {
    handleDelete(id)
      .then(() => showToast('Car deleted successfully', 'success'))
      .catch(() => showToast('Failed to delete car', 'error'))
  }

  const filteredCars = filterCarsByQuery(cars, searchQuery)
  const sortedCars = sortCars(filteredCars, sortBy)
  const totalPages = Math.ceil(sortedCars.length / CONFIG.ITEMS_PER_PAGE)
  const paginatedCars = paginate(sortedCars, currentPage, CONFIG.ITEMS_PER_PAGE)

  const pageNumbers = getPageNumbers(currentPage, totalPages)

  return (
    <div className="space-y-8">
      {showAddForm && (
        <AddCarForm onCarAdded={handleCarAdded} />
      )}
      
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-3 rounded-xl glass bg-[#00B0F0]/20 border-[#00B0F0]/50 text-[#00B0F0] font-semibold hover:bg-[#00B0F0]/30 hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <span className="text-xl">+</span>
          {showAddForm ? 'Cancel' : 'Add Car'}
        </button>

        <input
          type="text"
          placeholder="Search cars..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
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
            {sortedCars.length} cars
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {paginatedCars.map((car, idx) => (
          <CarCard 
            key={car.id}
            car={car}
            onDelete={handleCarDelete}
            isFavorite={isFavorite(car.id)}
            onToggleFavorite={toggleFavorite}
            index={idx}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          pageNumbers={pageNumbers}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageNumbers: (number | string)[];
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, pageNumbers, onPageChange }: PaginationProps) {
  function goToPrevious() {
    onPageChange(Math.max(1, currentPage - 1))
  }

  function goToNext() {
    onPageChange(Math.min(totalPages, currentPage + 1))
  }

  return (
    <div className="flex justify-center items-center gap-3 pt-8">
      <button
        onClick={goToPrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-xl glass text-white disabled:opacity-30 hover:bg-white/10 transition-all"
      >
        ←
      </button>
      
      <div className="flex gap-2 items-center">
        {pageNumbers.map((page, idx) => (
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-white/40">...</span>
          ) : (
            <PageButton
              key={page}
              page={page as number}
              isActive={currentPage === page}
              onClick={() => onPageChange(page as number)}
            />
          )
        ))}
      </div>
      
      <button
        onClick={goToNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-xl glass text-white disabled:opacity-30 hover:bg-white/10 transition-all"
      >
        →
      </button>
    </div>
  )
}

interface PageButtonProps {
  page: number;
  isActive: boolean;
  onClick: () => void;
}

function PageButton({ page, isActive, onClick }: PageButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 rounded-xl glass transition-all ${
        isActive
          ? 'bg-[#00B0F0] border-[#00B0F0] text-white'
          : 'text-white/70 hover:bg-white/10'
      }`}
    >
      {page}
    </button>
  )
}
