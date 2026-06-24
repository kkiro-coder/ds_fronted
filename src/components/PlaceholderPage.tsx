interface PlaceholderProps {
  title: string
}

export default function PlaceholderPage({ title }: PlaceholderProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      minHeight: 300,
      gap: 12,
    }}>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
      <p style={{ fontSize: 15, fontWeight: 600, color: '#64748B' }}>{title}</p>
      <p style={{ fontSize: 13, color: '#94A3B8' }}>模块建设中</p>
    </div>
  )
}
