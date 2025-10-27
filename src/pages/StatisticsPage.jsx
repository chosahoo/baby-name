import { useState } from 'react'
import { nameStatistics, dataMetadata } from '../data/namesData'

function StatisticsPage({ onBack }) {
  const [selectedGender, setSelectedGender] = useState('girl')
  const [selectedYear, setSelectedYear] = useState('all') // 'all' or '2020', '2021', '2022', '2023', '2024'

  // 선택된 연도에 따라 데이터 필터링 및 정렬
  const getFilteredNames = () => {
    const names = nameStatistics[selectedGender]

    if (selectedYear === 'all') {
      // 5년 전체 데이터 - 2024년 순위 기준으로 정렬, TOP 50
      return names.slice(0, 50)
    }

    // 특정 연도 선택시 - 해당 연도 순위로 정렬
    return names
      .filter(name => name.ranks[selectedYear] !== null)
      .sort((a, b) => a.ranks[selectedYear] - b.ranks[selectedYear])
      .slice(0, 50) // TOP 50
  }

  const currentNames = getFilteredNames()

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
              {selectedYear === 'all' ? '5년 통합' : `${selectedYear}년`} 이름 통계
            </h1>
            <p className="text-neutral-600 text-sm">
              {selectedYear === 'all' ? '2020-2024년 전체 순위' : `${selectedYear}년 신생아 이름 순위`} 📊
            </p>
          </div>

          {/* 출처 정보 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="text-xs font-semibold text-blue-800 mb-1">데이터 정보</p>
                <p className="text-xs text-blue-700 mb-2">
                  {dataMetadata.source} (최종 업데이트: {dataMetadata.lastUpdated})<br/>
                  <span className="text-blue-600 font-semibold">※ {dataMetadata.notes[0]}</span>
                </p>
                <div className="text-xs text-blue-600">
                  <p className="font-semibold mb-1">실제 데이터 출처:</p>
                  {dataMetadata.officialSources.map((source, idx) => (
                    <div key={idx} className="mb-1">
                      • <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">
                        {source.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 필터 */}
        <div className="card mb-4">
          <p className="text-sm font-medium text-neutral-700 mb-2">성별</p>
          <div className="flex gap-2 mb-4">
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

          <p className="text-sm font-medium text-neutral-700 mb-2">연도</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setSelectedYear('all')}
              className={`py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                selectedYear === 'all'
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-neutral-100 text-neutral-700'
              }`}
            >
              5년 전체
            </button>
            {['2024', '2023', '2022', '2021', '2020'].map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                  selectedYear === year
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700'
                }`}
              >
                {year}년
              </button>
            ))}
          </div>
        </div>

        {/* TOP 순위 */}
        <div className="mb-4">
          <h2 className="section-header">
            {selectedYear === 'all' ? '2020-2024년 통합 TOP 50' : `${selectedYear}년 TOP 50`}
          </h2>
          <div className="space-y-3">
            {currentNames.map((nameData, index) => {
              // 선택된 연도의 순위 및 인원수
              const displayRank = selectedYear === 'all' ? nameData.ranks[2024] : nameData.ranks[selectedYear]

              // 5년 통합일 때는 모든 연도의 count를 합산
              const displayCount = selectedYear === 'all'
                ? Object.values(nameData.counts).reduce((sum, count) => sum + (count || 0), 0)
                : nameData.counts[selectedYear]

              return (
                <div key={index} className="card fade-in">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold flex-shrink-0 ${
                      index === 0 ? 'bg-yellow-100 text-yellow-600 text-xl' :
                      index === 1 ? 'bg-gray-200 text-gray-600' :
                      index === 2 ? 'bg-orange-100 text-orange-600' :
                      'bg-neutral-100 text-neutral-600'
                    }`}>
                      {selectedYear === 'all' ? index + 1 : displayRank}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-neutral-800">{nameData.name}</h3>
                        <span className="text-sm text-neutral-500">{nameData.hanja}</span>
                        {selectedYear === 'all' && (
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            nameData.trend === 'rising' ? 'bg-green-100 text-green-700' :
                            nameData.trend === 'falling' ? 'bg-red-100 text-red-700' :
                            'bg-neutral-100 text-neutral-600'
                          }`}>
                            {nameData.trend === 'rising' ? '↑' :
                             nameData.trend === 'falling' ? '↓' : '→'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-600 mb-2">{nameData.meaning}</p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-primary-600">
                        {displayCount?.toLocaleString() || 'N/A'}명
                      </p>
                      {selectedYear === 'all' && (
                        <p className="text-xs text-neutral-500">{nameData.percentage}%</p>
                      )}
                    </div>
                  </div>

                  {/* 5년 추이 - 전체 보기에서만 표시 */}
                  {selectedYear === 'all' && (
                    <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                      {Object.entries(nameData.ranks).map(([year, rank]) => (
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
              )
            })}
          </div>
        </div>

        {/* 하단 안내 */}
        <div className="card bg-neutral-50">
          <p className="text-xs text-neutral-600 text-center">
            💡 {selectedYear === 'all'
              ? '2020-2024년 신생아 이름 통계 (5년 통합 데이터)'
              : selectedYear === '2024'
                ? '2024년 1월부터 8월까지의 출생신고 데이터를 기준으로 합니다'
                : `${selectedYear}년 전체 출생신고 데이터를 기준으로 합니다`
            }<br/>
            <span className="text-neutral-500 mt-1 block">
              출처: 대법원 전자가족관계등록시스템 (baby-name.kr)
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default StatisticsPage
