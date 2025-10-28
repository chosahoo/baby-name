#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
대법원 + 네이버 인명용 한자 데이터를 파싱하여 JavaScript 형식으로 변환
"""

import json
import re
from collections import defaultdict

def load_stroke_data():
    """Unihan 데이터베이스에서 획수 정보 로드"""
    stroke_dict = {}

    try:
        with open('Unihan_IRGSources.txt', 'r', encoding='utf-8') as f:
            for line in f:
                if line.startswith('#') or not line.strip():
                    continue

                if 'kTotalStrokes' in line:
                    parts = line.strip().split('\t')
                    if len(parts) >= 3:
                        unicode_code = parts[0]  # U+4E00 형식
                        strokes = parts[2]

                        # U+를 제거하고 정수로 변환
                        code_point = int(unicode_code.replace('U+', ''), 16)
                        char = chr(code_point)
                        stroke_dict[char] = int(strokes)

        print(f"획수 데이터 {len(stroke_dict)}개 로드됨")
    except Exception as e:
        print(f"획수 데이터 로드 실패: {e}")

    return stroke_dict

def load_naver_meanings():
    """네이버 한자사전에서 한자별 뜻 정보 로드"""
    naver_dict = {}

    try:
        with open('data-naver.json', 'r', encoding='utf-8') as f:
            naver_data = json.load(f)

        for reading, hanja_list in naver_data.items():
            for item in hanja_list:
                char = item.get('entryName', '')
                pron = item.get('pron', '')

                # "집 가" 형식에서 뜻만 추출
                meaning = pron.split()[0] if pron else ''

                if char and meaning:
                    naver_dict[char] = meaning

        print(f"네이버 뜻 정보 {len(naver_dict)}개 로드됨")
    except Exception as e:
        print(f"네이버 데이터 로드 실패: {e}")

    return naver_dict

def unicode_to_char(code):
    """유니코드 코드를 한자 문자로 변환"""
    try:
        return chr(int(code, 16))
    except:
        return None

def extract_meaning(in_field, char, naver_dict):
    """'in' 필드에서 뜻 추출, 없으면 네이버에서 가져오기
    예: '가 : 아름다울(가)' -> '아름다울'
    """
    # 대법원 데이터에서 뜻 추출 시도
    match = re.search(r':\s*([^\(]+)\(', in_field)
    if match:
        meaning = match.group(1).strip()
        if meaning:
            return meaning

    # 대법원에 없으면 네이버에서 찾기
    if char in naver_dict:
        return naver_dict[char]

    # 둘 다 없으면 빈 문자열
    return ''

def get_stroke_count(char, stroke_dict):
    """한자 획수 반환"""
    if char in stroke_dict:
        return stroke_dict[char]
    return 10

def get_element_by_strokes(strokes):
    """획수로 오행 결정 (전통 성명학 방식)"""
    remainder = strokes % 10

    if remainder in [1, 2]:
        return '목(木)'
    elif remainder in [3, 4]:
        return '화(火)'
    elif remainder in [5, 6]:
        return '토(土)'
    elif remainder in [7, 8]:
        return '금(金)'
    else:  # 9, 0
        return '수(水)'

def get_element(char, meaning, strokes):
    """오행(五行) 결정"""
    # 의미 기반 분류
    wood_keywords = ['나무', '목', '숲', '초', '풀', '꽃', '죽', '잎', '뿌리', '가지', '송', '매', '림', '柳', '버들', '대나무']
    fire_keywords = ['불', '화', '밝', '빛', '햇', '볕', '따뜻', '열', '태양', '日', '명', '광', '양', '조', '요', '단']
    earth_keywords = ['흙', '토', '땅', '산', '석', '돌', '바위', '들', '언덕', '평', '야']
    metal_keywords = ['쇠', '금', '은', '철', '칼', '강', '단단', '옥', '보', '주', '진']
    water_keywords = ['물', '수', '강', '바다', '비', '눈', '시원', '시내', '샘', '못', '이슬', '호', '하', '해', '설', '한']

    meaning_lower = meaning.lower() if meaning else ''

    for keyword in wood_keywords:
        if keyword in meaning_lower:
            return '목(木)'
    for keyword in fire_keywords:
        if keyword in meaning_lower:
            return '화(火)'
    for keyword in earth_keywords:
        if keyword in meaning_lower:
            return '토(土)'
    for keyword in metal_keywords:
        if keyword in meaning_lower:
            return '금(金)'
    for keyword in water_keywords:
        if keyword in meaning_lower:
            return '수(水)'

    # 의미로 결정 불가 시 획수 기반
    return get_element_by_strokes(strokes)

def main():
    print("=== 인명용 한자 데이터 파싱 시작 ===\n")

    # 획수 데이터 로드
    print("1. Unihan 획수 데이터 로드 중...")
    stroke_dict = load_stroke_data()

    # 네이버 뜻 정보 로드
    print("\n2. 네이버 한자 뜻 정보 로드 중...")
    naver_dict = load_naver_meanings()

    # 대법원 JSON 데이터 로드
    print("\n3. 대법원 인명용 한자 데이터 로드 중...")
    with open('data-gov.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    print(f"   총 {len(data)}개의 항목 로드됨")

    # 한글 음절별로 그룹화
    print("\n4. 데이터 파싱 및 그룹화 중...")
    hanja_by_reading = defaultdict(list)
    skipped = 0
    processed = 0
    no_meaning = 0

    for entry in data:
        code = entry.get('cd')
        ineum = entry.get('ineum', '').strip()
        in_field = entry.get('in', '')

        # 유니코드를 한자로 변환
        char = unicode_to_char(code)
        if not char or not ineum:
            skipped += 1
            continue

        # 뜻 추출 (대법원 -> 네이버 순)
        meaning = extract_meaning(in_field, char, naver_dict)
        if not meaning:
            no_meaning += 1
            # 의미가 없어도 데이터는 포함 (음만이라도 표시)
            meaning = '의미 미상'

        # 획수와 오행
        strokes = get_stroke_count(char, stroke_dict)
        element = get_element(char, meaning, strokes)

        # 데이터 추가
        hanja_obj = {
            'hanja': char,
            'meaning': meaning,
            'strokes': strokes,
            'element': element
        }

        hanja_by_reading[ineum].append(hanja_obj)
        processed += 1

        if processed % 1000 == 0:
            print(f"   처리 중... {processed}/{len(data)}")

    print(f"\n   스킵된 항목: {skipped}개")
    print(f"   처리된 항목: {processed}개")
    print(f"   의미 미상: {no_meaning}개")
    print(f"   총 음절 수: {len(hanja_by_reading)}개")

    # JavaScript 형식으로 출력
    print("\n5. JavaScript 파일 생성 중...")
    output_lines = []
    output_lines.append("// 인명용 한자 데이터베이스")
    output_lines.append("//")
    output_lines.append("// [법적 근거]")
    output_lines.append("// - 「가족관계의 등록 등에 관한 법률」 (법률 제7401호)")
    output_lines.append("// - 「가족관계의 등록 등에 관한 규칙」 제37조 (인명용 한자의 범위)")
    output_lines.append("//")
    output_lines.append("// [데이터 출처]")
    output_lines.append("// - 대법원 전자가족관계등록시스템 (https://efamily.scourt.go.kr/)")
    output_lines.append("// - 네이버 한자사전 (뜻 보완)")
    output_lines.append("// - GitHub: rutopio/Korean-Name-Hanja-Charset")
    output_lines.append("// - Unicode Unihan Database (획수 정보)")
    output_lines.append("//")
    output_lines.append("// [인명용 한자 현황]")
    output_lines.append("// - 2024년 6월: 총 9,389자")
    output_lines.append(f"// - 본 데이터: {processed}개 항목 (음별 중복 포함)")
    output_lines.append(f"// - 총 {len(hanja_by_reading)}개 음절")
    output_lines.append(f"// - 의미 미상: {no_meaning}개")
    output_lines.append("//")
    output_lines.append("// [주의사항]")
    output_lines.append("// - 획수는 Unihan 데이터베이스 기준 (정확도 높음)")
    output_lines.append("// - 오행은 의미와 획수 기반 추정값")
    output_lines.append("// - 실제 이름 등록 시 대법원 인명용 한자 조회 서비스에서 최종 확인 필요")
    output_lines.append("")
    output_lines.append("// 한글 음절별 인명용 한자 매핑")
    output_lines.append("export const hanjaByReading = {")

    # 자주 사용되는 한자 목록 (우선순위)
    common_hanja_list = [
        '民', '敏', '珉', '旻', '玟',
        '永', '英', '泳', '榮', '映', '瑛',
        '瑞', '書', '西', '徐', '緖', '序',
        '俊', '峻', '浚', '駿',
        '智', '志', '址', '知', '芝',
        '佳', '可', '嘉', '家', '歌', '加',
        '娜', '羅', '奈',
        '多', '茶',
        '蘭', '欄',
        '麗', '呂',
        '美', '微', '米',
        '善', '宣', '仙', '璿', '璇',
        '雪',
        '成', '星', '聖', '誠', '盛', '城',
        '世', '歲', '細',
        '素', '昭', '召', '小', '蘇',
        '秀', '壽', '洙', '秋', '守', '修', '受',
        '淑', '肅',
        '順', '純', '淳', '舜',
        '承', '升', '勝', '丞',
        '詩', '施', '時',
        '信', '新', '申', '神',
        '實',
        '心', '深', '沈',
        '雅', '亞',
        '安', '眼', '岸',
        '愛', '哀',
        '陽', '良', '揚', '楊', '洋', '養',
        '彦', '言',
        '延', '妍', '姸', '娟', '蓮', '緣', '演', '燕',
        '烈', '悅',
        '藝', '禮', '叡', '睿',
        '五', '午', '梧', '吳',
        '玉', '沃',
        '完', '玩', '琬',
        '王', '旺',
        '堯', '曜', '瑤',
        '龍', '容', '勇', '庸',
        '宇', '雨', '佑', '又', '友', '牛', '優',
        '旭', '昱', '煜',
        '雲', '運', '芸',
        '元', '院', '源', '園', '遠', '媛', '苑',
        '月', '越',
        '有', '柔', '裕', '維', '儒', '油', '諭',
        '尹', '允', '潤', '胤', '倫',
        '律', '栗',
        '銀', '恩', '隱', '殷',
        '音', '陰',
        '義', '意', '依', '宜', '儀',
        '利', '李', '理', '伊', '怡', '二', '爾', '夷',
        '益', '翼',
        '仁', '寅', '認', '忍', '印', '麟',
        '一', '日', '逸',
        '林', '任', '壬',
        '子', '慈', '姿', '紫', '資',
        '在', '才', '材', '財', '栽',
        '全', '田', '前', '典', '展',
        '正', '貞', '靜', '晶', '淨', '鼎', '庭', '亭', '禎', '定',
        '趙', '造', '兆', '助', '朝',
        '鍾', '終', '從', '宗',
        '主', '朱', '珠', '周', '柱', '晝',
        '中', '重', '衆',
        '珍', '眞', '真', '震', '辰', '鎭', '津', '陳',
        '質',
        '昌', '倉', '窓', '暢',
        '采', '彩', '菜',
        '天', '千', '泉', '川', '淺',
        '哲', '鐵', '徹',
        '草', '初', '招', '超',
        '崔', '最',
        '忠', '沖',
        '春', '椿',
        '泰', '太', '胎', '兌',
        '宅', '澤',
        '平', '評',
        '表', '標',
        '豐', '風',
        '必', '弼',
        '夏', '河', '荷', '霞', '下', '賀',
        '學', '鶴',
        '韓', '漢', '寒', '閑', '翰',
        '海', '解', '害', '亥',
        '香', '鄕', '享',
        '許', '虛',
        '獻', '憲', '軒',
        '賢', '炫', '鉉', '絃', '玄', '顯', '縣', '懸', '泫', '眩', '玹',
        '革', '赫', '奕',
        '亨', '兄', '衡',
        '惠', '慧', '蕙',
        '浩', '湖', '好', '虎', '豪', '鎬', '昊', '皓',
        '洪', '紅', '弘', '泓',
        '和', '花', '華', '火', '化',
        '歡', '煥', '桓', '丸',
        '會', '回', '懷',
        '孝', '曉', '效',
        '厚', '候', '後',
        '勳', '勛', '薰',
        '輝', '徽', '暉',
        '姬', '熙', '喜', '稀', '禧', '曦'
    ]

    common_hanja_set = set(common_hanja_list)

    # 가나다순 정렬
    sorted_readings = sorted([r for r in hanja_by_reading.keys() if r])

    for i, reading in enumerate(sorted_readings):
        hanja_list = hanja_by_reading[reading]

        # 각 음절별로 중복 제거
        seen_chars = set()
        unique_hanja = []
        for hanja in hanja_list:
            if hanja['hanja'] not in seen_chars:
                seen_chars.add(hanja['hanja'])
                unique_hanja.append(hanja)

        # 자주 사용되는 한자를 앞으로 정렬
        # 1. 자주 사용 + 의미 있음
        # 2. 자주 사용 + 의미 미상
        # 3. 기타 + 의미 있음
        # 4. 기타 + 의미 미상
        def sort_key(h):
            is_common = h['hanja'] in common_hanja_set
            has_meaning = h['meaning'] != '의미 미상'

            if is_common and has_meaning:
                return (0, h['hanja'])
            elif is_common and not has_meaning:
                return (1, h['hanja'])
            elif not is_common and has_meaning:
                return (2, h['hanja'])
            else:
                return (3, h['hanja'])

        unique_hanja.sort(key=sort_key)

        # JavaScript 형식으로 변환
        output_lines.append(f"  '{reading}': [")
        for j, hanja in enumerate(unique_hanja):
            comma = ',' if j < len(unique_hanja) - 1 else ''
            # 특수문자 이스케이프 처리
            meaning_escaped = hanja['meaning'].replace("'", "\\'")
            output_lines.append(f"    {{ hanja: '{hanja['hanja']}', meaning: '{meaning_escaped}', strokes: {hanja['strokes']}, element: '{hanja['element']}' }}{comma}")

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
    with open('hanjaData-improved.js', 'w', encoding='utf-8') as f:
        f.write('\n'.join(output_lines))

    print(f"\n=== 완료! ===")
    print(f"파일: hanjaData-improved.js")
    print(f"총 {len(sorted_readings)}개의 음절")
    print(f"총 {processed}개의 한자 (음별 중복 포함)")
    print(f"의미 미상: {no_meaning}개 (전체의 {no_meaning*100//processed}%)")

    # 각 음절별 중복 제거 후 총 한자 수 계산
    total_unique_chars = sum(len(set(h['hanja'] for h in hanja_by_reading[r])) for r in sorted_readings)
    print(f"고유 한자 수: 약 {total_unique_chars}개")

    # 샘플 확인
    print("\n[샘플 데이터]")
    for reading in ['민', '서', '준'][:3]:
        if reading in hanja_by_reading:
            unique = list({h['hanja']: h for h in hanja_by_reading[reading]}.values())
            print(f"\n'{reading}': {len(unique)}개 한자")
            for hanja in unique[:5]:
                print(f"  {hanja['hanja']} - {hanja['meaning']} (획수: {hanja['strokes']}, 오행: {hanja['element']})")

if __name__ == '__main__':
    main()
