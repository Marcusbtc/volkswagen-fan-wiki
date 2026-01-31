import { describe, it, expect } from 'vitest'
import { sortCars, filterCarsByQuery, getPageNumbers, paginate, SortOption } from './carUtils'

describe('sortCars', () => {
  const cars = [
    { name: 'Golf', production_start: '1974' },
    { name: 'Passat', production_start: '1973' },
    { name: 'Beetle', production_start: '1938' }
  ]

  it('sorts by name', () => {
    const sorted = sortCars(cars, 'name')
    expect(sorted[0].name).toBe('Beetle')
    expect(sorted[1].name).toBe('Golf')
    expect(sorted[2].name).toBe('Passat')
  })

  it('sorts by year ascending', () => {
    const sorted = sortCars(cars, 'year-asc')
    expect(sorted[0].production_start).toBe('1938')
    expect(sorted[1].production_start).toBe('1973')
    expect(sorted[2].production_start).toBe('1974')
  })

  it('sorts by year descending', () => {
    const sorted = sortCars(cars, 'year-desc')
    expect(sorted[0].production_start).toBe('1974')
    expect(sorted[1].production_start).toBe('1973')
    expect(sorted[2].production_start).toBe('1938')
  })

  it('handles null production_start', () => {
    const carsWithNull = [{ name: 'A', production_start: null }, { name: 'B', production_start: '2020' }]
    const sorted = sortCars(carsWithNull, 'year-asc')
    expect(sorted[1].production_start).toBe('2020')
  })
})

describe('filterCarsByQuery', () => {
  const cars = [
    { name: 'Volkswagen Golf' },
    { name: 'VW Passat' },
    { name: 'BMW 3 Series' }
  ]

  it('filters by query', () => {
    const filtered = filterCarsByQuery(cars, 'golf')
    expect(filtered).toHaveLength(1)
    expect(filtered[0].name).toBe('Volkswagen Golf')
  })

  it('returns all cars for empty query', () => {
    const filtered = filterCarsByQuery(cars, '')
    expect(filtered).toHaveLength(3)
  })

  it('is case insensitive', () => {
    const filtered = filterCarsByQuery(cars, 'VW')
    expect(filtered).toHaveLength(1)
  })
})

describe('getPageNumbers', () => {
  it('returns all pages for small total', () => {
    const pages = getPageNumbers(1, 5)
    expect(pages).toEqual([1, 2, 3, 4, 5])
  })

  it('shows first pages when on early page', () => {
    const pages = getPageNumbers(2, 10)
    expect(pages).toEqual([1, 2, 3, '...', 10])
  })

  it('shows last pages when on late page', () => {
    const pages = getPageNumbers(9, 10)
    expect(pages).toEqual([1, '...', 8, 9, 10])
  })

  it('shows ellipsis for middle pages', () => {
    const pages = getPageNumbers(5, 10)
    expect(pages).toEqual([1, '...', 5, '...', 10])
  })
})

describe('paginate', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  it('returns first page', () => {
    const page = paginate(items, 1, 3)
    expect(page).toEqual([1, 2, 3])
  })

  it('returns second page', () => {
    const page = paginate(items, 2, 3)
    expect(page).toEqual([4, 5, 6])
  })

  it('handles partial last page', () => {
    const page = paginate(items, 4, 3)
    expect(page).toEqual([10])
  })

  it('returns empty for out of range page', () => {
    const page = paginate(items, 5, 3)
    expect(page).toEqual([])
  })
})
