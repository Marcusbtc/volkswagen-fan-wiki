export type SortOption = 'name' | 'year-asc' | 'year-desc'

export function sortCars<T extends { name: string; production_start: string | null }>(
  cars: T[],
  sortBy: SortOption
): T[] {
  const sorted = [...cars]
  
  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'year-asc':
      return sorted.sort((a, b) => 
        (parseInt(a.production_start || '0') || 0) - (parseInt(b.production_start || '0') || 0)
      )
    case 'year-desc':
      return sorted.sort((a, b) => 
        (parseInt(b.production_start || '0') || 0) - (parseInt(a.production_start || '0') || 0)
      )
    default:
      return sorted
  }
}

export function filterCarsByQuery<T extends { name: string }>(
  cars: T[],
  query: string
): T[] {
  if (!query.trim()) return cars
  const lowerQuery = query.toLowerCase()
  return cars.filter(car => car.name.toLowerCase().includes(lowerQuery))
}

export function getPageNumbers(currentPage: number, totalPages: number): (number | string)[] {
  const pages: (number | string)[] = []
  const showMax = 5
  
  if (totalPages <= showMax + 2) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }
  
  if (currentPage <= 3) {
    pages.push(1, 2, 3, '...', totalPages)
  } else if (currentPage >= totalPages - 2) {
    pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages)
  } else {
    pages.push(1, '...', currentPage, '...', totalPages)
  }
  
  return pages
}

export function paginate<T>(items: T[], page: number, itemsPerPage: number): T[] {
  const start = (page - 1) * itemsPerPage
  return items.slice(start, start + itemsPerPage)
}
