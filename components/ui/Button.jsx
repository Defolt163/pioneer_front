export default function Button({ children, onClick, className, variant = 'primary', fullWidth, customWidth, customPadding, disabled, style, customFontSize=false }) {
  const base = {
    width: customWidth ? customWidth : fullWidth ? '100%' : 'auto',
    padding: customPadding ? customPadding : '14px 20px',
    borderRadius: '10px',
    fontFamily: 'var(--font-body)',
    fontSize: !customFontSize ? '15px' : 'auto',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    transition: 'all 0.18s',
    opacity: disabled ? 0.5 : 1,
    letterSpacing: '0.01em',
  }

  const variants = {
    primary: {
      background: 'var(--primary)',
      color: '#fff',
      boxShadow: '0 2px 8px rgba(26,86,219,0.25)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--primary)',
      border: '1.5px solid var(--primary)',
    },
    ghost: {
      background: 'var(--primary-light)',
      color: 'var(--primary)',
    },
    red: {
      background: '#9b0505',
      color: '#fff',
    },
    green: {
      background: '#05a00d',
      color: '#fff',
    }
  }

  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}
