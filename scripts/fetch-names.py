#!/usr/bin/env python3
"""
네임차트에서 2020-2024년 이름 통계 크롤링
"""
import requests
from bs4 import BeautifulSoup
import json
import time
import re

years = [2020, 2021, 2022, 2023, 2024]
genders = {'f': 'girl', 'm': 'boy'}

def fetch_page(year, gender, page=1):
    """특정 연도/성별/페이지의 데이터 가져오기"""
    url = f"https://www.namechart.kr/chart/{year}?gender={gender}&page={page}"

    try:
        response = requests.get(url, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })
        response.raise_for_status()
        return response.text
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def parse_names(html):
    """HTML에서 이름 데이터 추출"""
    soup = BeautifulSoup(html, 'html.parser')
    names = []

    # 테이블 행 찾기
    rows = soup.find_all('tr', class_=lambda x: x and 'hover:cursor-pointer' in x)

    for row in rows:
        try:
            # 순위 추출
            rank_td = row.find_all('td')[0]
            rank_text = rank_td.get_text(strip=True)
            # 숫자만 추출
            rank_match = re.search(r'\d+', rank_text)
            if not rank_match:
                continue
            rank = int(rank_match.group())

            # 이름 추출
            name_td = row.find_all('td')[1]
            name = name_td.get_text(strip=True)

            # 출생아 수 추출
            count_td = row.find_all('td')[2]
            count_text = count_td.get_text(strip=True).replace(',', '')
            count = int(count_text)

            names.append({
                'rank': rank,
                'name': name,
                'count': count
            })
        except Exception as e:
            print(f"Error parsing row: {e}")
            continue

    return names

def main():
    all_data = {'girl': {}, 'boy': {}}
    total = len(years) * 2 * 4  # 5년 × 2성별 × 4페이지
    current = 0

    print("네임차트에서 데이터 수집 시작...")
    print(f"총 {total}개 페이지 처리\n")

    for year in years:
        for gender_code, gender_key in genders.items():
            print(f"\n{year}년 {gender_key} 데이터 수집 중...")

            # 4페이지 = TOP 200
            for page in range(1, 5):
                current += 1
                print(f"  [{current}/{total}] {year} {gender_key} page {page}...", end=' ')

                html = fetch_page(year, gender_code, page)
                if not html:
                    print("FAILED")
                    continue

                names = parse_names(html)
                print(f"OK ({len(names)} names)")

                # 데이터 병합
                for item in names:
                    name = item['name']
                    if name not in all_data[gender_key]:
                        all_data[gender_key][name] = {
                            'name': name,
                            'ranks': {},
                            'counts': {}
                        }
                    all_data[gender_key][name]['ranks'][year] = item['rank']
                    all_data[gender_key][name]['counts'][year] = item['count']

                # Rate limiting
                time.sleep(0.5)

    # 리스트로 변환
    result = {
        'girl': list(all_data['girl'].values()),
        'boy': list(all_data['boy'].values())
    }

    # 결과 저장
    output_file = '/Users/chosahoo/Desktop/bebe-name/scripts/name-data-raw.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"\n\n=== 수집 완료 ===")
    print(f"여자 이름: {len(result['girl'])}개")
    print(f"남자 이름: {len(result['boy'])}개")
    print(f"저장 위치: {output_file}")

if __name__ == '__main__':
    main()
