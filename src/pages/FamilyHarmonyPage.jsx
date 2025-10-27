import { useState } from 'react'

function FamilyHarmonyPage({ onBack }) {
  const [babyName, setBabyName] = useState('')
  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, role: '아버지', name: '' },
    { id: 2, role: '어머니', name: '' }
  ])
  const [result, setResult] = useState(null)

  const addMember = (role) => {
    setFamilyMembers([
      ...familyMembers,
      { id: Date.now(), role, name: '' }
    ])
  }

  const updateMemberName = (id, name) => {
    setFamilyMembers(
      familyMembers.map(member =>
        member.id === id ? { ...member, name } : member
      )
    )
  }

  const removeMember = (id) => {
    if (familyMembers.length > 2) {
      setFamilyMembers(familyMembers.filter(member => member.id !== id))
    }
  }

  const analyzeHarmony = () => {
    // 실제 이름 분석 로직

    // 1. 발음 조화 분석 - 음절의 모음, 자음 조화도 체크
    const calculateSoundHarmony = () => {
      const names = [babyName, ...familyMembers.map(m => m.name)]
      let score = 100
      const reasons = []

      // 같은 음절로 시작하는 이름 체크 (형제자매 이름 조화)
      const firstSyllables = names.map(name => name[0])
      const uniqueFirsts = new Set(firstSyllables)
      if (uniqueFirsts.size < names.length) {
        score += 5
        reasons.push('가족 구성원 중 같은 첫 음절을 공유하여 조화로움 (+5점)')
      } else {
        reasons.push('모든 가족 구성원의 이름이 다른 음절로 시작함')
      }

      // 발음하기 어려운 조합 체크
      const hasHardConsonants = babyName.match(/[ㄲㄸㅃㅆㅉ]/)
      if (hasHardConsonants) {
        score -= 5
        reasons.push('된소리(ㄲ,ㄸ,ㅃ,ㅆ,ㅉ)가 포함되어 발음이 다소 강함 (-5점)')
      } else {
        reasons.push('부드러운 발음으로 구성되어 있음')
      }

      // 이름 길이에 따른 리듬감
      const avgLength = names.reduce((sum, n) => sum + n.length, 0) / names.length
      if (Math.abs(babyName.length - avgLength) <= 0.5) {
        reasons.push('가족 이름들과 비슷한 길이로 리듬감이 좋음')
      }

      return { score: Math.max(75, Math.min(100, score)), reasons }
    }

    // 2. 의미 조화 - 이름 길이 유사성, 스타일 조화
    const calculateMeaningHarmony = () => {
      const names = [babyName, ...familyMembers.map(m => m.name)]
      let score = 100
      const reasons = []

      // 이름 길이 유사성
      const lengths = names.map(n => n.length)
      const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length
      const lengthVariance = lengths.reduce((sum, len) => sum + Math.abs(len - avgLength), 0) / lengths.length

      if (lengthVariance <= 0.3) {
        reasons.push('모든 가족 구성원의 이름 길이가 일관되어 조화로움')
      } else if (lengthVariance > 0.5) {
        score -= 10
        reasons.push('이름 길이가 불균형하여 조화도가 낮음 (-10점)')
      } else {
        reasons.push('이름 길이가 적당히 다양함')
      }

      // 2글자 vs 3글자 이름 스타일
      const twoCharCount = names.filter(n => n.length === 2).length
      const threeCharCount = names.filter(n => n.length === 3).length

      if (twoCharCount > 0 && threeCharCount > 0) {
        reasons.push('2글자와 3글자 이름이 혼합되어 현대적이고 다양한 느낌')
      } else if (twoCharCount === names.length) {
        reasons.push('모두 2글자 이름으로 간결하고 현대적인 스타일')
      } else if (threeCharCount === names.length) {
        reasons.push('모두 3글자 이름으로 전통적이고 풍성한 스타일')
      }

      return { score: Math.max(75, Math.min(100, score)), reasons }
    }

    // 3. 한자 조화 - 글자수와 스타일 체크
    const calculateHanjaHarmony = () => {
      let score = 90
      const reasons = []

      // 2글자 이름은 현대적, 3글자는 전통적
      const baby2char = babyName.length === 2
      const family2char = familyMembers.filter(m => m.name.length === 2).length
      const family3char = familyMembers.filter(m => m.name.length === 3).length

      if (baby2char && family2char > familyMembers.length / 2) {
        score += 5
        reasons.push('2글자 이름으로 가족의 현대적 스타일과 일치 (+5점)')
      } else if (!baby2char && family3char > familyMembers.length / 2) {
        score += 5
        reasons.push('3글자 이름으로 가족의 전통적 스타일과 일치 (+5점)')
      } else if (baby2char) {
        reasons.push('2글자 이름으로 간결하고 현대적인 느낌')
      } else {
        reasons.push('3글자 이름으로 전통적이고 풍부한 느낌')
      }

      // 한자 사용 가능성
      if (babyName.length >= 2 && babyName.length <= 3) {
        reasons.push('인명용 한자 표기에 적합한 길이')
      }

      return { score: Math.max(75, Math.min(100, score)), reasons }
    }

    // 4. 항렬 적합성 - 세대별 이름 스타일 체크
    const calculateGenerationHarmony = () => {
      let score = 90
      const reasons = []

      // 부모님 이름 스타일 분석
      const parentNames = familyMembers.filter(m => m.role === '아버지' || m.role === '어머니')
      const parent2char = parentNames.filter(p => p.name.length === 2).length
      const parent3char = parentNames.filter(p => p.name.length === 3).length

      if (parent2char > 0 && babyName.length === 2) {
        score += 5
        reasons.push('부모님과 동일한 2글자 이름으로 세대 조화 (+5점)')
      } else if (parent3char > 0 && babyName.length === 3) {
        score += 5
        reasons.push('부모님과 동일한 3글자 이름으로 전통 계승 (+5점)')
      } else if (parentNames.length === 2 && parent2char === 2 && babyName.length === 3) {
        score -= 5
        reasons.push('부모님은 2글자인데 아기는 3글자로 스타일이 다름 (-5점)')
      } else {
        reasons.push('세대별 이름 스타일이 적절함')
      }

      // 형제자매 이름 분석
      const siblingNames = familyMembers.filter(m => m.role === '형제자매')
      if (siblingNames.length > 0) {
        const siblingSameLength = siblingNames.filter(s => s.name.length === babyName.length).length
        if (siblingSameLength === siblingNames.length) {
          reasons.push('형제자매 이름과 길이가 동일하여 통일감 있음')
        } else if (siblingSameLength > 0) {
          reasons.push('형제자매 중 일부와 이름 길이가 같음')
        }
      }

      return { score: Math.max(75, Math.min(100, score)), reasons }
    }

    // 5. 개별 구성원과의 조화도
    const calculateMemberHarmony = (memberName, memberRole) => {
      let score = 85
      const reasons = []

      // 같은 음절 공유 시 조화도 증가
      let sharedSyllable = null
      for (let i = 0; i < babyName.length; i++) {
        if (memberName.includes(babyName[i])) {
          score += 5
          sharedSyllable = babyName[i]
          break
        }
      }

      if (sharedSyllable) {
        reasons.push(`"${sharedSyllable}" 음절을 공유하여 친밀감 있음 (+5점)`)
      } else {
        reasons.push('공유하는 음절이 없음')
      }

      // 비슷한 길이면 조화로움
      const lengthDiff = Math.abs(babyName.length - memberName.length)
      if (lengthDiff === 0) {
        score += 5
        reasons.push('이름 길이가 동일하여 조화로움 (+5점)')
      } else if (lengthDiff > 1) {
        score -= 5
        reasons.push('이름 길이 차이가 커서 조화도 낮음 (-5점)')
      } else {
        reasons.push('이름 길이가 적당히 비슷함')
      }

      return { score: Math.max(70, Math.min(100, score)), reasons }
    }

    const soundResult = calculateSoundHarmony()
    const meaningResult = calculateMeaningHarmony()
    const hanjaResult = calculateHanjaHarmony()
    const generationResult = calculateGenerationHarmony()
    const overallScore = Math.round((soundResult.score + meaningResult.score + hanjaResult.score + generationResult.score) / 4)

    const scores = {
      overall: overallScore,
      sound: soundResult.score,
      meaning: meaningResult.score,
      hanja: hanjaResult.score,
      generation: generationResult.score
    }

    const analysisReasons = {
      sound: soundResult.reasons,
      meaning: meaningResult.reasons,
      hanja: hanjaResult.reasons,
      generation: generationResult.reasons
    }

    const details = familyMembers.map(member => {
      const harmonyResult = calculateMemberHarmony(member.name, member.role)
      return {
        ...member,
        harmony: harmonyResult.score,
        reasons: harmonyResult.reasons
      }
    })

    setResult({ scores, analysisReasons, details })
  }

  return (
    <div className="min-h-screen bg-cream-200">
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
              가족 이름 조화도 분석
            </h1>
            <p className="text-neutral-600">
              우리 가족과 얼마나 잘 어울리는지 확인해보세요 👨‍👩‍👧‍👦
            </p>
          </div>
        </div>

        {!result ? (
          <div className="space-y-4">
            {/* 아기 이름 입력 */}
            <div className="card">
              <h2 className="font-semibold text-neutral-800 mb-3">
                👶 확인하고 싶은 아기 이름
              </h2>
              <input
                type="text"
                value={babyName}
                onChange={(e) => setBabyName(e.target.value)}
                placeholder="예: 서연"
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:border-[#E8A87C] focus:outline-none bg-white"
              />
            </div>

            {/* 가족 구성원 입력 */}
            <div className="card">
              <h2 className="font-semibold text-neutral-800 mb-3">
                👨‍👩‍👧 가족 구성원 이름
              </h2>

              <div className="space-y-2 mb-4">
                {familyMembers.map((member) => (
                  <div key={member.id} className="flex gap-2">
                    <input
                      type="text"
                      value={member.role}
                      readOnly
                      className="w-20 px-3 py-2.5 bg-neutral-100 rounded-lg text-sm font-medium text-neutral-700"
                    />
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateMemberName(member.id, e.target.value)}
                      placeholder="이름 입력"
                      className="flex-1 px-4 py-2.5 border border-neutral-200 rounded-lg focus:border-[#E8A87C] focus:outline-none bg-white"
                    />
                    {familyMembers.length > 2 && (
                      <button
                        onClick={() => removeMember(member.id)}
                        className="px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium active:scale-95 transition-transform"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => addMember('형제자매')}
                  className="py-2.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors active:scale-95"
                >
                  + 형제자매
                </button>
                <button
                  onClick={() => addMember('할아버지')}
                  className="py-2.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors active:scale-95"
                >
                  + 조부
                </button>
                <button
                  onClick={() => addMember('할머니')}
                  className="py-2.5 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors active:scale-95"
                >
                  + 조모
                </button>
              </div>
            </div>

            <button
              onClick={analyzeHarmony}
              disabled={!babyName || familyMembers.some(m => !m.name)}
              className="w-full py-4 bg-[#E8A87C] text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] hover:bg-[#D4956B] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              조화도 분석하기 🔍
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 전체 점수 */}
            <div className="card bg-gradient-to-br from-primary-50 to-purple-50">
              <div className="text-center">
                <h2 className="font-semibold text-neutral-800 mb-2">
                  종합 조화도
                </h2>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E8A87C] to-purple-500 mb-3">
                  {result.scores.overall}점
                </div>
                <p className="text-neutral-700">
                  {result.scores.overall >= 90 ? '✨ 완벽한 조화!' :
                   result.scores.overall >= 80 ? '👍 매우 좋은 조화!' :
                   result.scores.overall >= 70 ? '😊 좋은 조화!' :
                   '🤔 괜찮은 조화'}
                </p>
              </div>
            </div>

            {/* 세부 점수 */}
            <div className="card">
              <h3 className="font-semibold text-neutral-800 mb-4">
                세부 분석
              </h3>
              <div className="space-y-4">
                {[
                  { label: '발음 조화', key: 'sound', score: result.scores.sound, icon: '🎵' },
                  { label: '의미 조화', key: 'meaning', score: result.scores.meaning, icon: '💭' },
                  { label: '한자 조화', key: 'hanja', score: result.scores.hanja, icon: '📝' },
                  { label: '항렬 적합성', key: 'generation', score: result.scores.generation, icon: '👨‍👩‍👧‍👦' }
                ].map((item) => (
                  <div key={item.label} className="bg-neutral-50 rounded-xl p-3">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{item.icon}</span>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1.5">
                          <span className="text-sm font-medium text-neutral-700">{item.label}</span>
                          <span className="text-sm font-bold text-primary-600">{item.score}점</span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#E8A87C] to-purple-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    {/* 분석 이유 */}
                    <div className="mt-3 pl-9 space-y-1">
                      {result.analysisReasons[item.key].map((reason, idx) => (
                        <p key={idx} className="text-xs text-neutral-600 leading-relaxed">
                          • {reason}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 가족 구성원별 조화도 */}
            <div className="card">
              <h3 className="font-semibold text-neutral-800 mb-4">
                구성원별 조화도
              </h3>
              <div className="space-y-3">
                {result.details.map((member) => (
                  <div key={member.id} className="bg-neutral-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="text-neutral-600 text-xs">{member.role}</span>
                        <p className="font-semibold text-neutral-800">{member.name}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary-600">
                          {member.harmony}점
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-white rounded-full h-2 mb-3">
                      <div
                        className="bg-[#E8A87C] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${member.harmony}%` }}
                      ></div>
                    </div>
                    {/* 구성원별 조화 이유 */}
                    <div className="space-y-1">
                      {member.reasons.map((reason, idx) => (
                        <p key={idx} className="text-xs text-neutral-600 leading-relaxed">
                          • {reason}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setResult(null)}
                className="flex-1 py-3 bg-neutral-100 text-neutral-800 rounded-xl font-medium hover:bg-neutral-200 transition-colors active:scale-95"
              >
                다시 분석하기
              </button>
              <button
                onClick={onBack}
                className="flex-1 py-3 bg-[#E8A87C] text-white rounded-xl font-bold hover:bg-[#D4956B] transition-colors active:scale-95"
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

export default FamilyHarmonyPage
