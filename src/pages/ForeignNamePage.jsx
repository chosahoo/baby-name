import { useState } from 'react'
import { nameStatistics } from '../data/namesData'

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

    const romanized = romanize(koreanName)
    const spacedRomanized = koreanName.split('').map(c => romanize(c)).join(' ')

    // 일본어 가타카나 변환 (체계적 매핑)
    const toKatakana = (name) => {
      const kanaMap = {
        // ㄱ 계열
        '가': 'ガ', '각': 'ガク', '간': 'ガン', '갈': 'ガル', '감': 'ガム', '강': 'ガン', '개': 'ゲ', '거': 'ゴ', '건': 'ゴン', '걸': 'ゴル', '게': 'ゲ', '겨': 'ギョ', '격': 'ギョク', '견': 'ギョン', '경': 'ギョン', '계': 'ゲ', '고': 'ゴ', '곤': 'ゴン', '골': 'ゴル', '공': 'ゴン', '과': 'グァ', '관': 'グァン', '광': 'グァン', '괘': 'グェ', '교': 'ギョ', '구': 'グ', '국': 'グク', '군': 'グン', '굴': 'グル', '궁': 'グン', '권': 'グォン', '귀': 'グィ', '규': 'キュ', '균': 'キュン', '그': 'グ', '극': 'グク', '근': 'グン', '글': 'グル', '금': 'グム', '급': 'グプ', '긍': 'グン', '기': 'ギ', '긴': 'ギン', '길': 'ギル', '김': 'ギム',
        // ㄴ 계열
        '나': 'ナ', '낙': 'ナク', '난': 'ナン', '날': 'ナル', '남': 'ナム', '낭': 'ナン', '내': 'ネ', '냉': 'ネン', '너': 'ノ', '넉': 'ノク', '널': 'ノル', '네': 'ネ', '녀': 'ニョ', '년': 'ニョン', '녕': 'ニョン', '노': 'ノ', '녹': 'ノク', '논': 'ノン', '농': 'ノン', '뇌': 'ネ', '누': 'ヌ', '눈': 'ヌン', '뉴': 'ニュ', '느': 'ヌ', '늘': 'ヌル', '능': 'ヌン', '니': 'ニ', '닉': 'ニク', '닌': 'ニン',
        // ㄷ 계열
        '다': 'ダ', '단': 'ダン', '달': 'ダル', '담': 'ダム', '당': 'ダン', '대': 'デ', '댁': 'デク', '더': 'ド', '덕': 'ドク', '던': 'ドン', '덜': 'ドル', '데': 'デ', '델': 'デル', '도': 'ド', '독': 'ドク', '돈': 'ドン', '동': 'ドン', '두': 'ドゥ', '둔': 'ドゥン', '뒤': 'ドゥィ', '드': 'ドゥ', '든': 'ドゥン', '들': 'ドゥル', '등': 'ドゥン', '디': 'ディ',
        // ㄹ 계열
        '라': 'ラ', '란': 'ラン', '람': 'ラム', '랑': 'ラン', '래': 'レ', '러': 'ロ', '럭': 'ロク', '런': 'ロン', '럴': 'ロル', '레': 'レ', '려': 'リョ', '력': 'リョク', '련': 'リョン', '렬': 'リョル', '령': 'リョン', '로': 'ロ', '록': 'ロク', '론': 'ロン', '롱': 'ロン', '뢰': 'ロェ', '료': 'リョ', '루': 'ル', '류': 'リュ', '륙': 'リュク', '륜': 'リュン', '률': 'リュル', '륭': 'リュン', '르': 'ル', '른': 'ルン', '를': 'ルル', '름': 'ルム', '릉': 'ルン', '리': 'リ', '린': 'リン', '림': 'リム',
        // ㅁ 계열
        '마': 'マ', '막': 'マク', '만': 'マン', '말': 'マル', '망': 'マン', '매': 'メ', '맥': 'メク', '먼': 'モン', '멀': 'モル', '메': 'メ', '며': 'ミョ', '면': 'ミョン', '명': 'ミョン', '모': 'モ', '목': 'モク', '몽': 'モン', '묘': 'ミョ', '무': 'ム', '문': 'ムン', '물': 'ムル', '뮤': 'ミュ', '므': 'ム', '미': 'ミ', '민': 'ミン', '밀': 'ミル',
        // ㅂ 계열
        '바': 'バ', '박': 'バク', '반': 'バン', '발': 'バル', '방': 'バン', '배': 'ベ', '백': 'ベク', '범': 'ボム', '법': 'ボプ', '벽': 'ビョク', '변': 'ビョン', '별': 'ビョル', '병': 'ビョン', '보': 'ボ', '복': 'ボク', '본': 'ボン', '봉': 'ボン', '부': 'ブ', '북': 'ブク', '분': 'ブン', '불': 'ブル', '붕': 'ブン', '뷰': 'ビュ', '브': 'ブ', '비': 'ビ', '빈': 'ビン', '빙': 'ビン',
        // ㅅ 계열
        '사': 'サ', '삭': 'サク', '산': 'サン', '살': 'サル', '삼': 'サム', '상': 'サン', '새': 'セ', '색': 'セク', '서': 'ソ', '석': 'ソク', '선': 'ソン', '설': 'ソル', '섬': 'ソム', '성': 'ソン', '세': 'セ', '소': 'ソ', '속': 'ソク', '손': 'ソン', '솔': 'ソル', '송': 'ソン', '수': 'ス', '숙': 'スク', '순': 'スン', '술': 'スル', '숭': 'スン', '쉬': 'シュィ', '슈': 'シュ', '스': 'ス', '슬': 'スル', '슴': 'スム', '승': 'スン', '시': 'シ', '식': 'シク', '신': 'シン', '실': 'シル', '심': 'シム',
        // ㅇ 계열
        '아': 'ア', '악': 'アク', '안': 'アン', '알': 'アル', '암': 'アム', '애': 'エ', '액': 'エク', '앵': 'エン', '야': 'ヤ', '약': 'ヤク', '양': 'ヤン', '어': 'オ', '억': 'オク', '언': 'オン', '얼': 'オル', '에': 'エ', '여': 'ヨ', '역': 'ヨク', '연': 'ヨン', '열': 'ヨル', '염': 'ヨム', '영': 'ヨン', '예': 'イェ', '오': 'オ', '옥': 'オク', '온': 'オン', '옹': 'オン', '와': 'ワ', '완': 'ワン', '왕': 'ワン', '외': 'ウェ', '요': 'ヨ', '욕': 'ヨク', '용': 'ヨン', '우': 'ウ', '욱': 'ウク', '운': 'ウン', '울': 'ウル', '웅': 'ウン', '원': 'ウォン', '월': 'ウォル', '위': 'ウィ', '유': 'ユ', '육': 'ユク', '윤': 'ユン', '율': 'ユル', '융': 'ユン', '은': 'ウン', '을': 'ウル', '음': 'ウム', '응': 'ウン', '의': 'ウィ', '이': 'イ', '익': 'イク', '인': 'イン', '일': 'イル', '임': 'イム',
        // ㅈ 계열
        '자': 'ジャ', '작': 'ジャク', '잔': 'ジャン', '장': 'ジャン', '재': 'ジェ', '저': 'ジョ', '적': 'ジョク', '전': 'ジョン', '절': 'ジョル', '점': 'ジョム', '정': 'ジョン', '제': 'ジェ', '조': 'ジョ', '족': 'ジョク', '존': 'ジョン', '종': 'ジョン', '좌': 'ジャ', '주': 'ジュ', '죽': 'ジュク', '준': 'ジュン', '줄': 'ジュル', '중': 'ジュン', '쥬': 'ジュ', '즉': 'ジュク', '즌': 'ジュン', '즐': 'ジュル', '즙': 'ジュプ', '증': 'ジュン', '지': 'ジ', '직': 'ジク', '진': 'ジン', '질': 'ジル', '짐': 'ジム', '집': 'ジプ', '징': 'ジン',
        // ㅊ 계열
        '차': 'チャ', '착': 'チャク', '찬': 'チャン', '참': 'チャム', '창': 'チャン', '채': 'チェ', '책': 'チェク', '처': 'チョ', '척': 'チョク', '천': 'チョン', '철': 'チョル', '첨': 'チョム', '청': 'チョン', '체': 'チェ', '초': 'チョ', '촉': 'チョク', '촌': 'チョン', '총': 'チョン', '최': 'チェ', '추': 'チュ', '축': 'チュク', '춘': 'チュン', '출': 'チュル', '충': 'チュン', '츄': 'チュ', '측': 'チュク', '치': 'チ', '칙': 'チク', '친': 'チン', '칠': 'チル', '침': 'チム',
        // ㅋ 계열
        '카': 'カ', '칸': 'カン', '캄': 'カム', '캐': 'ケ', '커': 'コ', '컨': 'コン', '케': 'ケ', '켄': 'ケン', '코': 'コ', '콘': 'コン', '쾌': 'クェ', '쿠': 'ク', '쿤': 'クン', '퀸': 'クィン', '큐': 'キュ', '크': 'ク', '큰': 'クン', '클': 'クル', '키': 'キ', '킨': 'キン',
        // ㅌ 계열
        '타': 'タ', '탁': 'タク', '탄': 'タン', '탈': 'タル', '태': 'テ', '택': 'テク', '터': 'ト', '턱': 'トク', '테': 'テ', '토': 'ト', '톤': 'トン', '통': 'トン', '투': 'トゥ', '퇴': 'トェ', '트': 'トゥ', '특': 'トゥク', '티': 'ティ',
        // ㅍ 계열
        '파': 'パ', '판': 'パン', '팔': 'パル', '패': 'ペ', '팽': 'ペン', '퍼': 'ポ', '페': 'ペ', '편': 'ピョン', '평': 'ピョン', '폐': 'ペ', '포': 'ポ', '표': 'ピョ', '푸': 'プ', '풍': 'プン', '퓨': 'ピュ', '프': 'プ', '플': 'プル', '피': 'ピ', '핀': 'ピン', '필': 'ピル',
        // ㅎ 계열
        '하': 'ハ', '학': 'ハク', '한': 'ハン', '할': 'ハル', '함': 'ハム', '항': 'ハン', '해': 'ヘ', '핵': 'ヘク', '행': 'ヘン', '향': 'ヒャン', '허': 'ホ', '헌': 'ホン', '험': 'ホム', '헤': 'ヘ', '혁': 'ヒョク', '현': 'ヒョン', '혈': 'ヒョル', '협': 'ヒョプ', '형': 'ヒョン', '혜': 'ヘ', '호': 'ホ', '혹': 'ホク', '혼': 'ホン', '홀': 'ホル', '홍': 'ホン', '화': 'ファ', '환': 'ファン', '활': 'ファル', '황': 'ファン', '회': 'フェ', '획': 'フェク', '횟': 'フェ', '효': 'ヒョ', '후': 'フ', '훈': 'フン', '훌': 'フル', '휘': 'フィ', '휴': 'ヒュ', '흐': 'フ', '흔': 'フン', '흘': 'フル', '흥': 'フン', '희': 'ヒ', '흰': 'ヒン', '힘': 'ヒム'
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

    // namesData에서 한자 찾기
    const allNames = [...nameStatistics.girl, ...nameStatistics.boy]
    const foundName = allNames.find(n => n.name === koreanName)
    const hanjaText = foundName && foundName.hanja !== '-' ? foundName.hanja : '한자 정보 없음'

    setResult({
      korean: koreanName,
      english: [
        { type: '국립국어원 표기법', romanization: romanized, note: '공식 문서에 권장' },
        { type: '매큔-라이샤워 표기법', romanization: romanized.replace(/eo/g, 'ŏ').replace(/eu/g, 'ŭ'), note: '학술용' },
        { type: '예일 표기법', romanization: romanized.replace(/eo/g, 'e').replace(/eu/g, 'u'), note: '언어학 연구용' },
        { type: '통용 표기', romanization: spacedRomanized, note: '일반적으로 많이 사용' }
      ],
      chinese: hanjaText,
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
