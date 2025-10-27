// 네임차트에서 2020-2024년 이름 통계 데이터 크롤링
const https = require('https');
const fs = require('fs');

const years = [2020, 2021, 2022, 2023, 2024];
const genders = { f: 'girl', m: 'boy' };
const allData = { girl: [], boy: [] };

let requestCount = 0;
const totalRequests = years.length * 2 * 4; // 5년 × 2성별 × 4페이지(200개)

function fetchPage(year, gender, page) {
  return new Promise((resolve, reject) => {
    const url = `https://www.namechart.kr/chart/${year}?gender=${gender}&page=${page}`;

    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        requestCount++;
        console.log(`[${requestCount}/${totalRequests}] Fetched ${year} ${gender} page ${page}`);
        resolve(data);
      });
    }).on('error', (err) => {
      console.error(`Error fetching ${year} ${gender} page ${page}:`, err);
      reject(err);
    });
  });
}

function parseNameData(html) {
  const names = [];

  // HTML에서 이름 데이터 추출 (간단한 정규식 사용)
  // 실제 HTML 구조에 맞게 조정 필요
  const rankRegex = /<div[^>]*class="[^"]*rank[^"]*"[^>]*>(\d+)<\/div>/g;
  const nameRegex = /<div[^>]*class="[^"]*name[^"]*"[^>]*>([^<]+)<\/div>/g;
  const countRegex = /<div[^>]*class="[^"]*count[^"]*"[^>]*>([0-9,]+)<\/div>/g;

  const ranks = [...html.matchAll(rankRegex)].map(m => parseInt(m[1]));
  const nameMatches = [...html.matchAll(nameRegex)].map(m => m[1].trim());
  const counts = [...html.matchAll(countRegex)].map(m => parseInt(m[1].replace(/,/g, '')));

  for (let i = 0; i < Math.min(ranks.length, nameMatches.length, counts.length); i++) {
    names.push({
      rank: ranks[i],
      name: nameMatches[i],
      count: counts[i]
    });
  }

  return names;
}

async function fetchAllData() {
  console.log('Starting to fetch name data from namechart.kr...\n');

  for (const year of years) {
    for (const [genderCode, genderKey] of Object.entries(genders)) {
      const yearData = {};

      // 각 페이지 가져오기 (1-4페이지, TOP 200)
      for (let page = 1; page <= 4; page++) {
        try {
          const html = await fetchPage(year, genderCode, page);
          const names = parseNameData(html);

          names.forEach(item => {
            if (!yearData[item.name]) {
              yearData[item.name] = {
                name: item.name,
                ranks: {},
                counts: {}
              };
            }
            yearData[item.name].ranks[year] = item.rank;
            yearData[item.name].counts[year] = item.count;
          });

          // API 부하를 줄이기 위해 잠시 대기
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
          console.error(`Failed to fetch ${year} ${genderCode} page ${page}`);
        }
      }

      // 데이터 병합
      Object.values(yearData).forEach(nameData => {
        const existingName = allData[genderKey].find(n => n.name === nameData.name);
        if (existingName) {
          existingName.ranks = { ...existingName.ranks, ...nameData.ranks };
          existingName.counts = { ...existingName.counts, ...nameData.counts };
        } else {
          allData[genderKey].push(nameData);
        }
      });
    }
  }

  // 결과 정리 및 저장
  console.log('\n=== Data Collection Complete ===');
  console.log(`Total girl names: ${allData.girl.length}`);
  console.log(`Total boy names: ${allData.boy.length}`);

  // JSON 파일로 저장
  const outputPath = '/Users/chosahoo/Desktop/bebe-name/scripts/name-data-raw.json';
  fs.writeFileSync(outputPath, JSON.stringify(allData, null, 2));
  console.log(`\nData saved to: ${outputPath}`);

  return allData;
}

// 실행
fetchAllData().catch(console.error);
