#!/usr/bin/env python3
"""
실제 5년치 데이터를 namesData.js에 병합 (한자/의미 보존)
"""
import json
import re

# 실제 데이터 로드
with open('name-data-raw.json', 'r', encoding='utf-8') as f:
    real_data = json.load(f)

# 실제 데이터 맵 생성
real_girl = {item['name']: item for item in real_data['girl']}
real_boy = {item['name']: item for item in real_data['boy']}

# namesData.js 읽기
with open('../src/data/namesData.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 출력 버퍼
output = []
current_gender = None
in_girl_section = False
in_boy_section = False

i = 0
while i < len(lines):
    line = lines[i]

    # 섹션 감지
    if 'girl: [' in line:
        in_girl_section = True
        current_gender = 'girl'
    elif 'boy: [' in line:
        in_boy_section = True
        in_girl_section = False
        current_gender = 'boy'

    # 이름 객체 라인인지 확인
    if current_gender and ('{ name:' in line or "{ name: '" in line or '{ name: "' in line):
        # 이름 추출
        name_match = re.search(r"name: ['\"]([^'\"]+)['\"]", line)
        if name_match:
            name = name_match.group(1)
            real_map = real_girl if current_gender == 'girl' else real_boy

            if name in real_map:
                # 실제 데이터로 교체
                real = real_map[name]
                # 기존 라인에서 한자, 의미 등 추출
                hanja_match = re.search(r"hanja: ['\"]([^'\"]*)['\"]", line)
                meaning_match = re.search(r"meaning: ['\"]([^'\"]*)['\"]", line)
                trend_match = re.search(r"trend: ['\"]([^'\"]*)['\"]", line)

                hanja = hanja_match.group(1) if hanja_match else '-'
                meaning = meaning_match.group(1) if meaning_match else ''
                trend = trend_match.group(1) if trend_match else 'stable'

                count2024 = real['counts'].get('2024', real['counts'].get(2024, 0))
                percentage = f"{(count2024 / 130000 * 100):.2f}"

                # 새로운 라인 생성
                new_line = f"    {{ name: '{name}', hanja: '{hanja}', meaning: '{meaning}', ranks: {json.dumps(real['ranks'])}, counts: {json.dumps(real['counts'])}, count2024: {count2024}, percentage: '{percentage}', trend: '{trend}' }},\n"
                output.append(new_line)
                i += 1
                continue

    output.append(line)
    i += 1

# 저장
with open('../src/data/namesData.js', 'w', encoding='utf-8') as f:
    f.writelines(output)

print(f'✅ 실제 5년치 데이터 병합 완료!')
print(f'   여자 이름: {len(real_girl)}개 업데이트')
print(f'   남자 이름: {len(real_boy)}개 업데이트')
