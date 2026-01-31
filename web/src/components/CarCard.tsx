import Link from 'next/link'
import { Car } from '@/types/car'
import { CONFIG } from '@/lib/config'

interface CarCardProps {
  car: Car
  onDelete?: (id: number) => void
  isFavorite?: boolean
  onToggleFavorite?: (id: number) => void
  index?: number
}

export function CarCard({ car, onDelete, isFavorite, onToggleFavorite, index = 0 }: CarCardProps) {
  const staggerDelay = Math.min(index * CONFIG.STAGGER_STEP, CONFIG.MAX_STAGGER_DELAY)

  function handleDelete(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (confirm(`Delete ${car.name}?`)) {
      onDelete?.(car.id)
    }
  }

  function handleFavorite(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    onToggleFavorite?.(car.id)
  }

  return (
    <Link 
      href={`/cars/${car.id}`} 
      className="block group animate-fade-in-up"
      style={{ animationDelay: `${staggerDelay}s` }}
    >
      <div className="relative overflow-hidden rounded-2xl glass metallic-shine hover-lift group">
        {car.image_url && (
          <div className="relative h-44 overflow-hidden">
            <img 
              src={car.image_url} 
              alt={car.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001E50] via-[#001E50]/40 to-transparent" />
          </div>
        )}
        <div className="p-5">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00B0F0]/5 via-transparent to-[#001E50]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            {onToggleFavorite && (
              <button
                onClick={handleFavorite}
                className={`w-9 h-9 rounded-full glass flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  isFavorite 
                    ? 'bg-yellow-500/40 border-yellow-400/50 text-yellow-200' 
                    : 'text-white/70 hover:text-yellow-200'
                }`}
              >
                {isFavorite ? '★' : '☆'}
              </button>
            )}
            {onDelete && (
              <button
                onClick={handleDelete}
                className="w-9 h-9 rounded-full glass bg-red-500/30 border-red-400/40 text-red-200 hover:bg-red-500/50 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 text-lg font-bold"
              >
                ×
              </button>
            )}
          </div>
          
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-[#00B0F0] transition-colors duration-300 font-display">
              {car.name}
            </h2>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-white/60 bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                {car.production_start || '—'} → {car.production_end || 'Present'}
              </span>
            </div>
            {car.tags && car.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {car.tags.slice(0, 3).map((tag: string) => (
                  <span 
                    key={tag} 
                    className="px-2 py-0.5 rounded-full bg-[#00B0F0]/20 text-[#00B0F0] text-xs font-medium border border-[#00B0F0]/30"
                  >
                    {tag}
                  </span>
                ))}
                {car.tags.length > 3 && (
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/60 text-xs">
                    +{car.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}