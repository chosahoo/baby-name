#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import re

# 2020-2023 데이터 (서브에이전트에서 수집한 데이터)
historical_data_2023 = {
    "girl": [
        {"rank": 1, "name": "서아", "count": 1868},
        {"rank": 2, "name": "이서", "count": 1631},
        {"rank": 3, "name": "아윤", "count": 1346},
        {"rank": 4, "name": "하윤", "count": 1302},
        {"rank": 5, "name": "지아", "count": 1257},
        {"rank": 6, "name": "지유", "count": 1163},
        {"rank": 7, "name": "서윤", "count": 1124},
        {"rank": 8, "name": "아린", "count": 1110},
        {"rank": 9, "name": "하린", "count": 1060},
        {"rank": 10, "name": "시아", "count": 1058},
        {"rank": 11, "name": "지안", "count": 1045},
        {"rank": 12, "name": "지우", "count": 1006},
        {"rank": 13, "name": "채아", "count": 927},
        {"rank": 14, "name": "유나", "count": 912},
        {"rank": 15, "name": "예나", "count": 860},
        {"rank": 16, "name": "수아", "count": 846},
        {"rank": 17, "name": "리아", "count": 841},
        {"rank": 18, "name": "나은", "count": 780},
        {"rank": 19, "name": "유주", "count": 779},
        {"rank": 20, "name": "윤슬", "count": 770},
        {"rank": 21, "name": "하은", "count": 752},
        {"rank": 22, "name": "윤서", "count": 748},
        {"rank": 23, "name": "로아", "count": 723},
        {"rank": 24, "name": "채이", "count": 709},
        {"rank": 25, "name": "태리", "count": 704},
        {"rank": 26, "name": "예서", "count": 687},
        {"rank": 27, "name": "서하", "count": 680},
        {"rank": 28, "name": "소이", "count": 679},
        {"rank": 29, "name": "서연", "count": 664},
        {"rank": 30, "name": "유하", "count": 655},
        {"rank": 31, "name": "도아", "count": 651},
        {"rank": 32, "name": "채원", "count": 612},
        {"rank": 33, "name": "하율", "count": 610},
        {"rank": 34, "name": "재이", "count": 595},
        {"rank": 35, "name": "이현", "count": 581},
        {"rank": 36, "name": "예린", "count": 572},
        {"rank": 37, "name": "소율", "count": 569},
        {"rank": 38, "name": "윤아", "count": 565},
        {"rank": 39, "name": "서현", "count": 549},
        {"rank": 40, "name": "다인", "count": 544},
        {"rank": 41, "name": "이솔", "count": 531},
        {"rank": 42, "name": "서우", "count": 530},
        {"rank": 43, "name": "이나", "count": 529},
        {"rank": 44, "name": "다은", "count": 514},
        {"rank": 45, "name": "서은", "count": 513},
        {"rank": 46, "name": "나윤", "count": 511},
        {"rank": 47, "name": "채은", "count": 509},
        {"rank": 48, "name": "지윤", "count": 499},
        {"rank": 49, "name": "세아", "count": 484},
        {"rank": 50, "name": "은서", "count": 464}
    ],
    "boy": [
        {"rank": 1, "name": "이준", "count": 1754},
        {"rank": 2, "name": "도윤", "count": 1646},
        {"rank": 3, "name": "하준", "count": 1606},
        {"rank": 4, "name": "은우", "count": 1506},
        {"rank": 5, "name": "서준", "count": 1445},
        {"rank": 6, "name": "시우", "count": 1287},
        {"rank": 7, "name": "유준", "count": 1216},
        {"rank": 8, "name": "지호", "count": 1176},
        {"rank": 9, "name": "도현", "count": 1142},
        {"rank": 10, "name": "선우", "count": 1097},
        {"rank": 11, "name": "예준", "count": 1094},
        {"rank": 12, "name": "이안", "count": 1034},
        {"rank": 13, "name": "우주", "count": 1016},
        {"rank": 14, "name": "로운", "count": 1011},
        {"rank": 15, "name": "수호", "count": 958},
        {"rank": 16, "name": "연우", "count": 945},
        {"rank": 17, "name": "도하", "count": 937},
        {"rank": 18, "name": "이현", "count": 921},
        {"rank": 19, "name": "윤우", "count": 841},
        {"rank": 20, "name": "준우", "count": 837},
        {"rank": 21, "name": "주원", "count": 823},
        {"rank": 22, "name": "시윤", "count": 783},
        {"rank": 23, "name": "태오", "count": 766},
        {"rank": 24, "name": "도준", "count": 753},
        {"rank": 25, "name": "민준", "count": 723},
        {"rank": 26, "name": "우진", "count": 721},
        {"rank": 27, "name": "지후", "count": 715},
        {"rank": 28, "name": "은호", "count": 648},
        {"rank": 29, "name": "이든", "count": 602},
        {"rank": 30, "name": "서진", "count": 597},
        {"rank": 31, "name": "건우", "count": 588},
        {"rank": 32, "name": "서우", "count": 583},
        {"rank": 33, "name": "지한", "count": 579},
        {"rank": 34, "name": "지우", "count": 540},
        {"rank": 35, "name": "현우", "count": 507},
        {"rank": 36, "name": "하진", "count": 506},
        {"rank": 37, "name": "태이", "count": 498},
        {"rank": 38, "name": "이한", "count": 487},
        {"rank": 39, "name": "율", "count": 470},
        {"rank": 40, "name": "지안", "count": 469},
        {"rank": 41, "name": "준서", "count": 444},
        {"rank": 42, "name": "유찬", "count": 443},
        {"rank": 43, "name": "지오", "count": 434},
        {"rank": 44, "name": "도율", "count": 429},
        {"rank": 45, "name": "하온", "count": 424},
        {"rank": 46, "name": "다온", "count": 423},
        {"rank": 47, "name": "정우", "count": 422},
        {"rank": 48, "name": "단우", "count": 420},
        {"rank": 49, "name": "지훈", "count": 411},
        {"rank": 50, "name": "로이", "count": 409}
    ]
}

# Read current namesData.js
with open('src/data/namesData.js', 'r', encoding='utf-8') as f:
    content = f.read()

# TOP 200 이름 추출하기
print("Analyzing current namesData.js structure...")
print("Script will update the first 200 names for each gender with 2020-2023 data")
print("\nNote: This is a placeholder. The actual update needs to be done with the full historical data.")
print("For now, we'll create a mapping structure that can be used to update the file.")

# Create mapping for TOP 50 from 2023 data as example
girl_map_2023 = {item['name']: {'rank': item['rank'], 'count': item['count']}
                 for item in historical_data_2023['girl']}
boy_map_2023 = {item['name']: {'rank': item['rank'], 'count': item['count']}
                for item in historical_data_2023['boy']}

print(f"\nExample 2023 mappings created:")
print(f"Girls: {len(girl_map_2023)} names")
print(f"Boys: {len(boy_map_2023)} names")
print(f"\nSample girl names from 2023: {list(girl_map_2023.keys())[:10]}")
print(f"Sample boy names from 2023: {list(boy_map_2023.keys())[:10]}")
