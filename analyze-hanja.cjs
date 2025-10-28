const { nameStatistics } = require('./src/data/namesData.js');

const hanjaCount = {};

// 여아 TOP 100 이름의 한자 분석 (성씨 제외)
nameStatistics.girl.slice(0, 100).forEach(n => {
  if (n.hanja && n.hanja.length >= 2) {
    // 성씨는 첫 글자, 이름은 나머지
    const nameHanja = n.hanja.substring(1);
    for (let char of nameHanja) {
      if (char !== ' ') {
        hanjaCount[char] = (hanjaCount[char] || 0) + 1;
      }
    }
  }
});

console.log('=== 여아 TOP 100 이름에 가장 많이 사용되는 한자 ===\n');
const sorted = Object.entries(hanjaCount).sort((a,b) => b[1] - a[1]).slice(0, 40);
sorted.forEach(([char, count]) => console.log(`${char}: ${count}회`));

// 남아도 분석
const boyHanjaCount = {};
nameStatistics.boy.slice(0, 100).forEach(n => {
  if (n.hanja && n.hanja.length >= 2) {
    const nameHanja = n.hanja.substring(1);
    for (let char of nameHanja) {
      if (char !== ' ') {
        boyHanjaCount[char] = (boyHanjaCount[char] || 0) + 1;
      }
    }
  }
});

console.log('\n=== 남아 TOP 100 이름에 가장 많이 사용되는 한자 ===\n');
const boySorted = Object.entries(boyHanjaCount).sort((a,b) => b[1] - a[1]).slice(0, 40);
boySorted.forEach(([char, count]) => console.log(`${char}: ${count}회`));
