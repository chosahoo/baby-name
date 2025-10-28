import { useState } from 'react'
import { nameStatistics } from '../data/namesData'

function TrendAnalysisPage({ onBack, onNavigate }) {
  const [selectedGender, setSelectedGender] = useState('girl')

  // 트렌드 분석 함수들
  const analyzeTrends = (gender) => {
    const names = nameStatistics[gender]

    // 1. 급상승 이름 (2020 → 2024 순위 변화가 큰 것)
    const risingNames = names
      .filter(name => name.ranks[2020] && name.ranks[2024])
      .map(name => ({
        ...name,
        change: name.ranks[2020] - name.ranks[2024] // 양수일수록 상승
      }))
      .filter(name => name.change > 0)
      .sort((a, b) => b.change - a.change)
      .slice(0, 10)

    // 2. 급하락 이름
    const fallingNames = names
      .filter(name => name.ranks[2020] && name.ranks[2024])
      .map(name => ({
        ...name,
        change: name.ranks[2024] - name.ranks[2020] // 양수일수록 하락
      }))
      .filter(name => name.change > 0)
      .sort((a, b) => b.change - a.change)
      .slice(0, 10)

    // 3. 새롭게 등장한 이름 (2020년 순위권 밖 → 2024년 TOP 50)
    const newNames = names
      .filter(name => !name.ranks[2020] && name.ranks[2024] && name.ranks[2024] <= 50)
      .sort((a, b) => a.ranks[2024] - b.ranks[2024])
      .slice(0, 10)

    // 4. 사라진 이름 (2020년 TOP 50 → 2024년 순위권 밖)
    const disappearedNames = names
      .filter(name => name.ranks[2020] && name.ranks[2020] <= 50 && !name.ranks[2024])
      .sort((a, b) => a.ranks[2020] - b.ranks[2020])
      .slice(0, 10)

    // 5. 꾸준한 인기 (5년 내내 TOP 10)
    const steadyNames = names
      .filter(name => {
        const years = [2020, 2021, 2022, 2023, 2024]
        return years.every(year => name.ranks[year] && name.ranks[year] <= 10)
      })
      .sort((a, b) => a.ranks[2024] - b.ranks[2024])

    // 6. 핫한 트렌드 (최근 2년간 급상승)
    const hotTrend = names
      .filter(name => name.ranks[2022] && name.ranks[2024])
      .map(name => ({
        ...name,
        recentChange: name.ranks[2022] - name.ranks[2024]
      }))
      .filter(name => name.recentChange > 10)
      .sort((a, b) => b.recentChange - a.recentChange)
      .slice(0, 10)

    return {
      risingNames,
      fallingNames,
      newNames,
      disappearedNames,
      steadyNames,
      hotTrend
    }
  }

  const trends = analyzeTrends(selectedGender)

  const TrendCard = ({ title, emoji, names, type }) => {
    if (!names || names.length === 0) {
      return (
        <div className="card">
          <h3 className="text-lg font-bold text-neutral-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">{emoji}</span>
            {title}
          </h3>
          <p className="text-sm text-neutral-500">해당하는 이름이 없습니다</p>
        </div>
      )
    }

    return (
      <div className="card">
        <h3 className="text-lg font-bold text-neutral-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">{emoji}</span>
          {title}
        </h3>
        <div className="space-y-3">
          {names.map((name, index) => (
            <div
              key={index}
              className="bg-neutral-50 rounded-lg p-3 hover:bg-neutral-100 transition-colors cursor-pointer"
              onClick={() => onNavigate('name-detail', name)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-600' :
                    index === 1 ? 'bg-gray-200 text-gray-600' :
                    index === 2 ? 'bg-orange-100 text-orange-600' :
                    'bg-neutral-200 text-neutral-600'
                  }`}>
                    {index + 1}
                  </span>
                  <h4 className="font-bold text-neutral-800">{name.name}</h4>
                  {name.hanja && name.hanja !== '-' && (
                    <span className="text-sm text-neutral-500">{name.hanja}</span>
                  )}
                </div>

                {type === 'rising' && name.change && (
                  <span className="text-green-600 font-bold text-sm">
                    ↑ {name.change}단계
                  </span>
                )}
                {type === 'falling' && name.change && (
                  <span className="text-red-600 font-bold text-sm">
                    ↓ {name.change}단계
                  </span>
                )}
                {type === 'new' && name.ranks[2024] && (
                  <span className="text-blue-600 font-bold text-sm">
                    NEW → {name.ranks[2024]}위
                  </span>
                )}
                {type === 'hot' && name.recentChange && (
                  <span className="text-orange-600 font-bold text-sm">
                    🔥 +{name.recentChange}
                  </span>
                )}
              </div>

              <p className="text-xs text-neutral-600 mb-2">{name.meaning}</p>

              <div className="flex gap-2 text-xs">
                {type !== 'new' && name.ranks[2020] && (
                  <span className="px-2 py-1 bg-white rounded text-neutral-600">
                    2020년 {name.ranks[2020]}위
                  </span>
                )}
                {name.ranks[2024] && (
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded font-semibold">
                    2024년 {name.ranks[2024]}위
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
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
              이름 트렌드 분석 📈
            </h1>
            <p className="text-neutral-600 text-sm">
              5년간의 데이터로 본 이름 트렌드
            </p>
          </div>

          {/* 출처 정보 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="text-xs font-semibold text-blue-800 mb-1">분석 데이터</p>
                <p className="text-xs text-blue-700">
                  대법원 전자가족관계등록시스템의 <span className="font-semibold">2020-2024년 신생아 출생신고 데이터</span>를
                  기반으로 트렌드를 분석했습니다.
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

        {/* 핫한 트렌드 (최근 2년) */}
        <TrendCard
          title="핫한 트렌드 🔥"
          emoji="🔥"
          names={trends.hotTrend}
          type="hot"
        />

        {/* 급상승 이름 */}
        <TrendCard
          title="5년간 급상승 이름"
          emoji="📈"
          names={trends.risingNames}
          type="rising"
        />

        {/* 새롭게 등장한 이름 */}
        <TrendCard
          title="새롭게 등장한 이름"
          emoji="✨"
          names={trends.newNames}
          type="new"
        />

        {/* 꾸준한 인기 */}
        {trends.steadyNames.length > 0 && (
          <div className="card">
            <h3 className="text-lg font-bold text-neutral-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              꾸준한 인기 (5년 내내 TOP 10)
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {trends.steadyNames.map((name, index) => (
                <div
                  key={index}
                  className="bg-yellow-50 rounded-lg p-3 text-center cursor-pointer hover:bg-yellow-100 transition-colors"
                  onClick={() => onNavigate('name-detail', name)}
                >
                  <p className="font-bold text-neutral-800">{name.name}</p>
                  {name.hanja && name.hanja !== '-' && (
                    <p className="text-xs text-neutral-600">{name.hanja}</p>
                  )}
                  <p className="text-xs text-primary-600 font-semibold mt-1">
                    {name.ranks[2024]}위
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 급하락 이름 */}
        <TrendCard
          title="5년간 급하락 이름"
          emoji="📉"
          names={trends.fallingNames}
          type="falling"
        />

        {/* 사라진 이름 */}
        {trends.disappearedNames.length > 0 && (
          <TrendCard
            title="사라진 이름 (TOP 50 → 권외)"
            emoji="👋"
            names={trends.disappearedNames}
            type="disappeared"
          />
        )}

        {/* 2025년 예상 트렌드 */}
        <div className="card bg-gradient-to-br from-purple-50 to-pink-50">
          <h3 className="text-lg font-bold text-neutral-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">🔮</span>
            2025년 예상 트렌드
          </h3>
          <div className="space-y-2 text-sm text-neutral-700">
            <div className="bg-white rounded-lg p-3">
              <p className="font-semibold mb-1">💫 계속 상승할 이름</p>
              <p className="text-xs text-neutral-600">
                최근 2-3년간 꾸준히 상승 중인 이름들은 2025년에도 인기가 지속될 것으로 예상됩니다
              </p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="font-semibold mb-1">✨ 새로운 스타일</p>
              <p className="text-xs text-neutral-600">
                짧고 발음하기 쉬운 2글자 이름, 부드러운 발음(ㅇ, ㄴ, ㅁ)의 이름이 계속 선호될 전망
              </p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="font-semibold mb-1">🎯 개성 추구</p>
              <p className="text-xs text-neutral-600">
                TOP 3 초인기 이름을 피하고, TOP 20-50 범위의 독특하면서도 안정적인 이름을 선택하는 추세
              </p>
            </div>
          </div>
        </div>

        {/* 하단 안내 */}
        <div className="card bg-neutral-50">
          <p className="text-xs text-neutral-600 text-center">
            💡 이름을 클릭하면 상세 정보를 볼 수 있습니다
          </p>
        </div>
      </div>
    </div>
  )
}

export default TrendAnalysisPage
