import { getCars } from '@/lib/api';
import { CarCard } from '@/components/CarCard';

export default async function Home() {
  const data = await getCars();

  return ( 
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#001E50]">Volkswagen Fan Wiki</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.cars.map((car: any) => (
          <CarCard
            key={car.id}
            id={car.id}
            name={car.name}
            production_start={car.production_start}
            production_end={car.production_end}
          />
        ))}
    </div>
    </main>

  );
} 