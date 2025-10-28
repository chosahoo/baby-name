import { useState } from 'react'
import { dreamCategories, getNamesByDream } from '../data/dreamData'
import { nameStatistics } from '../data/namesData'

function DreamNamePage({ onBack }) {
  const [step, setStep] = useState(1) // 1: 카테고리 선택, 2: 태몽 선택, 3: 결과
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedDream, setSelectedDream] = useState(null)
  const [selectedGender, setSelectedGender] = useState('girl')
  const [results, setResults] = useState([])

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setStep(2)
  }

  const handleDreamSelect = (dream) => {
    setSelectedDream(dream)
    // 이름 검색
    const matchedNames = getNamesByDream(dream.id, selectedGender, nameStatistics)
    setResults(matchedNames)
    setStep(3)
  }

  const handleReset = () => {
    setStep(1)
    setSelectedCategory(null)
    setSelectedDream(null)
    setResults([])
  }

  return (
    <div className="min-h-screen bg-cream-200">
      <div className="mobile-container safe-top pb-20">
        {/* 헤더 */}
        <div className="pt-4 pb-6">
          <button
            onClick={step === 1 ? onBack : () => setStep(step - 1)}
            className="touch-target -ml-2 mb-4"
          >
            <svg className="w-6 h-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">
              태몽 기반 이름 추천 ✨
            </h1>
            <p className="text-neutral-600 text-sm">
              {step === 1 && '어떤 태몽을 꾸셨나요?'}
              {step === 2 && '구체적으로 어떤 꿈이었나요?'}
              {step === 3 && '태몽에 어울리는 이름을 추천해드려요'}
            </p>
          </div>

          {/* 안내 */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 mb-4">
            <div className="flex items-start gap-2">
              <span className="text-xl">🌙</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-purple-800 mb-1">태몽이란?</p>
                <p className="text-xs text-purple-700">
                  아이를 가지기 전이나 임신 중에 꾸는 꿈으로, 한국 전통문화에서 아이의 미래나 성격을
                  상징한다고 여겨집니다. 태몽에 나온 동물, 자연, 식물 등을 반영한 한자로 의미있는 이름을 지어보세요.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: 카테고리 선택 */}
        {step === 1 && (
          <div>
            <h2 className="section-header">태몽 카테고리 선택</h2>
            <div className="grid grid-cols-2 gap-3">
              {dreamCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className="card-hover text-center p-6"
                >
                  <div className="text-5xl mb-3">{category.emoji}</div>
                  <h3 className="font-bold text-neutral-800 text-lg mb-1">{category.name}</h3>
                  <p className="text-xs text-neutral-500">
                    {category.dreams.length}가지
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: 구체적인 태몽 선택 */}
        {step === 2 && selectedCategory && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-header mb-0">{selectedCategory.name} 태몽</h2>

              {/* 성별 선택 */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedGender('girl')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedGender === 'girl'
                      ? 'bg-pink-500 text-white'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  👧 여아
                </button>
                <button
                  onClick={() => setSelectedGender('boy')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedGender === 'boy'
                      ? 'bg-blue-500 text-white'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  👦 남아
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {selectedCategory.dreams.map(dream => (
                <button
                  key={dream.id}
                  onClick={() => handleDreamSelect(dream)}
                  className="card-hover w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl flex-shrink-0">{dream.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-neutral-800 mb-1">{dream.name}</h4>
                      <p className="text-xs text-neutral-600 mb-1">{dream.meaning}</p>
                      <div className="flex flex-wrap gap-1">
                        {dream.hanja.map((h, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded text-xs font-medium">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-neutral-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: 추천 결과 */}
        {step === 3 && selectedDream && (
          <div>
            {/* 선택한 태몽 요약 */}
            <div className="card mb-4 bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl">{selectedDream.emoji}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-neutral-800 text-lg mb-1">
                    {selectedDream.name} 태몽
                  </h3>
                  <p className="text-sm text-neutral-600">{selectedDream.meaning}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="text-xs text-neutral-600">관련 한자:</span>
                {selectedDream.hanja.map((h, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-white text-primary-700 rounded text-xs font-medium">
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* 추천 이름 목록 */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="section-header mb-0">
                추천 이름 {results.length}개
              </h2>
              <button
                onClick={handleReset}
                className="text-sm text-primary-600 font-medium"
              >
                다시 선택
              </button>
            </div>

            {results.length === 0 ? (
              <div className="card text-center py-8">
                <div className="text-4xl mb-3">😢</div>
                <p className="text-neutral-600 mb-2">
                  해당 태몽 한자를 포함한 인기 이름을 찾을 수 없습니다
                </p>
                <p className="text-xs text-neutral-500">
                  다른 태몽을 선택하시거나, 한자 이름 추천 메뉴에서<br/>
                  직접 한자를 선택해보세요
                </p>
              </div>
            ) : (
              <>
                {/* 순위 설명 */}
                <div className="card bg-blue-50 border border-blue-200 mb-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-blue-700">
                      대법원 <span className="font-semibold">전국 신생아 출생신고 기준</span> 순위입니다.
                      1위에 가까울수록 인기 이름이에요.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                {results.map((nameData, index) => (
                  <div key={index} className="card fade-in">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold flex-shrink-0 ${
                        index === 0 ? 'bg-yellow-100 text-yellow-600 text-lg' :
                        index === 1 ? 'bg-gray-200 text-gray-600' :
                        index === 2 ? 'bg-orange-100 text-orange-600' :
                        'bg-neutral-100 text-neutral-600'
                      }`}>
                        {nameData.rank2024 || nameData.ranks?.['2024'] || '-'}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-neutral-800">{nameData.name}</h3>
                          {nameData.hanja && nameData.hanja !== '-' && (
                            <span className="text-sm text-neutral-500">{nameData.hanja}</span>
                          )}
                          {nameData.matchedHanja && (
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                              {nameData.matchedHanja}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-600">{nameData.meaning}</p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        {nameData.rank2024 && (
                          <p className="text-xs text-neutral-500">2024년</p>
                        )}
                        <p className="text-sm font-bold text-primary-600">
                          {nameData.rank2024 || nameData.ranks?.['2024']}위
                        </p>
                      </div>
                    </div>

                    {/* 연도별 추이 */}
                    {nameData.ranks && (
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
                ))}
                </div>
              </>
            )}

            {/* 추가 안내 */}
            {results.length > 0 && (
              <div className="card bg-blue-50 border border-blue-200 mt-4">
                <p className="text-xs text-blue-700">
                  💡 <span className="font-semibold">Tip:</span> 위 이름들은 "{selectedDream.name}" 태몽과 관련된
                  한자({selectedDream.hanja.join(', ')})를 포함한 2024년 인기 이름입니다.
                  각 이름을 클릭하면 더 자세한 정보를 확인할 수 있습니다.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default DreamNamePage
