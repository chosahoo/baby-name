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
import { nameStatistics } from './data/namesData'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [quizAnswers, setQuizAnswers] = useState({})
  const [selectedNames, setSelectedNames] = useState([])
  const [selectedNameDetail, setSelectedNameDetail] = useState(null)

  // URL 파라미터에서 이름을 읽어서 상세 페이지로 이동
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sharedName = params.get('name')

    if (sharedName) {
      // 모든 이름 데이터에서 검색
      const allNames = [...nameStatistics.girl, ...nameStatistics.boy]
      const foundName = allNames.find(n => n.name === sharedName)

      if (foundName) {
        setSelectedNameDetail(foundName)
        setCurrentPage('name-detail')
        // URL에서 파라미터 제거 (히스토리 오염 방지)
        window.history.replaceState({}, '', window.location.pathname)
      }
    }
  }, [])

  const startQuiz = () => {
    setCurrentPage('quiz')
    setQuizAnswers({})
  }

  const completeQuiz = (answers) => {
    setQuizAnswers(answers)

    // Quiz 답변을 기반으로 이름 추천
    const recommendedNames = getRecommendedNames(answers)
    setSelectedNames(recommendedNames)
    setCurrentPage('result')
  }

  // Quiz 답변 기반 이름 추천 로직
  const getRecommendedNames = (answers) => {
    // 성별에 따라 데이터 선택
    const gender = answers.gender === 'girl' || answers.gender === 'both' ? 'girl' :
                   answers.gender === 'boy' ? 'boy' : 'girl'

    let candidates = [...nameStatistics[gender]]

    // 1. 글자 수 필터링
    if (answers.syllables === 'two') {
      candidates = candidates.filter(name => name.name.length === 2)
    } else if (answers.syllables === 'three') {
      candidates = candidates.filter(name => name.name.length === 3)
    }

    // 2. 인기도 필터링
    if (answers.popularity === 'popular') {
      candidates = candidates.filter(name => name.ranks[2024] && name.ranks[2024] <= 3)
    } else if (answers.popularity === 'moderate') {
      candidates = candidates.filter(name => name.ranks[2024] && name.ranks[2024] <= 10)
    } else if (answers.popularity === 'rare') {
      candidates = candidates.filter(name => !name.ranks[2024] || name.ranks[2024] > 10)
    }

    // 3. 발음 선호도 매칭 (간단한 규칙)
    if (answers.sound === 'soft') {
      // 부드러운 발음: ㅇ, ㄴ, ㅁ 등이 들어간 이름 우선
      candidates = candidates.map(name => ({
        ...name,
        score: (name.name.match(/[아은윤연유]/g) || []).length
      })).sort((a, b) => b.score - a.score)
    } else if (answers.sound === 'strong') {
      // 또렷한 발음: ㅈ, ㅊ, ㅎ 등이 들어간 이름 우선
      candidates = candidates.map(name => ({
        ...name,
        score: (name.name.match(/[준진현호]/g) || []).length
      })).sort((a, b) => b.score - a.score)
    }

    // 4. 스타일 매칭
    const styleKeywords = {
      modern: ['서', '하', '지', '아'],
      traditional: ['은', '정', '민', '수'],
      unique: ['린', '유', '시', '도'],
      simple: ['아', '윤', '준', '우']
    }

    if (answers.style && styleKeywords[answers.style]) {
      const keywords = styleKeywords[answers.style]
      candidates = candidates.map(name => ({
        ...name,
        styleScore: keywords.some(keyword => name.name.includes(keyword)) ? 10 : 0
      })).sort((a, b) => (b.styleScore || 0) - (a.styleScore || 0))
    }

    // 상위 5개 선택 (부족하면 전체 목록에서 채우기)
    let topNames = candidates.slice(0, 5)

    // 5개 미만이면 전체 목록에서 추가
    if (topNames.length < 5) {
      const remaining = nameStatistics[gender]
        .filter(name => !topNames.find(t => t.name === name.name))
        .slice(0, 5 - topNames.length)
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
      {currentPage === 'home' && <HomePage onStartQuiz={startQuiz} onNavigate={navigateTo} />}
      {currentPage === 'quiz' && <QuizPage onComplete={completeQuiz} onBack={goHome} />}
      {currentPage === 'result' && <ResultPage names={selectedNames} onBack={goHome} onNavigate={navigateTo} />}
      {currentPage === 'family-harmony' && <FamilyHarmonyPage onBack={goHome} />}
      {currentPage === 'sibling-name' && <SiblingNamePage onBack={goHome} />}
      {currentPage === 'name-checklist' && <NameChecklistPage onBack={goHome} />}
      {currentPage === 'foreign-name' && <ForeignNamePage onBack={goHome} />}
      {currentPage === 'compare-names' && <CompareNamesPage onBack={goHome} />}
      {currentPage === 'statistics' && <StatisticsPage onBack={goHome} />}
      {currentPage === 'name-detail' && <NameDetailPage onBack={goHome} initialNameData={selectedNameDetail} />}
      {currentPage === 'hanja-recommend' && <HanjaRecommendPage onBack={goHome} />}
    </div>
  )
}

export default App
