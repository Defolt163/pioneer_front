'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const IconBack = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
)
const IconExit = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)
const IconUser = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
)

export default function TopBar({ backHref, title, onClick }) {
  const router = useRouter()
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 16px', borderBottom: '1px solid var(--border)',
      background: '#fff', minHeight: '52px',
    }}>
      {onClick || backHref ? (
        <Link onClick={onClick} href={!onClick ? backHref : ""} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '36px', height: '36px', borderRadius: '8px',
          color: 'var(--primary)', textDecoration: 'none',
          background: 'var(--primary-light)',
        }}>
          <IconBack />
        </Link>
      ) : <div className="w-9" />}

      {title && (
        <span className="font-brand text-base font-bold text-txt tracking-wide">{title}</span>
      )}

      <div className="flex items-center gap-2">
        {!hideProfile && (
          <button
            onClick={() => router.push('/profile')}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-primary bg-primary-l border-none cursor-pointer"
            title="Профиль"
          >
            <IconUser />
          </button>
        )}
        <button
          onClick={() => {
            localStorage.removeItem('pioneer_user')
            localStorage.removeItem('pioneer_token')
            router.push('/select-role')
          }}
          className="flex items-center justify-center w-9 h-9 rounded-lg text-muted bg-gray-100 border-none cursor-pointer"
          title="Выход"
        >
          <IconExit />
        </button>
      </div>
    </div>
  )
}
