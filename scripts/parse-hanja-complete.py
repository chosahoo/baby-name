#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
대법원 + 네이버 + Unihan 데이터를 결합하여 모든 한자의 의미 채우기
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
                        unicode_code = parts[0]
                        strokes = parts[2]
                        code_point = int(unicode_code.replace('U+', ''), 16)
                        char = chr(code_point)
                        stroke_dict[char] = int(strokes)

        print(f"획수 데이터 {len(stroke_dict)}개 로드됨")
    except Exception as e:
        print(f"획수 데이터 로드 실패: {e}")

    return stroke_dict

def load_unihan_meanings():
    """Unihan 데이터베이스에서 한자 의미 로드"""
    meaning_dict = {}

    try:
        with open('Unihan_Readings.txt', 'r', encoding='utf-8') as f:
            for line in f:
                if line.startswith('#') or not line.strip():
                    continue

                if 'kDefinition' in line:
                    parts = line.strip().split('\t')
                    if len(parts) >= 3:
                        unicode_code = parts[0]
                        definition = parts[2]
                        code_point = int(unicode_code.replace('U+', ''), 16)
                        char = chr(code_point)

                        # 영어 의미를 간단한 한글로 변환
                        korean_meaning = convert_english_to_korean(definition)
                        if korean_meaning:
                            meaning_dict[char] = korean_meaning

        print(f"Unihan 의미 데이터 {len(meaning_dict)}개 로드됨")
    except Exception as e:
        print(f"Unihan 의미 데이터 로드 실패: {e}")

    return meaning_dict

def convert_english_to_korean(english_def):
    """영어 의미를 간단한 한글로 변환"""
    # 괄호 안 내용 제거
    english_def = re.sub(r'\([^)]*\)', '', english_def)

    # 간단한 영한 매핑
    # 동사형 패턴
    if english_def.startswith('to '):
        verb = english_def[3:].split(',')[0].split(';')[0].strip()
        verb_map = {
            'help': '돕', 'assist': '돕', 'aid': '돕',
            'like': '좋아하', 'love': '사랑하', 'enjoy': '즐기',
            'hate': '미워하', 'dislike': '싫어하',
            'follow': '따르', 'obey': '따르',
            'trust': '믿', 'believe': '믿',
            'give': '주', 'offer': '주',
            'take': '가지', 'receive': '받',
            'go': '가', 'come': '오', 'arrive': '이르',
            'see': '보', 'look': '보', 'watch': '보',
            'hear': '듣', 'listen': '듣',
            'speak': '말하', 'say': '말하', 'tell': '말하',
            'eat': '먹', 'drink': '마시',
            'walk': '걷', 'run': '달리',
            'sit': '앉', 'stand': '서',
            'sleep': '자', 'rest': '쉬',
            'work': '일하', 'labor': '일하',
            'learn': '배우', 'study': '공부하',
            'teach': '가르치',
            'write': '쓰', 'read': '읽',
            'open': '열', 'close': '닫',
            'begin': '시작하', 'start': '시작하',
            'end': '끝나', 'finish': '끝내',
            'make': '만들', 'create': '만들',
            'destroy': '부수', 'break': '부수',
            'build': '짓', 'construct': '짓',
            'cut': '자르', 'divide': '나누',
            'join': '합하', 'unite': '합하',
            'rise': '오르', 'raise': '올리',
            'fall': '떨어지', 'drop': '떨어뜨리',
            'pull': '당기', 'push': '밀',
            'hold': '잡', 'grasp': '잡',
            'release': '놓', 'let go': '놓',
            'carry': '나르', 'bear': '짊어지',
            'throw': '던지', 'cast': '던지',
            'catch': '잡',
            'turn': '돌', 'rotate': '돌',
            'move': '움직이', 'shift': '옮기',
            'stop': '멈추', 'halt': '멈추',
            'continue': '계속하',
            'change': '바꾸', 'alter': '바꾸',
            'remain': '남', 'stay': '머물',
            'leave': '떠나', 'depart': '떠나',
            'enter': '들', 'come in': '들어오',
            'exit': '나가',
            'seek': '찾', 'search': '찾', 'look for': '찾',
            'find': '찾', 'discover': '찾',
            'lose': '잃',
            'win': '이기', 'defeat': '이기',
            'fail': '실패하',
            'succeed': '성공하',
            'try': '시도하', 'attempt': '시도하',
            'use': '쓰', 'employ': '쓰',
            'wear': '입', 'put on': '입',
            'remove': '벗', 'take off': '벗',
            'wash': '씻',
            'clean': '깨끗이하',
            'dirty': '더럽히',
            'cook': '요리하',
            'grow': '자라', 'increase': '늘',
            'decrease': '줄',
            'live': '살', 'exist': '있',
            'die': '죽',
            'kill': '죽이',
            'protect': '지키', 'guard': '지키',
            'attack': '공격하',
            'defend': '방어하',
            'hide': '숨',
            'show': '보이', 'display': '보이',
            'remember': '기억하', 'recall': '기억하',
            'forget': '잊',
            'think': '생각하', 'consider': '생각하',
            'know': '알',
            'understand': '이해하',
            'ask': '묻', 'question': '묻',
            'answer': '대답하', 'reply': '대답하',
            'call': '부르',
            'name': '이름짓',
            'fear': '두려워하',
            'hope': '바라', 'wish': '바라',
            'want': '원하', 'desire': '원하',
            'need': '필요하',
            'have': '가지',
            'lack': '모자라',
            'fill': '채우',
            'empty': '비우',
            'cover': '덮',
            'uncover': '열',
            'bind': '묶',
            'loosen': '풀',
            'tie': '매',
            'untie': '풀',
            'hang': '걸',
            'drop': '떨어뜨리',
            'lift': '들',
            'lower': '내리',
            'ascend': '오르',
            'descend': '내리',
            'fly': '날',
            'swim': '헤엄치',
            'float': '뜨',
            'sink': '가라앉',
            'burn': '타', 'ignite': '태우',
            'extinguish': '끄',
            'shine': '빛나',
            'reflect': '비추',
            'illuminate': '비추',
            'darken': '어둡',
            'brighten': '밝',
            'warm': '따뜻하',
            'cool': '식',
            'freeze': '얼',
            'melt': '녹',
            'boil': '끓',
            'flow': '흐르',
            'pour': '붓',
            'spill': '쏟',
            'scatter': '흩',
            'gather': '모으',
            'collect': '모으',
            'distribute': '나누',
            'share': '나누',
            'separate': '나누', 'divide': '나누',
            'mix': '섞',
            'stir': '젓',
            'shake': '흔들',
            'wave': '흔들',
            'bend': '구부리',
            'straighten': '펴',
            'fold': '접',
            'unfold': '펴',
            'wrap': '싸',
            'unwrap': '풀',
            'press': '누르',
            'squeeze': '짜',
            'stretch': '늘이',
            'shrink': '줄',
            'expand': '넓히',
            'contract': '줄이',
            'widen': '넓히',
            'narrow': '좁히',
            'lengthen': '길게하',
            'shorten': '짧게하',
            'thicken': '두껍게하',
            'thin': '얇게하',
        }

        if verb in verb_map:
            return verb_map[verb] + '다'

    # 명사형 패턴
    noun_map = {
        'mountain': '산', 'hill': '언덕', 'hillock': '언덕', 'mound': '언덕',
        'river': '강', 'stream': '시내', 'water': '물',
        'tree': '나무', 'wood': '나무', 'forest': '숲',
        'stone': '돌', 'rock': '바위',
        'sky': '하늘', 'heaven': '하늘',
        'earth': '땅', 'ground': '땅', 'land': '땅',
        'sun': '해', 'moon': '달', 'star': '별',
        'fire': '불', 'flame': '불꽃',
        'wind': '바람', 'air': '공기',
        'rain': '비', 'snow': '눈', 'cloud': '구름',
        'person': '사람', 'people': '사람', 'man': '사람', 'woman': '여자',
        'child': '아이', 'baby': '아기',
        'father': '아버지', 'mother': '어머니',
        'brother': '형제', 'sister': '자매',
        'friend': '벗', 'enemy': '적',
        'king': '왕', 'prince': '왕자',
        'house': '집', 'home': '집', 'building': '건물',
        'door': '문', 'window': '창',
        'road': '길', 'path': '길', 'way': '길',
        'bridge': '다리',
        'city': '도시', 'town': '마을', 'village': '마을',
        'country': '나라', 'nation': '나라',
        'world': '세상', 'universe': '우주',
        'time': '때', 'day': '날', 'night': '밤',
        'morning': '아침', 'evening': '저녁',
        'year': '해', 'month': '달', 'week': '주',
        'spring': '봄', 'summer': '여름', 'autumn': '가을', 'winter': '겨울',
        'food': '음식', 'meat': '고기', 'vegetable': '채소',
        'rice': '쌀', 'grain': '곡식',
        'wine': '술', 'tea': '차',
        'clothes': '옷', 'garment': '옷',
        'shoe': '신발',
        'gold': '금', 'silver': '은', 'iron': '철', 'metal': '쇠',
        'jade': '옥', 'jewel': '보석',
        'money': '돈',
        'book': '책', 'letter': '글',
        'word': '말', 'language': '말',
        'name': '이름',
        'number': '수',
        'color': '색',
        'sound': '소리', 'voice': '목소리',
        'music': '음악', 'song': '노래',
        'picture': '그림', 'image': '그림',
        'light': '빛', 'darkness': '어둠',
        'shadow': '그림자',
        'life': '생명', 'death': '죽음',
        'birth': '출생',
        'age': '나이',
        'health': '건강', 'sickness': '병',
        'strength': '힘', 'power': '힘',
        'weakness': '약함',
        'speed': '빠름', 'slowness': '느림',
        'size': '크기',
        'shape': '모양', 'form': '형태',
        'beauty': '아름다움', 'ugliness': '추함',
        'goodness': '좋음', 'badness': '나쁨',
        'truth': '진리', 'falsehood': '거짓',
        'wisdom': '지혜', 'foolishness': '어리석음',
        'knowledge': '지식',
        'thought': '생각', 'idea': '생각',
        'feeling': '느낌', 'emotion': '감정',
        'love': '사랑', 'hate': '미움',
        'joy': '기쁨', 'sorrow': '슬픔',
        'anger': '분노', 'fear': '두려움',
        'hope': '희망', 'despair': '절망',
        'peace': '평화', 'war': '전쟁',
        'order': '질서', 'chaos': '혼돈',
        'law': '법', 'rule': '규칙',
        'justice': '정의',
        'right': '권리', 'wrong': '잘못',
        'duty': '의무',
        'virtue': '덕', 'vice': '악',
        'honor': '명예', 'shame': '수치',
        'glory': '영광',
        'fame': '명성',
        'rank': '지위', 'position': '지위',
        'officer': '관리', 'official': '관리',
        'scholar': '학자',
        'teacher': '스승',
        'student': '학생',
        'master': '주인', 'servant': '종',
        'lord': '주인',
        'god': '신', 'spirit': '영',
        'ancestor': '조상',
        'descendant': '자손',
        'generation': '대',
        'family': '가족', 'clan': '씨족',
        'tribe': '부족',
        'race': '민족',
        'animal': '짐승', 'beast': '짐승',
        'bird': '새',
        'fish': '물고기',
        'insect': '벌레',
        'dragon': '용',
        'tiger': '호랑이',
        'horse': '말',
        'cow': '소', 'ox': '소',
        'dog': '개',
        'cat': '고양이',
        'flower': '꽃', 'plant': '식물',
        'grass': '풀',
        'leaf': '잎',
        'fruit': '열매',
        'seed': '씨',
        'root': '뿌리',
        'branch': '가지',
        'bamboo': '대나무',
        'pine': '소나무',
    }

    # 단어 매칭
    first_word = english_def.split(',')[0].split(';')[0].strip().lower()
    if first_word in noun_map:
        return noun_map[first_word]

    # 형용사형
    adj_map = {
        'good': '좋', 'bad': '나쁨', 'evil': '악',
        'big': '큼', 'large': '큼', 'great': '큼',
        'small': '작', 'little': '작', 'tiny': '작',
        'long': '길', 'short': '짧',
        'wide': '넓', 'narrow': '좁',
        'thick': '두꺼', 'thin': '얇',
        'deep': '깊', 'shallow': '얕',
        'high': '높', 'low': '낮',
        'tall': '높',
        'strong': '강', 'weak': '약',
        'hard': '단단', 'soft': '부드러',
        'heavy': '무거', 'light': '가벼',
        'hot': '뜨거', 'cold': '차가', 'warm': '따뜻', 'cool': '시원',
        'new': '새', 'old': '오래',
        'young': '젊', 'ancient': '옛',
        'clean': '깨끗', 'dirty': '더러',
        'beautiful': '아름다', 'ugly': '못생',
        'bright': '밝', 'dark': '어두',
        'clear': '맑', 'cloudy': '흐림',
        'straight': '곧', 'crooked': '구부러짐',
        'round': '둥글', 'square': '네모',
        'sharp': '날카로', 'dull': '무딤',
        'smooth': '매끄러', 'rough': '거침',
        'dry': '마름', 'wet': '젖',
        'full': '가득', 'empty': '빔',
        'rich': '부유', 'poor': '가난',
        'wise': '슬기로', 'foolish': '어리석',
        'brave': '용감', 'cowardly': '비겁',
        'true': '참', 'false': '거짓',
        'real': '진짜', 'fake': '가짜',
        'right': '옳', 'wrong': '그름',
        'correct': '바름', 'incorrect': '틀림',
        'same': '같', 'different': '다름',
        'similar': '비슷',
        'equal': '같', 'unequal': '다름',
        'near': '가까', 'far': '먼',
        'close': '가까',
        'distant': '먼',
        'early': '이름', 'late': '늦',
        'fast': '빠름', 'slow': '느림',
        'quick': '빠름',
        'sudden': '갑작스러',
        'gradual': '점진적',
        'happy': '행복', 'sad': '슬픔',
        'joyful': '기쁨',
        'angry': '화남',
        'peaceful': '평화로',
        'calm': '고요', 'noisy': '시끄러',
        'quiet': '조용', 'loud': '시끄러',
        'safe': '안전', 'dangerous': '위험',
        'easy': '쉬', 'difficult': '어려',
        'simple': '간단', 'complex': '복잡',
        'plain': '평범', 'fancy': '화려',
        'common': '흔', 'rare': '드묾',
        'usual': '보통', 'unusual': '특이',
        'normal': '정상', 'abnormal': '비정상',
        'natural': '자연', 'artificial': '인공',
        'wild': '야생', 'tame': '길들',
        'free': '자유', 'bound': '묶임',
        'loose': '헐거', 'tight': '팽팽',
        'open': '열림', 'closed': '닫힘',
        'whole': '온전', 'broken': '깨짐',
        'complete': '완전', 'incomplete': '불완전',
        'perfect': '완벽', 'imperfect': '불완전',
        'pure': '순수', 'impure': '불순',
        'clean': '깨끗', 'unclean': '더러',
        'sacred': '신성', 'profane': '속',
        'holy': '거룩',
        'noble': '고귀', 'base': '천',
        'precious': '귀', 'worthless': '무가치',
        'valuable': '귀',
        'important': '중요', 'unimportant': '사소',
        'necessary': '필요', 'unnecessary': '불필요',
        'useful': '유용', 'useless': '무용',
        'harmful': '해로', 'harmless': '무해',
        'poisonous': '독',
        'fertile': '비옥', 'barren': '메마름',
        'abundant': '풍부', 'scarce': '부족',
        'plenty': '많', 'few': '적',
        'much': '많', 'little': '적',
        'all': '모든', 'none': '없',
        'every': '모든', 'any': '어떤',
        'some': '어떤',
        'many': '많',
        'several': '여러',
        'single': '하나',
        'double': '둘',
        'triple': '셋',
        'first': '첫', 'last': '마지막',
        'former': '전', 'latter': '후',
        'next': '다음',
        'previous': '이전',
        'future': '미래', 'past': '과거',
        'present': '현재',
        'permanent': '영구', 'temporary': '일시',
        'eternal': '영원',
        'mortal': '필멸',
        'living': '살아있', 'dead': '죽',
        'alive': '살아있',
    }

    for word, meaning in adj_map.items():
        if word in first_word:
            return meaning + '다'

    # 짧은 의미 그대로 사용
    if len(first_word) <= 15:
        return first_word

    return ''

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

def extract_meaning(in_field, char, naver_dict, unihan_dict):
    """뜻 추출: 대법원 -> 네이버 -> Unihan 순"""
    # 1. 대법원 데이터
    match = re.search(r':\s*([^\(]+)\(', in_field)
    if match:
        meaning = match.group(1).strip()
        if meaning:
            return meaning

    # 2. 네이버
    if char in naver_dict:
        return naver_dict[char]

    # 3. Unihan
    if char in unihan_dict:
        return unihan_dict[char]

    return ''

def get_stroke_count(char, stroke_dict):
    """한자 획수 반환"""
    if char in stroke_dict:
        return stroke_dict[char]
    return 10

def get_element_by_strokes(strokes):
    """획수로 오행 결정"""
    remainder = strokes % 10
    if remainder in [1, 2]:
        return '목(木)'
    elif remainder in [3, 4]:
        return '화(火)'
    elif remainder in [5, 6]:
        return '토(土)'
    elif remainder in [7, 8]:
        return '금(金)'
    else:
        return '수(水)'

def get_element(char, meaning, strokes):
    """오행 결정"""
    wood_keywords = ['나무', '목', '숲', '초', '풀', '꽃', '죽', '잎', '뿌리', '가지', '송', '매', '림', '버들', '대나무']
    fire_keywords = ['불', '화', '밝', '빛', '햇', '볕', '따뜻', '열', '태양', '명', '광', '양', '조', '요', '단']
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

    return get_element_by_strokes(strokes)

def main():
    print("=== 인명용 한자 데이터 파싱 시작 (완전판) ===\n")

    print("1. Unihan 획수 데이터 로드 중...")
    stroke_dict = load_stroke_data()

    print("\n2. Unihan 의미 데이터 로드 중...")
    unihan_dict = load_unihan_meanings()

    print("\n3. 네이버 한자 뜻 정보 로드 중...")
    naver_dict = load_naver_meanings()

    print("\n4. 대법원 인명용 한자 데이터 로드 중...")
    with open('data-gov.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    print(f"   총 {len(data)}개의 항목 로드됨")

    print("\n5. 데이터 파싱 및 그룹화 중...")
    hanja_by_reading = defaultdict(list)
    skipped = 0
    processed = 0
    no_meaning = 0

    for entry in data:
        code = entry.get('cd')
        ineum = entry.get('ineum', '').strip()
        in_field = entry.get('in', '')

        char = unicode_to_char(code)
        if not char or not ineum:
            skipped += 1
            continue

        # 뜻 추출 (대법원 -> 네이버 -> Unihan)
        meaning = extract_meaning(in_field, char, naver_dict, unihan_dict)
        if not meaning:
            no_meaning += 1
            meaning = '의미 미상'

        strokes = get_stroke_count(char, stroke_dict)
        element = get_element(char, meaning, strokes)

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

    # JavaScript 파일 생성
    print("\n6. JavaScript 파일 생성 중...")

    # 자주 사용되는 한자 목록
    common_hanja_set = set([
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
    ])

    output_lines = []
    output_lines.append("// 인명용 한자 데이터베이스 (완전판)")
    output_lines.append("//")
    output_lines.append("// [법적 근거]")
    output_lines.append("// - 「가족관계의 등록 등에 관한 법률」 (법률 제7401호)")
    output_lines.append("// - 「가족관계의 등록 등에 관한 규칙」 제37조 (인명용 한자의 범위)")
    output_lines.append("//")
    output_lines.append("// [데이터 출처]")
    output_lines.append("// - 대법원 전자가족관계등록시스템")
    output_lines.append("// - 네이버 한자사전")
    output_lines.append("// - Unicode Unihan Database (획수, 의미)")
    output_lines.append("//")
    output_lines.append("// [인명용 한자 현황]")
    output_lines.append("// - 2024년 6월: 총 9,389자")
    output_lines.append(f"// - 본 데이터: {processed}개 항목")
    output_lines.append(f"// - 총 {len(hanja_by_reading)}개 음절")
    output_lines.append(f"// - 의미 미상: {no_meaning}개")
    output_lines.append("")
    output_lines.append("export const hanjaByReading = {")

    sorted_readings = sorted([r for r in hanja_by_reading.keys() if r])

    for i, reading in enumerate(sorted_readings):
        hanja_list = hanja_by_reading[reading]

        seen_chars = set()
        unique_hanja = []
        for hanja in hanja_list:
            if hanja['hanja'] not in seen_chars:
                seen_chars.add(hanja['hanja'])
                unique_hanja.append(hanja)

        # 정렬: 자주 사용 + 의미 있음 우선
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

        output_lines.append(f"  '{reading}': [")
        for j, hanja in enumerate(unique_hanja):
            comma = ',' if j < len(unique_hanja) - 1 else ''
            meaning_escaped = hanja['meaning'].replace("'", "\\'").replace('"', '\\"')
            output_lines.append(f"    {{ hanja: '{hanja['hanja']}', meaning: '{meaning_escaped}', strokes: {hanja['strokes']}, element: '{hanja['element']}' }}{comma}")

        comma = ',' if i < len(sorted_readings) - 1 else ''
        output_lines.append(f"  ]{comma}")

    output_lines.append("}")

    # 나머지 함수 추가 (decomposeHangul, generateHanjaCombinations, strokeFortune)
    with open('hanjaData-improved.js', 'r', encoding='utf-8') as f:
        content = f.read()
        # export const hanjaByReading 이후 부분 추출
        match = re.search(r'(// 한글 문자를 초성.*)', content, re.DOTALL)
        if match:
            output_lines.append("")
            output_lines.append(match.group(1))

    with open('hanjaData-complete.js', 'w', encoding='utf-8') as f:
        f.write('\n'.join(output_lines))

    print(f"\n=== 완료! ===")
    print(f"파일: hanjaData-complete.js")
    print(f"의미 미상: {no_meaning}개 (전체의 {no_meaning*100//processed if processed else 0}%)")

if __name__ == '__main__':
    main()
