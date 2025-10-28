// 한자 데이터 테스트
import { hanjaByReading, generateHanjaCombinations } from './src/data/hanjaData.js';

console.log("=== 한자 데이터 테스트 ===\n");

// 1. 특정 음절의 한자 개수 확인
const testReadings = ['가', '서', '준', '민', '은', '지'];
console.log("1. 각 음절별 한자 개수:");
testReadings.forEach(reading => {
  const count = hanjaByReading[reading]?.length || 0;
  console.log(`   '${reading}': ${count}개`);
});

// 2. 총 음절 수
const totalReadings = Object.keys(hanjaByReading).length;
console.log(`\n2. 총 음절 수: ${totalReadings}개`);

// 3. 총 한자 수 (대략)
let totalHanja = 0;
for (const reading in hanjaByReading) {
  totalHanja += hanjaByReading[reading].length;
}
console.log(`3. 총 한자 수 (음별 중복 포함): ${totalHanja}개`);

// 4. 샘플 한자 출력
console.log("\n4. '서' 음절의 처음 5개 한자:");
if (hanjaByReading['서']) {
  hanjaByReading['서'].slice(0, 5).forEach(h => {
    console.log(`   ${h.hanja} - ${h.meaning} (획수: ${h.strokes}, 오행: ${h.element})`);
  });
}

// 5. 한자 조합 생성 테스트
console.log("\n5. '서준' 이름의 한자 조합 생성 테스트:");
const combinations = generateHanjaCombinations('서준', 5);
console.log(`   총 ${combinations.length}개의 조합 생성됨`);
combinations.forEach((combo, idx) => {
  console.log(`   ${idx + 1}. ${combo.hanja} - ${combo.meaning} (총 ${combo.totalStrokes}획)`);
});

console.log("\n=== 테스트 완료 ===");
