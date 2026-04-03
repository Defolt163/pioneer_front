'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import TopBar from '@/components/ui/TopBar'
import Footer from '@/components/ui/Footer'
import Button from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { authService } from '@/services/authService'

export default function LoginPage() {
  const router = useRouter()
  const { userData } = useAuth()
  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    const expiresStr = "expires=" + expires.toUTCString();
    document.cookie = `${name}=${value}; ${expiresStr}; path=/`;
  }

  useEffect(()=>{
    if (typeof window === 'undefined') return null

    let deviceId = localStorage.getItem('device_id')

    if (!deviceId) {
      const userAgent = navigator.userAgent
      const platform = navigator.platform
      const random = Math.random().toString(36).substring(2)

      deviceId = `${userAgent}-${platform}-${random}`
      localStorage.setItem('device_id', deviceId)
    }

  }, [])

  useEffect(()=>{
    if(userData && userData.length !== 0){
      router.push('/')
    }
  }, [userData])

  const [email, setEmail]           = useState('')
  const [code, setCode]             = useState('')
  const [userName, setUserName]     = useState('')
  const [userPhone, setUserPhone]   = useState('')
  const [agreed, setAgreed]         = useState(false)
  const [codeSent, setCodeSent]     = useState(false)
  const [authType, setAuthType]     = useState('login')
  const [errors, setErrors]         = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [shake, setShake]           = useState(false)
  const [authType, setAuthType] = useState('login')
  const [userName, setUserName] = useState('')

  /* useEffect(() => {
    if (!loading && user) router.replace('/services')
  }, [user, loading]) */

  const triggerShake = () => { setShake(true); setTimeout(() => setShake(false), 500) }

  const isRegistration = authType === 'registration' || authType === 'complete_registration'

  const handleSendCode = async () => {
    const emailErr = validateEmail()
    if (emailErr) {
      setErrors({ email: emailErr })
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    setSubmitting(true)

    const response = await fetch('http://127.0.0.1:8000/api/users/auth/send-code/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          "email": email,
          "privacy_policy_accepted": true
        }),
    })
    if(response.status == 400){
        console.log('400', response)
    }else if(response.ok){
        const data = await response.json()
        console.log("OK",data)
        setAuthType(data.auth_type)
        setSubmitting(false)
        setCodeSent(true)
    }else if(!response.ok){
      console.log("NOT OK",response)
    }
  }

  const handleVerify = async () => {
    if (code.length < 4) {
      setErrors({ code: 'Введите код из письма' })
      return
    }
    if (authType == 'registration' && userName == ''){
      setErrors({ userName: 'Введите имя' })
      return
    }

    setSubmitting(true)
    setErrors({})

    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const randomString = Math.random().toString(20).substring(2, 14) + Math.random().toString(20).substring(2, 14);
  
    const deviceID = `${userAgent}-${platform}-${randomString}`;

    const response = await fetch('http://localhost:8000/api/users/auth/verify-code/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          "name": "Michael",
          "email": email,
          "code": code,
          "privacy_policy_accepted": true,
          "device_id": deviceID
        }),
    })
    if(response.ok){
      console.log("OK",response)
      const data = await response.json()
      localStorage.setItem("pioneer_token", data.jwt.access)
      localStorage.setItem("pioneer_refresh_token", data.jwt.refresh)
      setCookie('pioneer_token', data.jwt.access, 7);
      setCookie('pioneer_refresh_token', data.jwt.refresh, 360);
      router.push('/')
    }else if(!response.ok){
      console.log("NOT OK",response)
      setErrors({ code: 'Неверный код. Попробуйте ещё раз.' })
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setSubmitting(false)
    }
  }

  //if (loading) return null

  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#fff' }}>
      <TopBar backHref="/" />

      <div style={{ padding: '32px 24px', flex: 1 }}>
        <h1 className="fade-in" style={{
          fontFamily: 'var(--font-brand)', fontSize: '26px', fontWeight: 700,
          color: 'var(--text)', letterSpacing: '0.04em',
          marginBottom: '8px', textAlign: 'center',
        }}>
          {authType == 'registration' ? "РЕГИСТРАЦИЯ" : "ВХОД"}
        </h1>

        <div className={shake ? 'shake' : ''} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Email */}
          <div className="fade-in">
            <label className="block text-[13px] font-semibold text-txt mb-1.5">Email</label>
            <input type="email" value={email}
              onChange={e => { setEmail(e.target.value); setErrors({}) }}
              placeholder="example@mail.ru" disabled={codeSent}
              className={`w-full px-[14px] py-3 rounded-[10px] text-[15px] text-txt outline-none font-body transition-colors border-[1.5px]
                ${errors.email ? 'border-danger' : 'border-border'} ${codeSent ? 'bg-gray-50' : 'bg-white'}`}
            />
            {errors.email && <p className="fade-in mt-1 text-[12px] text-danger">⚠ {errors.email}</p>}
          </div>

          {authType == 'registration' ? 
            <div className="fade-in">
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '6px' }}>
                Ваше Имя
              </label>
              <input
                type="text"
                value={userName}
                onChange={e => {setUserName(e.target.value)}}
                placeholder="Ваше имя"
                style={{
                  width: '100%', padding: '12px 14px',
                  border: `1.5px solid ${errors.userName ? 'var(--danger)' : 'var(--border)'}`,
                  borderRadius: '10px', fontSize: '22px',
                  outline: 'none', color: 'var(--text)',
                  letterSpacing: '0.3em', textAlign: 'center',
                  fontFamily: 'var(--font-brand)',
                  transition: 'border-color 0.2s',
                }}
              />
              {errors.userName && (
                <div className="fade-in" style={{ marginTop: '5px', fontSize: '12px', color: 'var(--danger)' }}>
                  ⚠ {errors.userName}
                </div>
              )}
            </div> : null
          }

          {/* Код из письма */}
          {codeSent && (
            <div className="fade-in">
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '6px' }}>
                Код из письма
              </label>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                Мы отправили код на {email}
              </p>
              <input
                type="text"
                value={code}
                onChange={e => { setCode(e.target.value.replace(/\D/g, '').slice(0, 6)); setErrors({}) }}
                placeholder="Введите код"
                maxLength={4}
                style={{
                  width: '100%', padding: '12px 14px',
                  border: `1.5px solid ${errors.code ? 'var(--danger)' : 'var(--border)'}`,
                  borderRadius: '10px', fontSize: '22px',
                  outline: 'none', color: 'var(--text)',
                  letterSpacing: '0.3em', textAlign: 'center',
                  fontFamily: 'var(--font-brand)',
                  transition: 'border-color 0.2s',
                }}
              />
              {errors.code && <p className="fade-in mt-1 text-[12px] text-danger">⚠ {errors.code}</p>}
              <button onClick={handleSendCode} className="mt-2 bg-transparent border-none text-primary text-[13px] cursor-pointer underline p-0">
                Отправить код повторно
              </button>
            </div>
          )}

          {/* Галочка — при регистрации */}
          {isRegistration && codeSent && (
            <>
              <label className="fade-in flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={e => { setAgreed(e.target.checked); setErrors({}) }}
                  className="w-[18px] h-[18px] mt-0.5 accent-primary cursor-pointer shrink-0" />
                <span className="text-[13px] text-muted leading-relaxed">
                  Принимаю условия{' '}
                  <Link href="/privacy" className="text-primary underline">политики конфиденциальности</Link>
                </span>
              </label>
              {errors.agreed && <p className="fade-in -mt-3 text-[12px] text-danger">⚠ {errors.agreed}</p>}
            </>
          )}

          {errors.server && (
            <div className="fade-in px-[14px] py-2.5 bg-red-50 rounded-lg border border-red-300 text-[13px] text-red-600">
              ❌ {errors.server}
            </div>
          )}

          <Button fullWidth onClick={codeSent ? handleVerify : handleSendCode} disabled={submitting}
            className="py-4 text-[16px] font-brand tracking-widest">
            {submitting ? 'ЗАГРУЗКА...' : codeSent ? (isRegistration ? 'ЗАРЕГИСТРИРОВАТЬСЯ' : 'ВОЙТИ') : 'ПОЛУЧИТЬ КОД'}
          </Button>

          {!codeSent && (
            <p className="fade-in text-center text-[13px] text-muted">
              Нет аккаунта?{' '}
              <button onClick={() => router.push('/register')}
                className="text-primary font-semibold bg-transparent border-none cursor-pointer p-0 text-[13px]">
                Зарегистрироваться
              </button>
            </p>
          )}

        </div>
      </div>
      <Footer />
    </div>
  )
}
