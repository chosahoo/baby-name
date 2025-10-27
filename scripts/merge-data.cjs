// 크롤링한 실제 데이터와 기존 한자/의미 데이터 병합
const fs = require('fs');
const path = require('path');

// 기존 데이터 로드
const currentDataPath = path.join(__dirname, '../src/data/namesData.js');
const currentData = require(currentDataPath.replace('.js', ''));

// 크롤링한 실제 순위/출생아수 데이터 로드
const rawDataPath = path.join(__dirname, 'name-data-raw.json');
const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'));

console.log('데이터 병합 시작...\n');

function mergeData(gender) {
  const current = currentData.nameStatistics[gender];
  const raw = rawData[gender];

  console.log(`${gender} 데이터 병합 중...`);
  console.log(`  기존 데이터: ${current.length}개`);
  console.log(`  실제 순위 데이터: ${raw.length}개`);

  // 실제 데이터를 맵으로 변환
  const rawMap = {};
  raw.forEach(item => {
    rawMap[item.name] = item;
  });

  // 기존 데이터 업데이트
  const updated = current.map(item => {
    const realData = rawMap[item.name];

    if (realData) {
      // 실제 데이터가 있으면 ranks와 counts 업데이트
      return {
        ...item,
        ranks: realData.ranks,
        counts: realData.counts,
        count2024: realData.counts[2024] || item.count2024,
        percentage: realData.counts[2024] ?
          (realData.counts[2024] / 130000 * 100).toFixed(2) :
          item.percentage
      };
    }

    return item;
  });

  console.log(`  업데이트 완료: ${updated.filter(item => rawMap[item.name]).length}개 이름이 실제 데이터로 업데이트됨\n`);

  return updated;
}

// 양 성별 데이터 병합
const merged = {
  girl: mergeData('girl'),
  boy: mergeData('boy')
};

// 새로운 namesData.js 파일 생성
const output = `// 2020-2024 대한민국 신생아 이름 통계
// 출처: 대법원 전자가족관계등록시스템 (네임차트 제공)
// 데이터 수집일: ${new Date().toISOString().split('T')[0]}
// ranks: 각 연도별 순위, counts: 각 연도별 출생 수
export const nameStatistics = ${JSON.stringify(merged, null, 2)}
`;

fs.writeFileSync(currentDataPath, output);

console.log('=== 병합 완료 ===');
console.log(`저장 위치: ${currentDataPath}`);
console.log(`여자 이름: ${merged.girl.length}개`);
console.log(`남자 이름: ${merged.boy.length}개`);
