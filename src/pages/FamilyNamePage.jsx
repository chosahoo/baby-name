import { useState, useMemo } from 'react'
import { nameStatistics } from '../data/namesData'

function FamilyNamePage({ onBack, onNavigate }) {
  const [fatherName, setFatherName] = useState('')
  const [motherName, setMotherName] = useState('')
  const [selectedGender, setSelectedGender] = useState('girl')
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // 주요 성씨 (획수 포함)
  const majorSurnames = [
    { surname: '김', strokes: 8 },
    { surname: '이', strokes: 7 },
    { surname: '박', strokes: 5 },
    { surname: '최', strokes: 11 }
  ]

  // 성씨 획수에 따른 조화도 계산
  const calculateStrokeHarmony = (surnameStrokes, name) => {
    const nameLength = name.length
    const estimatedNameStrokes = nameLength === 2 ? 16 : 24
    const total = surnameStrokes + estimatedNameStrokes
    const goodStrokes = [11, 13, 15, 16, 17, 18, 21, 23, 24, 25, 29, 31, 32, 33, 35, 37, 39, 41, 45, 47, 48]

    if (goodStrokes.includes(total)) return 5
    if (total % 2 === 0 && total <= 50) return 3
    return 1
  }

  // 이름에서 각 글자 추출
  const extractCharacters = (name) => {
    if (!name) return []
    return name.split('').filter(char => char.trim())
  }

  // 형제자매 로직: 전체 DB에서 부모 이름 관련성으로 추천
  const recommendedNames = useMemo(() => {
    if (!fatherName || !motherName) return []

    const fatherChars = extractCharacters(fatherName)
    const motherChars = extractCharacters(motherName)
    const parentChars = [...fatherChars, ...motherChars]
    const namesDB = nameStatistics[selectedGender]

    // 전체 DB 이름에 대해 부모 이름과의 관련성 점수 계산
    const scoredCandidates = namesDB.map(candidate => {
      let score = 0 // 기본 점수 (글자 공유가 핵심)
      let fromParent = []
      let category = 'all'

      // 1. 부모 이름과 같은 음절 공유 (가장 중요!)
      for (const parentChar of parentChars) {
        if (candidate.name.includes(parentChar)) {
          fromParent.push(parentChar)
          score += 100 // 음절 공유마다 100점! (부모 이름과의 연관성 최우선)
        }
      }

      // 2. 카테고리 분류
      if (fromParent.length > 0) {
        const hasF = fatherChars.some(c => candidate.name.includes(c))
        const hasM = motherChars.some(c => candidate.name.includes(c))

        if (hasF && hasM) category = 'balanced'
        else if (hasF) category = 'father'
        else if (hasM) category = 'mother'
      }

      // 3. 2024년 인기도 (참고용으로만 활용)
      if (candidate.ranks['2024']) {
        if (candidate.ranks['2024'] <= 10) score += 5
        else if (candidate.ranks['2024'] <= 30) score += 3
        else if (candidate.ranks['2024'] <= 50) score += 2
        else if (candidate.ranks['2024'] <= 100) score += 1
      }

      // 4. 발음 조화
      const softSounds = ['아', '은', '윤', '연', '유', '나']
      const hasSoft = softSounds.some(s => candidate.name.includes(s))
      if (hasSoft) score += 3

      // 성씨별 조화도 계산
      const surnameHarmony = majorSurnames.map(s => ({
        surname: s.surname,
        harmony: calculateStrokeHarmony(s.strokes, candidate.name)
      }))

      return {
        name: candidate.name,
        hanja: candidate.hanja,
        meaning: candidate.meaning,
        ranks: candidate.ranks,
        score,
        fromParent,
        category,
        rank2024: candidate.ranks['2024'],
        surnameHarmony
      }
    })

    // 점수순 정렬 후 상위 20개
    return scoredCandidates
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
  }, [fatherName, motherName, selectedGender])

  const handleGenerate = () => {
    if (fatherName.trim() && motherName.trim()) {
      setIsLoading(true)
      setShowResults(false)

      // 2초 후에 결과 표시 (고민하는 애니메이션 효과)
      setTimeout(() => {
        setIsLoading(false)
        setShowResults(true)
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-cream-200">
      <div className="mobile-container safe-top pb-20">
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

          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">
              가족 이름 조합 💝
            </h1>
            <p className="text-neutral-600 text-sm">
              부모님 이름으로 특별한 이름 만들기
            </p>
          </div>

          {/* 안내 */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="text-xs font-semibold text-purple-800 mb-1">이런 분들께 추천해요</p>
                <p className="text-xs text-purple-700">
                  부모님 이름에서 한 글자씩 따서 의미있는 이름을 만들고 싶으신 분들께 완벽해요!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 입력 폼 */}
        <div className="card mb-4">
          <h2 className="font-bold text-neutral-800 mb-4">부모님 이름 입력</h2>

          {/* 아빠 이름 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              👨 아빠 이름 (한글 2-3자)
            </label>
            <input
              type="text"
              value={fatherName}
              onChange={(e) => {
                const value = e.target.value
                const filtered = value.replace(/[^\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]/g, '')
                setFatherName(filtered.slice(0, 3))
              }}
              placeholder="예: 민호"
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg"
              autoComplete="off"
            />
          </div>

          {/* 엄마 이름 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              👩 엄마 이름 (한글 2-3자)
            </label>
            <input
              type="text"
              value={motherName}
              onChange={(e) => {
                const value = e.target.value
                const filtered = value.replace(/[^\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]/g, '')
                setMotherName(filtered.slice(0, 3))
              }}
              placeholder="예: 지은"
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg"
              autoComplete="off"
            />
          </div>

          {/* 성별 선택 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              아기 성별
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedGender('girl')}
                className={`flex-1 py-2.5 rounded-xl font-medium transition-all active:scale-95 ${
                  selectedGender === 'girl'
                    ? 'bg-[#E8A87C] text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700'
                }`}
              >
                👧 여아
              </button>
              <button
                onClick={() => setSelectedGender('boy')}
                className={`flex-1 py-2.5 rounded-xl font-medium transition-all active:scale-95 ${
                  selectedGender === 'boy'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700'
                }`}
              >
                👦 남아
              </button>
            </div>
          </div>

          {/* 생성 버튼 */}
          <button
            onClick={handleGenerate}
            disabled={!fatherName.trim() || !motherName.trim()}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              fatherName.trim() && motherName.trim()
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg active:scale-95'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            ✨ 이름 추천 받기
          </button>
        </div>

        {/* 로딩 애니메이션 */}
        {isLoading && (
          <div className="card bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 text-center py-12">
            <div className="mb-6">
              <div className="inline-block animate-bounce">
                <div className="text-6xl mb-4">🤔</div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-lg font-bold text-neutral-800 animate-pulse">
                고민 중...
              </p>
              <p className="text-sm text-neutral-600">
                {fatherName}님과 {motherName}님의 사랑이 담긴<br/>
                특별한 이름을 찾고 있어요
              </p>
            </div>

            {/* 점 애니메이션 */}
            <div className="flex justify-center gap-2 mt-6">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}

        {/* 결과 */}
        {showResults && recommendedNames.length > 0 && (
          <>
            {/* 가족 트리 시각화 */}
            <div className="card bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 mb-4">
              <h2 className="font-bold text-neutral-800 mb-4 text-center">가족의 연결</h2>

              <div className="flex items-center justify-center gap-4 mb-6">
                {/* 아빠 */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl mb-2 shadow-md">
                    👨
                  </div>
                  <p className="text-xs font-medium text-neutral-600">아빠</p>
                  <p className="text-sm font-bold text-neutral-800">{fatherName}</p>
                </div>

                {/* 하트 */}
                <div className="text-3xl mb-8">
                  💕
                </div>

                {/* 엄마 */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-2xl mb-2 shadow-md">
                    👩
                  </div>
                  <p className="text-xs font-medium text-neutral-600">엄마</p>
                  <p className="text-sm font-bold text-neutral-800">{motherName}</p>
                </div>
              </div>

              {/* 화살표 */}
              <div className="flex justify-center mb-4">
                <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* 아기 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center text-3xl mb-2 shadow-lg mx-auto">
                  👶
                </div>
                <p className="text-sm font-medium text-neutral-600">부모의 사랑이 담긴</p>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  우리 아기
                </p>
              </div>
            </div>

            {/* 추천 이름 목록 */}
            <div className="mb-4">
              <h2 className="font-bold text-neutral-800 mb-2">
                ✨ 추천 이름 ({recommendedNames.length}개)
              </h2>
              <p className="text-xs text-neutral-600">
                💡 부모님 이름의 글자를 공유하는 실제 인기 이름을 추천합니다
              </p>
            </div>

            <div className="space-y-3">
              {recommendedNames.map((name, index) => (
                <div
                  key={index}
                  className="card cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => onNavigate('name-detail', name)}
                >
                  {/* 순위 */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700 shadow-md' :
                      index === 1 ? 'bg-gray-200 text-gray-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-neutral-100 text-neutral-600'
                    }`}>
                      {index + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* 이름 */}
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl font-bold text-neutral-800">
                          {name.name}
                        </h3>
                        {name.hanja && name.hanja !== '-' && (
                          <span className="text-sm text-neutral-500">{name.hanja}</span>
                        )}
                      </div>

                      {/* 의미 */}
                      <p className="text-sm text-neutral-600 mb-2">
                        {name.meaning}
                      </p>

                      {/* 부모 이름 연결 */}
                      {name.fromParent.length > 0 && (
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 mb-2">
                          <p className="text-xs font-medium text-purple-900 mb-1">
                            💝 부모님 이름과의 연결
                          </p>
                          <p className="text-sm text-neutral-700">
                            <span className="font-bold text-purple-700">'{name.fromParent.join(', ')}'</span> 글자를 공유해요
                          </p>
                        </div>
                      )}

                      {/* 성씨 미리보기 */}
                      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-2 mb-2">
                        <p className="text-xs font-medium text-amber-900 mb-1">🏷️ 성씨 조합</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {name.surnameHarmony.map((sh, i) => (
                            <div key={i} className="flex items-center gap-1">
                              <span className="text-sm font-medium text-neutral-800">
                                {sh.surname}{name.name}
                              </span>
                              <span className="text-xs">
                                {'⭐'.repeat(sh.harmony)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 순위 정보 */}
                      {name.rank2024 && (
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            2024년 {name.rank2024}위
                          </span>
                          {name.rank2024 <= 10 && (
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                              ⭐ TOP 10
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 구분선 */}
                  <div className="pt-3 border-t border-neutral-100">
                    <p className="text-xs text-neutral-500 text-center">
                      👆 클릭하면 상세 정보를 볼 수 있어요
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 하단 안내 */}
            <div className="card bg-neutral-50 mt-4">
              <p className="text-xs text-neutral-600 text-center">
                💡 부모님 이름과 글자를 공유하는 이름일수록 높은 점수를 받습니다
              </p>
            </div>
          </>
        )}

        {/* 결과 없음 */}
        {showResults && recommendedNames.length === 0 && (
          <div className="card bg-blue-50 border border-blue-200">
            <div className="text-center py-8">
              <p className="text-2xl mb-3">💡</p>
              <p className="text-neutral-800 font-bold mb-2">
                부모님 이름과 연결되는<br/>
                실제 인기 이름이 없어요
              </p>
              <p className="text-sm text-neutral-600 mb-4">
                {fatherName}님과 {motherName}님의 이름 글자와<br/>
                공유하는 2020-2024년 인기 이름이 없습니다
              </p>
              <div className="bg-white rounded-lg p-3 text-left">
                <p className="text-xs font-semibold text-neutral-700 mb-2">💡 다른 방법을 추천드려요:</p>
                <ul className="text-xs text-neutral-600 space-y-1">
                  <li>• AI 이름 추천으로 맞춤 이름 찾기</li>
                  <li>• 형제자매 이름 추천 기능 이용</li>
                  <li>• 한자 이름 추천에서 직접 선택</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FamilyNamePage
