#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import re

# Read new names data
with open('new-names-2024.json', 'r', encoding='utf-8') as f:
    new_data = json.load(f)

# Read current namesData.js
with open('src/data/namesData.js', 'r', encoding='utf-8') as f:
    current_content = f.read()

# Common hanja patterns for Korean names
common_hanja = {
    # 여자 이름
    '유민': '有民', '수현': '秀賢', '시온': '詩溫', '세빈': '世彬', '서인': '瑞人',
    '라온': '-', '라윤': '-', '세인': '世人', '아라': '雅羅', '해리': '海里',
    '하빈': '夏彬', '온유': '溫柔', '라엘': '-', '우리': '-', '은재': '恩在',
    '채유': '采柔', '혜린': '惠麟', '제니': '-', '조이': '-', '수민': '秀敏',
    '솜': '-', '윤채': '允采', '이엘': '-', '소예': '素藝', '은우': '恩雨',
    '이랑': '-', '윤솔': '允率', '해원': '海原', '혜원': '惠園', '은빈': '恩彬',
    '지효': '智孝', '소연': '小淵', '예주': '藝珠', '보미': '寶美', '은별': '銀別',
    '태연': '泰妍', '지현': '智賢', '가빈': '佳彬', '주은': '珠恩', '별하': '別夏',
    '아름': '-', '아리': '雅利', '소유': '-', '이레': '-', '서영': '瑞英',
    '태희': '泰熙', '유담': '-', '한나': '-', '다원': '多原', '하람': '-',
    '아연': '雅姸', '다희': '多熙', '세하': '世夏', '채희': '采熙', '가윤': '佳允',
    '소원': '素媛', '제나': '-', '라율': '-', '다나': '多娜', '세이': '世伊',
    '연재': '蓮在', '서유': '瑞柔', '예인': '藝人', '채안': '采安', '하니': '-',
    '윤지': '允智', '해온': '海溫', '서온': '瑞溫', '소현': '素賢', '해윤': '海允',
    '여울': '-', '유아': '有娥', '이봄': '-', '로이': '-', '가온': '-',
    '인아': '仁雅', '예리': '藝利', '지연': '智姸', '유정': '有貞', '채연': '采姸',
    '은설': '銀雪', '예봄': '-', '유현': '有賢', '수지': '秀智', '보민': '寶旼',
    '민주': '敏珠', '채현': '采賢', '윤설': '允雪', '바다': '-', '아랑': '-',
    '혜리': '惠利', '하솔': '夏率', '이재': '-', '은': '銀', '지호': '智好',
    '다예': '多藝', '시안': '詩安', '세나': '世娜', '재희': '在希', '제인': '-',
    '이음': '-', '은율': '恩律', '미소': '-', '다겸': '多兼', '선유': '璿柔',
    '라은': '-', '하민': '夏旼', '가현': '佳賢', '해이': '海伊', '유솔': '有率',
    '다해': '多海', '시우': '詩雨', '하라': '夏羅', '유림': '有林', '다솔': '多率',

    # 남자 이름
    '은준': '恩峻', '도빈': '道彬', '아인': '雅人', '리온': '-', '은재': '恩在',
    '주한': '周翰', '준수': '俊秀', '다원': '多源', '승윤': '承允', '선재': '璿在',
    '승민': '承民', '세현': '世賢', '이건': '理健', '시하': '時夏', '동하': '東夏',
    '준혁': '俊赫', '우찬': '祐燦', '승원': '承遠', '준후': '俊候', '지성': '志聖',
    '유호': '有鎬', '태현': '泰賢', '태온': '泰溫', '승호': '承鎬', '찬희': '燦熙',
    '단': '丹', '하윤': '夏允', '호연': '浩然', '재민': '在旼', '유성': '有成',
    '찬우': '燦祐', '준영': '俊英', '해성': '海成', '채우': '采祐', '해온': '海溫',
    '한율': '韓律', '채민': '采旼', '혜성': '彗星', '여준': '麗俊', '이솔': '-',
    '도연': '道延', '성민': '成旼', '건후': '健候', '찬율': '燦律', '유한': '有限',
    '진서': '珍瑞', '민건': '敏健', '강윤': '康允', '찬영': '燦英', '민규': '敏奎',
    '이서': '理緖', '범준': '凡峻', '한울': '-', '유겸': '有謙', '시헌': '時憲',
    '민혁': '敏赫', '로윤': '-', '제이': '-', '승준': '承峻', '바다': '-',
    '정현': '正賢', '채운': '采雲', '유빈': '有彬', '한솔': '-', '이레': '-',
    '이환': '理煥', '건호': '健鎬', '우림': '祐林', '하겸': '夏謙', '승후': '承候',
    '윤슬': '-', '리오': '-', '태경': '泰京', '도한': '道翰', '태겸': '泰謙',
    '원준': '原峻', '승유': '承祐', '민결': '敏結', '가람': '-', '한': '韓',
    '효준': '孝峻', '담': '淡', '로빈': '-', '다겸': '多謙', '준범': '俊凡',
    '이로': '-', '루이': '-', '온': '溫', '민': '旼'
}

def get_hanja(name):
    """Get hanja for a name, return - if pure Korean"""
    if name in common_hanja:
        return common_hanja[name]
    # Default to - for pure Korean names
    return '-'

def get_meaning(name, hanja):
    """Generate meaning based on name"""
    if hanja == '-':
        # Pure Korean names - create poetic meanings
        meanings = {
            '라온': '즐거운', '라윤': '밝고 고운', '라엘': '빛나는', '우리': '우리의 소중한',
            '솜': '부드러운', '이엘': '하나님은 나의 하나님', '이랑': '물결같이',
            '이레': '일곱째 날', '이봄': '이 봄', '로이': '기쁨', '가온': '세상의 중심',
            '아랑': '사랑스러운', '바다': '넓은 바다', '여울': '강의 여울',
            '이음': '연결', '미소': '웃음', '라온': '즐거운', '우리': '우리',
            '가람': '강', '한울': '하늘', '윤슬': '햇빛 반짝임', '이로': '이로운',
            '루이': '빛나는', '온': '온화한', '한': '크고 많은', '담': '순수한',
            '로빈': '빛나는', '제니': '순수한', '조이': '기쁨', '소유': '우리의 것',
            '예봄': '예쁜 봄', '제나': '하나님의 선물', '세이': '세상을 이끄는',
            '제인': '하나님의 은혜', '하니': '하나', '라율': '즐거운 율동',
            '하람': '하늘이 내린', '이봄': '이 봄', '로이': '기쁨',
            '리온': '용기있는', '로윤': '빛나는', '제이': '기쁨', '바다': '넓은 바다',
            '리오': '빛', '로빈': '새', '루이': '유명한 전사', '이레': '일곱',
            '한솔': '큰 소나무', '윤슬': '햇빛 반짝임'
        }
        return meanings.get(name, '아름다운')
    else:
        # Hanja names - create meanings based on hanja
        return f'{name}의 뜻'

print("Starting to expand namesData.js to 500 names per gender...")

# This is a placeholder - the actual update will be done by reading
# existing namesData.js structure and adding new names
print(f"Will add {len(new_data['girl'])} girl names (rank 201+)")
print(f"Will add {len(new_data['boy'])} boy names (rank 203+)")

# Create new entries for girls
girl_additions = []
for item in new_data['girl']:
    name = item['name']
    rank = item['rank']
    count = item['count']
    hanja = get_hanja(name)
    meaning = get_meaning(name, hanja)
    percentage = round(count / 130000 * 100, 2)

    entry = f"""  {{
    name: '{name}',
    hanja: '{hanja}',
    meaning: '{meaning}',
    ranks: {{ 2020: null, 2021: null, 2022: null, 2023: null, 2024: {rank} }},
    counts: {{ 2020: null, 2021: null, 2022: null, 2023: null, 2024: {count} }},
    count2024: {count},
    percentage: '{percentage}',
    trend: 'stable'
  }}"""
    girl_additions.append(entry)

# Create new entries for boys
boy_additions = []
for item in new_data['boy']:
    name = item['name']
    rank = item['rank']
    count = item['count']
    hanja = get_hanja(name)
    meaning = get_meaning(name, hanja)
    percentage = round(count / 130000 * 100, 2)

    entry = f"""  {{
    name: '{name}',
    hanja: '{hanja}',
    meaning: '{meaning}',
    ranks: {{ 2020: null, 2021: null, 2022: null, 2023: null, 2024: {rank} }},
    counts: {{ 2020: null, 2021: null, 2022: null, 2023: null, 2024: {count} }},
    count2024: {count},
    percentage: '{percentage}',
    trend: 'stable'
  }}"""
    boy_additions.append(entry)

print(f"Generated {len(girl_additions)} girl entries")
print(f"Generated {len(boy_additions)} boy entries")

# Save additions to file for manual review
with open('girl-additions.txt', 'w', encoding='utf-8') as f:
    f.write(',\n'.join(girl_additions))

with open('boy-additions.txt', 'w', encoding='utf-8') as f:
    f.write(',\n'.join(boy_additions))

print("Generated girl-additions.txt and boy-additions.txt")
print("These can be manually added to namesData.js")
