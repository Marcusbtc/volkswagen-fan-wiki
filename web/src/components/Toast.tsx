'use client'

import { useState, useCallback, createContext, useContext, ReactNode } from 'react'
import { CONFIG } from '@/lib/config'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(7)
    setToasts(prev => [...prev, { id, message, type }])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, CONFIG.TOAST_DURATION)
  }, [])

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  const getToastStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-green-500/90 to-emerald-500/90 border-green-400/50'
      case 'error':
        return 'bg-gradient-to-r from-red-500/90 to-rose-500/90 border-red-400/50'
      default:
        return 'bg-gradient-to-r from-[#00B0F0]/90 to-blue-500/90 border-blue-400/50'
    }
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-3">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`relative overflow-hidden rounded-xl px-6 py-4 backdrop-blur-xl border shadow-2xl transform transition-all duration-300 hover:scale-105 ${getToastStyles(toast.type)}`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-center gap-3">
              <span className="text-white font-medium">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/70 hover:text-white transition-colors ml-2"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
