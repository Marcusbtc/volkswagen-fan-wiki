'use client'

import { useState } from 'react'
import { createCar } from '@/lib/api'
import { useToast } from './Toast'

interface AddCarFormProps {
  onCarAdded: () => void
}

export function AddCarForm({ onCarAdded }: AddCarFormProps) {
  const [name, setName] = useState('')
  const [productionStart, setProductionStart] = useState('')
  const [productionEnd, setProductionEnd] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await createCar({
        name,
        production_start: productionStart,
        production_end: productionEnd,
        models: [],
        image_url: imageUrl || null
      })
      
      setName('')
      setProductionStart('')
      setProductionEnd('')
      setImageUrl('')
      onCarAdded()
      showToast('Car added successfully', 'success')
    } catch (error) {
      showToast('Failed to add car', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/15 pointer-events-none" />
      <div className="relative z-10">
        <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Add New Car</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Car name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/30 outline-none transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/30 outline-none transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Start year"
            value={productionStart}
            onChange={(e) => setProductionStart(e.target.value)}
            className="px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/30 outline-none transition-all duration-300"
          />
          <input
            type="text"
            placeholder="End year"
            value={productionEnd}
            onChange={(e) => setProductionEnd(e.target.value)}
            className="px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/30 outline-none transition-all duration-300"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#00B0F0] to-[#0090D0] text-white shadow-lg shadow-[#00B0F0]/30 hover:shadow-xl hover:shadow-[#00B0F0]/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 transition-all duration-300"
        >
          {isSubmitting ? 'Adding...' : 'Add Car'}
        </button>
      </div>
    </form>
  )
}
