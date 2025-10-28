import { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import ResultPage from './pages/ResultPage'
import FamilyHarmonyPage from './pages/FamilyHarmonyPage'
import SiblingNamePage from './pages/SiblingNamePage'
import NameChecklistPage from './pages/NameChecklistPage'
import ForeignNamePage from './pages/ForeignNamePage'
import CompareNamesPage from './pages/CompareNamesPage'
import StatisticsPage from './pages/StatisticsPage'
import NameDetailPage from './pages/NameDetailPage'
import HanjaRecommendPage from './pages/HanjaRecommendPage'
import DreamNamePage from './pages/DreamNamePage'
import TrendAnalysisPage from './pages/TrendAnalysisPage'
import SurnameTrendPage from './pages/SurnameTrendPage'
import FamilyNamePage from './pages/FamilyNamePage'
import { nameStatistics } from './data/namesData'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [pageHistory, setPageHistory] = useState([])
  const [quizMode, setQuizMode] = useState('simple') // 'simple' or 'detailed'
  const [quizAnswers, setQuizAnswers] = useState({})
  const [selectedNames, setSelectedNames] = useState([])
  const [selectedNameDetail, setSelectedNameDetail] = useState(null)
  const [isLoadingResults, setIsLoadingResults] = useState(false)
  const [showInAppBrowserWarning, setShowInAppBrowserWarning] = useState(false)

  // 인스타그램/페이스북 인앱 브라우저 감지
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera
    const isInAppBrowser = /Instagram|FBAN|FBAV/i.test(ua)

    if (isInAppBrowser) {
      setShowInAppBrowserWarning(true)
    }
  }, [])

  // URL에서 이름을 읽어서 상세 페이지로 이동 (query & hash 둘 다 지원)
  useEffect(() => {
    const checkForSharedName = () => {
      let sharedName = null

      // 1. Hash에서 시도 (예: #name=진언)
      const hash = window.location.hash
      console.log('Checking URL - hash:', hash, 'search:', window.location.search, 'href:', window.location.href)

      if (hash && hash.includes('name=')) {
        const match = hash.match(/name=([^&]+)/)
        if (match) {
          sharedName = decodeURIComponent(match[1])
          console.log('Found name from hash:', sharedName)
        }
      }

      // 2. Query parameter에서 시도 (예: ?name=진언)
      if (!sharedName) {
        const params = new URLSearchParams(window.location.search)
        sharedName = params.get('name')
        if (sharedName) {
          console.log('Found name from query:', sharedName)
        }
      }

      // 3. 전체 URL에서 직접 파싱 시도
      if (!sharedName) {
        const url = window.location.href
        const nameMatch = url.match(/[?#&]name=([^&]+)/)
        if (nameMatch) {
          sharedName = decodeURIComponent(nameMatch[1])
          console.log('Found name from direct parsing:', sharedName)
        }
      }

      if (sharedName) {
        // 모든 이름 데이터에서 검색
        const allNames = [...nameStatistics.girl, ...nameStatistics.boy]
        const foundName = allNames.find(n => n.name === sharedName)

        console.log('Search result:', foundName ? 'Found!' : 'Not found', sharedName)

        if (foundName) {
          setSelectedNameDetail(foundName)
          setCurrentPage('name-detail')
          // URL 정리
          window.history.replaceState({}, '', window.location.pathname)
        } else {
          console.error('Name not found in database:', sharedName)
        }
      } else {
        console.log('No shared name found in URL')
      }
    }

    // 초기 실행
    checkForSharedName()

    // Hash 변경 감지
    window.addEventListener('hashchange', checkForSharedName)

    return () => {
      window.removeEventListener('hashchange', checkForSharedName)
    }
  }, [])

  const startQuiz = (mode = 'simple') => {
    setQuizMode(mode)
    setCurrentPage('quiz')
    setQuizAnswers({})
  }

  const completeQuiz = (answers) => {
    console.log('Quiz completed with answers:', answers)
    setQuizAnswers(answers)
    setIsLoadingResults(true)

    // 로딩 애니메이션을 보여주기 위한 약간의 지연
    setTimeout(() => {
      // Quiz 답변을 기반으로 이름 추천
      const recommendedNames = getRecommendedNames(answers)
      console.log('Recommended names:', recommendedNames)
      setSelectedNames(recommendedNames)
      setIsLoadingResults(false)
      setCurrentPage('result')
    }, 1500)
  }

  // Quiz 답변 기반 이름 추천 로직 - 누적 점수 시스템
  const getRecommendedNames = (answers) => {
    // 성별에 따라 데이터 선택
    const gender = answers.gender === 'girl' || answers.gender === 'both' ? 'girl' :
                   answers.gender === 'boy' ? 'boy' : 'girl'

    // 누적 점수 시스템 초기화
    let candidates = [...nameStatistics[gender]].map(name => ({
      ...name,
      totalScore: 0
    }))

    // 필수 하드 필터: 한자 선호도
    if (answers.hanja === 'pure') {
      candidates = candidates.filter(name => name.hanja === '-')
    } else if (answers.hanja === 'required') {
      candidates = candidates.filter(name => name.hanja && name.hanja !== '-')
    }

    // 1. 인기도 점수 (0-30점)
    if (answers.popularity && answers.popularity !== 'any') {
      candidates = candidates.map(name => {
        const rank = name.ranks[2024]
        let score = 0

        if (answers.popularity === 'popular') {
          if (rank && rank <= 10) score = 30
          else if (rank && rank <= 20) score = 15
        } else if (answers.popularity === 'moderate') {
          if (rank && rank > 10 && rank <= 50) score = 30
          else if (rank && rank > 5 && rank <= 70) score = 15
        } else if (answers.popularity === 'rare') {
          if (!rank || rank > 50) score = 30
          else if (rank > 30) score = 15
        }

        return { ...name, totalScore: name.totalScore + score }
      })
    }

    // 2. 스타일 점수 (0-25점)
    if (answers.style && answers.style !== 'any') {
      const styleKeywords = {
        modern: ['서', '하', '지', '아', '민'],
        traditional: ['은', '정', '민', '수', '영'],
        unique: ['린', '유', '시', '도', '나'],
        simple: ['아', '윤', '준', '우', '이']
      }

      const keywords = styleKeywords[answers.style] || []
      candidates = candidates.map(name => {
        const matchCount = keywords.filter(k => name.name.includes(k)).length
        return { ...name, totalScore: name.totalScore + (matchCount * 8) }
      })
    }

    // 3. 리듬감 점수 (0-20점)
    if (answers.rhythm && answers.rhythm !== 'any') {
      const rhythmPatterns = {
        cheerful: ['아', '야', '유', '요', '이', '우'],
        calm: ['은', '안', '온', '윤', '인', '연'],
        balanced: ['서', '하', '지', '민', '수', '현']
      }

      const patterns = rhythmPatterns[answers.rhythm] || []
      candidates = candidates.map(name => {
        const matchCount = patterns.filter(p => name.name.includes(p)).length
        return { ...name, totalScore: name.totalScore + (matchCount * 7) }
      })
    }

    // 4. 발음 선호도 점수 (0-20점)
    if (answers.sound && answers.sound !== 'any') {
      const soundPatterns = {
        soft: ['아', '은', '윤', '연', '유', '나', '라', '안'],
        strong: ['준', '진', '현', '호', '건', '찬', '한', '석'],
        balanced: ['서', '지', '민', '하', '수', '영', '우', '인']
      }

      const patterns = soundPatterns[answers.sound] || []
      candidates = candidates.map(name => {
        const matchCount = patterns.filter(p => name.name.includes(p)).length
        return { ...name, totalScore: name.totalScore + (matchCount * 7) }
      })
    }

    // 5. 의미 점수 (0-20점)
    if (answers.meaning && answers.meaning !== 'any') {
      const meaningKeywords = {
        wise: ['智', '賢', '睿', '敏', '慧', '哲', '學'],
        kind: ['恩', '善', '仁', '柔', '溫', '愛', '慈'],
        strong: ['强', '健', '剛', '勇', '力', '武', '堅'],
        bright: ['喜', '樂', '歡', '明', '陽', '晴', '煥']
      }

      const keywords = meaningKeywords[answers.meaning] || []
      candidates = candidates.map(name => {
        if (name.hanja && name.hanja !== '-') {
          const hasMatch = keywords.some(k => name.hanja.includes(k))
          return { ...name, totalScore: name.totalScore + (hasMatch ? 20 : 0) }
        }
        return name
      })
    }

    // 6. 느낌 점수 (0-15점)
    if (answers.feeling && answers.feeling !== 'any') {
      const feelingKeywords = {
        elegant: ['雅', '媛', '瑞', '英', '賢', '淑', '麗'],
        fresh: ['夏', '春', '新', '淸', '爽', '晨', '露'],
        calm: ['安', '靜', '穩', '泰', '和', '恬', '寧'],
        bright: ['明', '陽', '光', '晴', '燦', '煥', '輝']
      }

      const keywords = feelingKeywords[answers.feeling] || []
      candidates = candidates.map(name => {
        if (name.hanja && name.hanja !== '-') {
          const hasMatch = keywords.some(k => name.hanja.includes(k))
          return { ...name, totalScore: name.totalScore + (hasMatch ? 15 : 0) }
        }
        return name
      })
    }

    // 7. 첫소리 점수 (0-25점)
    if (answers.firstSound && answers.firstSound !== 'any') {
      const initialConsonants = {
        'ㄱ': ['가', '고', '구', '기', '거', '게', '규', '경', '건', '겸'],
        'ㄴ': ['나', '노', '누', '니', '너', '네', '나', '남'],
        'ㄷ': ['다', '도', '두', '디', '더', '데', '동', '단'],
        'ㄹ': ['라', '로', '루', '리', '러', '레', '란', '림'],
        'ㅁ': ['마', '모', '무', '미', '머', '메', '민', '명'],
        'ㅂ': ['바', '보', '부', '비', '버', '베', '범', '빈'],
        'ㅅ': ['사', '소', '수', '시', '서', '세', '승', '선'],
        'ㅇ': ['아', '오', '우', '이', '어', '에', '은', '영', '연', '윤'],
        'ㅈ': ['자', '조', '주', '지', '저', '제', '준', '진', '정'],
        'ㅎ': ['하', '호', '후', '히', '허', '혜', '현', '한']
      }

      const initials = initialConsonants[answers.firstSound] || []
      candidates = candidates.map(name => {
        const hasMatch = initials.some(init => name.name.startsWith(init))
        return { ...name, totalScore: name.totalScore + (hasMatch ? 25 : 0) }
      })
    }

    // 8. 끝소리 점수 (0-15점)
    if (answers.lastSound && answers.lastSound !== 'any') {
      candidates = candidates.map(name => {
        const lastName = name.name[name.name.length - 1]
        let score = 0

        if (answers.lastSound === 'none') {
          // 받침없는 글자: 아, 오, 우, 이, 에, 애, 여, 요, 유, 예, 야, 와, 워, 위, 의, 외
          if (['아', '오', '우', '이', '에', '애', '여', '요', '유', '예', '야', '와', '워', '위', '의', '외'].includes(lastName)) {
            score = 15
          }
        } else if (answers.lastSound === 'ㄴ') {
          // ㄴ받침: 안, 은, 인, 연, 윤, 현, 선, 진, 민, 준, 건, 헌
          if (['안', '은', '인', '연', '윤', '현', '선', '진', '민', '준', '건', '헌', '경', '영'].includes(lastName)) {
            score = 15
          }
        } else if (answers.lastSound === 'ㅇ') {
          // ㅇ받침: 강, 명, 영, 정, 성, 경, 형, 승, 웅
          if (['강', '명', '영', '정', '성', '경', '형', '승', '웅', '창', '광'].includes(lastName)) {
            score = 15
          }
        }

        return { ...name, totalScore: name.totalScore + score }
      })
    }

    // 9. 계절 느낌 점수 (0-12점)
    if (answers.season && answers.season !== 'any') {
      const seasonKeywords = {
        spring: ['春', '花', '芽', '綠', '新', '柔', '봄', '하', '나', '꽃'],
        summer: ['夏', '陽', '海', '明', '燦', '여름', '해', '빛', '찬'],
        autumn: ['秋', '月', '淸', '靜', '가을', '달', '은', '서'],
        winter: ['冬', '雪', '白', '淨', '겨울', '눈', '설', '하얀']
      }

      const keywords = seasonKeywords[answers.season] || []
      candidates = candidates.map(name => {
        const nameMatch = keywords.filter(k => k.length === 1 && name.name.includes(k)).length
        const hanjaMatch = name.hanja && name.hanja !== '-' &&
                          keywords.some(k => k.length > 1 && name.hanja.includes(k))
        return { ...name, totalScore: name.totalScore + (nameMatch * 6) + (hanjaMatch ? 12 : 0) }
      })
    }

    // 10. 자연 연상 점수 (0-12점)
    if (answers.nature && answers.nature !== 'any') {
      const natureKeywords = {
        sky: ['天', '空', '雲', '星', '하늘', '구름', '별', '하', '하늘'],
        sea: ['海', '水', '波', '洋', '바다', '물', '파도', '해', '수'],
        mountain: ['山', '岳', '峰', '石', '산', '봉', '석', '산'],
        flower: ['花', '蘭', '梅', '菊', '꽃', '란', '매', '국', '화']
      }

      const keywords = natureKeywords[answers.nature] || []
      candidates = candidates.map(name => {
        const nameMatch = keywords.filter(k => k.length === 1 && name.name.includes(k)).length
        const hanjaMatch = name.hanja && name.hanja !== '-' &&
                          keywords.some(k => k.length > 1 && name.hanja.includes(k))
        return { ...name, totalScore: name.totalScore + (nameMatch * 6) + (hanjaMatch ? 12 : 0) }
      })
    }

    // 11. 색감 점수 (0-10점)
    if (answers.color && answers.color !== 'any') {
      const colorKeywords = {
        bright: ['白', '明', '淸', '晴', '光', '하얀', '밝은', '빛'],
        dark: ['黑', '暗', '玄', '深', '검은', '어두운', '깊은'],
        neutral: ['灰', '素', '淡', '和', '회색', '베이지', '중간']
      }

      const keywords = colorKeywords[answers.color] || []
      candidates = candidates.map(name => {
        const hanjaMatch = name.hanja && name.hanja !== '-' &&
                          keywords.some(k => k.length > 1 && name.hanja.includes(k))
        return { ...name, totalScore: name.totalScore + (hanjaMatch ? 10 : 0) }
      })
    }

    // 12. 발음 우선도 점수 (0-15점)
    if (answers.pronunciation && answers.pronunciation !== 'any') {
      candidates = candidates.map(name => {
        let score = 0

        if (answers.pronunciation === 'easy') {
          // 2글자 이름이거나 흔한 패턴
          if (name.name.length === 2) score = 15
          else if (['아', '우', '이', '서', '하', '지'].some(p => name.name.includes(p))) score = 8
        } else if (answers.pronunciation === 'unique') {
          // 3글자 이상이거나 특별한 조합
          if (name.name.length >= 3) score = 15
          else if (['린', '시', '도', '나'].some(p => name.name.includes(p))) score = 8
        } else if (answers.pronunciation === 'standard') {
          // 받침 있는 정확한 발음
          const lastName = name.name[name.name.length - 1]
          if (['은', '안', '인', '영', '정', '민'].includes(lastName)) score = 15
        }

        return { ...name, totalScore: name.totalScore + score }
      })
    }

    // 13. 이미지 타입 점수 (0-18점)
    if (answers.imageType && answers.imageType !== 'any') {
      const imageKeywords = {
        cute: ['아', '유', '나', '이', '요', '愛', '可', '童'],
        cool: ['준', '한', '진', '혁', '剛', '强', '武', '冷'],
        gentle: ['은', '서', '연', '온', '柔', '溫', '恬', '淑'],
        energetic: ['찬', '빛', '하', '활', '活', '明', '煥', '陽']
      }

      const keywords = imageKeywords[answers.imageType] || []
      candidates = candidates.map(name => {
        const nameMatch = keywords.filter(k => k.length === 1 && name.name.includes(k)).length
        const hanjaMatch = name.hanja && name.hanja !== '-' &&
                          keywords.some(k => k.length > 1 && name.hanja.includes(k))
        return { ...name, totalScore: name.totalScore + (nameMatch * 9) + (hanjaMatch ? 18 : 0) }
      })
    }

    // 14. 한자 선호도 보너스 점수 (0-10점)
    if (answers.hanja === 'preferred') {
      candidates = candidates.map(name => {
        const hasHanja = name.hanja && name.hanja !== '-'
        return { ...name, totalScore: name.totalScore + (hasHanja ? 10 : 0) }
      })
    }

    // 점수 순으로 정렬
    candidates.sort((a, b) => b.totalScore - a.totalScore)

    // 상위 5개 선택
    let topNames = candidates.slice(0, 5)

    // 5개 미만이면 추가 선택 (점수 무시하고 데이터에서 랜덤)
    if (topNames.length < 5) {
      const remaining = candidates.slice(5, 5 + (5 - topNames.length))
      topNames = [...topNames, ...remaining]
    }

    // ResultPage에 맞는 형식으로 변환
    return topNames.map(name => ({
      name: name.name,
      hanja: name.hanja,
      meaning: name.meaning,
      rank2024: name.ranks[2024] || null,
      popularity: name.percentage ||
                  (name.ranks[2024] && name.ranks[2024] <= 3 ? 95 :
                   name.ranks[2024] && name.ranks[2024] <= 5 ? 90 :
                   name.ranks[2024] && name.ranks[2024] <= 10 ? 85 : 75)
    }))
  }

  const goHome = () => {
    setCurrentPage('home')
  }

  const navigateTo = (page, data = null) => {
    if (page === 'name-detail' && data) {
      setSelectedNameDetail(data)
    }
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen">
      {isLoadingResults && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'linear-gradient(to bottom right, #FEF5EF, #FAF3E8, #F5E6D3)' }}>
          <div className="text-center px-8">
            {/* 애니메이션 아이콘 */}
            <div className="mb-8 relative">
              <div className="w-24 h-24 mx-auto relative">
                {/* 회전하는 원들 */}
                <div className="absolute inset-0 border-4 rounded-full animate-spin" style={{ borderColor: '#FDEADF', borderTopColor: '#E8A87C' }} />
                <div className="absolute inset-2 border-4 rounded-full" style={{ borderColor: '#F9C09F', borderTopColor: '#D4956B', animation: 'spin 3s linear infinite reverse' }} />

                {/* 중앙 아이콘 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl animate-bounce">🍼</span>
                </div>
              </div>
            </div>

            {/* 로딩 텍스트 */}
            <h2 className="text-2xl font-bold text-neutral-800 mb-3 animate-pulse">
              완벽한 이름을 찾고 있어요
            </h2>
            <p className="text-neutral-600 mb-8">
              잠시만 기다려주세요...
            </p>
          </div>
        </div>
      )}

      {/* 인스타그램/페이스북 인앱 브라우저 경고 */}
      {showInAppBrowserWarning && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 shadow-lg">
          <div className="max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <div className="text-2xl">⚠️</div>
              <div className="flex-1">
                <p className="font-bold mb-1">인스타그램 브라우저에서는 일부 기능이 제한돼요</p>
                <p className="text-sm mb-2">Safari나 Chrome에서 열어주세요</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowInAppBrowserWarning(false)}
                    className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded transition-all"
                  >
                    닫기
                  </button>
                  <button
                    onClick={() => {
                      // URL을 클립보드에 복사
                      navigator.clipboard?.writeText(window.location.href)
                      alert('링크가 복사되었어요! Safari나 Chrome에 붙여넣기 해주세요')
                    }}
                    className="text-xs bg-white text-orange-600 font-medium px-3 py-1 rounded hover:bg-opacity-90 transition-all"
                  >
                    링크 복사
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'home' && <HomePage onStartQuiz={startQuiz} onNavigate={navigateTo} />}
      {currentPage === 'quiz' && <QuizPage mode={quizMode} onComplete={completeQuiz} onBack={goHome} />}
      {currentPage === 'result' && <ResultPage names={selectedNames} onBack={goHome} onNavigate={navigateTo} />}
      {currentPage === 'family-harmony' && <FamilyHarmonyPage onBack={goHome} />}
      {currentPage === 'sibling-name' && <SiblingNamePage onBack={goHome} />}
      {currentPage === 'name-checklist' && <NameChecklistPage onBack={goHome} />}
      {currentPage === 'foreign-name' && <ForeignNamePage onBack={goHome} />}
      {currentPage === 'compare-names' && <CompareNamesPage onBack={goHome} />}
      {currentPage === 'statistics' && <StatisticsPage onBack={goHome} />}
      {currentPage === 'trend-analysis' && <TrendAnalysisPage onBack={goHome} onNavigate={navigateTo} />}
      {currentPage === 'surname-trend' && <SurnameTrendPage onBack={goHome} onNavigate={navigateTo} />}
      {currentPage === 'family-name' && <FamilyNamePage onBack={goHome} onNavigate={navigateTo} />}
      {currentPage === 'name-detail' && <NameDetailPage onBack={goHome} initialNameData={selectedNameDetail} onNavigate={navigateTo} />}
      {currentPage === 'hanja-recommend' && <HanjaRecommendPage onBack={goHome} />}
      {currentPage === 'dream-name' && <DreamNamePage onBack={goHome} />}
    </div>
  )
}

export default App
