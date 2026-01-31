'use client'

import { useState } from 'react'
import { createCar } from '@/lib/api'
import { useToast } from './Toast'
import { ImageUpload } from './ImageUpload'

interface AddCarFormProps {
  onCarAdded: () => void
}

interface FormData {
  name: string
  productionStart: string
  productionEnd: string
  imageUrl: string
  tags: string
}

const initialFormData: FormData = {
  name: '',
  productionStart: '',
  productionEnd: '',
  imageUrl: '',
  tags: ''
}

export function AddCarForm({ onCarAdded }: AddCarFormProps) {
  const [formData, setFormData] = useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  function updateField(field: keyof FormData, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await createCar({
        name: formData.name,
        production_start: formData.productionStart,
        production_end: formData.productionEnd,
        models: [],
        image_url: formData.imageUrl || null,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
      })

      setFormData(initialFormData)
      onCarAdded()
      showToast('Car added successfully', 'success')
    } catch {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Car name"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            required
            className="px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/30 outline-none transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={(e) => updateField('tags', e.target.value)}
            className="px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/30 outline-none transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Start year"
            value={formData.productionStart}
            onChange={(e) => updateField('productionStart', e.target.value)}
            className="px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/30 outline-none transition-all duration-300"
          />
          <input
            type="text"
            placeholder="End year"
            value={formData.productionEnd}
            onChange={(e) => updateField('productionEnd', e.target.value)}
            className="px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/30 outline-none transition-all duration-300"
          />
        </div>
        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <span>Image URL (paste link)</span>
          </div>
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={formData.imageUrl}
            onChange={(e) => updateField('imageUrl', e.target.value)}
            className="w-full px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/30 text-white placeholder-white/50 focus:border-[#00B0F0] focus:ring-2 focus:ring-[#00B0F0]/30 outline-none transition-all duration-300"
          />
          {formData.imageUrl && (
            <img src={formData.imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
          )}
          <div className="text-white/40 text-xs">Or upload from your device:</div>
          <ImageUpload onUpload={(url) => updateField('imageUrl', url)} currentUrl={formData.imageUrl ? '' : ''} />
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
