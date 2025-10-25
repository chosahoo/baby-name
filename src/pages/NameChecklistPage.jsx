import { useState } from 'react'

// 성능 최적화: 놀림받기 쉬운 명사 목록을 상수로 선언
// 아이들이 놀림감으로 사용하기 쉬운 핵심 단어 600+ 선별
const COMMON_NOUNS = [
  // 음식 (패스트푸드, 분식, 한식, 양식, 디저트)
  '라면', '우동', '짜장', '짜장면', '짬뽕', '탕수육', '김밥', '떡볶이', '순대', '튀김', '만두', '국밥',
  '치킨', '피자', '햄버거', '도넛', '빵', '케이크', '쿠키', '과자', '사탕', '초콜릿', '캔디',
  '아이스크림', '빙수', '젤리', '껌', '음료', '주스', '우유', '요구르트', '커피', '차', '콜라', '사이다',
  '밥', '국', '찌개', '탕', '전골', '볶음밥', '김치', '된장', '고추장', '간장', '소금', '설탕',
  '라떼', '프라푸치노', '스무디', '밀크쉐이크', '핫초코', '녹차',
  '떡', '약과', '한과', '엿', '강정', '송편', '인절미', '찰떡', '경단',
  '짜파게티', '불닭', '컵라면', '볶음면', '냉면', '칼국수', '수제비',
  '돈까스', '카레', '스파게티', '스테이크', '샐러드', '샌드위치', '핫도그', '타코', '부리토',
  '족발', '보쌈', '삼겹살', '갈비', '불고기', '닭갈비', '찜닭', '양념치킨', '후라이드',

  // 장소/건물 (학습, 상업, 공공, 놀이)
  '학원', '영어학원', '수학학원', '미술학원', '태권도장', '피아노학원',
  '병원', '치과', '한의원', '약국', '안경원', '정형외과',
  '공부방', '독서실', '도서관', '헬스장', '수영장', '스포츠센터', '체육관', '볼링장',
  '노래방', '코인노래방', 'pc방', '피시방', '오락실', '게임방', '당구장', '만화방',
  '빵집', '제과점', '케이크집', '문방구', '편의점', '슈퍼', '가게', '시장', '마트', '백화점', '대형마트',
  '공원', '놀이터', '워터파크', '테마파크', '동물원', '수족관', '박물관', '미술관',
  '서점', '극장', '영화관', '카페', '커피숍', '식당', '음식점', '패스트푸드점', '분식집',
  '화장실', '변소', '목욕탕', '사우나', '찜질방', '세탁소', '이발소', '미용실',
  '운동장', '축구장', '야구장', '농구장', '배드민턴장', '테니스장', '교실', '강당', '체육관',
  '주차장', '정류장', '버스정류장', '지하철역', '기차역', '공항', '터미널', '은행', '우체국', '경찰서', '소방서',
  '공장', '창고', '쓰레기장', '재활용센터', '주유소', '세차장', '수리점',

  // 물건/도구 (문구, 가구, 전자제품, 생활용품, 장난감)
  '지우개', '연필', '색연필', '펜', '볼펜', '사인펜', '형광펜', '샤프', '샤프심',
  '자', '삼각자', '각도기', '컴퍼스', '가위', '칼', '커터칼', '풀', '딱풀', '테이프', '스카치테이프',
  '공책', '노트', '메모지', '포스트잇', '스티커', '책', '교과서', '참고서', '문제집', '만화책',
  '책상', '의자', '책걸상', '침대', '이층침대', '소파', '장롱', '옷장', '서랍', '서랍장', '선반', '책장',
  '거울', '시계', '알람시계', '손목시계', '벽시계', '액자', '사진틀', '달력', '캘린더',
  '휴지', '화장지', '물티슈', '비누', '수건', '목욕수건', '칫솔', '치약', '샴푸', '린스', '바디워시',
  '빗', '머리빗', '헤어드라이기', '고데기', '매니큐어', '화장품', '로션', '크림',
  '컴퓨터', '데스크탑', '노트북', '태블릿', '아이패드', '휴대폰', '핸드폰', '스마트폰', '전화기',
  '텔레비전', '티비', '모니터', '스피커', '이어폰', '헤드폰', '키보드', '마우스', '리모컨',
  '냉장고', '김치냉장고', '전자레인지', '오븐', '에어프라이어', '믹서기', '토스터', '커피머신',
  '세탁기', '건조기', '청소기', '로봇청소기', '선풍기', '에어컨', '히터', '가습기', '공기청정기',
  '가방', '책가방', '배낭', '백팩', '크로스백', '힙색', '지갑', '필통',
  '신발', '운동화', '슬리퍼', '샌들', '구두', '부츠', '장화',
  '옷', '티셔츠', '바지', '청바지', '반바지', '치마', '원피스', '점퍼', '패딩',
  '모자', '야구모자', '비니', '양말', '속옷', '장갑', '목도리', '마스크', '우산', '양산',
  '공', '축구공', '농구공', '야구공', '배구공', '탁구공', '볼링공',
  '인형', '곰인형', '레고', '블록', '퍼즐', '보드게임', '카드', '트럼프',
  '로봇', '피규어', '장난감', '총', '칼', '검',
  '자동차', '승용차', '트럭', '버스', '택시', '기차', '지하철', '비행기', '헬리콥터', '배', '보트', '요트',
  '자전거', '킥보드', '인라인', '스케이트보드', '오토바이',

  // 동물 (반려동물, 가축, 야생동물, 벌레)
  '개', '강아지', '멍멍이', '똥개', '진돗개', '푸들', '말티즈', '시츄', '치와와',
  '고양이', '야옹이', '페르시안', '코숏', '길고양이', '들고양이',
  '토끼', '햄스터', '기니피그', '친칠라', '고슴도치', '페럿',
  '새', '앵무새', '카나리아', '참새', '비둘기', '까마귀', '까치', '까치', '제비', '독수리', '매', '펭귄',
  '돼지', '멧돼지', '소', '황소', '젖소', '말', '망아지', '당나귀', '노새',
  '양', '염소', '산양', '사슴', '순록', '기린', '얼룩말', '코끼리', '코뿔소', '하마',
  '닭', '병아리', '수탉', '암탉', '오리', '거위', '칠면조',
  '사자', '호랑이', '표범', '치타', '곰', '늑대', '여우', '너구리', '오소리',
  '원숭이', '고릴라', '침팬지', '오랑우탄', '코알라', '캥거루', '판다',
  '물고기', '금붕어', '열대어', '잉어', '붕어', '가물치', '메기', '상어', '고래', '돌고래',
  '거북이', '자라', '악어', '도마뱀', '뱀', '독사', '구렁이',
  '개구리', '두꺼비', '올챙이', '도롱뇽',
  '벌레', '개미', '파리', '모기', '바퀴벌레', '바퀴', '딱정벌레', '무당벌레',
  '나비', '나방', '잠자리', '매미', '귀뚜라미', '메뚜기', '벌', '꿀벌', '말벌',
  '거미', '지네', '지렁이', '달팽이', '민달팽이', '쥐', '생쥐', '들쥐',

  // 신체/생리 (신체부위, 생리현상)
  '똥', '대변', '오줌', '소변', '방귀', '트림', '딸꾹질', '하품', '재채기', '코딱지', '귀지',
  '침', '콧물', '눈물', '땀', '피', '고름', '딱지', '상처', '흉터',
  '머리', '머리카락', '대머리', '탈모', '비듬', '얼굴', '이마', '눈', '코', '입', '귀',
  '볼', '뺨', '턱', '목', '어깨', '팔', '팔꿈치', '손', '손가락', '손톱',
  '가슴', '배', '배꼽', '허리', '엉덩이', '궁둥이', '등', '척추', '허벅지',
  '무릎', '정강이', '발', '발가락', '발톱', '발꿈치', '다리', '종아리',
  '뼈', '근육', '살', '지방', '뱃살', '내장', '위', '간', '폐', '심장', '뇌',

  // 자연/날씨
  '비', '소나기', '장마', '폭우', '눈', '폭설', '진눈깨비', '우박', '서리', '이슬',
  '바람', '강풍', '태풍', '폭풍', '토네이도', '회오리바람', '산들바람',
  '구름', '먹구름', '안개', '천둥', '번개', '벼락', '무지개', '햇빛', '햇살', '일출', '일몰', '석양',
  '흙', '진흙', '찰흙', '모래', '자갈', '돌', '바위', '암석', '화산', '용암',
  '산', '언덕', '계곡', '동굴', '절벽', '들판', '초원', '사막',
  '강', '시내', '개울', '하천', '냇물', '폭포', '호수', '연못', '늪', '습지',
  '바다', '해변', '해안', '파도', '물결', '섬', '반도',
  '하늘', '땅', '대지', '지구', '달', '별', '해', '태양',

  // 행동/상태
  '공부', '학습', '숙제', '과제', '시험', '시험지', '중간고사', '기말고사', '수능',
  '놀이', '게임', '운동', '체육', '수영', '달리기', '마라톤', '점프', '뜀박질',
  '잠', '수면', '낮잠', '꿈', '악몽', '불면증',
  '울음', '눈물', '웃음', '미소', '깔깔', '킥킥',
  '노래', '합창', '춤', '댄스', '그림', '미술', '색칠', '글씨', '글쓰기',

  // 부정적/놀림용 (외모, 성격, 행동)
  '바보', '멍청이', '또라이', '미친놈', '정신병자', '병신',
  '똑똑이', '모범생', '공부벌레', '책벌레',
  '빡빡이', '대머리', '민머리', '탈모',
  '뚱뚱이', '뚱보', '돼지', '비만', '살찐',
  '깡마른', '빼빼', '앙상', '마른',
  '땅딸막', '난쟁이', '호빗', '꼬맹이', '쪼그만',
  '키다리', '거인', '장신',
  '못난이', '못생긴', '추남', '추녀',
  '쓰레기', '폐기물', '휴지통', '쓰레기통', '똥통', '변기', '하수구',
  '거지', '빈민', '노숙자', '도둑', '사기꾼', '강도',
  '찌질이', '루저', '왕따', '은따', '아싸',

  // 직업/신분 (놀림받기 쉬운)
  '청소부', '미화원', '경비', '수위', '배달부', '택배기사',
  '알바', '아르바이트', '백수', '무직', '실업자',

  // 기타 일상 단어
  '돈', '지폐', '동전', '천원', '만원', '현금', '카드', '신용카드',
  '선물', '생일선물', '크리스마스선물', '편지', '카드', '엽서', '사진', '셀카',
  '그림', '사진', '포스터', '색깔', '빨강', '파랑', '노랑', '검정', '하양',
  '숫자', '번호', '글자', '한글', '영어', '이름', '별명', '별명',
  '생일', '생일파티', '생일케이크', '크리스마스', '설날', '추석', '명절', '휴일',
  '방학', '여름방학', '겨울방학', '학기', '개학', '졸업', '입학',
  '아침', '새벽', '점심', '저녁', '밤', '야간', '낮', '주간', '오전', '오후', '정오', '자정',
  '월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일', '주말', '평일',
  '봄', '여름', '가을', '겨울', '계절', '날씨', '온도', '습도', '기온',

  // 브랜드/상표 (아이들이 자주 쓰는)
  '맥도날드', '롯데리아', '버거킹', 'KFC', '맥날',
  '스타벅스', '투썸', '이디야', '빽다방',
  '삼성', '애플', 'LG', '나이키', '아디다스', '푸마'
]

function NameChecklistPage({ onBack }) {
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [result, setResult] = useState(null)

  const checkName = () => {
    const fullName = lastName + firstName

    // 1. 발음 검사
    let pronunciationScore = 100
    const pronunciationDetails = []

    // 받침 조화 체크
    const lastChar = lastName[lastName.length - 1]
    const firstChar = firstName[0]
    const lastCharCode = lastChar.charCodeAt(0) - 0xAC00
    const hasBatchim = lastCharCode % 28 !== 0

    if (hasBatchim && ['ㄱ', 'ㄷ', 'ㅂ', 'ㅈ'].includes(firstChar[0])) {
      pronunciationDetails.push({
        check: '받침 조화',
        pass: false,
        note: '받침과 첫 자음이 발음하기 어려울 수 있음'
      })
      pronunciationScore -= 10
    } else {
      pronunciationDetails.push({
        check: '받침 조화',
        pass: true,
        note: '받침과 첫 자음이 자연스럽게 연결됩니다'
      })
    }

    // 어려운 자음 조합 체크
    if (firstName.match(/[ㄲㄸㅃㅆㅉ]/)) {
      pronunciationDetails.push({
        check: '음운 변화',
        pass: false,
        note: '쌍자음이 포함되어 발음이 다소 어려움'
      })
      pronunciationScore -= 15
    } else {
      pronunciationDetails.push({
        check: '음운 변화',
        pass: true,
        note: '발음하기 쉬운 자음 조합'
      })
    }

    // 외국인 발음 난이도
    const difficultSounds = ['ㅡ', 'ㅢ', 'ㅚ', 'ㅝ']
    const hasDifficult = difficultSounds.some(s => firstName.includes(s))
    if (hasDifficult) {
      pronunciationDetails.push({
        check: '외국인 발음',
        pass: false,
        note: '외국인이 발음하기 어려운 모음 포함'
      })
      pronunciationScore -= 10
    } else {
      pronunciationDetails.push({
        check: '외국인 발음',
        pass: true,
        note: '외국인도 쉽게 발음 가능'
      })
    }

    // 2. 이니셜 검사
    let initialsScore = 100
    const initialsDetails = []

    // 한글 초성으로 부정적 연상 체크
    const initials = fullName[0] + firstName[0]
    const negativeInitials = ['병신', '바보', '똥', '개', '쓰레기']
    const hasNegative = negativeInitials.some(word =>
      word[0] === fullName[0] && word[1] === firstName[0]
    )

    if (hasNegative) {
      initialsDetails.push({
        check: '한글 초성',
        pass: false,
        note: '초성 조합이 부정적 단어를 연상시킬 수 있음'
      })
      initialsScore -= 30
    } else {
      initialsDetails.push({
        check: '한글 초성',
        pass: true,
        note: '부정적 연상 없음'
      })
    }

    initialsDetails.push({
      check: '영문 이니셜',
      pass: true,
      note: `${initials} - 문제없음`
    })

    // 3. 놀림 가능성 검사
    let teasingScore = 100
    const teasingDetails = []

    // 부정적 단어 유사성 체크
    const negativeWords = ['똥', '개', '돼지', '바보', '멍청', '쓰레기', '지우개', '빡빡이', '병신', '멍청이']
    const similarWord = negativeWords.find(word =>
      firstName.includes(word) || fullName.includes(word)
    )

    if (similarWord) {
      teasingDetails.push({
        check: '부정적 단어',
        pass: false,
        note: `"${similarWord}"와(과) 유사하여 놀림받을 가능성 높음`
      })
      teasingScore -= 40
    } else {
      teasingDetails.push({
        check: '부정적 단어',
        pass: true,
        note: '부정적 단어와 유사하지 않음'
      })
    }

    // 성+이름 조합으로 일반 명사가 되는지 체크
    const foundNoun = COMMON_NOUNS.find(noun => {
      // 전체 이름에 명사가 포함되는지
      if (fullName.includes(noun)) return true
      // 성의 마지막 글자 + 이름이 명사가 되는지 (예: 최 + 라면)
      if ((lastName[lastName.length - 1] + firstName).includes(noun)) return true
      return false
    })

    if (foundNoun) {
      teasingDetails.push({
        check: '명사 조합',
        pass: false,
        note: `"${foundNoun}"을(를) 연상시켜 놀림받을 가능성 매우 높음`
      })
      teasingScore -= 50
    } else {
      teasingDetails.push({
        check: '명사 조합',
        pass: true,
        note: '일반 명사와 겹치지 않음'
      })
    }

    // 이상한 연상 체크
    const weirdAssociations = ['화장실', '휴지', '쓰레기통', '똥통', '오줌', '방귀']
    const foundAssociation = weirdAssociations.find(word =>
      fullName.includes(word.substring(0, 2)) || firstName.includes(word.substring(0, 2))
    )

    if (foundAssociation) {
      teasingDetails.push({
        check: '연상 단어',
        pass: false,
        note: `"${foundAssociation}"을(를) 연상시킬 수 있음`
      })
      teasingScore -= 30
    } else {
      teasingDetails.push({
        check: '연상 단어',
        pass: true,
        note: '이상한 연상 없음'
      })
    }

    // 반복 음절 체크 (예: 빵빵, 똥똥)
    const syllables = firstName.split('')
    const hasRepeat = syllables.length >= 2 && syllables.every((s, i, arr) => i === 0 || s === arr[0])

    if (hasRepeat) {
      const repeatSyllable = syllables[0]
      const sillyRepeats = ['빵', '똥', '방', '뽕', '땡', '쨍', '짱']
      if (sillyRepeats.includes(repeatSyllable)) {
        teasingDetails.push({
          check: '반복 음절',
          pass: false,
          note: '같은 글자 반복으로 놀림받을 수 있음'
        })
        teasingScore -= 20
      }
    }

    // 4. 특수 케이스 검사
    let specialScore = 90
    const specialDetails = []

    // 성별 구분
    const feminineEndings = ['아', '연', '윤', '은', '희', '진', '경', '영']
    const masculineEndings = ['준', '민', '호', '현', '우', '진', '석', '철']

    const lastNameChar = firstName[firstName.length - 1]
    const isFeminine = feminineEndings.includes(lastNameChar)
    const isMasculine = masculineEndings.includes(lastNameChar)

    if (isFeminine || isMasculine) {
      specialDetails.push({
        check: '성별 구분',
        pass: true,
        note: isFeminine ? '여성적인 느낌' : '남성적인 느낌'
      })
    } else {
      specialDetails.push({
        check: '성별 구분',
        pass: true,
        note: '중성적인 이름'
      })
    }

    // 세대 적합성
    const modernNames = ['서', '하', '지', '아', '윤', '민']
    const isModern = modernNames.some(s => firstName.includes(s))

    if (isModern) {
      specialDetails.push({
        check: '세대 적합성',
        pass: true,
        note: '현대적이고 세련됨'
      })
    } else {
      specialDetails.push({
        check: '세대 적합성',
        pass: true,
        note: '전통적인 느낌'
      })
      specialScore -= 5
    }

    // 국제 사용
    if (firstName.length === 2) {
      specialDetails.push({
        check: '국제 사용',
        pass: true,
        note: '짧아서 국제적으로 사용하기 좋음'
      })
    } else {
      specialDetails.push({
        check: '국제 사용',
        pass: false,
        note: '일부 국가에서 발음 어려울 수 있음'
      })
      specialScore -= 10
    }

    // 상태 결정 함수
    const getStatus = (score) => {
      if (score >= 90) return 'good'
      if (score >= 70) return 'warning'
      return 'danger'
    }

    const checks = {
      pronunciation: {
        status: getStatus(pronunciationScore),
        score: pronunciationScore,
        message: pronunciationScore >= 90 ? '발음이 자연스럽고 부르기 쉽습니다' :
                 pronunciationScore >= 70 ? '발음에 다소 주의가 필요합니다' :
                 '발음이 어려울 수 있습니다',
        details: pronunciationDetails
      },
      initials: {
        status: getStatus(initialsScore),
        score: initialsScore,
        message: initialsScore >= 90 ? '이니셜에 문제가 없습니다' :
                 initialsScore >= 70 ? '이니셜 사용 시 주의가 필요합니다' :
                 '이니셜에 문제가 있을 수 있습니다',
        details: initialsDetails
      },
      teasing: {
        status: getStatus(teasingScore),
        score: teasingScore,
        message: teasingScore >= 90 ? '놀림받을 가능성이 낮습니다' :
                 teasingScore >= 70 ? '일부 놀림 가능성이 있습니다' :
                 '놀림받을 위험이 있습니다',
        details: teasingDetails
      },
      special: {
        status: getStatus(specialScore),
        score: specialScore,
        message: specialScore >= 90 ? '특별한 문제가 없습니다' :
                 specialScore >= 70 ? '참고사항이 있습니다' :
                 '주의가 필요한 부분이 있습니다',
        details: specialDetails
      }
    }

    setResult(checks)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'danger': return 'text-red-600'
      default: return 'text-neutral-600'
    }
  }

  const getStatusBg = (status) => {
    switch (status) {
      case 'good': return 'bg-green-50 border-green-200'
      case 'warning': return 'bg-yellow-50 border-yellow-200'
      case 'danger': return 'bg-red-50 border-red-200'
      default: return 'bg-neutral-50 border-neutral-200'
    }
  }

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'good': return '✅'
      case 'warning': return '⚠️'
      case 'danger': return '❌'
      default: return '❓'
    }
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
              이름 체크리스트
            </h1>
            <p className="text-neutral-600">
              실수하기 쉬운 부분을 미리 확인하세요 ⚠️
            </p>
          </div>
        </div>

        {!result ? (
          <div className="space-y-4">
            <div className="card">
              <h2 className="font-semibold text-neutral-800 mb-3">
                🔍 검사할 이름 입력
              </h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="성"
                  className="w-20 px-4 py-3 border border-neutral-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none bg-white text-center"
                  maxLength="2"
                />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="이름"
                  className="flex-1 px-4 py-3 border border-neutral-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none bg-white"
                />
              </div>
              {lastName && firstName && (
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-neutral-600 mb-1">검사할 이름</p>
                  <p className="text-2xl font-bold text-neutral-800">
                    {lastName}{firstName}
                  </p>
                </div>
              )}
            </div>

            <div className="card">
              <h3 className="font-semibold text-neutral-800 mb-3">📋 검사 항목</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-neutral-50 rounded-lg p-3">
                  <div className="font-medium text-neutral-800 mb-1">✓ 발음 검사</div>
                  <p className="text-neutral-600 text-xs">받침, 음운 변화 등</p>
                </div>
                <div className="bg-neutral-50 rounded-lg p-3">
                  <div className="font-medium text-neutral-800 mb-1">✓ 이니셜 검사</div>
                  <p className="text-neutral-600 text-xs">영문, 한글 초성</p>
                </div>
                <div className="bg-neutral-50 rounded-lg p-3">
                  <div className="font-medium text-neutral-800 mb-1">✓ 놀림 가능성</div>
                  <p className="text-neutral-600 text-xs">유사 발음, 연상 단어</p>
                </div>
                <div className="bg-neutral-50 rounded-lg p-3">
                  <div className="font-medium text-neutral-800 mb-1">✓ 특수 케이스</div>
                  <p className="text-neutral-600 text-xs">성별, 국제 사용 등</p>
                </div>
              </div>
            </div>

            <button
              onClick={checkName}
              disabled={!lastName || !firstName}
              className="w-full py-4 bg-[#FF6B9D] text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] hover:bg-[#FF5A8C] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              이름 검사 시작하기 🔍
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 종합 점수 */}
            <div className="card bg-gradient-to-br from-primary-50 to-purple-50">
              <div className="text-center">
                <h2 className="font-semibold text-neutral-800 mb-2">
                  {lastName}{firstName}
                </h2>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-purple-500 mb-2">
                  {Math.round((result.pronunciation.score + result.initials.score + result.teasing.score + result.special.score) / 4)}점
                </div>
                <p className="text-sm text-neutral-700">종합 안전도</p>
              </div>
            </div>

            {/* 각 검사 항목 */}
            {Object.entries(result).map(([key, data]) => (
              <div key={key} className={`card border ${getStatusBg(data.status)}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getStatusEmoji(data.status)}</span>
                    <div>
                      <h3 className="font-semibold text-neutral-800">
                        {key === 'pronunciation' ? '발음 검사' :
                         key === 'initials' ? '이니셜 검사' :
                         key === 'teasing' ? '놀림 가능성' :
                         key === 'special' ? '특수 케이스' : key}
                      </h3>
                      <p className="text-xs text-neutral-600">{data.message}</p>
                    </div>
                  </div>
                  <div className={`text-lg font-bold ${getStatusColor(data.status)}`}>
                    {data.score}점
                  </div>
                </div>
                <div className="space-y-2">
                  {data.details.map((detail, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-2.5 flex items-start gap-2">
                      <span className="text-sm">{detail.pass ? '✅' : '❌'}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-neutral-800">{detail.check}</div>
                        <div className="text-xs text-neutral-600">{detail.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex gap-3">
              <button
                onClick={() => setResult(null)}
                className="flex-1 py-3 bg-neutral-100 text-neutral-800 rounded-xl font-medium hover:bg-neutral-200 transition-colors active:scale-95"
              >
                다른 이름 검사
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

export default NameChecklistPage
