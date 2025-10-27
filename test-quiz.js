// Quiz 조합별 결과 검증 스크립트
import { nameStatistics } from './src/data/namesData.js'

// App.jsx의 getRecommendedNames 로직 복사
function getRecommendedNames(answers) {
  console.log('\n=== Testing answers:', JSON.stringify(answers))

  const gender = answers.gender === 'girl' || answers.gender === 'both' ? 'girl' :
                 answers.gender === 'boy' ? 'boy' : 'girl'

  let candidates = [...nameStatistics[gender]]
  console.log('Initial candidates:', candidates.length)

  // 1. 리듬감 매칭
  if (answers.rhythm && answers.rhythm !== 'any') {
    const rhythmKeywords = {
      cheerful: ['아', '이', '유', '하', '나'],
      calm: ['은', '안', '윤', '민', '진'],
      balanced: ['서', '연', '현', '지', '수']
    }
    if (rhythmKeywords[answers.rhythm]) {
      candidates = candidates.map(name => ({
        ...name,
        rhythmScore: rhythmKeywords[answers.rhythm].some(k => name.name.includes(k)) ? 5 : 0
      })).sort((a, b) => (b.rhythmScore || 0) - (a.rhythmScore || 0))
    }
  }

  // 2. 인기도 필터링
  if (answers.popularity === 'popular') {
    candidates = candidates.filter(name => name.ranks[2024] && name.ranks[2024] <= 5)
    console.log('After popularity filter (popular 1-5):', candidates.length)
  } else if (answers.popularity === 'moderate') {
    candidates = candidates.filter(name => name.ranks[2024] && name.ranks[2024] > 5 && name.ranks[2024] <= 20)
    console.log('After popularity filter (moderate 6-20):', candidates.length)
  } else if (answers.popularity === 'rare') {
    candidates = candidates.filter(name => !name.ranks[2024] || name.ranks[2024] > 20)
    console.log('After popularity filter (rare 21+):', candidates.length)
  }

  // 3. 스타일 매칭
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

  // 4. 발음 선호도
  if (answers.sound === 'soft') {
    candidates = candidates.map(name => ({
      ...name,
      score: (name.name.match(/[아은윤연유]/g) || []).length
    })).sort((a, b) => b.score - a.score)
  } else if (answers.sound === 'strong') {
    candidates = candidates.map(name => ({
      ...name,
      score: (name.name.match(/[준진현호]/g) || []).length
    })).sort((a, b) => b.score - a.score)
  }

  // 상위 5개 선택
  let topNames = candidates.slice(0, 5)

  if (topNames.length < 5) {
    let fallbackCandidates = [...nameStatistics[gender]]
      .filter(name => !topNames.find(t => t.name === name.name))

    if (answers.popularity === 'popular') {
      fallbackCandidates = fallbackCandidates.filter(name => name.ranks[2024] && name.ranks[2024] <= 30)
    } else if (answers.popularity === 'rare') {
      fallbackCandidates = fallbackCandidates.filter(name => !name.ranks[2024] || name.ranks[2024] > 30)
    }

    const remaining = fallbackCandidates.slice(0, 5 - topNames.length)
    topNames = [...topNames, ...remaining]
  }

  console.log('Result:', topNames.map(n => `${n.name}(${n.ranks[2024] || 'N/A'}위)`).join(', '))
  return topNames.map(n => n.name)
}

// 테스트 시나리오들
const testScenarios = [
  {
    name: "여아 - 현대적 - 인기",
    answers: { gender: 'girl', style: 'modern', rhythm: 'cheerful', popularity: 'popular', sound: 'soft' }
  },
  {
    name: "여아 - 현대적 - 희귀",
    answers: { gender: 'girl', style: 'modern', rhythm: 'cheerful', popularity: 'rare', sound: 'soft' }
  },
  {
    name: "여아 - 전통적 - 인기",
    answers: { gender: 'girl', style: 'traditional', rhythm: 'calm', popularity: 'popular', sound: 'balanced' }
  },
  {
    name: "여아 - 독특 - 희귀",
    answers: { gender: 'girl', style: 'unique', rhythm: 'balanced', popularity: 'rare', sound: 'any' }
  },
  {
    name: "남아 - 현대적 - 인기",
    answers: { gender: 'boy', style: 'modern', rhythm: 'cheerful', popularity: 'popular', sound: 'strong' }
  },
  {
    name: "남아 - 전통적 - 적당",
    answers: { gender: 'boy', style: 'traditional', rhythm: 'calm', popularity: 'moderate', sound: 'balanced' }
  },
  {
    name: "남아 - 간단 - 희귀",
    answers: { gender: 'boy', style: 'simple', rhythm: 'any', popularity: 'rare', sound: 'any' }
  },
  {
    name: "여아 - 간단 - 적당",
    answers: { gender: 'girl', style: 'simple', rhythm: 'balanced', popularity: 'moderate', sound: 'soft' }
  }
]

console.log('='.repeat(80))
console.log('퀴즈 조합별 결과 검증')
console.log('='.repeat(80))

const results = {}
testScenarios.forEach(scenario => {
  console.log('\n' + '='.repeat(80))
  console.log(`테스트: ${scenario.name}`)
  console.log('='.repeat(80))
  const names = getRecommendedNames(scenario.answers)
  results[scenario.name] = names
})

// 결과 비교
console.log('\n\n' + '='.repeat(80))
console.log('결과 요약')
console.log('='.repeat(80))

Object.entries(results).forEach(([scenario, names]) => {
  console.log(`\n${scenario}:`)
  console.log(`  → ${names.join(', ')}`)
})

// 중복 검사
console.log('\n\n' + '='.repeat(80))
console.log('중복 검사')
console.log('='.repeat(80))

const scenarios = Object.keys(results)
let hasDuplicates = false

for (let i = 0; i < scenarios.length; i++) {
  for (let j = i + 1; j < scenarios.length; j++) {
    const names1 = results[scenarios[i]].sort().join(',')
    const names2 = results[scenarios[j]].sort().join(',')

    if (names1 === names2) {
      console.log(`\n⚠️  WARNING: 동일한 결과!`)
      console.log(`   ${scenarios[i]}`)
      console.log(`   ${scenarios[j]}`)
      console.log(`   → ${results[scenarios[i]].join(', ')}`)
      hasDuplicates = true
    }
  }
}

if (!hasDuplicates) {
  console.log('\n✅ 모든 조합이 서로 다른 결과를 반환합니다!')
} else {
  console.log('\n❌ 일부 조합이 동일한 결과를 반환합니다.')
}

console.log('\n' + '='.repeat(80))
