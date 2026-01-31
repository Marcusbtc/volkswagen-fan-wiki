'use client'

import { useState, useCallback } from 'react'
import { useToast } from './Toast'

interface ImageUploadProps {
  onUpload: (url: string) => void
  currentUrl?: string | null
}

export function ImageUpload({ onUpload, currentUrl }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const { showToast } = useToast()

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (!file) return
    await uploadFile(file)
  }, [])

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    await uploadFile(file)
  }

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please upload an image file', 'error')
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      onUpload(data.url)
      showToast('Image uploaded!', 'success')
    } catch (err) {
      showToast('Upload failed', 'error')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
        dragActive
          ? 'border-[#00B0F0] bg-[#00B0F0]/10'
          : 'border-white/30 hover:border-[#00B0F0]/50'
      }`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={isUploading}
        className="hidden"
        id="image-input"
      />
      <label htmlFor="image-input" className="cursor-pointer block">
        {currentUrl ? (
          <img
            src={currentUrl}
            alt="Preview"
            className="w-full h-32 object-cover rounded-lg mb-2"
          />
        ) : (
          <div className="text-white/60">
            <svg
              className="w-10 h-10 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p>Drop image here or click to upload</p>
          </div>
        )}
        <span
          className={`inline-block mt-2 px-4 py-2 rounded-lg text-white transition-colors ${
            isUploading
              ? 'bg-white/20 cursor-not-allowed'
              : 'bg-[#00B0F0] hover:bg-[#0090D0]'
          }`}
        >
          {isUploading ? 'Uploading...' : currentUrl ? 'Change Image' : 'Select File'}
        </span>
      </label>
    </div>
  )
}
