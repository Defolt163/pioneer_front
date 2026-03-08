'use client'

import { Input } from '@/components/ui/input'
import TopBar from '@/components/ui/TopBar'

export default function OrgConnectPage() {
  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#fff' }}>
      <TopBar backHref="/select-role" title="ОРГАНИЗАЦИЯМ-ПАРТНЁРАМ" />
      <div className="fade-in" style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
        <Input/>
      </div>
    </div>
  )
}
