import Link from "next/link";

interface CarCardProps {
    id: number;
    name: string;
    production_start: string | null;
    production_end: string | null;
}

export function CarCard({ id, name, production_start, production_end }: CarCardProps) {
    return (
        <Link href={`/cars/${id}`} className="block group">
            <div className="relative overflow-hidden
            bg-white/10 backdrop-blur-md
            border border-white/20
            rounded-2xl p-6
            shadow-lg shadow-blue-900/10
            hover:shadow-xl hover:shadow-blue-900/20
            hover:bg-white/20
            transition-all duration-300
            hover:-translate-y-1
            ">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00B0F0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative z-10">
                    <h2 className="text-xl font-bold text-[#001E50] mb-2 font-sans">
                        {name}
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[#001E50]/70 bg-[#001E50]/10 px-3 py-1 rounded-full backdrop-blur-sm">
                            {production_start || '?'} - {production_end || 'Present'}
                        </span>
                    </div>
                </div>
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/30 to-transparent transform rotate-45 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700">
                </div>
            </div>
        </Link>
    )
}