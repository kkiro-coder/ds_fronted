import type { ToastState } from '../types'

interface ToastProps {
  toast: ToastState
}

export default function Toast({ toast }: ToastProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 24,
        right: 24,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 20px',
        borderRadius: 12,
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        fontSize: 14,
        fontWeight: 500,
        color: '#fff',
        background: toast.type === 'success' ? '#10B981' : '#EF4444',
        transition: 'all 300ms cubic-bezier(0.4,0,0.2,1)',
        transform: toast.visible ? 'translateY(0)' : 'translateY(-16px)',
        opacity: toast.visible ? 1 : 0,
        pointerEvents: 'none',
      }}
    >
      {toast.type === 'success' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      )}
      {toast.message}
    </div>
  )
}
