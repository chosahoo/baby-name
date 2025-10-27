// 상세 퀴즈 조합 검증 (맞춤 추천 모드)
import { nameStatistics } from './src/data/namesData.js'

function getRecommendedNames(answers) {
  const gender = answers.gender === 'girl' || answers.gender === 'both' ? 'girl' :
                 answers.gender === 'boy' ? 'boy' : 'girl'

  let candidates = [...nameStatistics[gender]]

  // 1. 리듬감
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

  // 2. 인기도
  if (answers.popularity === 'popular') {
    candidates = candidates.filter(name => name.ranks[2024] && name.ranks[2024] <= 5)
  } else if (answers.popularity === 'moderate') {
    candidates = candidates.filter(name => name.ranks[2024] && name.ranks[2024] > 5 && name.ranks[2024] <= 20)
  } else if (answers.popularity === 'rare') {
    candidates = candidates.filter(name => !name.ranks[2024] || name.ranks[2024] > 20)
  }

  // 3. 스타일
  const styleKeywords = {
    modern: ['서', '하', '지', '아'],
    traditional: ['은', '정', '민', '수'],
    unique: ['린', '유', '시', '도'],
    simple: ['아', '윤', '준', '우']
  }

  if (answers.style && styleKeywords[answers.style]) {
    candidates = candidates.map(name => ({
      ...name,
      styleScore: styleKeywords[answers.style].some(k => name.name.includes(k)) ? 10 : 0
    })).sort((a, b) => (b.styleScore || 0) - (a.styleScore || 0))
  }

  // 4. 발음
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

  // 5. 첫소리
  if (answers.firstSound && answers.firstSound !== 'any') {
    const choSeong = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ']
    const filtered = candidates.filter(name => {
      const code = name.name[0].charCodeAt(0) - 0xAC00
      if (code < 0 || code > 11171) return false
      const cho = Math.floor(code / 588)
      return choSeong[cho] === answers.firstSound
    })
    if (filtered.length >= 5) candidates = filtered
  }

  // 6. 계절
  if (answers.season && answers.season !== 'any') {
    const seasonNames = {
      spring: ['봄', '새봄', '예봄', '하', '화', '연', '꽃', '빛'],
      summer: ['여름', '하', '솔', '푸', '청', '늘'],
      autumn: ['가을', '단', '율', '은', '결', '별'],
      winter: ['겨울', '설', '한', '눈', '빛', '별']
    }
    const keywords = seasonNames[answers.season] || []
    const filtered = candidates.filter(name => keywords.some(k => name.name.includes(k)))
    if (filtered.length >= 5) candidates = filtered
  }

  // Fallback
  let topNames = candidates.slice(0, 5)
  if (topNames.length < 5) {
    let fallback = [...nameStatistics[gender]].filter(n => !topNames.find(t => t.name === n.name))
    topNames = [...topNames, ...fallback.slice(0, 5 - topNames.length)]
  }

  return topNames.map(n => n.name)
}

// 더 다양한 테스트 시나리오 (맞춤 추천)
const detailedScenarios = [
  {
    name: "여아 - ㅅ시작 - 봄",
    answers: { gender: 'girl', style: 'modern', rhythm: 'any', popularity: 'any', sound: 'any', firstSound: 'ㅅ', season: 'spring' }
  },
  {
    name: "여아 - ㅈ시작 - 여름",
    answers: { gender: 'girl', style: 'modern', rhythm: 'any', popularity: 'any', sound: 'any', firstSound: 'ㅈ', season: 'summer' }
  },
  {
    name: "여아 - ㅎ시작 - 겨울",
    answers: { gender: 'girl', style: 'any', rhythm: 'any', popularity: 'any', sound: 'any', firstSound: 'ㅎ', season: 'winter' }
  },
  {
    name: "남아 - ㅈ시작 - 인기",
    answers: { gender: 'boy', style: 'any', rhythm: 'any', popularity: 'popular', sound: 'any', firstSound: 'ㅈ', season: 'any' }
  },
  {
    name: "남아 - ㅅ시작 - 희귀",
    answers: { gender: 'boy', style: 'any', rhythm: 'any', popularity: 'rare', sound: 'any', firstSound: 'ㅅ', season: 'any' }
  },
  {
    name: "남아 - ㅁ시작 - 가을",
    answers: { gender: 'boy', style: 'traditional', rhythm: 'calm', popularity: 'moderate', sound: 'any', firstSound: 'ㅁ', season: 'autumn' }
  },
  {
    name: "여아 - ㅇ시작 - 간단스타일",
    answers: { gender: 'girl', style: 'simple', rhythm: 'cheerful', popularity: 'moderate', sound: 'soft', firstSound: 'ㅇ', season: 'any' }
  },
  {
    name: "여아 - ㄴ시작 - 전통스타일",
    answers: { gender: 'girl', style: 'traditional', rhythm: 'calm', popularity: 'any', sound: 'balanced', firstSound: 'ㄴ', season: 'any' }
  },
  {
    name: "남아 - ㅎ시작 - 현대스타일",
    answers: { gender: 'boy', style: 'modern', rhythm: 'cheerful', popularity: 'popular', sound: 'any', firstSound: 'ㅎ', season: 'any' }
  },
  {
    name: "남아 - ㄷ시작 - 독특스타일",
    answers: { gender: 'boy', style: 'unique', rhythm: 'balanced', popularity: 'rare', sound: 'any', firstSound: 'ㄷ', season: 'any' }
  }
]

console.log('='.repeat(80))
console.log('맞춤 추천 조합별 결과 검증')
console.log('='.repeat(80))

const results = {}
detailedScenarios.forEach(scenario => {
  console.log(`\n테스트: ${scenario.name}`)
  const names = getRecommendedNames(scenario.answers)
  results[scenario.name] = names
  console.log(`  → ${names.join(', ')}`)
})

// 중복 검사
console.log('\n' + '='.repeat(80))
console.log('중복 검사')
console.log('='.repeat(80))

const scenarios = Object.keys(results)
let duplicates = []

for (let i = 0; i < scenarios.length; i++) {
  for (let j = i + 1; j < scenarios.length; j++) {
    const names1 = results[scenarios[i]].sort().join(',')
    const names2 = results[scenarios[j]].sort().join(',')

    if (names1 === names2) {
      duplicates.push({
        scenario1: scenarios[i],
        scenario2: scenarios[j],
        names: results[scenarios[i]]
      })
    }
  }
}

if (duplicates.length === 0) {
  console.log('\n✅ 모든 조합이 서로 다른 결과를 반환합니다!')
} else {
  console.log(`\n❌ ${duplicates.length}개의 중복된 조합이 발견되었습니다:\n`)
  duplicates.forEach(dup => {
    console.log(`  ${dup.scenario1}`)
    console.log(`  ${dup.scenario2}`)
    console.log(`  → ${dup.names.join(', ')}\n`)
  })
}

// 통계
console.log('\n' + '='.repeat(80))
console.log('통계')
console.log('='.repeat(80))
console.log(`총 테스트 조합: ${scenarios.length}개`)
console.log(`고유한 결과: ${new Set(Object.values(results).map(r => r.sort().join(','))).size}개`)
console.log(`중복률: ${(duplicates.length / scenarios.length * 100).toFixed(1)}%`)

console.log('\n' + '='.repeat(80))
