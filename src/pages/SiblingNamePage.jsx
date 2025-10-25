import { useState } from 'react'
import { nameStatistics } from '../data/namesData'

function SiblingNamePage({ onBack }) {
  const [siblings, setSiblings] = useState([{ id: 1, name: '' }])
  const [newBabyGender, setNewBabyGender] = useState('')
  const [results, setResults] = useState(null)

  const addSibling = () => {
    setSiblings([...siblings, { id: Date.now(), name: '' }])
  }

  const updateSibling = (id, name) => {
    setSiblings(siblings.map(s => s.id === id ? { ...s, name } : s))
  }

  const removeSibling = (id) => {
    if (siblings.length > 1) {
      setSiblings(siblings.filter(s => s.id !== id))
    }
  }

  const findSiblingNames = () => {
    // 성별에 따라 데이터 선택
    const gender = newBabyGender === 'girl' ? 'girl' :
                   newBabyGender === 'boy' ? 'boy' : 'girl'

    let candidates = [...nameStatistics[gender]]

    // 형제자매 이름들 분석
    const siblingNames = siblings.map(s => s.name)

    // 각 후보 이름에 대해 조화도 계산
    const scoredCandidates = candidates.map(candidate => {
      let harmonyScore = 80 // 기본 점수
      let pattern = ''
      let reason = ''

      // 1. 같은 음절 공유 체크 (가장 중요)
      const sharedSyllables = []
      for (const sibName of siblingNames) {
        for (let i = 0; i < sibName.length; i++) {
          if (candidate.name.includes(sibName[i])) {
            sharedSyllables.push(sibName[i])
            harmonyScore += 10
            break
          }
        }
      }

      if (sharedSyllables.length > 0) {
        pattern = `같은 음절 공유 (${sharedSyllables.join(', ')})`
        reason = '형제자매와 음절을 공유하여 가족의 연결감 표현'
      }

      // 2. 같은 음절로 시작하는지 체크
      const firstSyllables = siblingNames.map(n => n[0])
      if (firstSyllables.includes(candidate.name[0])) {
        harmonyScore += 8
        pattern = `같은 음절로 시작 (${candidate.name[0]})`
        reason = '첫 음절을 공유하여 형제자매임을 알리는 효과'
      }

      // 3. 이름 길이 유사성
      const sibLengths = siblingNames.map(n => n.length)
      const avgLength = sibLengths.reduce((a, b) => a + b, 0) / sibLengths.length
      if (Math.abs(candidate.name.length - avgLength) < 0.5) {
        harmonyScore += 5
        if (!pattern) {
          pattern = '비슷한 이름 길이'
          reason = '형제자매 이름과 같은 길이로 조화로움'
        }
      }

      // 4. 발음 패턴 유사성 (부드러운 발음 vs 강한 발음)
      const softSounds = ['ㅇ', 'ㄴ', 'ㅁ', '연', '윤', '은', '아']
      const strongSounds = ['ㅈ', 'ㅊ', 'ㅎ', '준', '진', '현']

      const sibHasSoft = siblingNames.some(n => softSounds.some(s => n.includes(s)))
      const sibHasStrong = siblingNames.some(n => strongSounds.some(s => n.includes(s)))
      const candHasSoft = softSounds.some(s => candidate.name.includes(s))
      const candHasStrong = strongSounds.some(s => candidate.name.includes(s))

      if ((sibHasSoft && candHasSoft) || (sibHasStrong && candHasStrong)) {
        harmonyScore += 5
        if (!pattern) {
          pattern = '유사한 발음 느낌'
          reason = '형제자매와 발음 스타일이 조화롭게 어울림'
        }
      }

      // 5. 기본 패턴이 없으면 설정
      if (!pattern) {
        pattern = '전체적인 조화'
        reason = '형제자매 이름과 전반적으로 잘 어울리는 이름'
      }

      // 6. 인기도에 따른 추가 점수 (TOP 10 이름 우대)
      if (candidate.ranks[2024] && candidate.ranks[2024] <= 10) {
        harmonyScore += 3
      }

      return {
        name: candidate.name,
        hanja: candidate.hanja,
        meaning: candidate.meaning,
        harmony: Math.min(98, harmonyScore),
        pattern,
        reason
      }
    })

    // 조화도 순으로 정렬하고 상위 5개 선택
    const topResults = scoredCandidates
      .sort((a, b) => b.harmony - a.harmony)
      .slice(0, 5)

    setResults(topResults)
  }

  return (
    <div className="min-h-screen bg-cream-100">
      <div className="mobile-container safe-top pb-20">
        <div className="pt-4 pb-6">
          <button
            onClick={onBack}
            className="touch-target -ml-2 mb-4"
          >
            <svg className="w-6 h-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">
              형제자매 이름 추천
            </h1>
            <p className="text-neutral-600">
              기존 자녀와 조화로운 이름을 찾아드려요 👧👦
            </p>
          </div>
        </div>

        {!results ? (
          <div className="space-y-4">
            <div className="card">
              <h2 className="font-semibold text-neutral-800 mb-3">
                👶 기존 자녀 이름
              </h2>
              <div className="space-y-2 mb-4">
                {siblings.map((sibling, index) => (
                  <div key={sibling.id} className="flex gap-2">
                    <input
                      type="text"
                      value={`${index + 1}째`}
                      readOnly
                      className="w-16 px-3 py-2.5 bg-neutral-100 rounded-lg text-sm font-medium text-center text-neutral-700"
                    />
                    <input
                      type="text"
                      value={sibling.name}
                      onChange={(e) => updateSibling(sibling.id, e.target.value)}
                      placeholder="이름 입력"
                      className="flex-1 px-4 py-2.5 border border-neutral-200 rounded-lg focus:border-[#FF6B9D] focus:outline-none bg-white"
                    />
                    {siblings.length > 1 && (
                      <button
                        onClick={() => removeSibling(sibling.id)}
                        className="px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium active:scale-95 transition-transform"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addSibling}
                className="w-full py-2.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors active:scale-95"
              >
                + 자녀 추가
              </button>
            </div>

            <div className="card">
              <h2 className="font-semibold text-neutral-800 mb-3">
                ✨ 새로 태어날 아기 성별
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'girl', label: '여아', emoji: '👧' },
                  { value: 'boy', label: '남아', emoji: '👦' },
                  { value: 'neutral', label: '중성', emoji: '👶' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setNewBabyGender(option.value)}
                    className={`py-4 rounded-xl transition-all active:scale-95 ${
                      newBabyGender === option.value
                        ? 'bg-[#FF6B9D] text-white shadow-md'
                        : 'bg-white border border-neutral-200 text-neutral-700'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">{option.emoji}</div>
                      <div className="text-sm font-medium">{option.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={findSiblingNames}
              disabled={siblings.some(s => !s.name) || !newBabyGender}
              className="w-full py-4 bg-[#FF6B9D] text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] hover:bg-[#FF5A8C] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              형제자매 이름 추천받기 🎯
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="card bg-primary-50">
              <p className="text-center text-neutral-700">
                <span className="font-bold">{siblings.map(s => s.name).join(', ')}</span>와(과)
                잘 어울리는 이름 TOP 5
              </p>
            </div>

            {results.map((result, index) => (
              <div key={index} className="card fade-in">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-600 text-lg' :
                      index === 1 ? 'bg-gray-200 text-gray-600' :
                      index === 2 ? 'bg-orange-100 text-orange-600' :
                      'bg-neutral-100 text-neutral-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-800">
                        {result.name}
                      </h3>
                      <p className="text-sm text-neutral-600">{result.hanja}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-neutral-600">조화도</div>
                    <div className="text-lg font-bold text-primary-600">
                      {result.harmony}%
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-neutral-600 mb-1">의미</p>
                    <p className="text-sm font-medium text-neutral-800">{result.meaning}</p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-xs text-neutral-600 mb-1">매칭 패턴</p>
                    <p className="text-sm font-medium text-neutral-800">{result.pattern}</p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-neutral-600 mb-1">추천 이유</p>
                    <p className="text-sm font-medium text-neutral-800">{result.reason}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-3">
              <button
                onClick={() => setResults(null)}
                className="flex-1 py-3 bg-neutral-100 text-neutral-800 rounded-xl font-medium hover:bg-neutral-200 transition-colors active:scale-95"
              >
                다시 추천받기
              </button>
              <button
                onClick={onBack}
                className="flex-1 py-3 bg-[#FF6B9D] text-white rounded-xl font-bold hover:bg-[#FF5A8C] transition-colors active:scale-95"
              >
                완료
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SiblingNamePage
