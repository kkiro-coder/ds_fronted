export default function BrandPanel() {
  return (
    <div className="brand">
      <div className="brand-content">
        <div className="brand-logo">
          <div className="brand-logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
              <circle cx="14" cy="14" r="5" fill="rgba(255,255,255,0.9)" />
              <line x1="14" y1="2" x2="14" y2="8" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
              <line x1="14" y1="20" x2="14" y2="26" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
              <line x1="2" y1="14" x2="8" y2="14" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="14" x2="26" y2="14" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span>DailySearch</span>
        </div>
        <h2>日常搜索</h2>
        <p>高效、精准，您的智能搜索助手</p>
      </div>
    </div>
  )
}
