'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const AUTH_KEY = 'pioneer_user'
const TOKEN_KEY = 'pioneer_token'

export function useAuth() {
  const router = useRouter()
  const [userData, setUserData] = useState([])

  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    const expiresStr = "expires=" + expires.toUTCString();
    document.cookie = `${name}=${value}; ${expiresStr}; path=/`;
  }

  const getUserData = async () => {
    //setAccessToken(localStorage.getItem("pioneer_token"))
    let access_token
    access_token = localStorage.getItem("pioneer_token")
    //setLoadingStatus(false)
    const response = await fetch('http://localhost:8000/api/users/me/', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${access_token}`,
      }
    })
    if(response.ok){
      const data = await response.json()
      console.log("data", data)
      setUserData(data)
      //setStatusAuth(true)
      //setLoadingStatus(false)
    }else if(response.status == 401){
      refreshAccessToken()
    }
  }

  const refreshAccessToken = async () => {
    //setRefreshToken(localStorage.getItem("pioneer_refresh_token"))
    let refresh_token
    refresh_token = localStorage.getItem("pioneer_refresh_token")
    if(refresh_token !== null){
      setCookie('pioneer_refresh_token', refresh_token, 7);
      const response = await fetch('http://localhost:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          "refresh": refresh_token
        })
      })
      if(response.ok){
        const token = await response.json()
        console.log("NEW",token.access)
        localStorage.setItem("pioneer_token", token.access)
        setCookie('pioneer_token', token.access, 7);
      }else if(!response.ok){
        router.push('/login')
        localStorage.removeItem("pioneer_token")
        localStorage.removeItem("pioneer_refresh_token")
      }
    }else{
      router.push('/login')
      localStorage.removeItem("pioneer_token")
      localStorage.removeItem("pioneer_refresh_token")
    }
    
  }

  useEffect(() => {
    getUserData()
  }, [])

  return { userData }
}
