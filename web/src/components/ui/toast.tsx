import { useEffect } from 'react'

interface ToastProps {
  message: string
  open: boolean
  onClose: () => void
  duration?: number
}

export function Toast({ message, open, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (!open) return
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [open, duration, onClose])

  if (!open) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-zinc-900 px-6 py-3 text-white shadow-lg animate-fade-in-up"
    >
      {message}
    </div>
  )
}

// Animacao fade-in-up (Tailwind plugin ou adicione no index.css se necessário) 