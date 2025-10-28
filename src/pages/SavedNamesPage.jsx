import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  doc
} from 'firebase/firestore'

function SavedNamesPage({ onBack, onNavigate }) {
  const { user, signInWithGoogle, signInWithApple, signOut } = useAuth()
  const [savedNames, setSavedNames] = useState([])
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState('list') // 'list' or 'compare'

  useEffect(() => {
    if (user) {
      // Firestore에서 저장된 이름 불러오기
      loadSavedNames()
    } else {
      // 로그아웃 상태면 localStorage 사용
      const saved = JSON.parse(localStorage.getItem('savedNames') || '[]')
      setSavedNames(saved)
    }
  }, [user])

  const loadSavedNames = async () => {
    if (!user) return

    setLoading(true)
    try {
      const q = query(
        collection(db, 'savedNames'),
        where('userId', '==', user.uid)
      )
      const querySnapshot = await getDocs(q)
      const names = []
      querySnapshot.forEach((doc) => {
        names.push({ id: doc.id, ...doc.data() })
      })
      setSavedNames(names)
    } catch (error) {
      console.error('저장된 이름 불러오기 실패:', error)
      // 실패 시 localStorage 사용
      const saved = JSON.parse(localStorage.getItem('savedNames') || '[]')
      setSavedNames(saved)
    } finally {
      setLoading(false)
    }
  }

  const removeName = async (nameData) => {
    if (user && nameData.id) {
      // Firestore에서 삭제
      try {
        await deleteDoc(doc(db, 'savedNames', nameData.id))
        const updated = savedNames.filter(name => name.id !== nameData.id)
        setSavedNames(updated)
      } catch (error) {
        console.error('이름 삭제 실패:', error)
        alert('이름 삭제에 실패했습니다.')
      }
    } else {
      // localStorage에서 삭제
      const updated = savedNames.filter(name => name.name !== nameData.name)
      setSavedNames(updated)
      localStorage.setItem('savedNames', JSON.stringify(updated))
    }
  }

  const handleLogin = async (provider) => {
    setLoading(true)
    const result = provider === 'apple'
      ? await signInWithApple()
      : await signInWithGoogle()
    setLoading(false)

    if (result.success) {
      // 로그인 성공 시 localStorage의 이름을 Firestore로 마이그레이션
      const localNames = JSON.parse(localStorage.getItem('savedNames') || '[]')
      if (localNames.length > 0) {
        await migrateLocalToFirestore(localNames, result.user.uid)
      }
    } else {
      alert('로그인에 실패했습니다: ' + result.error)
    }
  }

  const migrateLocalToFirestore = async (localNames, userId) => {
    try {
      for (const name of localNames) {
        await addDoc(collection(db, 'savedNames'), {
          userId,
          ...name,
          createdAt: new Date()
        })
      }
      // 마이그레이션 완료 후 localStorage 클리어
      localStorage.removeItem('savedNames')
      // 다시 불러오기
      await loadSavedNames()
    } catch (error) {
      console.error('마이그레이션 실패:', error)
    }
  }

  const handleLogout = async () => {
    if (confirm('정말 로그아웃하시겠습니까?')) {
      await signOut()
    }
  }

  const handleNameClick = (nameData) => {
    onNavigate('name-detail', nameData)
  }

  return (
    <div className="min-h-screen bg-cream-200 pb-20">
      <div className="mobile-container safe-top">
        {/* 헤더 */}
        <div className="pt-4 pb-6">
          <button
            onClick={onBack}
            className="touch-target -ml-2 mb-4"
          >
            <svg className="w-6 h-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">
              저장한 이름
            </h1>
            <p className="text-neutral-600">
              마음에 드는 이름들을 모아보세요 💝
            </p>
          </div>
        </div>

        {user && (
          <div className="card mb-6">
            <div className="flex items-center gap-3">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div className="flex-1">
                <p className="font-bold text-neutral-800">{user.displayName}</p>
                <p className="text-sm text-neutral-600">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-neutral-600 hover:text-neutral-800"
              >
                로그아웃
              </button>
            </div>
          </div>
        )}

        {!user && (
          <div className="card mb-6 text-center">
            <div className="mb-4 text-4xl">🔐</div>
            <h3 className="font-bold text-lg text-neutral-800 mb-2">
              로그인이 필요합니다
            </h3>
            <p className="text-sm text-neutral-600 mb-4">
              로그인하면 여러 기기에서 저장한 이름을 볼 수 있어요
            </p>
            <div className="space-y-3">
              <button
                onClick={() => handleLogin('google')}
                disabled={loading}
                className="w-full bg-white border-2 border-neutral-200 rounded-xl px-4 py-3 text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition-colors active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path fill="#4285F4" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"/>
                  <path fill="#34A853" d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"/>
                  <path fill="#FBBC05" d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"/>
                  <path fill="#EA4335" d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"/>
                </svg>
                {loading ? '로그인 중...' : 'Google로 시작하기'}
              </button>
              <button
                onClick={() => handleLogin('apple')}
                disabled={loading}
                className="w-full bg-black rounded-xl px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <path d="M16.365 8.846c-.038-2.545 2.034-3.76 2.126-3.817-1.16-1.718-2.966-1.953-3.607-1.98-1.536-.158-2.998.92-3.777.92-.779 0-1.983-.897-3.26-.873-1.677.025-3.222 1-4.087 2.537-1.741 3.098-.445 7.686 1.251 10.198.828 1.23 1.817 2.612 3.115 2.563 1.275-.05 1.757-.838 3.298-.838 1.541 0 1.975.838 3.26.813 1.347-.025 2.205-1.242 3.033-2.472.958-1.425 1.352-2.805 1.376-2.876-.03-.013-2.64-1.033-2.674-4.097zm-2.447-7.35C14.827.453 15.63-.58 15.63-.58c-.01-.017-1.215.484-2.016 1.22-.802.735-1.51 1.942-1.386 3.098.013.016 1.473.12 2.69-1.242z"/>
                </svg>
                {loading ? '로그인 중...' : 'Apple로 시작하기'}
              </button>
            </div>
          </div>
        )}

        {savedNames.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="font-bold text-lg text-neutral-800 mb-2">
              저장된 이름이 없습니다
            </h3>
            <p className="text-sm text-neutral-600 mb-6">
              마음에 드는 이름을 저장해보세요
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="btn-primary"
            >
              이름 찾기 시작
            </button>
          </div>
        ) : (
          <>
            {/* 보기 모드 전환 */}
            {savedNames.length >= 2 && (
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-neutral-600">
                  {savedNames.length}개의 이름 저장됨
                </p>
                <div className="flex gap-2 bg-neutral-100 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                      viewMode === 'list'
                        ? 'bg-white text-neutral-800 shadow-sm'
                        : 'text-neutral-600'
                    }`}
                  >
                    📋 목록
                  </button>
                  <button
                    onClick={() => setViewMode('compare')}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                      viewMode === 'compare'
                        ? 'bg-white text-neutral-800 shadow-sm'
                        : 'text-neutral-600'
                    }`}
                  >
                    📊 비교
                  </button>
                </div>
              </div>
            )}

            {/* 목록 보기 */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {savedNames.map((nameData, index) => (
                  <div
                    key={index}
                    className="card stagger-item cursor-pointer"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="flex-1"
                        onClick={() => handleNameClick(nameData)}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-neutral-800">
                            {nameData.name}
                          </h3>
                          {nameData.hanja && nameData.hanja !== '-' && (
                            <span className="text-sm text-neutral-500">
                              {nameData.hanja}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-600">
                          {nameData.meaning}
                        </p>
                        {nameData.rank2024 && (
                          <p className="text-xs text-neutral-500 mt-2">
                            2024년 {nameData.rank2024}위
                          </p>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeName(nameData)
                        }}
                        className="touch-target text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 비교 테이블 보기 */}
            {viewMode === 'compare' && (
              <div className="card overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-2 font-semibold text-neutral-700 sticky left-0 bg-white">항목</th>
                      {savedNames.slice(0, 5).map((nameData, idx) => (
                        <th key={idx} className="text-center py-3 px-2 font-semibold text-neutral-800 min-w-[100px]">
                          {nameData.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-2 font-medium text-neutral-600 sticky left-0 bg-white">한자</td>
                      {savedNames.slice(0, 5).map((nameData, idx) => (
                        <td key={idx} className="text-center py-3 px-2 text-neutral-700">
                          {nameData.hanja || '-'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-2 font-medium text-neutral-600 sticky left-0 bg-white">의미</td>
                      {savedNames.slice(0, 5).map((nameData, idx) => (
                        <td key={idx} className="text-center py-3 px-2 text-neutral-700 text-xs">
                          {nameData.meaning ? (nameData.meaning.length > 15 ? nameData.meaning.slice(0, 15) + '...' : nameData.meaning) : '-'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-neutral-100 bg-yellow-50">
                      <td className="py-3 px-2 font-medium text-neutral-600 sticky left-0 bg-yellow-50">2024년 순위</td>
                      {savedNames.slice(0, 5).map((nameData, idx) => (
                        <td key={idx} className="text-center py-3 px-2">
                          {nameData.rank2024 ? (
                            <span className={`font-bold ${
                              nameData.rank2024 <= 10 ? 'text-yellow-600' :
                              nameData.rank2024 <= 50 ? 'text-orange-600' :
                              'text-neutral-700'
                            }`}>
                              {nameData.rank2024}위
                            </span>
                          ) : '-'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-2 font-medium text-neutral-600 sticky left-0 bg-white">인원수</td>
                      {savedNames.slice(0, 5).map((nameData, idx) => (
                        <td key={idx} className="text-center py-3 px-2 text-neutral-700 text-xs">
                          {nameData.count2024 ? `${nameData.count2024.toLocaleString()}명` :
                           nameData.counts && nameData.counts['2024'] ? `${nameData.counts['2024'].toLocaleString()}명` : '-'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-3 px-2 font-medium text-neutral-600 sticky left-0 bg-white">인기도</td>
                      {savedNames.slice(0, 5).map((nameData, idx) => (
                        <td key={idx} className="text-center py-3 px-2 text-neutral-700 text-xs">
                          {nameData.percentage ? `${nameData.percentage}%` : '-'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-medium text-neutral-600 sticky left-0 bg-white">삭제</td>
                      {savedNames.slice(0, 5).map((nameData, idx) => (
                        <td key={idx} className="text-center py-3 px-2">
                          <button
                            onClick={() => removeName(nameData)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
                {savedNames.length > 5 && (
                  <p className="text-xs text-neutral-500 mt-3 text-center">
                    최대 5개까지 비교됩니다 (총 {savedNames.length}개 저장됨)
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default SavedNamesPage
