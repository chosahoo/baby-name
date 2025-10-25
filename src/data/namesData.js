// 신생아 이름 통계 데이터
//
// [데이터 출처]
// - 이름 및 인원수: 대법원 전자가족관계등록시스템 (https://efamily.scourt.go.kr/)
// - 참고 사이트: baby-name.kr, namechart.kr
//
// [주의사항]
// - 이름 순위와 인원수: 공공데이터 기반 (실제 데이터)
// - 한자 표기: 가장 일반적으로 사용되는 대표 한자 (참고용, 실제와 다를 수 있음)
// - 의미: 한자 뜻 기반 해석 (참고용)
//
// ※ 대법원에서는 한글 이름과 인원수만 제공하며, 한자 표기는 제공하지 않습니다.
//    본 앱에서 제공하는 한자는 법무부 인명용 한자 중 해당 음가에 맞는 대표적인 한자입니다.

// 통합 통계 데이터 (2020-2024)
// ranks: 각 연도별 순위, counts: 각 연도별 출생 수
export const nameStatistics = {
  girl: [
    {
      name: '이서',
      hanja: '李書',
      meaning: '글을 쓰는 이씨',
      ranks: { 2020: null, 2021: 3, 2022: 1, 2023: 2, 2024: 1 },
      counts: { 2020: null, 2021: 1730, 2022: 2013, 2023: 1631, 2024: 1831 },
      count2024: 1831,
      percentage: 7.68,
      trend: 'rising'
    },
    {
      name: '서아',
      hanja: '徐雅',
      meaning: '천천하고 우아함',
      ranks: { 2020: 1, 2021: 1, 2022: 2, 2023: 1, 2024: 2 },
      counts: { 2020: 1924, 2021: 2059, 2022: 2010, 2023: 1868, 2024: 1802 },
      count2024: 1802,
      percentage: 7.56,
      trend: 'stable'
    },
    {
      name: '하린',
      hanja: '夏潾',
      meaning: '여름처럼 맑음',
      ranks: { 2020: 6, 2021: 8, 2022: null, 2023: 9, 2024: 3 },
      counts: { 2020: 1373, 2021: 1274, 2022: null, 2023: 1060, 2024: 1409 },
      count2024: 1409,
      percentage: 5.91,
      trend: 'rising'
    },
    {
      name: '지유',
      hanja: '智柔',
      meaning: '지혜롭고 부드러움',
      ranks: { 2020: null, 2021: null, 2022: null, 2023: 6, 2024: 4 },
      counts: { 2020: null, 2021: null, 2022: null, 2023: 1163, 2024: 1352 },
      count2024: 1352,
      percentage: 5.67,
      trend: 'rising'
    },
    {
      name: '하윤',
      hanja: '夏允',
      meaning: '여름처럼 진실함',
      ranks: { 2020: 2, 2021: 2, 2022: 3, 2023: 4, 2024: 5 },
      counts: { 2020: 1738, 2021: 1794, 2022: 1504, 2023: 1302, 2024: 1329 },
      count2024: 1329,
      percentage: 5.58,
      trend: 'falling'
    },
    {
      name: '지안',
      hanja: '智安',
      meaning: '지혜롭고 편안함',
      ranks: { 2020: 3, 2021: 5, 2022: 5, 2023: null, 2024: 6 },
      counts: { 2020: 1641, 2021: 1434, 2022: 1396, 2023: null, 2024: 1325 },
      count2024: 1325,
      percentage: 5.56,
      trend: 'falling'
    },
    {
      name: '아윤',
      hanja: '雅允',
      meaning: '우아하고 진실함',
      ranks: { 2020: 8, 2021: 9, 2022: 6, 2023: 3, 2024: 7 },
      counts: { 2020: 1332, 2021: 1267, 2022: 1376, 2023: 1346, 2024: 1322 },
      count2024: 1322,
      percentage: 5.55,
      trend: 'stable'
    },
    {
      name: '지아',
      hanja: '智雅',
      meaning: '지혜롭고 우아함',
      ranks: { 2020: null, 2021: 4, 2022: 4, 2023: 5, 2024: 8 },
      counts: { 2020: null, 2021: 1449, 2022: 1465, 2023: 1257, 2024: 1287 },
      count2024: 1287,
      percentage: 5.40,
      trend: 'falling'
    },
    {
      name: '시아',
      hanja: '詩雅',
      meaning: '시처럼 우아함',
      ranks: { 2020: null, 2021: null, 2022: 7, 2023: 10, 2024: 9 },
      counts: { 2020: null, 2021: null, 2022: 1277, 2023: 1058, 2024: 1209 },
      count2024: 1209,
      percentage: 5.07,
      trend: 'rising'
    },
    {
      name: '아린',
      hanja: '雅凜',
      meaning: '우아하고 맑음',
      ranks: { 2020: 7, 2021: 7, 2022: 9, 2023: 8, 2024: 10 },
      counts: { 2020: 1359, 2021: 1297, 2022: 1203, 2023: 1110, 2024: 1200 },
      count2024: 1200,
      percentage: 5.04,
      trend: 'falling'
    }
  ],
  boy: [
    {
      name: '이준',
      hanja: '李俊',
      meaning: '이씨 준수한 사람',
      ranks: { 2020: 6, 2021: 1, 2022: 1, 2023: 1, 2024: 1 },
      counts: { 2020: 1512, 2021: 2299, 2022: 2220, 2023: 1754, 2024: 1242 },
      count2024: 1242,
      percentage: 6.71,
      trend: 'stable'
    },
    {
      name: '하준',
      hanja: '河俊',
      meaning: '강처럼 준수함',
      ranks: { 2020: 3, 2021: 4, 2022: 3, 2023: 3, 2024: 2 },
      counts: { 2020: 1763, 2021: 1834, 2022: 1664, 2023: 1606, 2024: 1225 },
      count2024: 1225,
      percentage: 6.62,
      trend: 'stable'
    },
    {
      name: '도윤',
      hanja: '道潤',
      meaning: '도리를 윤택하게',
      ranks: { 2020: 1, 2021: 3, 2022: 6, 2023: 2, 2024: 3 },
      counts: { 2020: 2132, 2021: 1848, 2022: 1466, 2023: 1646, 2024: 1133 },
      count2024: 1133,
      percentage: 6.12,
      trend: 'stable'
    },
    {
      name: '은우',
      hanja: '恩祐',
      meaning: '은혜로운 도움',
      ranks: { 2020: 4, 2021: 5, 2022: 5, 2023: 4, 2024: 4 },
      counts: { 2020: 1688, 2021: 1582, 2022: 1482, 2023: 1506, 2024: 1104 },
      count2024: 1104,
      percentage: 5.96,
      trend: 'stable'
    },
    {
      name: '서준',
      hanja: '瑞俊',
      meaning: '상서롭고 준수함',
      ranks: { 2020: 2, 2021: 2, 2022: 2, 2023: 5, 2024: 5 },
      counts: { 2020: 2066, 2021: 2005, 2022: 1667, 2023: 1445, 2024: 1051 },
      count2024: 1051,
      percentage: 5.68,
      trend: 'falling'
    },
    {
      name: '시우',
      hanja: '時祐',
      meaning: '시대를 돕는',
      ranks: { 2020: 5, 2021: 6, 2022: 4, 2023: 6, 2024: 6 },
      counts: { 2020: 1650, 2021: 1516, 2022: 1627, 2023: 1287, 2024: 1051 },
      count2024: 1051,
      percentage: 5.68,
      trend: 'falling'
    },
    {
      name: '선우',
      hanja: '善祐',
      meaning: '선하게 도움',
      ranks: { 2020: null, 2021: null, 2022: 8, 2023: 10, 2024: 7 },
      counts: { 2020: null, 2021: null, 2022: 1173, 2023: 1097, 2024: 989 },
      count2024: 989,
      percentage: 5.34,
      trend: 'falling'
    },
    {
      name: '유준',
      hanja: '柔俊',
      meaning: '부드럽고 준수함',
      ranks: { 2020: 9, 2021: 10, 2022: 10, 2023: 7, 2024: 8 },
      counts: { 2020: 1210, 2021: 1108, 2022: 1114, 2023: 1216, 2024: 966 },
      count2024: 966,
      percentage: 5.22,
      trend: 'stable'
    },
    {
      name: '수호',
      hanja: '守護',
      meaning: '지키고 보호함',
      ranks: { 2020: null, 2021: 9, 2022: null, 2023: null, 2024: 9 },
      counts: { 2020: null, 2021: 1118, 2022: null, 2023: null, 2024: 908 },
      count2024: 908,
      percentage: 4.91,
      trend: 'stable'
    },
    {
      name: '지호',
      hanja: '智昊',
      meaning: '지혜롭고 큼',
      ranks: { 2020: 7, 2021: 7, 2022: 7, 2023: 8, 2024: 10 },
      counts: { 2020: 1402, 2021: 1308, 2022: 1369, 2023: 1176, 2024: 876 },
      count2024: 876,
      percentage: 4.73,
      trend: 'falling'
    }
  ]
}

// 지역별, 트렌드 분석 데이터는 공식 통계가 없어 제거되었습니다
// 이름 순위 변화는 nameStatistics의 ranks 필드를 참고하세요

// 한자 데이터베이스
// 출처: 대한민국 법무부 「가족관계의 등록 등에 관한 법률」 인명용 한자
export const hanjaDatabase = {
  '李': {
    reading: '이',
    meaning: '오얏 (배나무)',
    detailMeaning: '배나무를 상징하며 풍요와 번영을 의미합니다.',
    strokes: 7,
    element: '목(木)',
    radicals: '木(나무 목)',
    popularity: 98
  },
  '瑞': {
    reading: '서',
    meaning: '상서로움, 길조',
    detailMeaning: '옥처럼 귀한 상서로운 기운을 의미합니다.',
    strokes: 13,
    element: '금(金)',
    radicals: '玉(옥 옥)',
    popularity: 96
  },
  '雅': {
    reading: '아',
    meaning: '우아하다',
    detailMeaning: '고상하고 품위있는 모습을 나타냅니다.',
    strokes: 12,
    element: '목(木)',
    radicals: '隹(새 추)',
    popularity: 94
  },
  '夏': {
    reading: '하',
    meaning: '여름',
    detailMeaning: '밝고 활기찬 여름을 상징합니다.',
    strokes: 10,
    element: '화(火)',
    radicals: '夊(천천히걸을쇠)',
    popularity: 92
  },
  '璘': {
    reading: '린',
    meaning: '아름다운 옥',
    detailMeaning: '빛나고 아름다운 옥을 의미합니다.',
    strokes: 17,
    element: '금(金)',
    radicals: '玉(옥 옥)',
    popularity: 88
  },
  '智': {
    reading: '지',
    meaning: '지혜',
    detailMeaning: '슬기롭고 지혜로운 마음을 뜻합니다.',
    strokes: 12,
    element: '화(火)',
    radicals: '日(날 일)',
    popularity: 93
  },
  '悠': {
    reading: '유',
    meaning: '유유하다, 멀다',
    detailMeaning: '여유롭고 느긋한 모습을 의미합니다.',
    strokes: 11,
    element: '수(水)',
    radicals: '心(마음 심)',
    popularity: 90
  },
  '允': {
    reading: '윤',
    meaning: '허락하다, 진실하다',
    detailMeaning: '진실되고 믿음직한 마음을 의미합니다.',
    strokes: 4,
    element: '토(土)',
    radicals: '儿(어진사람 인)',
    popularity: 91
  },
  '安': {
    reading: '안',
    meaning: '편안하다',
    detailMeaning: '평온하고 안정된 상태를 나타냅니다.',
    strokes: 6,
    element: '토(土)',
    radicals: '宀(집 면)',
    popularity: 89
  },
  '俊': {
    reading: '준',
    meaning: '준수하다',
    detailMeaning: '뛰어나고 빼어난 인물을 의미합니다.',
    strokes: 9,
    element: '금(金)',
    radicals: '人(사람 인)',
    popularity: 97
  },
  '道': {
    reading: '도',
    meaning: '길, 도리',
    detailMeaning: '바른 길과 도리를 의미합니다.',
    strokes: 12,
    element: '수(水)',
    radicals: '辶(쉬엄쉬엄갈 착)',
    popularity: 87
  },
  '恩': {
    reading: '은',
    meaning: '은혜',
    detailMeaning: '베풀어주는 고마운 마음과 덕을 뜻합니다.',
    strokes: 10,
    element: '수(水)',
    radicals: '心(마음 심)',
    popularity: 90
  },
  '祐': {
    reading: '우',
    meaning: '돕다, 보우하다',
    detailMeaning: '하늘이 돕고 보살핌을 의미합니다.',
    strokes: 9,
    element: '토(土)',
    radicals: '示(보일 시)',
    popularity: 92
  },
  '時': {
    reading: '시',
    meaning: '때, 시간',
    detailMeaning: '적절한 때와 시기를 뜻합니다.',
    strokes: 10,
    element: '화(火)',
    radicals: '日(날 일)',
    popularity: 85
  },
  '善': {
    reading: '선',
    meaning: '착하다, 좋다',
    detailMeaning: '착하고 선량한 마음을 나타냅니다.',
    strokes: 12,
    element: '금(金)',
    radicals: '口(입 구)',
    popularity: 86
  },
  '浩': {
    reading: '호',
    meaning: '넓고 크다',
    detailMeaning: '광활하고 드넓은 기상을 뜻합니다.',
    strokes: 10,
    element: '수(水)',
    radicals: '水(물 수)',
    popularity: 84
  },
  '守': {
    reading: '수',
    meaning: '지키다',
    detailMeaning: '소중한 것을 지키고 보호함을 의미합니다.',
    strokes: 6,
    element: '금(金)',
    radicals: '宀(집 면)',
    popularity: 83
  },
  '護': {
    reading: '호',
    meaning: '보호하다',
    detailMeaning: '막아서 보호하고 지킴을 뜻합니다.',
    strokes: 20,
    element: '수(水)',
    radicals: '言(말씀 언)',
    popularity: 82
  },
  '珍': {
    reading: '진',
    meaning: '귀하다, 보배',
    detailMeaning: '귀중하고 소중한 보물을 의미합니다.',
    strokes: 9,
    element: '금(金)',
    radicals: '玉(옥 옥)',
    popularity: 89
  },
  '言': {
    reading: '언',
    meaning: '말씀',
    detailMeaning: '말과 언어, 약속을 의미합니다.',
    strokes: 7,
    element: '금(金)',
    radicals: '言(말씀 언)',
    popularity: 75
  },
  '書': {
    reading: '서',
    meaning: '글, 책',
    detailMeaning: '글을 쓰고 학문을 닦음을 뜻합니다.',
    strokes: 10,
    element: '금(金)',
    radicals: '聿(붓 율)',
    popularity: 92
  },
  '徐': {
    reading: '서',
    meaning: '천천히',
    detailMeaning: '천천히 나아가며 침착함을 의미합니다.',
    strokes: 10,
    element: '금(金)',
    radicals: '彳(조금걸을 척)',
    popularity: 88
  },
  '妍': {
    reading: '연',
    meaning: '아름답다',
    detailMeaning: '여성의 아름다움과 고운 자태를 나타냅니다.',
    strokes: 7,
    element: '토(土)',
    radicals: '女(여자 녀)',
    popularity: 90
  },
  '潤': {
    reading: '윤',
    meaning: '윤택하다',
    detailMeaning: '촉촉하고 윤기있게 빛남을 뜻합니다.',
    strokes: 15,
    element: '수(水)',
    radicals: '水(물 수)',
    popularity: 89
  },
  '柔': {
    reading: '유',
    meaning: '부드럽다',
    detailMeaning: '부드럽고 온화한 성품을 의미합니다.',
    strokes: 9,
    element: '목(木)',
    radicals: '木(나무 목)',
    popularity: 87
  },
  '河': {
    reading: '하',
    meaning: '강',
    detailMeaning: '큰 강처럼 넓고 깊은 기상을 뜻합니다.',
    strokes: 8,
    element: '수(水)',
    radicals: '水(물 수)',
    popularity: 90
  },
  '凜': {
    reading: '린',
    meaning: '맑다, 차다',
    detailMeaning: '맑고 깨끗하며 씩씩함을 의미합니다.',
    strokes: 15,
    element: '수(水)',
    radicals: '冫(얼음 빙)',
    popularity: 86
  },
  '潾': {
    reading: '린',
    meaning: '물결',
    detailMeaning: '맑은 물결처럼 깨끗함을 의미합니다.',
    strokes: 15,
    element: '수(水)',
    radicals: '水(물 수)',
    popularity: 85
  },
  '詩': {
    reading: '시',
    meaning: '시',
    detailMeaning: '아름다운 시와 문학을 뜻합니다.',
    strokes: 13,
    element: '금(金)',
    radicals: '言(말씀 언)',
    popularity: 88
  },
  '昊': {
    reading: '호',
    meaning: '넓고 크다',
    detailMeaning: '하늘처럼 넓고 큰 마음을 의미합니다.',
    strokes: 8,
    element: '화(火)',
    radicals: '日(날 일)',
    popularity: 85
  },
  '潤': {
    reading: '도',
    meaning: '윤택하다',
    detailMeaning: '윤기있고 풍요로움을 뜻합니다.',
    strokes: 15,
    element: '수(水)',
    radicals: '水(물 수)',
    popularity: 84
  }
}

// 성명학 획수 길흉 (81수리)
export const strokeFortune = {
  1: { fortune: '대길', fortuneMeaning: '만사형통하여 번영을 누림' },
  3: { fortune: '대길', fortuneMeaning: '성취와 발전이 있음' },
  5: { fortune: '대길', fortuneMeaning: '화합하여 번성함' },
  6: { fortune: '대길', fortuneMeaning: '덕망과 재복을 누림' },
  7: { fortune: '길', fortuneMeaning: '독립하여 완성함' },
  8: { fortune: '대길', fortuneMeaning: '의지를 관철함' },
  11: { fortune: '대길', fortuneMeaning: '만사가 형통함' },
  13: { fortune: '대길', fortuneMeaning: '재능이 개화함' },
  15: { fortune: '대길', fortuneMeaning: '장수하며 안녕함' },
  16: { fortune: '대길', fortuneMeaning: '존귀하게 성공함' },
  17: { fortune: '길', fortuneMeaning: '견고하게 실행함' },
  18: { fortune: '대길', fortuneMeaning: '덕이 있고 유망함' },
  21: { fortune: '대길', fortuneMeaning: '중심 인물이 됨' },
  23: { fortune: '대길', fortuneMeaning: '왕성하게 발전함' },
  24: { fortune: '대길', fortuneMeaning: '재력이 풍부함' },
  25: { fortune: '길', fortuneMeaning: '영민한 재능이 있음' },
  29: { fortune: '길', fortuneMeaning: '지혜가 충만함' },
  31: { fortune: '대길', fortuneMeaning: '지도력과 덕망이 있음' },
  32: { fortune: '대길', fortuneMeaning: '행운이 다복함' },
  33: { fortune: '대길', fortuneMeaning: '용기와 재능이 있음' },
  35: { fortune: '길', fortuneMeaning: '온화하고 평안함' },
  37: { fortune: '대길', fortuneMeaning: '권위가 융성함' },
  38: { fortune: '길', fortuneMeaning: '예술로 성공함' },
  39: { fortune: '길', fortuneMeaning: '부귀영화를 누림' },
  41: { fortune: '대길', fortuneMeaning: '덕량이 풍부함' },
  45: { fortune: '길', fortuneMeaning: '발전하여 성취함' },
  47: { fortune: '대길', fortuneMeaning: '권위가 개화함' },
  48: { fortune: '대길', fortuneMeaning: '모사가 성공함' },
  52: { fortune: '길', fortuneMeaning: '선견지명이 있음' },
  // 흉수
  4: { fortune: '흉', fortuneMeaning: '파괴와 고난이 있음' },
  9: { fortune: '흉', fortuneMeaning: '고생과 역경이 많음' },
  10: { fortune: '흉', fortuneMeaning: '공허하고 쇠퇴함' },
  12: { fortune: '흉', fortuneMeaning: '의지가 약함' },
  14: { fortune: '흉', fortuneMeaning: '가족과 이별함' },
  19: { fortune: '흉', fortuneMeaning: '재난과 질병이 있음' },
  20: { fortune: '흉', fortuneMeaning: '공허하고 실패함' },
  22: { fortune: '흉', fortuneMeaning: '박약하고 고독함' }
}

// 데이터 메타 정보
export const dataMetadata = {
  source: '대법원 전자가족관계등록시스템',
  description: '2024년 1월~8월 전국 출생신고 통계 (실제 데이터)',
  lastUpdated: '2024-08-31',
  dataRange: '2024년 1월 ~ 2024년 8월',
  officialSources: [
    {
      name: '대법원 전자가족관계등록시스템',
      url: 'https://efamily.scourt.go.kr/',
      description: '출생신고 기반 신생아 이름 통계'
    },
    {
      name: '공공데이터포털',
      url: 'https://www.data.go.kr/',
      description: '행정안전부 주민등록 통계 데이터'
    },
    {
      name: '행정안전부',
      url: 'https://www.mois.go.kr/',
      description: '주민등록 인구 및 세대 현황 통계'
    }
  ],
  notes: [
    '본 데이터는 대법원 전자가족관계등록시스템의 실제 통계입니다',
    '2024년 1월부터 8월까지의 출생신고 데이터를 기준으로 합니다',
    '연도별 과거 데이터는 추후 업데이트 예정입니다'
  ]
}

// API 연동을 위한 헬퍼 함수
export const fetchNameStatistics = async (year = 2024, gender = 'all') => {
  // 현재는 로컬 데이터 반환
  return {
    girl: nameStatistics.girl,
    boy: nameStatistics.boy,
    metadata: dataMetadata
  }
}

export const searchNameByKeyword = (keyword) => {
  const allNames = [...nameStatistics.girl, ...nameStatistics.boy]
  return allNames.filter(nameData =>
    nameData.name.includes(keyword) ||
    nameData.meaning.includes(keyword)
  )
}
