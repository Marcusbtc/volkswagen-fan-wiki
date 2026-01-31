import Link from "next/link";

interface CarCardProps {
  id: number;
  name: string;
  production_start: string | null;
  production_end: string | null;
  image_url?: string | null;
  onDelete?: (id: number) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

export function CarCard({ id, name, production_start, production_end, image_url, onDelete, isFavorite, onToggleFavorite }: CarCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`Delete ${name}?`)) {
      onDelete?.(id);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(id);
  };

  return (
    <Link href={`/cars/${id}`} className="block group">
      <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_48px_rgba(0,176,240,0.3)] hover:border-[#00B0F0]/50 hover:-translate-y-2 transition-all duration-500">
        {image_url && (
          <div className="relative h-40 overflow-hidden">
            <img 
              src={image_url} 
              alt={name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001E50]/80 to-transparent" />
          </div>
        )}
        <div className="p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00B0F0]/10 via-transparent to-[#001E50]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/20 pointer-events-none" />
          
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            {onToggleFavorite && (
              <button
                onClick={handleFavorite}
                className={`w-8 h-8 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 ${
                  isFavorite 
                    ? 'bg-yellow-500/40 border-yellow-400/50 text-yellow-200 hover:bg-yellow-500/60' 
                    : 'bg-white/10 border-white/30 text-white/70 hover:bg-white/20 hover:text-yellow-200'
                }`}
              >
                {isFavorite ? '★' : '☆'}
              </button>
            )}
            {onDelete && (
              <button
                onClick={handleDelete}
                className="w-8 h-8 rounded-full backdrop-blur-md bg-red-500/40 border border-red-400/50 text-red-200 hover:bg-red-500/60 hover:text-white flex items-center justify-center transition-all duration-300 text-lg font-bold shadow-lg"
              >
                ×
              </button>
            )}
          </div>
          
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#00B0F0] transition-colors duration-300">
              {name}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/70 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
                {production_start || '—'} → {production_end || 'Present'}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/40 to-transparent transform rotate-45 translate-x-[-100%] group-hover:translate-x-[250%] transition-transform duration-1000 pointer-events-none" />
      </div>
    </Link>
  );
}