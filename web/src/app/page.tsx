import { getCars } from '@/lib/api'
import { SearchableCarList } from '@/components/SearchableCarList'

export const revalidate = 0

export default async function Home() {
  const data = await getCars()

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-white tracking-tight">
        Volkswagen <span className="text-[#00B0F0]">Collection</span>
      </h1>
      <SearchableCarList initialCars={data.cars} />
    </div>
  )
} 