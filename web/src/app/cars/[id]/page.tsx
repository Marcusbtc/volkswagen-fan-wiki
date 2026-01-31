import { getCar } from "@/lib/api";

export default async function Carpage({ params }: {params: { id: string } } ) {
    const { id } = await params;
    const car = await getCar(parseInt(id));


    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold">{car.name}</h1>
            <p> {car.production_start} - {car.production_end}</p>
            <a href="/">Back to list</a>
        </main>
    );
}