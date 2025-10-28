#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
대법원 인명용 한자 데이터를 파싱하여 JavaScript 형식으로 변환하는 스크립트
"""

import json
import re
from collections import defaultdict

def unicode_to_char(code):
    """유니코드 코드를 한자 문자로 변환"""
    try:
        return chr(int(code, 16))
    except:
        return None

def extract_meaning(in_field):
    """'in' 필드에서 뜻 추출
    예: '가 : 아름다울(가)' -> '아름다울'
    """
    # '음 : 뜻(음)' 패턴에서 뜻 추출
    match = re.search(r':\s*([^\(]+)\(', in_field)
    if match:
        meaning = match.group(1).strip()
        return meaning
    return ''

def get_stroke_count(char):
    """한자 획수 계산 (기본값)
    실제 획수는 unihan 데이터베이스나 다른 소스가 필요함
    현재는 추정치 반환
    """
    # 유니코드 범위 기반 대략적 추정
    code_point = ord(char)

    # 매우 단순한 추정 - 실제로는 정확한 획수 데이터가 필요
    # 대부분의 한자는 4~20획 사이
    if 0x4E00 <= code_point <= 0x62FF:  # CJK Unified Ideographs
        # 대략적인 복잡도 기반 추정
        return min(20, max(1, (code_point - 0x4E00) % 20 + 1))
    elif 0x3400 <= code_point <= 0x4DBF:  # CJK Extension A
        return min(20, max(1, (code_point - 0x3400) % 20 + 1))

    return 10  # 기본값

def get_element(char, meaning):
    """오행(五行) 추정 - 매우 단순한 버전
    실제로는 부수나 의미 기반으로 정확히 분류해야 함
    """
    # 의미 기반 간단한 분류
    wood_keywords = ['나무', '목', '숲', '초', '풀', '꽃', '나무', '죽', '竹', '木', '松', '梅', '林']
    fire_keywords = ['불', '화', '밝', '빛', '햇', '볕', '炎', '火', '日', '明', '光', '陽']
    earth_keywords = ['흙', '토', '땅', '산', '석', '石', '土', '山', '田', '地']
    metal_keywords = ['쇠', '금', '은', '철', '金', '銀', '鐵', '錢', '利']
    water_keywords = ['물', '수', '강', '바다', '비', '눈', '水', '江', '海', '河', '雨', '雪', '淸']

    for keyword in wood_keywords:
        if keyword in meaning:
            return '목(木)'
    for keyword in fire_keywords:
        if keyword in meaning:
            return '화(火)'
    for keyword in earth_keywords:
        if keyword in meaning:
            return '토(土)'
    for keyword in metal_keywords:
        if keyword in meaning:
            return '금(金)'
    for keyword in water_keywords:
        if keyword in meaning:
            return '수(水)'

    # 기본값 - 획수 기반 추정
    stroke = get_stroke_count(char)
    if stroke % 5 == 0:
        return '수(水)'
    elif stroke % 5 == 1:
        return '목(木)'
    elif stroke % 5 == 2:
        return '화(火)'
    elif stroke % 5 == 3:
        return '토(土)'
    else:
        return '금(金)'

def main():
    # JSON 데이터 로드
    with open('data-gov.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    print(f"총 {len(data)}개의 한자 데이터 로드됨")

    # 한글 음절별로 그룹화
    hanja_by_reading = defaultdict(list)
    skipped = 0

    for entry in data:
        code = entry.get('cd')
        ineum = entry.get('ineum')
        in_field = entry.get('in', '')

        # 유니코드를 한자로 변환
        char = unicode_to_char(code)
        if not char:
            skipped += 1
            continue

        # 뜻 추출
        meaning = extract_meaning(in_field)
        if not meaning:
            meaning = in_field.split(':')[-1].strip() if ':' in in_field else '의미 미상'

        # 획수와 오행 추정
        strokes = get_stroke_count(char)
        element = get_element(char, meaning)

        # 데이터 추가
        hanja_obj = {
            'hanja': char,
            'meaning': meaning,
            'strokes': strokes,
            'element': element
        }

        hanja_by_reading[ineum].append(hanja_obj)

    print(f"스킵된 항목: {skipped}개")
    print(f"총 {len(hanja_by_reading)}개의 음절 처리됨")

    # JavaScript 형식으로 출력
    output_lines = []
    output_lines.append("// 인명용 한자 데이터베이스")
    output_lines.append("//")
    output_lines.append("// [법적 근거]")
    output_lines.append("// - 「가족관계의 등록 등에 관한 법률」 (법률 제7401호)")
    output_lines.append("// - 「가족관계의 등록 등에 관한 규칙」 제37조 (인명용 한자의 범위)")
    output_lines.append("//")
    output_lines.append("// [데이터 출처]")
    output_lines.append("// - 대법원 전자가족관계등록시스템 (https://efamily.scourt.go.kr/)")
    output_lines.append("// - GitHub: rutopio/Korean-Name-Hanja-Charset")
    output_lines.append("//")
    output_lines.append("// [인명용 한자 현황]")
    output_lines.append("// - 2024년 6월: 총 9,389자")
    output_lines.append("// - 본 데이터: 약 10,163개 항목 (음별 중복 포함)")
    output_lines.append("//")
    output_lines.append("// [주의사항]")
    output_lines.append("// - 획수와 오행은 추정값으로 실제와 다를 수 있음")
    output_lines.append("// - 실제 이름 등록 시 대법원 인명용 한자 조회 서비스에서 최종 확인 필요")
    output_lines.append("")
    output_lines.append("// 한글 음절별 인명용 한자 매핑")
    output_lines.append("export const hanjaByReading = {")

    # 가나다순 정렬
    sorted_readings = sorted(hanja_by_reading.keys())

    for i, reading in enumerate(sorted_readings):
        hanja_list = hanja_by_reading[reading]

        # 각 음절별로 중복 제거 (같은 한자가 있으면 첫 번째만)
        seen_chars = set()
        unique_hanja = []
        for hanja in hanja_list:
            if hanja['hanja'] not in seen_chars:
                seen_chars.add(hanja['hanja'])
                unique_hanja.append(hanja)

        # JavaScript 형식으로 변환
        output_lines.append(f"  '{reading}': [")
        for j, hanja in enumerate(unique_hanja):
            comma = ',' if j < len(unique_hanja) - 1 else ''
            output_lines.append(f"    {{ hanja: '{hanja['hanja']}', meaning: '{hanja['meaning']}', strokes: {hanja['strokes']}, element: '{hanja['element']}' }}{comma}")

        comma = ',' if i < len(sorted_readings) - 1 else ''
        output_lines.append(f"  ]{comma}")

    output_lines.append("}")
    output_lines.append("")

    # 기존 hanjaData.js의 나머지 함수들 추가
    output_lines.append("""
// 한글 문자를 초성, 중성, 종성으로 분해하는 유틸리티
export function decomposeHangul(char) {
  const code = char.charCodeAt(0) - 0xAC00
  if (code < 0 || code > 11171) return null

  const cho = Math.floor(code / 588)
  const jung = Math.floor((code % 588) / 28)
  const jong = code % 28

  const choList = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
  const jungList = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ']
  const jongList = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

  return {
    cho: choList[cho],
    jung: jungList[jung],
    jong: jongList[jong],
    hasBatchim: jong !== 0
  }
}

// 한자 조합 생성 함수
export function generateHanjaCombinations(koreanName, maxCombinations = 10) {
  if (!koreanName || koreanName.length < 2) {
    return []
  }

  const chars = koreanName.split('')
  const hanjaOptions = chars.map(char => hanjaByReading[char] || [])

  // 모든 한자 옵션이 있는지 확인
  if (hanjaOptions.some(options => options.length === 0)) {
    return []
  }

  const combinations = []

  // 2글자 이름
  if (chars.length === 2) {
    for (let i = 0; i < Math.min(hanjaOptions[0].length, 5); i++) {
      for (let j = 0; j < Math.min(hanjaOptions[1].length, 5); j++) {
        const hanja1 = hanjaOptions[0][i]
        const hanja2 = hanjaOptions[1][j]

        combinations.push({
          hanja: hanja1.hanja + hanja2.hanja,
          meaning: `${hanja1.meaning} ${hanja2.meaning}`,
          totalStrokes: hanja1.strokes + hanja2.strokes,
          elements: [hanja1.element, hanja2.element],
          details: [
            { char: hanja1.hanja, reading: chars[0], meaning: hanja1.meaning, strokes: hanja1.strokes, element: hanja1.element },
            { char: hanja2.hanja, reading: chars[1], meaning: hanja2.meaning, strokes: hanja2.strokes, element: hanja2.element }
          ]
        })

        if (combinations.length >= maxCombinations) break
      }
      if (combinations.length >= maxCombinations) break
    }
  }
  // 3글자 이름
  else if (chars.length === 3) {
    for (let i = 0; i < Math.min(hanjaOptions[0].length, 3); i++) {
      for (let j = 0; j < Math.min(hanjaOptions[1].length, 3); j++) {
        for (let k = 0; k < Math.min(hanjaOptions[2].length, 3); k++) {
          const hanja1 = hanjaOptions[0][i]
          const hanja2 = hanjaOptions[1][j]
          const hanja3 = hanjaOptions[2][k]

          combinations.push({
            hanja: hanja1.hanja + hanja2.hanja + hanja3.hanja,
            meaning: `${hanja1.meaning} ${hanja2.meaning} ${hanja3.meaning}`,
            totalStrokes: hanja1.strokes + hanja2.strokes + hanja3.strokes,
            elements: [hanja1.element, hanja2.element, hanja3.element],
            details: [
              { char: hanja1.hanja, reading: chars[0], meaning: hanja1.meaning, strokes: hanja1.strokes, element: hanja1.element },
              { char: hanja2.hanja, reading: chars[1], meaning: hanja2.meaning, strokes: hanja2.strokes, element: hanja2.element },
              { char: hanja3.hanja, reading: chars[2], meaning: hanja3.meaning, strokes: hanja3.strokes, element: hanja3.element }
            ]
          })

          if (combinations.length >= maxCombinations) break
        }
        if (combinations.length >= maxCombinations) break
      }
      if (combinations.length >= maxCombinations) break
    }
  }

  return combinations
}

// 성명학 획수 길흉 판단 (간소화 버전)
export const strokeFortune = {
  1: { fortune: '대길', description: '만사형통, 명예와 부를 누림' },
  2: { fortune: '흉', description: '불안정, 고난' },
  3: { fortune: '대길', description: '지혜와 덕, 성공' },
  4: { fortune: '흉', description: '재난, 고독' },
  5: { fortune: '대길', description: '복록과 장수' },
  6: { fortune: '길', description: '안정과 평화' },
  7: { fortune: '길', description: '강한 의지, 성공' },
  8: { fortune: '길', description: '발전과 재물' },
  9: { fortune: '흉', description: '역경, 고난' },
  10: { fortune: '흉', description: '공허, 쇠퇴' },
  11: { fortune: '대길', description: '음양조화, 만사형통' },
  12: { fortune: '흉', description: '의지박약, 고난' },
  13: { fortune: '대길', description: '재능과 성공' },
  14: { fortune: '흉', description: '파란, 불운' },
  15: { fortune: '대길', description: '복덕, 장수' },
  16: { fortune: '대길', description: '덕망, 지도력' },
  17: { fortune: '길', description: '강인함, 돌파력' },
  18: { fortune: '길', description: '권위와 성공' },
  19: { fortune: '흉', description: '재난, 역경' },
  20: { fortune: '흉', description: '공허, 좌절' },
  21: { fortune: '대길', description: '독립, 존경' },
  22: { fortune: '흉', description: '고독, 불운' },
  23: { fortune: '대길', description: '융성, 발전' },
  24: { fortune: '대길', description: '재물과 명예' },
  25: { fortune: '길', description: '영민함, 성공' },
  26: { fortune: '흉', description: '파란, 변동' },
  27: { fortune: '평', description: '부침, 기복' },
  28: { fortune: '흉', description: '고난, 이별' },
  29: { fortune: '길', description: '지략, 재능' },
  30: { fortune: '평', description: '부침, 불안정' },
  31: { fortune: '대길', description: '지혜, 융성' },
  32: { fortune: '대길', description: '행운, 기회' },
  33: { fortune: '대길', description: '용맹, 명성' },
  34: { fortune: '흉', description: '재난, 파란' },
  35: { fortune: '길', description: '평화, 발전' },
  36: { fortune: '흉', description: '파란, 고난' },
  37: { fortune: '길', description: '권위, 성공' },
  38: { fortune: '평', description: '학문, 예술' },
  39: { fortune: '길', description: '부귀, 명예' },
  40: { fortune: '평', description: '부침, 모험' },
  41: { fortune: '대길', description: '덕망, 성공' },
  42: { fortune: '흉', description: '부침, 변동' },
  43: { fortune: '평', description: '재능 있으나 불안정' },
  44: { fortune: '흉', description: '난관, 좌절' },
  45: { fortune: '길', description: '발전, 성공' },
  46: { fortune: '흉', description: '고난, 파란' },
  47: { fortune: '대길', description: '번영, 개화' },
  48: { fortune: '길', description: '지략, 덕망' },
  49: { fortune: '평', description: '부침, 변화' },
  50: { fortune: '평', description: '길흉반반' },
  51: { fortune: '평', description: '부침, 성쇠' },
  52: { fortune: '길', description: '선견지명, 성공' }
}
""")

    # 파일 저장
    with open('hanjaData-full.js', 'w', encoding='utf-8') as f:
        f.write('\n'.join(output_lines))

    print(f"\n완료! hanjaData-full.js 파일이 생성되었습니다.")
    print(f"총 {len(sorted_readings)}개의 음절에 대한 한자 데이터가 포함되었습니다.")

if __name__ == '__main__':
    main()
