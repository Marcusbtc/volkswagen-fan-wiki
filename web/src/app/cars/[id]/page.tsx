'use client'

import { useState, useEffect, use } from 'react'
import { getCar, updateCar } from '@/lib/api'
import Link from 'next/link'
import { useToast } from '@/components/Toast'

interface Car {
  id: number
  name: string
  production_start: string | null
  production_end: string | null
  models: any[]
  image_url: string | null
}

export default function Carpage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [car, setCar] = useState<Car | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    production_start: '',
    production_end: ''
  })
  const { showToast } = useToast()

  useEffect(() => {
    const loadCar = async () => {
      const data = await getCar(parseInt(id))
      setCar(data)
      setFormData({
        name: data.name,
        production_start: data.production_start || '',
        production_end: data.production_end || ''
      })
      setIsLoading(false)
    }
    loadCar()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!car) return
    
    try {
      await updateCar(car.id, {
        id: car.id,
        name: formData.name,
        production_start: formData.production_start,
        production_end: formData.production_end,
        models: car.models,
        image_url: car.image_url
      })
      setCar({
        ...car,
        name: formData.name,
        production_start: formData.production_start,
        production_end: formData.production_end
      })
      setIsEditing(false)
      showToast('Car updated successfully', 'success')
    } catch (error) {
      showToast('Failed to update car', 'error')
    }
  }

  if (isLoading || !car) {
    return <div className="text-white">Loading...</div>
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
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/30 outline-none transition-all"
                  placeholder="Car name"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.production_start}
                    onChange={(e) => setFormData({...formData, production_start: e.target.value})}
                    className="px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/30 outline-none transition-all"
                    placeholder="Start year"
                  />
                  <input
                    type="text"
                    value={formData.production_end}
                    onChange={(e) => setFormData({...formData, production_end: e.target.value})}
                    className="px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/30 outline-none transition-all"
                    placeholder="End year"
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
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="px-6 py-3 rounded-2xl backdrop-blur-md bg-white/10 border border-white/30">
                  <p className="text-white/60 text-sm mb-1">Production Period</p>
                  <p className="text-white font-semibold">
                    {car.production_start || 'Unknown'} → {car.production_end || 'Present'}
                  </p>
                </div>
              </div>
              
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