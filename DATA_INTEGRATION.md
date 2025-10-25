# bebé name 데이터 연동 가이드

## 📊 현재 데이터 상태

현재 bebé name은 **샘플 데이터**를 사용하고 있습니다. 실제 서비스 운영 시 공식 데이터로 교체가 필요합니다.

- **데이터 파일**: `src/data/namesData.js`
- **데이터 유형**: 샘플 데이터 (교육 및 프로토타입 용도)
- **최종 업데이트**: 2024-10-25

## 🎯 실제 데이터 출처

### 1. 대법원 전자가족관계등록시스템
- **URL**: https://efamily.scourt.go.kr/
- **설명**: 출생신고 기반 신생아 이름 통계
- **데이터 특징**:
  - 매년 신생아 이름 순위 TOP 100 발표
  - 성별, 연도별 통계 제공
  - 가장 공식적이고 정확한 데이터

### 2. 행정안전부 주민등록 통계
- **URL**: https://jumin.mois.go.kr/
- **설명**: 주민등록 인구 및 세대 현황 통계
- **데이터 특징**:
  - 지역별 인구 통계
  - 연령별, 성별 인구 데이터

### 3. 공공데이터포털
- **URL**: https://www.data.go.kr/
- **설명**: 정부 공공데이터 통합 제공
- **데이터 특징**:
  - Open API 제공
  - CSV, JSON 등 다양한 형식 지원
  - API 키 발급 필요

## 🔧 데이터 연동 방법

### 방법 1: CSV 파일 다운로드 및 변환

**단계:**
1. 공공데이터포털 또는 관련 기관에서 CSV 파일 다운로드
2. CSV를 JSON으로 변환
3. `src/data/namesData.js` 형식에 맞게 변환
4. 파일 교체

**장점:**
- 구현이 간단
- 서버 비용 없음

**단점:**
- 수동 업데이트 필요
- 실시간 데이터 불가

**예시 변환 스크립트:**
```javascript
// scripts/convertCsvToJson.js
import fs from 'fs'
import csv from 'csv-parser'

const results = []

fs.createReadStream('data/names_2024.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const formatted = {
      girl: results
        .filter(r => r.gender === 'F')
        .slice(0, 10)
        .map((r, idx) => ({
          name: r.name,
          hanja: r.hanja || '',
          meaning: r.meaning || '',
          ranks: {
            2024: idx + 1
          },
          count2024: parseInt(r.count),
          percentage: parseFloat(r.percentage),
          trend: r.trend || 'stable'
        })),
      boy: results
        .filter(r => r.gender === 'M')
        .slice(0, 10)
        .map((r, idx) => ({
          name: r.name,
          hanja: r.hanja || '',
          meaning: r.meaning || '',
          ranks: {
            2024: idx + 1
          },
          count2024: parseInt(r.count),
          percentage: parseFloat(r.percentage),
          trend: r.trend || 'stable'
        }))
    }

    fs.writeFileSync('src/data/namesData.json', JSON.stringify(formatted, null, 2))
    console.log('변환 완료!')
  })
```

### 방법 2: Open API 연동

**단계:**
1. 공공데이터포털에서 API 키 발급 (https://www.data.go.kr/)
2. 백엔드 서버 구축 (선택사항)
3. API 호출 로직 구현
4. `src/data/namesData.js`의 `fetchNameStatistics` 함수 구현

**장점:**
- 실시간 데이터 업데이트 가능
- 자동화 가능

**단점:**
- API 키 관리 필요
- 서버 구축 필요할 수 있음

**예시 구현:**
```javascript
// src/data/namesData.js
export const fetchNameStatistics = async (year = 2024, gender = 'all') => {
  const API_KEY = process.env.VITE_DATA_API_KEY
  const BASE_URL = 'https://api.data.go.kr/v1/names'

  try {
    const response = await fetch(
      `${BASE_URL}?serviceKey=${API_KEY}&year=${year}&gender=${gender}&type=json`
    )

    if (!response.ok) {
      throw new Error('API 호출 실패')
    }

    const data = await response.json()

    // API 응답을 앱 데이터 형식으로 변환
    return {
      girl: formatApiData(data.items.filter(i => i.gender === 'F')),
      boy: formatApiData(data.items.filter(i => i.gender === 'M')),
      metadata: {
        source: 'Open API',
        lastUpdated: new Date().toISOString()
      }
    }
  } catch (error) {
    console.error('데이터 로드 실패:', error)
    // 폴백: 로컬 샘플 데이터 사용
    return {
      girl: nameStatistics.girl,
      boy: nameStatistics.boy,
      metadata: dataMetadata
    }
  }
}

function formatApiData(items) {
  return items.slice(0, 10).map((item, idx) => ({
    name: item.name,
    hanja: item.hanja || '',
    meaning: item.meaning || '',
    ranks: {
      2024: idx + 1
    },
    count2024: parseInt(item.count),
    percentage: parseFloat(item.percentage),
    trend: item.trend || 'stable'
  }))
}
```

### 방법 3: 웹 스크래핑 (추천하지 않음)

대법원 전자가족관계등록시스템이나 관련 사이트에서 직접 데이터를 스크래핑하는 방법입니다.

**주의사항:**
- 저작권 및 이용약관 확인 필수
- 법적 문제 발생 가능
- robots.txt 준수 필요
- 사이트 구조 변경 시 유지보수 어려움

**권장하지 않습니다.** 공식 API나 공개된 데이터를 사용하세요.

## 📝 데이터 구조 명세

### 이름 통계 데이터 (`nameStatistics`)

```javascript
{
  girl: [
    {
      name: string,          // 이름 (예: "서연")
      hanja: string,         // 한자 (예: "瑞妍")
      meaning: string,       // 의미 (예: "상서로운 아름다움")
      ranks: {              // 연도별 순위
        2020: number,
        2021: number,
        2022: number,
        2023: number,
        2024: number
      },
      count2024: number,    // 2024년 신생아 수
      percentage: number,   // 점유율 (%)
      trend: string         // 트렌드 ("rising" | "falling" | "stable")
    }
  ],
  boy: [ /* 동일 구조 */ ]
}
```

### 트렌드 데이터 (`trends`)

```javascript
{
  risingNames2024: [
    {
      name: string,         // 이름
      change: string,       // 변화 (예: "+3순위")
      reason: string        // 이유
    }
  ],
  fallingNames2024: [ /* 동일 구조 */ ],
  popularPatterns: [
    {
      pattern: string,      // 패턴 (예: "서-")
      count: number,        // 개수
      examples: string[]    // 예시 이름들
    }
  ]
}
```

### 한자 데이터 (`hanjaDatabase`)

```javascript
{
  '瑞': {
    reading: string,         // 읽기 (예: "서")
    meaning: string,         // 의미
    detailMeaning: string,   // 상세 의미
    strokes: number,         // 획수
    element: string,         // 오행 (예: "금(金)")
    radicals: string,        // 부수
    popularity: number       // 인기도 (0-100)
  }
}
```

## 🚀 실제 적용 가이드

### 1단계: 데이터 수집
공공데이터포털에서 API 키 발급 또는 CSV 파일 다운로드

### 2단계: 데이터 가공
다운로드한 데이터를 앱에서 사용하는 형식으로 변환

### 3단계: 코드 수정
```javascript
// src/data/namesData.js
// 기존 샘플 데이터를 실제 데이터로 교체
export const nameStatistics = {
  girl: [ /* 실제 데이터 */ ],
  boy: [ /* 실제 데이터 */ ]
}
```

### 4단계: 메타데이터 업데이트
```javascript
export const dataMetadata = {
  source: '대법원 전자가족관계등록시스템',
  description: '2024년 출생신고 기반 신생아 이름 통계',
  lastUpdated: '2024-12-31',
  // ...
}
```

### 5단계: 테스트
- 데이터가 정상적으로 표시되는지 확인
- 통계 페이지에서 출처 정보가 올바른지 확인
- 각 기능(검색, 필터링 등)이 정상 작동하는지 확인

## ⚠️ 주의사항

1. **저작권**: 데이터 사용 전 이용약관 확인
2. **개인정보**: 개인을 특정할 수 있는 정보 제외
3. **API 제한**: API 호출 횟수 제한 확인
4. **에러 처리**: API 실패 시 폴백 데이터 준비
5. **캐싱**: API 호출 최소화를 위한 캐싱 전략 수립

## 📚 참고 자료

- [공공데이터포털 API 가이드](https://www.data.go.kr/ugs/selectPublicDataUseGuideView.do)
- [대법원 전자가족관계등록시스템](https://efamily.scourt.go.kr/)
- [행정안전부 주민등록 통계](https://jumin.mois.go.kr/)

## 💡 추가 개선 사항

현재 샘플 데이터로도 충분히 작동하지만, 실제 서비스를 위해서는:

1. ✅ 실제 정부 데이터 적용
2. ✅ 자동 업데이트 시스템 구축
3. ✅ 더 많은 통계 데이터 추가 (지역별, 연령별 등)
4. ✅ 한자 데이터베이스 확장
5. ✅ 성명학 알고리즘 정확도 향상
6. ✅ 이름 검색 기능 고도화

---

**문의사항이나 도움이 필요하시면 언제든지 연락주세요!**
