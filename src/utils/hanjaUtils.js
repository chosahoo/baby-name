import { hanjaByReading, generateHanjaCombinations, strokeFortune } from '../data/hanjaData'

// 한자 조합의 오행 조화도 계산
export function calculateElementHarmony(elements) {
  if (!elements || elements.length < 2) return 80

  // 오행 상생 관계
  const sangsaeng = {
    '목(木)': '화(火)',
    '화(火)': '토(土)',
    '토(土)': '금(金)',
    '금(金)': '수(水)',
    '수(水)': '목(木)'
  }

  // 오행 상극 관계
  const sanggeuk = {
    '목(木)': '토(土)',
    '토(土)': '수(水)',
    '수(水)': '화(火)',
    '화(火)': '금(金)',
    '금(金)': '목(木)'
  }

  let harmonyScore = 80

  // 연속된 원소들 간의 관계 확인
  for (let i = 0; i < elements.length - 1; i++) {
    const current = elements[i]
    const next = elements[i + 1]

    // 상생 관계면 +10점
    if (sangsaeng[current] === next) {
      harmonyScore += 10
    }
    // 상극 관계면 -15점
    else if (sanggeuk[current] === next) {
      harmonyScore -= 15
    }
    // 같은 원소면 +5점
    else if (current === next) {
      harmonyScore += 5
    }
  }

  return Math.max(50, Math.min(100, harmonyScore))
}

// 오격 계산 (성명학의 5가지 격)
export function calculateOgyeok(surname, givenName) {
  const surnameStrokes = getStrokesForSurname(surname)
  const nameStrokes = givenName.details.map(d => d.strokes)

  // 1. 천격 (天格): 성의 획수 합 (조상운)
  const cheon = surnameStrokes

  // 2. 인격 (人格): 성의 마지막 글자 + 이름의 첫 글자 (주운, 성격)
  const in_ = surnameStrokes + nameStrokes[0]

  // 3. 지격 (地格): 이름의 획수 합 (초년운, 0~35세)
  const ji = nameStrokes.reduce((sum, s) => sum + s, 0)

  // 4. 외격 (外格): 총격 - 인격 (대인관계, 사회성)
  const total = cheon + ji
  const oe = total - in_

  // 5. 총격 (總格): 모든 획수의 합 (전체 운세)
  const chong = total

  return {
    천격: { strokes: cheon, fortune: strokeFortune[cheon % 81] || strokeFortune[50] },
    인격: { strokes: in_, fortune: strokeFortune[in_ % 81] || strokeFortune[50] },
    지격: { strokes: ji, fortune: strokeFortune[ji % 81] || strokeFortune[50] },
    외격: { strokes: oe, fortune: strokeFortune[oe % 81] || strokeFortune[50] },
    총격: { strokes: chong, fortune: strokeFortune[chong % 81] || strokeFortune[50] }
  }
}

// 성씨별 획수 데이터
const surnameStrokes = {
  '김': 8, '이': 7, '박': 11, '최': 11, '정': 8, '강': 11, '조': 10,
  '윤': 4, '장': 11, '임': 8, '한': 17, '오': 8, '서': 9, '신': 10,
  '권': 18, '황': 12, '안': 6, '송': 14, '전': 9, '홍': 10, '유': 9,
  '고': 10, '문': 4, '양': 17, '손': 10, '배': 11, '백': 11, '허': 11,
  '남': 9, '심': 13, '노': 19, '하': 10, '곽': 15, '성': 11, '차': 10,
  '주': 9, '우': 10, '구': 10, '라': 21
}

function getStrokesForSurname(surname) {
  return surnameStrokes[surname] || 10
}

// 한자 조합에 대한 종합 점수 계산
export function scoreHanjaCombination(combination, surname = '김') {
  let score = 70 // 기본 점수

  // 1. 오행 조화도 (30점)
  const elementHarmony = calculateElementHarmony(combination.elements)
  score += (elementHarmony - 80) * 0.3

  // 2. 획수 길흉 (30점)
  const ogyeok = calculateOgyeok(surname, combination)
  const fortuneScores = {
    '대길': 10,
    '길': 7,
    '평': 5,
    '흉': 2
  }

  const avgFortuneScore = (
    fortuneScores[ogyeok.인격.fortune?.fortune || '평'] +
    fortuneScores[ogyeok.지격.fortune?.fortune || '평'] +
    fortuneScores[ogyeok.총격.fortune?.fortune || '평']
  ) / 3

  score += avgFortuneScore * 3

  // 3. 의미의 긍정성 (20점)
  const positiveMeanings = ['아름다', '밝', '빛', '지혜', '슬기', '복', '덕', '기쁨', '평화', '성공', '영화']
  let meaningScore = 0
  for (const word of positiveMeanings) {
    if (combination.meaning.includes(word)) {
      meaningScore += 4
    }
  }
  score += Math.min(20, meaningScore)

  // 4. 획수 균형 (20점)
  const strokes = combination.details.map(d => d.strokes)
  const avgStroke = strokes.reduce((a, b) => a + b, 0) / strokes.length
  const variance = strokes.reduce((sum, s) => sum + Math.pow(s - avgStroke, 2), 0) / strokes.length
  const balanceScore = 20 - Math.min(20, variance / 2)
  score += balanceScore

  return Math.round(Math.max(60, Math.min(100, score)))
}

// 이름의 한자 조합을 점수순으로 정렬
export function getRecommendedHanjaCombinations(koreanName, surname = '김', maxResults = 5) {
  const combinations = generateHanjaCombinations(koreanName, 20)

  if (combinations.length === 0) {
    return []
  }

  // 각 조합에 점수 부여
  const scoredCombinations = combinations.map(combo => ({
    ...combo,
    score: scoreHanjaCombination(combo, surname),
    ogyeok: calculateOgyeok(surname, combo),
    elementHarmony: calculateElementHarmony(combo.elements)
  }))

  // 점수순 정렬
  scoredCombinations.sort((a, b) => b.score - a.score)

  return scoredCombinations.slice(0, maxResults)
}

// 특정 한자 조합에 대한 상세 분석
export function analyzeHanjaName(koreanName, hanjaName, surname = '김') {
  // 한자를 하나씩 분해
  const hanjaChars = hanjaName.split('')
  const koreanChars = koreanName.split('')

  if (hanjaChars.length !== koreanChars.length) {
    return null
  }

  const details = []
  let totalStrokes = 0
  const elements = []

  for (let i = 0; i < hanjaChars.length; i++) {
    const hanja = hanjaChars[i]
    const korean = koreanChars[i]
    const options = hanjaByReading[korean] || []
    const match = options.find(opt => opt.hanja === hanja)

    if (match) {
      details.push({
        char: hanja,
        reading: korean,
        meaning: match.meaning,
        strokes: match.strokes,
        element: match.element
      })
      totalStrokes += match.strokes
      elements.push(match.element)
    } else {
      return null
    }
  }

  const combination = {
    hanja: hanjaName,
    meaning: details.map(d => d.meaning).join(' '),
    totalStrokes,
    elements,
    details
  }

  return {
    ...combination,
    score: scoreHanjaCombination(combination, surname),
    ogyeok: calculateOgyeok(surname, combination),
    elementHarmony: calculateElementHarmony(elements)
  }
}

// 한글 이름에 사용 가능한 한자가 있는지 확인
export function hasAvailableHanja(koreanName) {
  const chars = koreanName.split('')
  return chars.every(char => hanjaByReading[char] && hanjaByReading[char].length > 0)
}

// 특정 음절에 사용 가능한 한자 목록 가져오기
export function getHanjaOptions(syllable) {
  return hanjaByReading[syllable] || []
}
