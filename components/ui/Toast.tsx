import React, { useEffect } from 'react'
import { CheckCircle2, Sparkles, X } from 'lucide-react'

interface ToastProps {
  message: string | null
  onClose: () => void
  duration?: number
}

export function Toast({ message, onClose, duration = 2500 }: ToastProps) {
  useEffect(() => {
    if (!message) return

    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [message, duration, onClose])

  if (!message) return null

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className="toast-card">
        <CheckCircle2 size={18} className="toast-icon" />
        <span className="toast-message">{message}</span>
        <button
          type="button"
          onClick={onClose}
          className="toast-close"
          aria-label="닫기"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
