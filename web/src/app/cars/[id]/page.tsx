'use client'

import { useState, useEffect, use } from 'react'
import { getCar, updateCar } from '@/lib/api'
import Link from 'next/link'
import { useToast } from '@/components/Toast'
import { ImageUpload } from '@/components/ImageUpload'
import { SkeletonText } from '@/components/Skeleton'
import { Car } from '@/types/car'

interface CarFormData {
  name: string
  production_start: string
  production_end: string
  image_url: string
  tags: string
}

function carToFormData(car: Car): CarFormData {
  return {
    name: car.name,
    production_start: car.production_start || '',
    production_end: car.production_end || '',
    image_url: car.image_url || '',
    tags: car.tags?.join(', ') || ''
  }
}

function formDataToUpdate(formData: CarFormData, originalCar: Car) {
  return {
    id: originalCar.id,
    name: formData.name,
    production_start: formData.production_start,
    production_end: formData.production_end,
    models: originalCar.models || [],
    image_url: formData.image_url || null,
    tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
  }
}

export default function CarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [car, setCar] = useState<Car | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState<CarFormData>({
    name: '',
    production_start: '',
    production_end: '',
    image_url: '',
    tags: ''
  })
  const { showToast } = useToast()

  useEffect(() => {
    async function loadCar() {
      const data = await getCar(parseInt(id))
      setCar(data)
      setFormData(carToFormData(data))
      setIsLoading(false)
    }
    loadCar()
  }, [id])

  function updateField(field: keyof CarFormData, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!car) return
    
    try {
      const updateData = formDataToUpdate(formData, car)
      await updateCar(car.id, updateData)
      setCar({ ...car, ...updateData })
      setIsEditing(false)
      showToast('Car updated successfully', 'success')
    } catch {
      showToast('Failed to update car', 'error')
    }
  }

  if (isLoading || !car) {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
        <div className="glass-card p-8">
          <SkeletonText lines={5} />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link 
        href="/" 
        className="inline-flex items-center text-white/70 hover:text-white transition-colors"
      >
        ← Back to Collection
      </Link>
      
      <div className="relative overflow-hidden rounded-3xl p-8 backdrop-blur-xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 border border-white/30 shadow-[0_16px_64px_rgba(0,0,0,0.4)]">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/20 pointer-events-none" />
        <div className="relative z-10">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h1 className="text-3xl font-bold text-white tracking-tight">Edit Car</h1>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/30 outline-none transition-all"
                  placeholder="Car name"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.production_start}
                    onChange={(e) => updateField('production_start', e.target.value)}
                    className="px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/30 outline-none transition-all"
                    placeholder="Start year"
                  />
                  <input
                    type="text"
                    value={formData.production_end}
                    onChange={(e) => updateField('production_end', e.target.value)}
                    className="px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/30 outline-none transition-all"
                    placeholder="End year"
                  />
                </div>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => updateField('tags', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/30 outline-none transition-all"
                  placeholder="Tags (comma separated)"
                />
                <div className="space-y-3">
                  <div className="text-white/60 text-sm">Image URL (paste link)</div>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => updateField('image_url', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/30 outline-none transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.image_url && (
                    <img src={formData.image_url} alt="Preview" className="w-full max-w-md h-48 object-cover rounded-lg" />
                  )}
                  <div className="text-white/40 text-xs">Or upload from your device:</div>
                  <ImageUpload 
                    onUpload={(url) => updateField('image_url', url)}
                    currentUrl=""
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#00B0F0] to-[#0090D0] text-white shadow-lg shadow-[#00B0F0]/30 hover:shadow-xl transition-all"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 rounded-xl font-semibold backdrop-blur-md bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-4xl font-bold text-white tracking-tight">
                  {car.name}
                </h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-all"
                >
                  Edit
                </button>
              </div>
              
              {car.image_url && (
                <div className="mb-6">
                  <img 
                    src={car.image_url} 
                    alt={car.name}
                    className="w-full max-w-md h-64 object-cover rounded-2xl"
                  />
                </div>
              )}
              
              {car.description && (
                <p className="text-white/80 text-lg mb-6 leading-relaxed">{car.description}</p>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="px-5 py-4 rounded-2xl backdrop-blur-md bg-white/10 border border-white/30">
                  <p className="text-white/60 text-xs mb-1">Production</p>
                  <p className="text-white font-semibold">
                    {car.production_start || '?'} - {car.production_end || 'Present'}
                  </p>
                </div>
                {car.category && (
                  <div className="px-5 py-4 rounded-2xl backdrop-blur-md bg-white/10 border border-white/30">
                    <p className="text-white/60 text-xs mb-1">Category</p>
                    <p className="text-white font-semibold">{car.category}</p>
                  </div>
                )}
                {car.engine && (
                  <div className="px-5 py-4 rounded-2xl backdrop-blur-md bg-white/10 border border-white/30">
                    <p className="text-white/60 text-xs mb-1">Engine</p>
                    <p className="text-white font-semibold">{car.engine}</p>
                  </div>
                )}
                {car.fuel_type && (
                  <div className="px-5 py-4 rounded-2xl backdrop-blur-md bg-white/10 border border-white/30">
                    <p className="text-white/60 text-xs mb-1">Fuel Type</p>
                    <p className="text-white font-semibold">{car.fuel_type}</p>
                  </div>
                )}
                {car.country && (
                  <div className="px-5 py-4 rounded-2xl backdrop-blur-md bg-white/10 border border-white/30">
                    <p className="text-white/60 text-xs mb-1">Market</p>
                    <p className="text-white font-semibold">{car.country}</p>
                  </div>
                )}
              </div>
              
              {car.tags && car.tags.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {car.tags.map((tag, index) => (
                      <span key={index} className="px-4 py-2 rounded-xl backdrop-blur-md bg-[#00B0F0]/20 border border-[#00B0F0]/50 text-[#00B0F0] text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {car.models && car.models.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Models</h2>
                  <div className="flex flex-wrap gap-2">
                    {car.models.map((model: any, index: number) => (
                      <span key={index} className="px-4 py-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white text-sm">
                        {model}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}