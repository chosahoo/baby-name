import { useState, useEffect } from 'react'
import { hanjaDatabase, strokeFortune, nameStatistics } from '../data/namesData'
import ShareModal from '../components/ShareModal'

function NameDetailPage({ onBack, initialNameData = null, onNavigate }) {
  const [searchName, setSearchName] = useState(initialNameData?.name || '')
  const [result, setResult] = useState(null)
  const [shareModalOpen, setShareModalOpen] = useState(false)

  // initialNameData가 있으면 자동으로 분석
  useEffect(() => {
    if (initialNameData) {
      analyzeName(initialNameData.name)
    }
  }, [initialNameData])

  // 어울리는 성씨 계산 함수
  const calculateCompatibleSurnames = (hanjaChars, totalStrokes, elements) => {
    // 한국 주요 성씨와 획수
    const koreanSurnames = {
      '김': { strokes: 8, element: '금(金)' },
      '이': { strokes: 7, element: '목(木)' },
      '박': { strokes: 5, element: '목(木)' },
      '최': { strokes: 11, element: '화(火)' },
      '정': { strokes: 9, element: '화(火)' },
      '강': { strokes: 11, element: '수(水)' },
      '조': { strokes: 10, element: '화(火)' },
      '윤': { strokes: 10, element: '토(土)' },
      '장': { strokes: 11, element: '화(火)' },
      '임': { strokes: 8, element: '목(木)' },
      '한': { strokes: 12, element: '수(水)' },
      '오': { strokes: 8, element: '토(土)' },
      '서': { strokes: 7, element: '금(金)' },
      '신': { strokes: 10, element: '금(金)' },
      '권': { strokes: 18, element: '목(木)' },
      '황': { strokes: 12, element: '토(土)' },
      '안': { strokes: 6, element: '토(土)' },
      '송': { strokes: 9, element: '목(木)' },
      '전': { strokes: 9, element: '화(火)' },
      '홍': { strokes: 9, element: '수(水)' }
    }

    // 오행 상생 관계
    const sangsaeng = {
      '목(木)': '화(火)', '화(火)': '토(土)', '토(土)': '금(金)',
      '금(金)': '수(水)', '수(水)': '목(木)'
    }

    const firstElement = elements[0] || '목(木)'
    const goodSurnames = []

    // 각 성씨 점수 계산
    Object.entries(koreanSurnames).forEach(([surname, data]) => {
      let score = 0

      // 1. 오행 상생 (가장 중요)
      if (sangsaeng[data.element] === firstElement) {
        score += 30 // 성씨가 이름을 생함
      } else if (data.element === firstElement) {
        score += 15 // 같은 오행
      }

      // 2. 획수 조화 (성명학 오격)
      const cheonStrokes = data.strokes
      const inStrokes = data.strokes + (hanjaChars[0]?.strokes || 0)

      // 천격, 인격 길흉 확인
      const cheonFortune = strokeFortune[cheonStrokes]?.fortune || '평'
      const inFortune = strokeFortune[inStrokes]?.fortune || '평'

      if (cheonFortune === '대길' || cheonFortune === '길') score += 15
      if (inFortune === '대길' || inFortune === '길') score += 20

      // 3. 발음 조화
      const lastChar = surname[surname.length - 1]
      const firstChar = hanjaChars[0]?.reading || ''

      // 받침 조화 체크
      const lastCharCode = lastChar.charCodeAt(0) - 0xAC00
      const hasBatchim = lastCharCode >= 0 && lastCharCode <= 11171 && (lastCharCode % 28 !== 0)

      if (!hasBatchim || !['ㄱ', 'ㄷ', 'ㅂ', 'ㅈ'].some(ch => firstChar.startsWith(ch))) {
        score += 10 // 발음이 부드러움
      }

      goodSurnames.push({ surname, score })
    })

    // 점수 순으로 정렬하고 상위 5개 선택
    return goodSurnames
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(item => item.surname)
  }

  // 주의할 성씨 계산 함수
  const calculateIncompatibleSurnames = (hanjaChars, totalStrokes, elements) => {
    // 한국 주요 성씨와 획수
    const koreanSurnames = {
      '김': { strokes: 8, element: '금(金)' },
      '이': { strokes: 7, element: '목(木)' },
      '박': { strokes: 5, element: '목(木)' },
      '최': { strokes: 11, element: '화(火)' },
      '정': { strokes: 9, element: '화(火)' },
      '강': { strokes: 11, element: '수(水)' },
      '조': { strokes: 10, element: '화(火)' },
      '윤': { strokes: 10, element: '토(土)' },
      '장': { strokes: 11, element: '화(火)' },
      '임': { strokes: 8, element: '목(木)' }
    }

    // 오행 상극 관계
    const sanggeuk = {
      '목(木)': '토(土)', '토(土)': '수(水)', '수(水)': '화(火)',
      '화(火)': '금(金)', '금(金)': '목(木)'
    }

    const firstElement = elements[0] || '목(木)'
    const badSurnames = []

    Object.entries(koreanSurnames).forEach(([surname, data]) => {
      let isBad = false

      // 1. 오행 상극
      if (sanggeuk[data.element] === firstElement) {
        isBad = true // 성씨가 이름을 극함
      }

      // 2. 획수 흉
      const inStrokes = data.strokes + (hanjaChars[0]?.strokes || 0)
      const inFortune = strokeFortune[inStrokes]?.fortune || '평'

      if (inFortune === '흉' || inFortune === '대흉') {
        isBad = true
      }

      if (isBad) {
        badSurnames.push(surname)
      }
    })

    // 최대 3개만 표시
    return badSurnames.slice(0, 3)
  }

  const analyzeName = (nameToAnalyze = searchName) => {
    if (!nameToAnalyze || nameToAnalyze.length === 0) return

    // 통계에서 실제 데이터 찾기
    const allNames = [...nameStatistics.girl, ...nameStatistics.boy]
    const statsData = allNames.find(n => n.name === nameToAnalyze)

    // 이름을 음절로 분리
    const syllables = nameToAnalyze.split('')

    // 한자 데이터베이스에서 각 음절의 한자 찾기
    const hanjaChars = syllables.map(syllable => {
      // 한자 데이터베이스에서 해당 음절(reading)을 가진 한자 찾기
      const hanjaEntry = Object.entries(hanjaDatabase).find(([char, data]) =>
        data.reading === syllable
      )

      if (hanjaEntry) {
        const [char, data] = hanjaEntry
        return {
          char,
          reading: data.reading,
          meaning: data.meaning,
          detailMeaning: data.detailMeaning,
          strokes: data.strokes,
          element: data.element,
          radicals: data.radicals
        }
      }

      // 데이터베이스에 없는 경우 기본값 반환
      return {
        char: '未',
        reading: syllable,
        meaning: '정보 없음',
        detailMeaning: '해당 한자 정보가 데이터베이스에 없습니다.',
        strokes: 5,
        element: '목(木)',
        radicals: '木(나무 목)'
      }
    })

    // 통계 데이터가 있으면 해당 한자 사용, 없으면 찾은 한자 사용
    const hanjaString = statsData ? statsData.hanja : hanjaChars.map(h => h.char).join('')

    // 총 획수 계산
    const totalStrokes = hanjaChars.reduce((sum, h) => sum + h.strokes, 0)
    const fortuneData = strokeFortune[totalStrokes] || { fortune: '평', fortuneMeaning: '보통의 운세' }

    // 성명학 오격 계산 (간단한 예시)
    const cheonStrokes = hanjaChars[0]?.strokes || 0
    const inStrokes = hanjaChars.length >= 2 ? hanjaChars[0].strokes + hanjaChars[1].strokes : cheonStrokes
    const jiStrokes = totalStrokes
    const waeStrokes = hanjaChars.length >= 2 ? hanjaChars[1]?.strokes || 0 : 0
    const chongStrokes = totalStrokes

    const getFortuneByStrokes = (strokes) => {
      const data = strokeFortune[strokes]
      if (!data) return '평'
      return data.fortune
    }

    // 오행 조화 분석
    const elements = hanjaChars.map(h => h.element)
    const getHarmony = (elem1, elem2) => {
      if (!elem1 || !elem2) return { harmony: '평', description: '오행 정보 없음' }

      // 상생: 목생화, 화생토, 토생금, 금생수, 수생목
      const sangsaeng = {
        '목(木)': '화(火)', '화(火)': '토(土)', '토(土)': '금(金)',
        '금(金)': '수(水)', '수(水)': '목(木)'
      }

      if (sangsaeng[elem1] === elem2) {
        return { harmony: '상생', description: `${elem1}이 ${elem2}를 생하는 조화로운 관계입니다` }
      }

      // 상극: 목극토, 토극수, 수극화, 화극금, 금극목
      const sanggeuk = {
        '목(木)': '토(土)', '토(土)': '수(水)', '수(水)': '화(火)',
        '화(火)': '금(金)', '금(金)': '목(木)'
      }

      if (sanggeuk[elem1] === elem2) {
        return { harmony: '상극', description: `${elem1}이 ${elem2}를 극하는 긴장된 관계입니다` }
      }

      return { harmony: '평', description: `${elem1}과 ${elem2}의 평범한 관계입니다` }
    }

    const ohaengAnalysis = elements.length >= 2
      ? getHarmony(elements[0], elements[1])
      : { harmony: '평', description: '단음절 이름' }

    // 로마자 표기 (국립국어원 표기법 기준)
    const romanizationMap = {
      // 초성
      'ㄱ': 'g', 'ㄲ': 'kk', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄸ': 'tt',
      'ㄹ': 'r', 'ㅁ': 'm', 'ㅂ': 'b', 'ㅃ': 'pp',
      'ㅅ': 's', 'ㅆ': 'ss', 'ㅇ': '', 'ㅈ': 'j', 'ㅉ': 'jj',
      'ㅊ': 'ch', 'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h',
      // 중성
      'ㅏ': 'a', 'ㅐ': 'ae', 'ㅑ': 'ya', 'ㅒ': 'yae',
      'ㅓ': 'eo', 'ㅔ': 'e', 'ㅕ': 'yeo', 'ㅖ': 'ye',
      'ㅗ': 'o', 'ㅘ': 'wa', 'ㅙ': 'wae', 'ㅚ': 'oe',
      'ㅛ': 'yo', 'ㅜ': 'u', 'ㅝ': 'wo', 'ㅞ': 'we',
      'ㅟ': 'wi', 'ㅠ': 'yu', 'ㅡ': 'eu', 'ㅢ': 'ui', 'ㅣ': 'i',
      // 종성
      'ㄱ_': 'k', 'ㄲ_': 'k', 'ㄳ_': 'k', 'ㄴ_': 'n', 'ㄵ_': 'n',
      'ㄶ_': 'n', 'ㄷ_': 't', 'ㄹ_': 'l', 'ㄺ_': 'k', 'ㄻ_': 'm',
      'ㄼ_': 'p', 'ㄽ_': 'l', 'ㄾ_': 'l', 'ㄿ_': 'p', 'ㅀ_': 'l',
      'ㅁ_': 'm', 'ㅂ_': 'p', 'ㅄ_': 'p', 'ㅅ_': 't', 'ㅆ_': 't',
      'ㅇ_': 'ng', 'ㅈ_': 't', 'ㅊ_': 't', 'ㅋ_': 'k', 'ㅌ_': 't',
      'ㅍ_': 'p', 'ㅎ_': 't'
    }

    // 한글을 자음/모음으로 분해하는 함수
    const decomposeHangul = (char) => {
      const code = char.charCodeAt(0) - 0xAC00
      if (code < 0 || code > 11171) return null

      const cho = Math.floor(code / 588)
      const jung = Math.floor((code % 588) / 28)
      const jong = code % 28

      const choSeong = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ']
      const jungSeong = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ']
      const jongSeong = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ']

      return {
        cho: choSeong[cho],
        jung: jungSeong[jung],
        jong: jongSeong[jong]
      }
    }

    // 로마자로 변환
    const romanize = (name) => {
      let result = ''
      for (let i = 0; i < name.length; i++) {
        const decomp = decomposeHangul(name[i])
        if (decomp) {
          // 초성: ㅇ은 빈 문자열이므로 hasOwnProperty로 확인
          const choRoman = romanizationMap.hasOwnProperty(decomp.cho)
            ? romanizationMap[decomp.cho]
            : decomp.cho
          result += choRoman

          // 중성
          result += romanizationMap[decomp.jung] || decomp.jung

          // 종성
          if (decomp.jong) {
            const jongKey = decomp.jong + '_'
            const jongRoman = romanizationMap.hasOwnProperty(jongKey)
              ? romanizationMap[jongKey]
              : decomp.jong
            result += jongRoman
          }
        }
      }
      // 첫 글자만 대문자로
      return result.charAt(0).toUpperCase() + result.slice(1)
    }

    const romanization = romanize(nameToAnalyze)

    // 형제자매 이름 추천 (첫 글자 기반)
    const firstSyllable = syllables[0]
    const siblingNames = allNames
      .filter(n => n.name.startsWith(firstSyllable) && n.name !== nameToAnalyze)
      .slice(0, 4)
      .map(n => n.name)

    setResult({
      name: nameToAnalyze,
      hanja: hanjaString,
      pronunciation: {
        korean: nameToAnalyze,
        ipa: `/${nameToAnalyze}/`,
        romanization: romanization
      },
      meaning: {
        overall: statsData?.meaning || hanjaChars.map(h => h.meaning).join(', '),
        characters: hanjaChars
      },
      saju: {
        totalStrokes: totalStrokes,
        fortune: fortuneData.fortune,
        fortuneMeaning: fortuneData.fortuneMeaning,
        elements: {
          cheon: { strokes: cheonStrokes, fortune: getFortuneByStrokes(cheonStrokes) },
          in: { strokes: inStrokes, fortune: getFortuneByStrokes(inStrokes) },
          ji: { strokes: jiStrokes, fortune: getFortuneByStrokes(jiStrokes) },
          wae: { strokes: waeStrokes, fortune: getFortuneByStrokes(waeStrokes) },
          chong: { strokes: chongStrokes, fortune: getFortuneByStrokes(chongStrokes) }
        },
        ohaeng: {
          first: elements[0] || '목(木)',
          second: elements[1] || '목(木)',
          harmony: ohaengAnalysis.harmony,
          description: ohaengAnalysis.description
        }
      },
      statistics: statsData ? {
        rank2024: statsData.ranks[2024] || null,
        count2024: statsData.count2024,
        percentage: statsData.percentage,
        trend: statsData.trend,
        history: Object.entries(statsData.ranks)
          .filter(([year, rank]) => rank !== null)
          .map(([year, rank]) => ({
            year: parseInt(year),
            rank,
            count: statsData.counts[year] || statsData.count2024
          }))
      } : null,
      compatibility: {
        goodSurnames: calculateCompatibleSurnames(hanjaChars, totalStrokes, elements),
        badSurnames: calculateIncompatibleSurnames(hanjaChars, totalStrokes, elements),
        siblingNames: siblingNames.length > 0 ? siblingNames : ['추천 데이터 없음']
      },
      celebrities: [] // 실제 API 연동 필요
    })
  }

  const getElementColor = (element) => {
    if (element.includes('금')) return 'bg-yellow-100 text-yellow-700'
    if (element.includes('목')) return 'bg-green-100 text-green-700'
    if (element.includes('수')) return 'bg-blue-100 text-blue-700'
    if (element.includes('화')) return 'bg-red-100 text-red-700'
    if (element.includes('토')) return 'bg-orange-100 text-orange-700'
    return 'bg-gray-100 text-gray-700'
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
              이름 상세 정보
            </h1>
            <p className="text-neutral-600">
              한자, 성명학, 통계까지 완벽 분석 🔍
            </p>
          </div>
        </div>

        {!result ? (
          <div className="space-y-4">
            <div className="card">
              <h2 className="font-semibold text-neutral-800 mb-3">
                🔍 이름 검색
              </h2>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="예: 서연"
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:border-[#E8A87C] focus:outline-none bg-white"
              />
            </div>

            <div className="card">
              <h3 className="font-semibold text-neutral-800 mb-3">📋 분석 정보</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-primary-50 rounded-lg p-3 text-neutral-700">✓ 한자 의미 및 유래</div>
                <div className="bg-primary-50 rounded-lg p-3 text-neutral-700">✓ 성명학 (획수, 오행)</div>
                <div className="bg-primary-50 rounded-lg p-3 text-neutral-700">✓ 최근 5년 통계</div>
                <div className="bg-primary-50 rounded-lg p-3 text-neutral-700">✓ 유명인 동명이인</div>
                <div className="bg-primary-50 rounded-lg p-3 text-neutral-700">✓ 발음 분석</div>
                <div className="bg-primary-50 rounded-lg p-3 text-neutral-700">✓ 조화로운 성씨</div>
              </div>
            </div>

            <button
              onClick={() => analyzeName()}
              disabled={!searchName}
              className="w-full py-4 bg-[#E8A87C] text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] hover:bg-[#D4956B] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              상세 분석하기 🔎
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 기본 정보 */}
            <div className="card bg-gradient-to-br from-primary-50 to-purple-50">
              <div className="text-center mb-4">
                <h2 className="text-4xl font-bold text-neutral-800 mb-2">
                  {result.name}
                </h2>
                <p className="text-2xl text-neutral-600 mb-2">{result.hanja}</p>
                <p className="text-lg text-neutral-700">{result.meaning.overall}</p>
              </div>

              <button
                onClick={() => setShareModalOpen(true)}
                className="w-full py-3 bg-[#E8A87C] text-white rounded-xl font-medium shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                이 이름 공유하기 📤
              </button>
            </div>

            {/* 한자 상세 */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-neutral-800">
                  📝 한자 상세 의미
                </h3>
                <span className="text-xs text-neutral-500">
                  법무부 인명용 한자
                </span>
              </div>
              <div className="space-y-3">
                {result.meaning.characters.map((char, idx) => (
                  <div key={idx} className="bg-neutral-50 rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="text-5xl font-bold text-neutral-800">
                        {char.char}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl font-bold text-neutral-800">{char.reading}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getElementColor(char.element)}`}>
                            {char.element}
                          </span>
                          <span className="text-sm text-neutral-600">
                            {char.strokes}획
                          </span>
                        </div>
                        <p className="font-semibold mb-2 text-neutral-800">{char.meaning}</p>
                        <p className="text-sm text-neutral-600 mb-2">
                          {char.detailMeaning}
                        </p>
                        <p className="text-xs text-neutral-500">
                          부수: {char.radicals}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 성명학 */}
            <div className="card">
              <h3 className="font-semibold text-neutral-800 mb-4">
                🔮 성명학 분석
              </h3>

              <div className="bg-gradient-to-r from-purple-50 to-primary-50 rounded-xl p-4 mb-4">
                <div className="text-center">
                  <p className="text-xs text-neutral-600 mb-1">총획 길흉</p>
                  <p className="text-2xl font-bold text-purple-600 mb-1">
                    {result.saju.fortune}
                  </p>
                  <p className="text-sm text-neutral-700">{result.saju.fortuneMeaning}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {Object.entries(result.saju.elements).map(([key, data]) => (
                  <div key={key} className="bg-neutral-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-neutral-600 mb-1">
                      {key === 'cheon' ? '천격' :
                       key === 'in' ? '인격' :
                       key === 'ji' ? '지격' :
                       key === 'wae' ? '외격' : '총격'}
                    </p>
                    <p className="text-lg font-bold text-neutral-800">{data.strokes}획</p>
                    <p className={`text-xs font-medium ${
                      data.fortune.includes('대길') ? 'text-green-600' :
                      data.fortune.includes('길') ? 'text-blue-600' :
                      'text-red-600'
                    }`}>
                      {data.fortune}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-purple-50 rounded-xl p-4">
                <p className="font-semibold mb-3 text-neutral-800">☯️ 오행 조화</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getElementColor(result.saju.ohaeng.first)}`}>
                    {result.saju.ohaeng.first}
                  </span>
                  <span className="text-xl">→</span>
                  <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getElementColor(result.saju.ohaeng.second)}`}>
                    {result.saju.ohaeng.second}
                  </span>
                  <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    result.saju.ohaeng.harmony === '상생' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {result.saju.ohaeng.harmony}
                  </span>
                </div>
                <p className="text-sm text-neutral-600">
                  {result.saju.ohaeng.description}
                </p>
              </div>
            </div>

            {/* 통계 */}
            {result.statistics && (
              <div className="card">
                <h3 className="font-semibold text-neutral-800 mb-4">
                  📊 인기도 통계 (2024)
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-primary-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-neutral-600 mb-1">2024년 순위</p>
                    <p className="text-2xl font-bold text-primary-600">
                      {result.statistics.rank2024 ? `${result.statistics.rank2024}위` : '순위권 외'}
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-neutral-600 mb-1">2024년 인원</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {result.statistics.count2024 ? result.statistics.count2024.toLocaleString() : '-'}
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-neutral-600 mb-1">점유율</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {result.statistics.percentage}%
                    </p>
                  </div>
                </div>

                {result.statistics.history && result.statistics.history.length > 0 && (
                  <div className="bg-neutral-50 rounded-xl p-4">
                    <p className="font-semibold mb-3 text-neutral-800">연도별 순위</p>
                    <div className="space-y-2">
                      {result.statistics.history.map((item) => (
                        <div key={item.year} className="flex items-center gap-2">
                          <span className="text-xs text-neutral-600 w-10">{item.year}</span>
                          <div className="flex-1 bg-white rounded-full h-6 relative">
                            <div
                              className="bg-gradient-to-r from-[#E8A87C] to-purple-400 h-6 rounded-full"
                              style={{ width: `${Math.min((item.count / 2000) * 100, 100)}%` }}
                            />
                            <span
                              className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-800"
                              style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8), -1px -1px 2px rgba(255,255,255,0.8)' }}
                            >
                              {item.rank}위
                            </span>
                          </div>
                          <span className="text-xs text-neutral-600 w-16 text-right">
                            {item.count.toLocaleString()}명
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 발음 분석 */}
            <div className="card">
              <h3 className="font-semibold text-neutral-800 mb-4">
                🗣️ 발음 분석
              </h3>
              <div className="space-y-3">
                <div className="bg-neutral-50 rounded-xl p-4">
                  <p className="text-xs text-neutral-600 mb-1">한글</p>
                  <p className="text-2xl font-bold text-neutral-800">{result.pronunciation.korean}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-xs text-neutral-600 mb-1">로마자 표기</p>
                  <p className="text-xl font-semibold text-blue-800">{result.pronunciation.romanization}</p>
                  <p className="text-xs text-neutral-600 mt-2">국립국어원 표기법 기준</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-xs text-neutral-600 mb-2">발음 특징</p>
                  <div className="space-y-1 text-sm text-neutral-700">
                    {result.name.length === 2 && (
                      <p>• 2글자로 짧고 부르기 쉬운 이름입니다</p>
                    )}
                    {result.name.length === 3 && (
                      <p>• 3글자로 전통적인 느낌의 이름입니다</p>
                    )}
                    {result.name.match(/[아연윤은유]/) && (
                      <p>• 부드러운 발음으로 듣기 좋은 이름입니다</p>
                    )}
                    {!result.name.match(/[ㄲㄸㅃㅆㅉ]/) && (
                      <p>• 외국인도 발음하기 쉬운 이름입니다</p>
                    )}
                    {result.name.match(/[ㄲㄸㅃㅆㅉ]/) && (
                      <p>• 쌍자음이 포함되어 발음에 주의가 필요합니다</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 조화도 */}
            <div className="card">
              <h3 className="font-semibold text-neutral-800 mb-4">
                💕 조화로운 조합
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-neutral-700 mb-2">✅ 어울리는 성씨</p>
                  <div className="flex flex-wrap gap-2">
                    {result.compatibility.goodSurnames.map((surname, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        {surname}{result.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-700 mb-2">❌ 주의할 성씨</p>
                  <div className="flex flex-wrap gap-2">
                    {result.compatibility.badSurnames.map((surname, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                        {surname}{result.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-700 mb-2">👨‍👩‍👧 형제자매로 좋은 이름</p>
                  <div className="flex flex-wrap gap-2">
                    {result.compatibility.siblingNames.map((name, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 유명인 */}
            {result.celebrities && result.celebrities.length > 0 && (
              <div className="card">
                <h3 className="font-semibold text-neutral-800 mb-4">
                  🌟 같은 이름 유명인
                </h3>
                <div className="space-y-2">
                  {result.celebrities.map((celeb, idx) => (
                    <div key={idx} className="bg-neutral-50 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-neutral-800">{celeb.name}</span>
                        <span className="text-xs text-neutral-600 bg-white px-2 py-1 rounded">{celeb.field}</span>
                      </div>
                      <p className="text-sm text-neutral-600">{celeb.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setResult(null)}
                className="flex-1 py-3 bg-neutral-100 text-neutral-800 rounded-xl font-medium hover:bg-neutral-200 transition-colors active:scale-95"
              >
                다른 이름 검색
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

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        nameData={result ? {
          name: result.name,
          hanja: result.hanja,
          meaning: result.meaning?.overall || result.meaning,
          detailedInfo: result.saju ? {
            characters: result.meaning.characters,
            totalStrokes: result.saju.totalStrokes,
            fortune: {
              description: result.saju.fortuneMeaning
            },
            compatibleSurnames: result.compatibility.goodSurnames.map(surname => ({ surname })),
            statistics: result.statistics ? {
              rank2024: result.statistics.rank2024,
              count: result.statistics.count2024
            } : null
          } : null
        } : null}
      />
    </div>
  )
}

export default NameDetailPage
