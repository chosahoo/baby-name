import { createContext, useContext, useState, useEffect } from 'react'
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  OAuthProvider
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 인증 상태 변경 리스너
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)

      // localStorage에도 저장 (다른 컴포넌트에서 사용 가능)
      if (user) {
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        }))
      } else {
        localStorage.removeItem('user')
      }
    })

    return unsubscribe
  }, [])

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      return { success: true, user: result.user }
    } catch (error) {
      console.error('Google 로그인 실패:', error)
      // 인앱 브라우저 감지
      if (error.code === 'auth/web-storage-unsupported' || error.code === 'auth/unauthorized-domain') {
        return {
          success: false,
          error: '⚠️ 카카오톡/인스타그램 등 인앱 브라우저에서는 로그인이 제한됩니다.\n\n📱 해결 방법:\n우측 상단 메뉴(⋯ 또는 ···)를 눌러\n"외부 브라우저에서 열기" 또는 "Safari/Chrome으로 열기"를 선택해주세요.'
        }
      }
      return { success: false, error: error.message }
    }
  }

  const signInWithApple = async () => {
    try {
      const provider = new OAuthProvider('apple.com')
      const result = await signInWithPopup(auth, provider)
      return { success: true, user: result.user }
    } catch (error) {
      console.error('Apple 로그인 실패:', error)
      // 인앱 브라우저 감지
      if (error.code === 'auth/web-storage-unsupported' || error.code === 'auth/unauthorized-domain') {
        return {
          success: false,
          error: '⚠️ 카카오톡/인스타그램 등 인앱 브라우저에서는 로그인이 제한됩니다.\n\n📱 해결 방법:\n우측 상단 메뉴(⋯ 또는 ···)를 눌러\n"외부 브라우저에서 열기" 또는 "Safari/Chrome으로 열기"를 선택해주세요.'
        }
      }
      return { success: false, error: error.message }
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      return { success: true }
    } catch (error) {
      console.error('로그아웃 실패:', error)
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithApple,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
