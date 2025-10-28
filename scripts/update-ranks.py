#!/usr/bin/env python3
"""
namesData.js의 ranks와 counts를 실제 데이터로 업데이트
"""
import json
import re

# 실제 데이터 로드
with open('name-data-raw.json', 'r', encoding='utf-8') as f:
    real_data = json.load(f)

# namesData.js 읽기
with open('../src/data/namesData.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 실제 데이터를 맵으로 변환
real_map_girl = {item['name']: item for item in real_data['girl']}
real_map_boy = {item['name']: item for item in real_data['boy']}

def replace_name_data(match):
    """이름 객체의 ranks와 counts를 실제 데이터로 교체"""
    full_match = match.group(0)
    name_match = re.search(r'"name":\s*"([^"]+)"', full_match)

    if not name_match:
        return full_match

    name = name_match.group(1)

    # 성별 판단 (girl 섹션인지 boy 섹션인지)
    # 현재 매치가 파일의 어느 위치에 있는지 확인
    gender = 'girl' if match.start() < len(content) // 2 else 'boy'
    real_map = real_map_girl if gender == 'girl' else real_map_boy

    if name not in real_map:
        return full_match

    real = real_map[name]

    # ranks와 counts 교체
    updated = re.sub(
        r'"ranks":\s*\{[^}]+\}',
        f'"ranks": {json.dumps(real["ranks"])}',
        full_match
    )
    updated = re.sub(
        r'"counts":\s*\{[^}]+\}',
        f'"counts": {json.dumps(real["counts"])}',
        updated
    )
    updated = re.sub(
        r'"count2024":\s*\d+',
        f'"count2024": {real["counts"]["2024"]}',
        updated
    )
    updated = re.sub(
        r'"percentage":\s*"[^"]+"',
        f'"percentage": "{(real["counts"]["2024"] / 130000 * 100):.2f}"',
        updated
    )

    return updated

# 이름 객체 패턴으로 교체
pattern = r'\{\s*"name":\s*"[^"]+",\s*"hanja":[^}]+?"trend":\s*"[^"]+"\s*\}'
updated_content = re.sub(pattern, replace_name_data, content)

# 저장
with open('../src/data/namesData.js', 'w', encoding='utf-8') as f:
    f.write(updated_content)

print('✅ ranks와 counts 업데이트 완료!')
print('파일 저장: ../src/data/namesData.js')
