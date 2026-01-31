import { getCars } from '@/lib/api';

export default async function Home() {
  const data = await getCars();

  return ( 
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Volkswagen Fan Wiki</h1>
      <div className="grid gap-4">
        {data.cars.map((car: any) => (
          <div key={car.id} className="border p-4 rounded hover:bg-gray-50">
            <h2 className="text-lg font-semibold">{car.name}</h2>
            <p className="text-gray-600">
              {car.production_start || ''} - {car.production_end || ''}
            </p>
          </div>
    ))}
    </div>
    </main>

  );
} 