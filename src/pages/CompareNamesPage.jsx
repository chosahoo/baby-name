import { useState } from 'react'
import { nameStatistics } from '../data/namesData'

function CompareNamesPage({ onBack }) {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [result, setResult] = useState(null)

  const compareNames = () => {
    // 두 이름을 분석
    const analyzedNames = [name1, name2].map(name => {
      // 1. 데이터베이스에서 이름 찾기 (여아/남아 모두 검색)
      let nameData = nameStatistics.girl.find(n => n.name === name) ||
                     nameStatistics.boy.find(n => n.name === name)

      let hanja = '漢字'
      let meaning = '의미'
      let rank2024 = null
      let trend = 'stable'
      let popularity = 50

      if (nameData) {
        hanja = nameData.hanja
        meaning = nameData.meaning
        rank2024 = nameData.ranks[2024] || null

        // 트렌드 계산
        if (nameData.ranks[2020] && nameData.ranks[2024]) {
          if (nameData.ranks[2024] < nameData.ranks[2020]) trend = 'rising'
          else if (nameData.ranks[2024] > nameData.ranks[2020]) trend = 'falling'
        }

        // 인기도 점수 (순위 기반)
        if (rank2024) {
          if (rank2024 <= 3) popularity = 95
          else if (rank2024 <= 5) popularity = 90
          else if (rank2024 <= 10) popularity = 85
          else if (rank2024 <= 20) popularity = 75
          else popularity = 60
        }
      }

      // 2. 독특함 점수 (인기도 반대)
      const uniqueness = 100 - popularity

      // 3. 발음 점수
      let pronunciation = 85
      // 부드러운 발음
      if (name.match(/[아연윤은유]/)) pronunciation += 5
      // 발음하기 어려운 조합
      if (name.match(/[ㄲㄸㅃㅆㅉ]/)) pronunciation -= 10
      // 2글자는 발음하기 쉬움
      if (name.length === 2) pronunciation += 3
      pronunciation = Math.max(60, Math.min(100, pronunciation))

      // 4. 의미 점수 (간단한 휴리스틱)
      let meaningScore = 85
      if (meaning.includes('아름다')) meaningScore += 5
      if (meaning.includes('지혜')) meaningScore += 5
      if (meaning.includes('빛') || meaning.includes('밝')) meaningScore += 5
      meaningScore = Math.min(100, meaningScore)

      // 5. 한자 점수
      const hanjaScore = 85 // 기본값

      // 6. 종합 점수
      const overall = Math.round(
        (popularity + uniqueness + pronunciation + meaningScore + hanjaScore) / 5
      )

      // 7. 장점/단점 생성
      const pros = []
      const cons = []

      if (rank2024 && rank2024 <= 5) {
        pros.push(`2024년 TOP ${rank2024} 인기 이름`)
      } else if (!rank2024) {
        pros.push('독특하고 개성있는 이름')
      }

      if (pronunciation >= 90) pros.push('발음이 부드럽고 예쁨')
      if (meaningScore >= 90) pros.push('긍정적이고 좋은 의미')
      if (name.length === 2) pros.push('짧고 부르기 쉬움')
      if (trend === 'rising') pros.push('최근 인기 상승 추세')

      if (rank2024 && rank2024 <= 3) {
        cons.push('매우 흔한 이름으로 동명이인 가능성')
      }
      if (uniqueness < 30) cons.push('독특함이 부족')
      if (name.length === 3) cons.push('3글자로 약간 긴 편')
      if (pronunciation < 80) cons.push('발음이 다소 어려울 수 있음')

      // 최소 1개의 장점/단점 보장
      if (pros.length === 0) pros.push('전반적으로 무난한 이름')
      if (cons.length === 0) cons.push('특별한 단점 없음')

      return {
        name,
        hanja,
        meaning,
        scores: {
          popularity,
          uniqueness,
          pronunciation,
          meaning: meaningScore,
          hanja: hanjaScore,
          overall
        },
        rank2024: rank2024 || '-',
        trend,
        pros,
        cons
      }
    })

    // 8. 카테고리별 승자 결정
    const winner = {
      popularity: analyzedNames[0].scores.popularity > analyzedNames[1].scores.popularity ? name1 : name2,
      uniqueness: analyzedNames[0].scores.uniqueness > analyzedNames[1].scores.uniqueness ? name1 : name2,
      meaning: analyzedNames[0].scores.meaning > analyzedNames[1].scores.meaning ? name1 : name2,
      pronunciation: analyzedNames[0].scores.pronunciation > analyzedNames[1].scores.pronunciation ? name1 : name2,
      overall: analyzedNames[0].scores.overall > analyzedNames[1].scores.overall ? name1 : name2
    }

    setResult({
      names: analyzedNames,
      winner
    })
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 80) return 'text-blue-500'
    if (score >= 70) return 'text-yellow-500'
    return 'text-orange-500'
  }

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-green-400'
    if (score >= 80) return 'bg-blue-400'
    if (score >= 70) return 'bg-yellow-400'
    return 'bg-orange-400'
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 mb-4"
        >
          ← 뒤로
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            이름 2개 빠른 비교
          </h1>
          <p className="text-xl text-gray-600">
            두 이름을 비교해서 최선의 선택을 하세요 ⚖️
          </p>
        </div>
      </div>

      {!result ? (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="card bg-pastel-pink">
              <h3 className="font-bold text-lg mb-3">💗 첫 번째 이름</h3>
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                placeholder="예: 서연"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none text-lg"
              />
            </div>

            <div className="card bg-pastel-blue">
              <h3 className="font-bold text-lg mb-3">💙 두 번째 이름</h3>
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="예: 지우"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none text-lg"
              />
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold text-lg mb-3">📊 비교 항목</h3>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="font-medium">인기도</div>
                <p className="text-xs text-gray-600">최근 5년 통계 기반</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="font-medium">독특함</div>
                <p className="text-xs text-gray-600">희귀도 점수</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="font-medium">발음</div>
                <p className="text-xs text-gray-600">부르기 쉬운 정도</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="font-medium">의미</div>
                <p className="text-xs text-gray-600">한자 의미의 좋음</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="font-medium">한자</div>
                <p className="text-xs text-gray-600">획수, 오행 등</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="font-medium">종합</div>
                <p className="text-xs text-gray-600">전체 평가</p>
              </div>
            </div>
          </div>

          <button
            onClick={compareNames}
            disabled={!name1 || !name2}
            className="btn-primary w-full text-lg bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            비교하기 ⚖️
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 종합 승자 */}
          <div className="card bg-gradient-to-br from-pink-50 to-purple-50">
            <div className="text-center">
              <p className="text-gray-600 mb-2">종합 평가 우수</p>
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                {result.winner.overall}
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                더 높은 종합 점수를 받았습니다
              </p>
            </div>
          </div>

          {/* 상세 비교 */}
          <div className="grid md:grid-cols-2 gap-6">
            {result.names.map((nameData, idx) => (
              <div key={idx} className={`card ${idx === 0 ? 'bg-pink-50' : 'bg-blue-50'}`}>
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-gray-800 mb-1">
                    {nameData.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{nameData.hanja}</p>
                  <p className="text-sm text-gray-700">{nameData.meaning}</p>
                </div>

                <div className="bg-white rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold">종합 점수</span>
                    <span className={`text-2xl font-bold ${getScoreColor(nameData.scores.overall)}`}>
                      {nameData.scores.overall}점
                    </span>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(nameData.scores).filter(([key]) => key !== 'overall').map(([key, score]) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">
                            {key === 'popularity' ? '인기도' :
                             key === 'uniqueness' ? '독특함' :
                             key === 'pronunciation' ? '발음' :
                             key === 'meaning' ? '의미' :
                             key === 'hanja' ? '한자' : key}
                          </span>
                          <span className="font-bold">{score}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${getScoreBg(score)} h-2 rounded-full transition-all`}
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4">
                    <p className="font-bold text-green-600 mb-2">👍 장점</p>
                    <ul className="space-y-1 text-sm">
                      {nameData.pros.map((pro, i) => (
                        <li key={i} className="flex gap-2">
                          <span>•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl p-4">
                    <p className="font-bold text-orange-600 mb-2">👎 단점</p>
                    <ul className="space-y-1 text-sm">
                      {nameData.cons.map((con, i) => (
                        <li key={i} className="flex gap-2">
                          <span>•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">2024년 순위</p>
                        <p className="text-xl font-bold">
                          {nameData.rank2024 && nameData.rank2024 !== '-' ? `${nameData.rank2024}위` : '순위권 외'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">트렌드</p>
                        <p className="text-xl">
                          {nameData.trend === 'rising' ? '📈 상승' :
                           nameData.trend === 'falling' ? '📉 하락' :
                           '➡️ 유지'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 카테고리별 승자 */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              📊 항목별 우수 이름
            </h3>
            <div className="grid md:grid-cols-3 gap-3">
              {Object.entries(result.winner).filter(([key]) => key !== 'overall').map(([category, winner]) => (
                <div key={category} className="bg-pastel-lavender rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">
                    {category === 'popularity' ? '인기도' :
                     category === 'uniqueness' ? '독특함' :
                     category === 'pronunciation' ? '발음' :
                     category === 'meaning' ? '의미' : category}
                  </p>
                  <p className="text-xl font-bold text-purple-600">{winner}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setResult(null)}
              className="btn-primary flex-1 bg-gray-100 hover:bg-gray-200"
            >
              다시 비교하기
            </button>
            <button
              onClick={onBack}
              className="btn-primary flex-1 bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:from-pink-500 hover:to-purple-500"
            >
              완료
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CompareNamesPage
