'use client'

import TopBar from '@/components/ui/TopBar'

export default function AdminRequestsPage() {
  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#fff' }}>
      <TopBar backHref="/select-role" title="АДМИНИСТРАТОР" />
      <div className="fade-in" style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: '56px', marginBottom: '16px' }}>🛡️</div>
        <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Раздел в разработке</p>
        <p style={{ fontSize: '13px' }}>Панель администратора появится в ближайшее время</p>
      </div>
    </div>
  )
}
