// 극단적인 조합 테스트 - 같은 성별/인기도에서도 다른 결과가 나오는지
import { nameStatistics } from './src/data/namesData.js'

function getRecommendedNames(answers) {
  const gender = answers.gender === 'girl' || answers.gender === 'both' ? 'girl' :
                 answers.gender === 'boy' ? 'boy' : 'girl'

  let candidates = [...nameStatistics[gender]]
  let log = []

  // 인기도 필터링 (가장 강력한 필터)
  if (answers.popularity === 'popular') {
    candidates = candidates.filter(name => name.ranks[2024] && name.ranks[2024] <= 5)
    log.push(`인기(1-5위): ${candidates.length}개`)
  } else if (answers.popularity === 'moderate') {
    candidates = candidates.filter(name => name.ranks[2024] && name.ranks[2024] > 5 && name.ranks[2024] <= 20)
    log.push(`적당(6-20위): ${candidates.length}개`)
  } else if (answers.popularity === 'rare') {
    candidates = candidates.filter(name => !name.ranks[2024] || name.ranks[2024] > 20)
    log.push(`희귀(21위+): ${candidates.length}개`)
  }

  // 스타일 스코어링
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
    const topStyle = candidates.slice(0, 5)
    log.push(`스타일(${answers.style}): 상위 5개 - ${topStyle.map(n => n.name).join(', ')}`)
  }

  // 발음 스코어링
  if (answers.sound === 'soft') {
    candidates = candidates.map(name => ({
      ...name,
      soundScore: (name.name.match(/[아은윤연유]/g) || []).length
    })).sort((a, b) => (b.soundScore || 0) - (a.soundScore || 0))
    log.push(`발음(부드러운): 적용`)
  } else if (answers.sound === 'strong') {
    candidates = candidates.map(name => ({
      ...name,
      soundScore: (name.name.match(/[준진현호]/g) || []).length
    })).sort((a, b) => (b.soundScore || 0) - (a.soundScore || 0))
    log.push(`발음(또렷한): 적용`)
  }

  let topNames = candidates.slice(0, 5)
  if (topNames.length < 5) {
    let fallback = [...nameStatistics[gender]].filter(n => !topNames.find(t => t.name === n.name))
    topNames = [...topNames, ...fallback.slice(0, 5 - topNames.length)]
  }

  return {
    names: topNames.map(n => n.name),
    log: log.join(' → ')
  }
}

// 같은 인기도, 다른 스타일/발음 조합
const scenarios = [
  // 여아 인기 이름 - 다른 조합
  { name: "여아 인기 - 현대/부드러운", answers: { gender: 'girl', popularity: 'popular', style: 'modern', sound: 'soft' } },
  { name: "여아 인기 - 전통/균형", answers: { gender: 'girl', popularity: 'popular', style: 'traditional', sound: 'balanced' } },
  { name: "여아 인기 - 독특/무관", answers: { gender: 'girl', popularity: 'popular', style: 'unique', sound: 'any' } },
  { name: "여아 인기 - 간단/부드러운", answers: { gender: 'girl', popularity: 'popular', style: 'simple', sound: 'soft' } },

  // 남아 인기 이름 - 다른 조합
  { name: "남아 인기 - 현대/또렷", answers: { gender: 'boy', popularity: 'popular', style: 'modern', sound: 'strong' } },
  { name: "남아 인기 - 전통/균형", answers: { gender: 'boy', popularity: 'popular', style: 'traditional', sound: 'balanced' } },
  { name: "남아 인기 - 간단/부드러운", answers: { gender: 'boy', popularity: 'popular', style: 'simple', sound: 'soft' } },
  { name: "남아 인기 - 독특/무관", answers: { gender: 'boy', popularity: 'popular', style: 'unique', sound: 'any' } },

  // 여아 희귀 이름 - 다른 조합
  { name: "여아 희귀 - 현대/부드러운", answers: { gender: 'girl', popularity: 'rare', style: 'modern', sound: 'soft' } },
  { name: "여아 희귀 - 전통/균형", answers: { gender: 'girl', popularity: 'rare', style: 'traditional', sound: 'balanced' } },
  { name: "여아 희귀 - 독특/무관", answers: { gender: 'girl', popularity: 'rare', style: 'unique', sound: 'any' } },

  // 남아 희귀 이름 - 다른 조합
  { name: "남아 희귀 - 현대/또렷", answers: { gender: 'boy', popularity: 'rare', style: 'modern', sound: 'strong' } },
  { name: "남아 희귀 - 전통/균형", answers: { gender: 'boy', popularity: 'rare', style: 'traditional', sound: 'balanced' } },
  { name: "남아 희귀 - 간단/부드러운", answers: { gender: 'boy', popularity: 'rare', style: 'simple', sound: 'soft' } },
]

console.log('='.repeat(80))
console.log('같은 인기도, 다른 필터 조합 테스트')
console.log('='.repeat(80))

const results = {}
scenarios.forEach(scenario => {
  const result = getRecommendedNames(scenario.answers)
  results[scenario.name] = result.names
  console.log(`\n${scenario.name}:`)
  console.log(`  결과: ${result.names.join(', ')}`)
  console.log(`  필터: ${result.log}`)
})

// 그룹별 중복 검사
console.log('\n' + '='.repeat(80))
console.log('그룹별 중복 검사')
console.log('='.repeat(80))

const groups = {
  '여아 인기': scenarios.slice(0, 4),
  '남아 인기': scenarios.slice(4, 8),
  '여아 희귀': scenarios.slice(8, 11),
  '남아 희귀': scenarios.slice(11, 14)
}

Object.entries(groups).forEach(([groupName, groupScenarios]) => {
  console.log(`\n[${groupName}]`)
  const groupResults = groupScenarios.map(s => ({
    name: s.name,
    names: results[s.name]
  }))

  let hasDup = false
  for (let i = 0; i < groupResults.length; i++) {
    for (let j = i + 1; j < groupResults.length; j++) {
      const names1 = groupResults[i].names.sort().join(',')
      const names2 = groupResults[j].names.sort().join(',')

      if (names1 === names2) {
        console.log(`  ⚠️  중복: ${groupResults[i].name.split(' - ')[1]} = ${groupResults[j].name.split(' - ')[1]}`)
        console.log(`       → ${groupResults[i].names.join(', ')}`)
        hasDup = true
      }
    }
  }

  if (!hasDup) {
    console.log(`  ✅ 모두 다른 결과`)
  }
})

// 전체 통계
console.log('\n' + '='.repeat(80))
console.log('전체 통계')
console.log('='.repeat(80))
const uniqueResults = new Set(Object.values(results).map(r => r.sort().join(',')))
console.log(`총 테스트: ${scenarios.length}개`)
console.log(`고유 결과: ${uniqueResults.size}개`)
console.log(`중복률: ${((scenarios.length - uniqueResults.size) / scenarios.length * 100).toFixed(1)}%`)

if (uniqueResults.size === scenarios.length) {
  console.log(`\n✅ 완벽! 모든 조합이 다른 결과를 생성합니다!`)
} else {
  console.log(`\n⚠️  ${scenarios.length - uniqueResults.size}개의 중복이 있습니다.`)
}

console.log('\n' + '='.repeat(80))
