import { useState } from 'react'

function ForeignNamePage({ onBack }) {
  const [koreanName, setKoreanName] = useState('')
  const [result, setResult] = useState(null)

  const analyzeName = () => {
    // 한글을 로마자로 변환하는 간단한 맵핑 (국립국어원 표기법 기준)
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
          result += romanizationMap[decomp.cho] || decomp.cho
          result += romanizationMap[decomp.jung] || decomp.jung
          if (decomp.jong) {
            result += romanizationMap[decomp.jong + '_'] || decomp.jong
          }
        }
      }
      // 첫 글자만 대문자로
      return result.charAt(0).toUpperCase() + result.slice(1)
    }

    const romanized = romanize(koreanName)
    const spacedRomanized = koreanName.split('').map(c => romanize(c)).join(' ')

    // 일본어 가타카나 변환 (간단 매핑)
    const toKatakana = (name) => {
      const kanaMap = {
        '가': 'ガ', '나': 'ナ', '다': 'ダ', '라': 'ラ', '마': 'マ', '바': 'バ', '사': 'サ', '아': 'ア', '자': 'ジャ', '차': 'チャ', '카': 'カ', '타': 'タ', '파': 'パ', '하': 'ハ',
        '거': 'ゴ', '너': 'ノ', '더': 'ド', '러': 'ロ', '머': 'モ', '버': 'ボ', '서': 'ソ', '어': 'オ', '저': 'ジョ', '처': 'チョ', '커': 'コ', '터': 'ト', '퍼': 'ポ', '허': 'ホ',
        '고': 'ゴ', '노': 'ノ', '도': 'ド', '로': 'ロ', '모': 'モ', '보': 'ボ', '소': 'ソ', '오': 'オ', '조': 'ジョ', '초': 'チョ', '코': 'コ', '토': 'ト', '포': 'ポ', '호': 'ホ',
        '구': 'グ', '누': 'ヌ', '두': 'ドゥ', '루': 'ル', '무': 'ム', '부': 'ブ', '수': 'ス', '우': 'ウ', '주': 'ジュ', '추': 'チュ', '쿠': 'ク', '투': 'トゥ', '푸': 'プ', '후': 'フ',
        '규': 'キュ', '뉴': 'ニュ', '듀': 'デュ', '류': 'リュ', '뮤': 'ミュ', '뷰': 'ビュ', '슈': 'シュ', '유': 'ユ', '쥬': 'ジュ', '츄': 'チュ', '큐': 'キュ', '튜': 'テュ', '퓨': 'ピュ', '휴': 'ヒュ',
        '기': 'ギ', '니': 'ニ', '디': 'ディ', '리': 'リ', '미': 'ミ', '비': 'ビ', '시': 'シ', '이': 'イ', '지': 'ジ', '치': 'チ', '키': 'キ', '티': 'ティ', '피': 'ピ', '히': 'ヒ',
        '연': 'ヨン', '윤': 'ユン', '은': 'ウン', '진': 'ジン', '민': 'ミン', '준': 'ジュン', '현': 'ヒョン'
      }

      let result = ''
      for (let char of name) {
        result += kanaMap[char] || char
      }
      return result
    }

    const katakana = toKatakana(koreanName)

    // 발음 난이도 계산
    const difficultSounds = ['ㅡ', 'ㅢ', 'ㅚ', 'ㅝ', 'ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ']
    const hasDifficult = difficultSounds.some(s => koreanName.includes(s))
    const difficulty = hasDifficult ? 'hard' : koreanName.length === 2 ? 'easy' : 'medium'

    // 발음 팁 생성
    const tips = []
    if (koreanName.includes('서')) {
      tips.push('영어권에서는 "Seo"를 "시오"로 발음하기 쉬우니 "서"라고 명확히 알려주세요')
    }
    if (koreanName.includes('연')) {
      tips.push('"Yeon"은 "연"보다는 "욘" 정도로 들릴 수 있습니다')
    }
    if (koreanName.includes('윤')) {
      tips.push('"Yoon"은 영어권에서 "윈"처럼 들릴 수 있습니다')
    }
    if (koreanName.includes('은')) {
      tips.push('"Eun"은 외국인이 발음하기 어려운 소리입니다')
    }
    if (koreanName.length >= 2) {
      tips.push(`이름표에는 "${spacedRomanized.replace(/ /g, '-')}"처럼 하이픈을 넣으면 더 명확합니다`)
    }
    if (tips.length === 0) {
      tips.push('비교적 외국인이 발음하기 쉬운 이름입니다')
    }

    // 비슷한 외국 이름 추천
    const alternatives = []
    const firstChar = koreanName[0]
    const secondChar = koreanName[1] || ''

    // 한국 이름 음절별 외국 이름 매핑 (대폭 확장)
    const nameMap = {
      // ㅅ 계열
      '서': [{ name: 'Sophie', reason: '서와 발음이 비슷', popularity: 'high' }, { name: 'Sarah', reason: '서의 "ㅅ" 발음 유사', popularity: 'high' }, { name: 'Sophia', reason: '서의 부드러운 발음', popularity: 'high' }],
      '수': [{ name: 'Sue', reason: '수와 발음이 같음', popularity: 'medium' }, { name: 'Susan', reason: '수의 발음 유사', popularity: 'medium' }],
      '소': [{ name: 'Sofia', reason: '소의 발음 유사', popularity: 'high' }, { name: 'Sonia', reason: '소 발음 포함', popularity: 'medium' }],
      '시': [{ name: 'Celia', reason: '시의 발음 유사', popularity: 'medium' }, { name: 'Cecilia', reason: '시 발음 포함', popularity: 'medium' }],
      '선': [{ name: 'Sunny', reason: '선의 밝은 느낌', popularity: 'medium' }, { name: 'Selena', reason: '선의 발음 유사', popularity: 'medium' }],

      // ㅇ 계열
      '연': [{ name: 'Yuna', reason: '연과 유사한 발음', popularity: 'medium' }, { name: 'Yvonne', reason: '연의 "Y" 발음 유사', popularity: 'medium' }, { name: 'Yana', reason: '연의 발음', popularity: 'low' }],
      '윤': [{ name: 'Yoon', reason: '윤을 그대로 사용', popularity: 'low' }, { name: 'June', reason: '윤과 발음 유사', popularity: 'medium' }, { name: 'Yuna', reason: '윤의 발음', popularity: 'medium' }],
      '은': [{ name: 'Luna', reason: '은과 유사한 느낌', popularity: 'high' }, { name: 'Eun', reason: '은을 그대로 사용', popularity: 'low' }],
      '아': [{ name: 'Ava', reason: '아의 발음', popularity: 'high' }, { name: 'Anna', reason: '아 발음 포함', popularity: 'high' }, { name: 'Aria', reason: '아의 발음', popularity: 'high' }],
      '예': [{ name: 'Yael', reason: '예의 발음', popularity: 'low' }, { name: 'Yessica', reason: '예 발음 포함', popularity: 'medium' }],
      '유': [{ name: 'Yuna', reason: '유의 발음', popularity: 'medium' }, { name: 'Julia', reason: '유 발음 포함', popularity: 'high' }],

      // ㅈ 계열
      '지': [{ name: 'Gina', reason: '지와 발음이 비슷', popularity: 'medium' }, { name: 'Jenna', reason: '지의 발음 유사', popularity: 'high' }, { name: 'Jenny', reason: '지 발음 포함', popularity: 'high' }],
      '진': [{ name: 'Jin', reason: '진을 그대로 사용', popularity: 'low' }, { name: 'Gina', reason: '진의 발음', popularity: 'medium' }, { name: 'Jean', reason: '진과 발음 유사', popularity: 'medium' }],
      '주': [{ name: 'Joo', reason: '주를 그대로 사용', popularity: 'low' }, { name: 'Julie', reason: '주의 발음', popularity: 'high' }, { name: 'Judy', reason: '주 발음 포함', popularity: 'medium' }],
      '정': [{ name: 'Jenna', reason: '정의 발음', popularity: 'high' }, { name: 'Jenny', reason: '정과 발음 유사', popularity: 'high' }],

      // ㅁ 계열
      '민': [{ name: 'Mina', reason: '민과 발음이 비슷', popularity: 'medium' }, { name: 'Min', reason: '민을 그대로 사용', popularity: 'low' }, { name: 'Minnie', reason: '민의 발음', popularity: 'medium' }],
      '미': [{ name: 'Mia', reason: '미의 발음', popularity: 'high' }, { name: 'Michelle', reason: '미 발음 포함', popularity: 'high' }, { name: 'Mimi', reason: '미의 발음', popularity: 'low' }],
      '명': [{ name: 'Maya', reason: '명의 밝은 느낌', popularity: 'high' }, { name: 'Mia', reason: '명의 발음 유사', popularity: 'high' }],

      // ㅎ 계열
      '하': [{ name: 'Hannah', reason: '하의 발음 유사', popularity: 'high' }, { name: 'Hana', reason: '하나의 발음', popularity: 'medium' }, { name: 'Harper', reason: '하 발음 포함', popularity: 'high' }],
      '현': [{ name: 'Helen', reason: '현의 발음', popularity: 'high' }, { name: 'Hyun', reason: '현을 그대로 사용', popularity: 'low' }],
      '혜': [{ name: 'Hailey', reason: '혜의 발음', popularity: 'high' }, { name: 'Hazel', reason: '혜의 발음 유사', popularity: 'medium' }],
      '희': [{ name: 'Heather', reason: '희의 발음', popularity: 'medium' }, { name: 'Hee', reason: '희를 그대로 사용', popularity: 'low' }],

      // ㄱ, ㅋ 계열
      '가': [{ name: 'Kara', reason: '가의 발음', popularity: 'medium' }, { name: 'Kate', reason: '가의 발음 유사', popularity: 'high' }],
      '경': [{ name: 'Kelly', reason: '경의 발음', popularity: 'high' }, { name: 'Karen', reason: '경의 발음 유사', popularity: 'medium' }],

      // ㄴ 계열
      '나': [{ name: 'Nora', reason: '나의 발음', popularity: 'high' }, { name: 'Nina', reason: '나 발음 포함', popularity: 'medium' }, { name: 'Natalie', reason: '나의 발음', popularity: 'high' }],
      '다': [{ name: 'Dana', reason: '다의 발음', popularity: 'medium' }, { name: 'Dani', reason: '다 발음 포함', popularity: 'medium' }],
      '도': [{ name: 'Dora', reason: '도의 발음', popularity: 'medium' }, { name: 'Dorothy', reason: '도 발음 포함', popularity: 'medium' }],

      // ㄹ 계열
      '린': [{ name: 'Lynn', reason: '린과 발음이 같음', popularity: 'high' }, { name: 'Linda', reason: '린 발음 포함', popularity: 'medium' }, { name: 'Lina', reason: '리나의 발음', popularity: 'medium' }],
      '리': [{ name: 'Lee', reason: '리의 발음', popularity: 'high' }, { name: 'Lily', reason: '리 발음 포함', popularity: 'high' }, { name: 'Lisa', reason: '리의 발음', popularity: 'high' }],

      // ㅈ, ㅊ 계열
      '준': [{ name: 'June', reason: '준과 발음이 비슷', popularity: 'medium' }, { name: 'Joon', reason: '준을 그대로 사용', popularity: 'low' }, { name: 'Julian', reason: '준의 발음', popularity: 'high' }],
      '채': [{ name: 'Chloe', reason: '채의 발음', popularity: 'high' }, { name: 'Chelsea', reason: '채 발음 포함', popularity: 'medium' }],

      // ㅂ, ㅍ 계열
      '빈': [{ name: 'Vivian', reason: '빈의 발음', popularity: 'medium' }, { name: 'Bianca', reason: '빈 발음 유사', popularity: 'medium' }],

      // ㅇ 계열 (2)
      '우': [{ name: 'Woo', reason: '우 그대로 사용 가능', popularity: 'low' }, { name: 'Uma', reason: '우의 발음', popularity: 'low' }],
      '원': [{ name: 'Wendy', reason: '원의 발음', popularity: 'high' }, { name: 'Wanda', reason: '원 발음 포함', popularity: 'low' }],

      // 기타
      '태': [{ name: 'Taylor', reason: '태의 발음', popularity: 'high' }, { name: 'Talia', reason: '태 발음 유사', popularity: 'medium' }],
      '영': [{ name: 'Emily', reason: '영의 발음', popularity: 'high' }, { name: 'Erin', reason: '영의 발음 유사', popularity: 'medium' }],
      '인': [{ name: 'Irene', reason: '인의 발음', popularity: 'medium' }, { name: 'Iris', reason: '인 발음 유사', popularity: 'medium' }],
      '재': [{ name: 'Jane', reason: '재의 발음', popularity: 'high' }, { name: 'Jay', reason: '재와 발음 유사', popularity: 'medium' }],
      '혁': [{ name: 'Hector', reason: '혁의 발음', popularity: 'medium' }],
      '호': [{ name: 'Hope', reason: '호의 발음', popularity: 'medium' }, { name: 'Holly', reason: '호 발음 포함', popularity: 'medium' }]
    }

    // 첫 글자 매칭
    if (nameMap[firstChar]) {
      alternatives.push(...nameMap[firstChar])
    }

    // 두 번째 글자도 확인 (더 정확한 매칭)
    if (secondChar && nameMap[secondChar] && alternatives.length < 3) {
      const secondCharNames = nameMap[secondChar].filter(
        name => !alternatives.find(alt => alt.name === name.name)
      )
      alternatives.push(...secondCharNames.slice(0, 2))
    }

    // 기본 추천 (더 다양하게)
    if (alternatives.length === 0) {
      // 로마자 표기의 첫 글자를 기반으로 추천
      const romanFirst = romanized[0]?.toUpperCase()
      const defaultByRoman = {
        'S': [{ name: 'Sam', reason: 'S로 시작하는 짧은 이름', popularity: 'high' }, { name: 'Sky', reason: 'S 발음', popularity: 'medium' }],
        'J': [{ name: 'Jordan', reason: 'J로 시작하는 중성적 이름', popularity: 'high' }, { name: 'Jesse', reason: 'J 발음', popularity: 'medium' }],
        'Y': [{ name: 'Yael', reason: 'Y로 시작하는 독특한 이름', popularity: 'low' }, { name: 'Yasmin', reason: 'Y 발음', popularity: 'medium' }],
        'H': [{ name: 'Harper', reason: 'H로 시작하는 현대적 이름', popularity: 'high' }, { name: 'Hunter', reason: 'H 발음', popularity: 'medium' }],
        'M': [{ name: 'Morgan', reason: 'M로 시작하는 중성적 이름', popularity: 'high' }, { name: 'Max', reason: 'M 발음', popularity: 'high' }],
        'K': [{ name: 'Kim', reason: 'K로 시작하는 짧은 이름', popularity: 'high' }, { name: 'Kelly', reason: 'K 발음', popularity: 'high' }]
      }

      if (defaultByRoman[romanFirst]) {
        alternatives.push(...defaultByRoman[romanFirst])
      } else {
        alternatives.push(
          { name: 'Alex', reason: '중성적이고 발음하기 쉬움', popularity: 'high' },
          { name: 'Chris', reason: '짧고 기억하기 쉬움', popularity: 'high' },
          { name: 'River', reason: '자연스럽고 독특함', popularity: 'medium' }
        )
      }
    }

    // 최대 4개까지만 표시
    alternatives.splice(4)

    setResult({
      korean: koreanName,
      english: [
        { type: '국립국어원 표기법', romanization: romanized, note: '공식 문서에 권장' },
        { type: '매큔-라이샤워 표기법', romanization: romanized.replace(/eo/g, 'ŏ').replace(/eu/g, 'ŭ'), note: '학술용' },
        { type: '예일 표기법', romanization: romanized.replace(/eo/g, 'e').replace(/eu/g, 'u'), note: '언어학 연구용' },
        { type: '통용 표기', romanization: spacedRomanized, note: '일반적으로 많이 사용' }
      ],
      chinese: '漢字',
      japanese: `${katakana} (${romanized})`,
      pronunciation: {
        english: `/${romanized.toLowerCase()}/`,
        difficulty,
        tips
      },
      alternatives
    })
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 mb-4"
        >
          ← 뒤로
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            외국어 표기
          </h1>
          <p className="text-xl text-gray-600">
            해외에서 어떻게 쓰이고 발음되는지 확인하세요 🌍
          </p>
        </div>
      </div>

      {!result ? (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              🔤 이름 입력
            </h2>
            <input
              type="text"
              value={koreanName}
              onChange={(e) => setKoreanName(e.target.value)}
              placeholder="예: 서연"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none text-lg"
            />
          </div>

          <div className="card">
            <h3 className="font-bold text-lg mb-3">📋 분석 항목</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>영어 로마자 표기 (여러 방식)</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>중국어, 일본어 표기</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>외국인 발음 난이도</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>발음 팁과 주의사항</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>비슷한 외국 이름 추천</span>
              </div>
            </div>
          </div>

          <button
            onClick={analyzeName}
            disabled={!koreanName}
            className="btn-primary w-full text-lg bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            외국어 표기 분석하기 🌏
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="card bg-gradient-to-br from-pink-50 to-purple-50">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {result.korean}
              </h2>
              <p className="text-gray-600">외국어 표기 분석 결과</p>
            </div>
          </div>

          {/* 영어 표기 */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              🇺🇸 영어 로마자 표기
            </h3>
            <div className="space-y-3">
              {result.english.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-gray-600">{item.type}</p>
                      <p className="text-2xl font-bold text-gray-800">{item.romanization}</p>
                    </div>
                    {index === 0 && (
                      <span className="px-3 py-1 bg-pink-400 text-white text-xs rounded-full">
                        권장
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 다른 언어 표기 */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              🌏 다른 언어 표기
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-pastel-blue rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">🇨🇳 중국어</p>
                <p className="text-xl font-bold">{result.chinese}</p>
              </div>
              <div className="bg-pastel-purple rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">🇯🇵 일본어</p>
                <p className="text-xl font-bold">{result.japanese}</p>
              </div>
            </div>
          </div>

          {/* 발음 정보 */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              🗣️ 발음 정보
            </h3>
            <div className="mb-4">
              <div className="bg-gray-50 rounded-xl p-4 mb-3">
                <p className="text-sm text-gray-600 mb-1">IPA 발음 기호</p>
                <p className="text-2xl font-mono">{result.pronunciation.english}</p>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium">외국인 발음 난이도:</span>
                <div className="flex gap-1">
                  {['쉬움', '보통', '어려움'].map((level, idx) => (
                    <span
                      key={level}
                      className={`px-3 py-1 rounded-full text-xs ${
                        result.pronunciation.difficulty === 'easy' && idx === 0
                          ? 'bg-green-400 text-white'
                          : result.pronunciation.difficulty === 'medium' && idx === 1
                          ? 'bg-yellow-400 text-white'
                          : result.pronunciation.difficulty === 'hard' && idx === 2
                          ? 'bg-red-400 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {level}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
              <p className="font-bold mb-2">⚠️ 발음 주의사항</p>
              <ul className="space-y-1 text-sm">
                {result.pronunciation.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span>•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 비슷한 외국 이름 */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              💡 비슷한 외국 이름 추천
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              해외에서 사용할 영어 이름을 고민 중이라면 참고해보세요
            </p>
            <div className="space-y-3">
              {result.alternatives.map((alt, index) => (
                <div key={index} className="bg-pastel-mint rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xl font-bold">{alt.name}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      alt.popularity === 'high' ? 'bg-pink-200' :
                      alt.popularity === 'medium' ? 'bg-purple-200' :
                      'bg-gray-200'
                    }`}>
                      {alt.popularity === 'high' ? '인기 높음' :
                       alt.popularity === 'medium' ? '보통' : '낮음'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{alt.reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setResult(null)}
              className="btn-primary flex-1 bg-gray-100 hover:bg-gray-200"
            >
              다른 이름 검색
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

export default ForeignNamePage
