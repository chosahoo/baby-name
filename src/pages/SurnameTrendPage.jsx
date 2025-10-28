import { useState } from 'react'
import { nameStatistics } from '../data/namesData'

function SurnameTrendPage({ onBack, onNavigate }) {
  const [selectedSurname, setSelectedSurname] = useState('김')
  const [selectedGender, setSelectedGender] = useState('girl')

  // 한국 주요 성씨 리스트 (인구 순)
  const koreanSurnames = [
    { surname: '김', strokes: 8, hanja: '金' },
    { surname: '이', strokes: 7, hanja: '李' },
    { surname: '박', strokes: 5, hanja: '朴' },
    { surname: '최', strokes: 11, hanja: '崔' },
    { surname: '정', strokes: 9, hanja: '鄭' },
    { surname: '강', strokes: 11, hanja: '姜' },
    { surname: '조', strokes: 10, hanja: '趙' },
    { surname: '윤', strokes: 10, hanja: '尹' },
    { surname: '장', strokes: 11, hanja: '張' },
    { surname: '임', strokes: 8, hanja: '林' },
    { surname: '한', strokes: 12, hanja: '韓' },
    { surname: '오', strokes: 8, hanja: '吳' },
    { surname: '서', strokes: 7, hanja: '徐' },
    { surname: '신', strokes: 10, hanja: '申' },
    { surname: '권', strokes: 18, hanja: '權' },
    { surname: '황', strokes: 12, hanja: '黃' },
    { surname: '안', strokes: 6, hanja: '安' },
    { surname: '송', strokes: 9, hanja: '宋' },
    { surname: '전', strokes: 9, hanja: '全' },
    { surname: '홍', strokes: 9, hanja: '洪' },
    { surname: '유', strokes: 9, hanja: '劉' },
    { surname: '고', strokes: 10, hanja: '高' },
    { surname: '문', strokes: 4, hanja: '文' },
    { surname: '양', strokes: 13, hanja: '梁' },
    { surname: '손', strokes: 10, hanja: '孫' },
    { surname: '배', strokes: 10, hanja: '裵' },
    { surname: '백', strokes: 11, hanja: '白' },
    { surname: '허', strokes: 11, hanja: '許' },
    { surname: '남', strokes: 9, hanja: '南' },
    { surname: '심', strokes: 12, hanja: '沈' }
  ]

  // 성씨 획수에 따른 이름 획수 조화 계산
  const calculateStrokeHarmony = (surnameStrokes, nameStrokes) => {
    const total = surnameStrokes + nameStrokes

    // 성명학에서 좋은 총획수
    const goodStrokes = [11, 13, 15, 16, 17, 18, 21, 23, 24, 25, 29, 31, 32, 33, 35, 37, 39, 41, 45, 47, 48, 52, 57, 63, 65, 67, 68, 81]

    if (goodStrokes.includes(total)) return 'excellent'
    if (total % 2 === 0 && total <= 50) return 'good'
    return 'normal'
  }

  // 성씨별 인기 이름 TOP 10 (획수 조화 고려)
  const getTopNamesForSurname = () => {
    const names = nameStatistics[selectedGender]
    const surname = koreanSurnames.find(s => s.surname === selectedSurname)

    if (!surname) return []

    // 각 이름에 대해 점수 계산
    const scoredNames = names.map(name => {
      let score = 0

      // 1. 기본 인기도 (2024년 순위)
      if (name.ranks[2024]) {
        if (name.ranks[2024] <= 10) score += 50
        else if (name.ranks[2024] <= 30) score += 30
        else if (name.ranks[2024] <= 50) score += 20
        else score += 10
      }

      // 2. 이름 획수 계산 (간단한 추정)
      const nameLength = name.name.length
      const estimatedNameStrokes = nameLength === 2 ? 16 : 24 // 평균 추정

      // 3. 획수 조화도
      const harmony = calculateStrokeHarmony(surname.strokes, estimatedNameStrokes)
      if (harmony === 'excellent') score += 30
      else if (harmony === 'good') score += 15

      // 4. 발음 조화 (성씨와 이름의 첫 글자가 같은 초성이면 감점)
      const surnameInitial = surname.surname[0]
      const nameInitial = name.name[0]

      // 초성 추출 함수
      const getInitial = (char) => {
        const code = char.charCodeAt(0) - 0xAC00
        if (code < 0 || code > 11171) return ''
        const choSeong = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ']
        return choSeong[Math.floor(code / 588)]
      }

      if (getInitial(surnameInitial) === getInitial(nameInitial)) {
        score -= 10 // 같은 초성이면 발음이 어색할 수 있음
      }

      return {
        ...name,
        score,
        harmony
      }
    })

    // 점수순 정렬하고 TOP 10 선택
    return scoredNames
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
  }

  const topNames = getTopNamesForSurname()
  const currentSurname = koreanSurnames.find(s => s.surname === selectedSurname)

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
              성씨별 인기 이름 👨‍👩‍👧‍👦
            </h1>
            <p className="text-neutral-600 text-sm">
              우리 성씨에 어울리는 인기 이름
            </p>
          </div>

          {/* 안내 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="text-xs font-semibold text-blue-800 mb-1">분석 기준</p>
                <p className="text-xs text-blue-700">
                  2024년 인기 순위와 성씨+이름 획수 조화를 고려하여 추천합니다.
                  성명학의 좋은 획수 조합을 우선 선택합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 성별 선택 */}
        <div className="card mb-4">
          <p className="text-sm font-medium text-neutral-700 mb-2">성별</p>
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

        {/* 성씨 선택 */}
        <div className="card mb-4">
          <p className="text-sm font-medium text-neutral-700 mb-3">성씨 선택</p>
          <div className="grid grid-cols-5 gap-2">
            {koreanSurnames.slice(0, 20).map(surname => (
              <button
                key={surname.surname}
                onClick={() => setSelectedSurname(surname.surname)}
                className={`py-2 rounded-lg text-sm font-bold transition-all active:scale-95 ${
                  selectedSurname === surname.surname
                    ? 'bg-[#E8A87C] text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700'
                }`}
              >
                {surname.surname}
              </button>
            ))}
          </div>

          {koreanSurnames.length > 20 && (
            <>
              <p className="text-xs text-neutral-500 mt-3 mb-2">기타 성씨</p>
              <div className="grid grid-cols-5 gap-2">
                {koreanSurnames.slice(20).map(surname => (
                  <button
                    key={surname.surname}
                    onClick={() => setSelectedSurname(surname.surname)}
                    className={`py-2 rounded-lg text-sm font-bold transition-all active:scale-95 ${
                      selectedSurname === surname.surname
                        ? 'bg-[#E8A87C] text-white shadow-md'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {surname.surname}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* 선택된 성씨 정보 */}
        {currentSurname && (
          <div className="card bg-gradient-to-br from-primary-50 to-purple-50 mb-4">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-neutral-800 mb-2">
                {currentSurname.surname}
              </h2>
              <p className="text-sm text-neutral-600 mb-1">
                한자: {currentSurname.hanja} · 획수: {currentSurname.strokes}획
              </p>
              <p className="text-xs text-neutral-500">
                {selectedGender === 'girl' ? '여아' : '남아'} 인기 이름 TOP 10
              </p>
            </div>
          </div>
        )}

        {/* TOP 10 리스트 */}
        <div className="space-y-3">
          {topNames.map((name, index) => (
            <div
              key={index}
              className="card fade-in cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onNavigate('name-detail', name)}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold flex-shrink-0 ${
                  index === 0 ? 'bg-yellow-100 text-yellow-600 text-lg' :
                  index === 1 ? 'bg-gray-200 text-gray-600' :
                  index === 2 ? 'bg-orange-100 text-orange-600' :
                  'bg-neutral-100 text-neutral-600'
                }`}>
                  {index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-neutral-800">
                      {currentSurname.surname}{name.name}
                    </h3>
                    {name.hanja && name.hanja !== '-' && (
                      <span className="text-sm text-neutral-500">{name.hanja}</span>
                    )}
                    {name.harmony === 'excellent' && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        ⭐ 최고
                      </span>
                    )}
                    {name.harmony === 'good' && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        ✓ 좋음
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-600 mb-1">{name.meaning}</p>
                </div>

                <div className="text-right flex-shrink-0">
                  {name.ranks[2024] && (
                    <>
                      <p className="text-xs text-neutral-500">2024년</p>
                      <p className="text-lg font-bold text-primary-600">
                        {name.ranks[2024]}위
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* 5년 추이 */}
              {name.ranks && (
                <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                  {Object.entries(name.ranks).map(([year, rank]) => (
                    <div key={year} className="text-center">
                      <span className="block text-neutral-400">{year.slice(2)}</span>
                      <span className="font-semibold text-neutral-700">
                        {rank ? `${rank}위` : '-'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 하단 안내 */}
        <div className="card bg-neutral-50 mt-4">
          <p className="text-xs text-neutral-600 text-center">
            💡 이름을 클릭하면 한자, 성명학, 통계 등 상세 정보를 볼 수 있습니다
          </p>
        </div>
      </div>
    </div>
  )
}

export default SurnameTrendPage
