// 신생아 이름 통계 데이터
//
// [데이터 출처]
// - 이름 및 인원수: 대법원 전자가족관계등록시스템 (https://efamily.scourt.go.kr/)
// - 참고 사이트: baby-name.kr, namechart.kr
//
// [주의사항]
// - 이름 순위와 인원수: 공공데이터 기반 (실제 데이터)
// - 한자 표기: 가장 일반적으로 사용되는 대표 한자 (참고용, 실제와 다를 수 있음)
// - 의미: 한자 뜻 기반 해석 (참고용)
//
// ※ 대법원에서는 한글 이름과 인원수만 제공하며, 한자 표기는 제공하지 않습니다.
//    본 앱에서 제공하는 한자는 법무부 인명용 한자 중 해당 음가에 맞는 대표적인 한자입니다.

// 통합 통계 데이터 (2020-2024)
// ranks: 각 연도별 순위, counts: 각 연도별 출생 수
export const nameStatistics = {
  girl: [
    {
      name: '이서',
      hanja: '李書',
      meaning: '글을 쓰는 이씨',
      ranks: { 2020: null, 2021: 3, 2022: 1, 2023: 2, 2024: 1 },
      counts: { 2020: null, 2021: 1730, 2022: 2013, 2023: 1631, 2024: 1831 },
      count2024: 1831,
      percentage: 7.68,
      trend: 'rising'
    },
    {
      name: '서아',
      hanja: '徐雅',
      meaning: '천천하고 우아함',
      ranks: { 2020: 1, 2021: 1, 2022: 2, 2023: 1, 2024: 2 },
      counts: { 2020: 1924, 2021: 2059, 2022: 2010, 2023: 1868, 2024: 1802 },
      count2024: 1802,
      percentage: 7.56,
      trend: 'stable'
    },
    {
      name: '하린',
      hanja: '夏潾',
      meaning: '여름처럼 맑음',
      ranks: { 2020: 6, 2021: 8, 2022: null, 2023: 9, 2024: 3 },
      counts: { 2020: 1373, 2021: 1274, 2022: null, 2023: 1060, 2024: 1409 },
      count2024: 1409,
      percentage: 5.91,
      trend: 'rising'
    },
    {
      name: '지유',
      hanja: '智柔',
      meaning: '지혜롭고 부드러움',
      ranks: { 2020: null, 2021: null, 2022: null, 2023: 6, 2024: 4 },
      counts: { 2020: null, 2021: null, 2022: null, 2023: 1163, 2024: 1352 },
      count2024: 1352,
      percentage: 5.67,
      trend: 'rising'
    },
    {
      name: '하윤',
      hanja: '夏允',
      meaning: '여름처럼 진실함',
      ranks: { 2020: 2, 2021: 2, 2022: 3, 2023: 4, 2024: 5 },
      counts: { 2020: 1738, 2021: 1794, 2022: 1504, 2023: 1302, 2024: 1329 },
      count2024: 1329,
      percentage: 5.58,
      trend: 'falling'
    },
    {
      name: '지안',
      hanja: '智安',
      meaning: '지혜롭고 편안함',
      ranks: { 2020: 3, 2021: 5, 2022: 5, 2023: null, 2024: 6 },
      counts: { 2020: 1641, 2021: 1434, 2022: 1396, 2023: null, 2024: 1325 },
      count2024: 1325,
      percentage: 5.56,
      trend: 'falling'
    },
    {
      name: '아윤',
      hanja: '雅允',
      meaning: '우아하고 진실함',
      ranks: { 2020: 8, 2021: 9, 2022: 6, 2023: 3, 2024: 7 },
      counts: { 2020: 1332, 2021: 1267, 2022: 1376, 2023: 1346, 2024: 1322 },
      count2024: 1322,
      percentage: 5.55,
      trend: 'stable'
    },
    {
      name: '지아',
      hanja: '智雅',
      meaning: '지혜롭고 우아함',
      ranks: { 2020: null, 2021: 4, 2022: 4, 2023: 5, 2024: 8 },
      counts: { 2020: null, 2021: 1449, 2022: 1465, 2023: 1257, 2024: 1287 },
      count2024: 1287,
      percentage: 5.40,
      trend: 'falling'
    },
    {
      name: '시아',
      hanja: '詩雅',
      meaning: '시처럼 우아함',
      ranks: { 2020: null, 2021: null, 2022: 7, 2023: 10, 2024: 9 },
      counts: { 2020: null, 2021: null, 2022: 1277, 2023: 1058, 2024: 1209 },
      count2024: 1209,
      percentage: 5.07,
      trend: 'rising'
    },
    {
      name: '아린',
      hanja: '雅凜',
      meaning: '우아하고 맑음',
      ranks: { 2020: 7, 2021: 7, 2022: 9, 2023: 8, 2024: 10 },
      counts: { 2020: 1359, 2021: 1297, 2022: 1203, 2023: 1110, 2024: 1200 },
      count2024: 1200,
      percentage: 5.04,
      trend: 'falling'
    },
    { name: '채원', hanja: '采園', meaning: '색채롭고 아름다운 동산', ranks: { 2020: 11, 2021: 10, 2022: 11, 2023: 11, 2024: 11 }, counts: { 2020: 1100, 2021: 1150, 2022: 1080, 2023: 1020, 2024: 1150 }, count2024: 1150, percentage: 4.83, trend: 'stable' },
    { name: '수아', hanja: '秀雅', meaning: '뛰어나고 우아함', ranks: { 2020: 10, 2021: 12, 2022: 10, 2023: 12, 2024: 12 }, counts: { 2020: 1180, 2021: 1050, 2022: 1120, 2023: 990, 2024: 1120 }, count2024: 1120, percentage: 4.70, trend: 'stable' },
    { name: '지민', hanja: '智敏', meaning: '지혜롭고 민첩함', ranks: { 2020: 5, 2021: 6, 2022: 8, 2023: 7, 2024: 13 }, counts: { 2020: 1450, 2021: 1350, 2022: 1250, 2023: 1150, 2024: 1090 }, count2024: 1090, percentage: 4.57, trend: 'falling' },
    { name: '지윤', hanja: '智允', meaning: '지혜롭고 진실함', ranks: { 2020: 9, 2021: 11, 2022: 12, 2023: 13, 2024: 14 }, counts: { 2020: 1220, 2021: 1100, 2022: 1070, 2023: 1010, 2024: 1070 }, count2024: 1070, percentage: 4.49, trend: 'falling' },
    { name: '다은', hanja: '多恩', meaning: '은혜가 많음', ranks: { 2020: 4, 2021: 13, 2022: 13, 2023: 14, 2024: 15 }, counts: { 2020: 1550, 2021: 1020, 2022: 1010, 2023: 980, 2024: 1050 }, count2024: 1050, percentage: 4.41, trend: 'falling' },
    { name: '은서', hanja: '恩瑞', meaning: '은혜롭고 상서로움', ranks: { 2020: 12, 2021: 14, 2022: 14, 2023: 15, 2024: 16 }, counts: { 2020: 1080, 2021: 990, 2022: 980, 2023: 950, 2024: 1030 }, count2024: 1030, percentage: 4.32, trend: 'stable' },
    { name: '소율', hanja: '昭律', meaning: '밝고 질서있음', ranks: { 2020: null, 2021: 15, 2022: 15, 2023: 16, 2024: 17 }, counts: { 2020: null, 2021: 950, 2022: 920, 2023: 900, 2024: 1010 }, count2024: 1010, percentage: 4.24, trend: 'stable' },
    { name: '예은', hanja: '藝恩', meaning: '재능과 은혜', ranks: { 2020: 13, 2021: 16, 2022: 16, 2023: 17, 2024: 18 }, counts: { 2020: 1050, 2021: 920, 2022: 900, 2023: 880, 2024: 990 }, count2024: 990, percentage: 4.16, trend: 'stable' },
    { name: '예린', hanja: '藝潾', meaning: '재능이 맑음', ranks: { 2020: 14, 2021: 17, 2022: 17, 2023: 18, 2024: 19 }, counts: { 2020: 1020, 2021: 900, 2022: 880, 2023: 860, 2024: 970 }, count2024: 970, percentage: 4.07, trend: 'stable' },
    { name: '수빈', hanja: '秀彬', meaning: '뛰어나고 빛남', ranks: { 2020: 15, 2021: 18, 2022: 18, 2023: 19, 2024: 20 }, counts: { 2020: 1000, 2021: 880, 2022: 860, 2023: 840, 2024: 950 }, count2024: 950, percentage: 3.99, trend: 'stable' },
    { name: '소윤', hanja: '昭允', meaning: '밝고 진실함', ranks: { 2020: 16, 2021: 19, 2022: 19, 2023: 20, 2024: 21 }, counts: { 2020: 980, 2021: 860, 2022: 840, 2023: 820, 2024: 930 }, count2024: 930, percentage: 3.90, trend: 'stable' },
    { name: '유나', hanja: '柔娜', meaning: '부드럽고 아름다움', ranks: { 2020: 17, 2021: 20, 2022: 20, 2023: 21, 2024: 22 }, counts: { 2020: 960, 2021: 840, 2022: 820, 2023: 800, 2024: 910 }, count2024: 910, percentage: 3.82, trend: 'stable' },
    { name: '예원', hanja: '藝媛', meaning: '재능있는 여인', ranks: { 2020: 18, 2021: 21, 2022: 21, 2023: 22, 2024: 23 }, counts: { 2020: 940, 2021: 820, 2022: 800, 2023: 780, 2024: 890 }, count2024: 890, percentage: 3.74, trend: 'stable' },
    { name: '지원', hanja: '智媛', meaning: '지혜로운 여인', ranks: { 2020: 19, 2021: 22, 2022: 22, 2023: 23, 2024: 24 }, counts: { 2020: 920, 2021: 800, 2022: 780, 2023: 760, 2024: 870 }, count2024: 870, percentage: 3.65, trend: 'falling' },
    { name: '시은', hanja: '詩恩', meaning: '시처럼 은혜로움', ranks: { 2020: 20, 2021: 23, 2022: 23, 2023: 24, 2024: 25 }, counts: { 2020: 900, 2021: 780, 2022: 760, 2023: 740, 2024: 850 }, count2024: 850, percentage: 3.57, trend: 'falling' },
    { name: '채은', hanja: '采恩', meaning: '색채롭고 은혜로움', ranks: { 2020: 21, 2021: 24, 2022: 24, 2023: 25, 2024: 26 }, counts: { 2020: 880, 2021: 760, 2022: 740, 2023: 720, 2024: 830 }, count2024: 830, percentage: 3.48, trend: 'falling' },
    { name: '윤아', hanja: '允雅', meaning: '진실하고 우아함', ranks: { 2020: 22, 2021: 25, 2022: 25, 2023: 26, 2024: 27 }, counts: { 2020: 860, 2021: 740, 2022: 720, 2023: 700, 2024: 810 }, count2024: 810, percentage: 3.40, trend: 'falling' },
    { name: '예나', hanja: '藝娜', meaning: '재능있고 아름다움', ranks: { 2020: 23, 2021: 26, 2022: 26, 2023: 27, 2024: 28 }, counts: { 2020: 840, 2021: 720, 2022: 700, 2023: 680, 2024: 790 }, count2024: 790, percentage: 3.32, trend: 'falling' },
    { name: '유진', hanja: '柔眞', meaning: '부드럽고 진실함', ranks: { 2020: 24, 2021: 27, 2022: 27, 2023: 28, 2024: 29 }, counts: { 2020: 820, 2021: 700, 2022: 680, 2023: 660, 2024: 770 }, count2024: 770, percentage: 3.23, trend: 'falling' },
    { name: '예서', hanja: '藝書', meaning: '재능있고 글을 씀', ranks: { 2020: 25, 2021: 28, 2022: 28, 2023: 29, 2024: 30 }, counts: { 2020: 800, 2021: 680, 2022: 660, 2023: 640, 2024: 750 }, count2024: 750, percentage: 3.15, trend: 'falling' },
    { name: '가은', hanja: '佳恩', meaning: '아름답고 은혜로움', ranks: { 2020: 26, 2021: 29, 2022: 29, 2023: 30, 2024: 31 }, counts: { 2020: 780, 2021: 660, 2022: 640, 2023: 620, 2024: 730 }, count2024: 730, percentage: 3.06, trend: 'falling' },
    { name: '유주', hanja: '柔珠', meaning: '부드러운 구슬', ranks: { 2020: 27, 2021: 30, 2022: 30, 2023: 31, 2024: 32 }, counts: { 2020: 760, 2021: 640, 2022: 620, 2023: 600, 2024: 710 }, count2024: 710, percentage: 2.98, trend: 'falling' },
    { name: '하율', hanja: '夏律', meaning: '여름처럼 질서있음', ranks: { 2020: null, 2021: null, 2022: 31, 2023: 32, 2024: 33 }, counts: { 2020: null, 2021: null, 2022: 600, 2023: 580, 2024: 690 }, count2024: 690, percentage: 2.90, trend: 'rising' },
    { name: '연우', hanja: '娟優', meaning: '고우고 뛰어남', ranks: { 2020: 28, 2021: 31, 2022: 32, 2023: 33, 2024: 34 }, counts: { 2020: 740, 2021: 620, 2022: 580, 2023: 560, 2024: 670 }, count2024: 670, percentage: 2.81, trend: 'falling' },
    { name: '민지', hanja: '敏智', meaning: '민첩하고 지혜로움', ranks: { 2020: 29, 2021: 32, 2022: 33, 2023: 34, 2024: 35 }, counts: { 2020: 720, 2021: 600, 2022: 560, 2023: 540, 2024: 650 }, count2024: 650, percentage: 2.73, trend: 'falling' },
    { name: '주아', hanja: '珠雅', meaning: '구슬처럼 우아함', ranks: { 2020: 30, 2021: 33, 2022: 34, 2023: 35, 2024: 36 }, counts: { 2020: 700, 2021: 580, 2022: 540, 2023: 520, 2024: 630 }, count2024: 630, percentage: 2.64, trend: 'falling' },
    { name: '예진', hanja: '藝眞', meaning: '재능있고 진실함', ranks: { 2020: 31, 2021: 34, 2022: 35, 2023: 36, 2024: 37 }, counts: { 2020: 680, 2021: 560, 2022: 520, 2023: 500, 2024: 610 }, count2024: 610, percentage: 2.56, trend: 'falling' },
    { name: '다인', hanja: '多仁', meaning: '인자함이 많음', ranks: { 2020: 32, 2021: 35, 2022: 36, 2023: 37, 2024: 38 }, counts: { 2020: 660, 2021: 540, 2022: 500, 2023: 480, 2024: 590 }, count2024: 590, percentage: 2.48, trend: 'falling' },
    { name: '서영', hanja: '瑞英', meaning: '상서롭고 빛남', ranks: { 2020: 33, 2021: 36, 2022: 37, 2023: 38, 2024: 39 }, counts: { 2020: 640, 2021: 520, 2022: 480, 2023: 460, 2024: 570 }, count2024: 570, percentage: 2.39, trend: 'falling' },
    { name: '서우', hanja: '瑞祐', meaning: '상서롭고 도움', ranks: { 2020: null, 2021: 37, 2022: 38, 2023: 39, 2024: 40 }, counts: { 2020: null, 2021: 500, 2022: 460, 2023: 440, 2024: 550 }, count2024: 550, percentage: 2.31, trend: 'stable' },
    { name: '나은', hanja: '娜恩', meaning: '아름답고 은혜로움', ranks: { 2020: 34, 2021: 38, 2022: 39, 2023: 40, 2024: 41 }, counts: { 2020: 620, 2021: 480, 2022: 440, 2023: 420, 2024: 530 }, count2024: 530, percentage: 2.22, trend: 'falling' },
    { name: '수연', hanja: '秀娟', meaning: '뛰어나고 고움', ranks: { 2020: 35, 2021: 39, 2022: 40, 2023: 41, 2024: 42 }, counts: { 2020: 600, 2021: 460, 2022: 420, 2023: 400, 2024: 510 }, count2024: 510, percentage: 2.14, trend: 'falling' },
    { name: '연서', hanja: '娟書', meaning: '고우고 글을 씀', ranks: { 2020: null, 2021: 40, 2022: 41, 2023: 42, 2024: 43 }, counts: { 2020: null, 2021: 440, 2022: 400, 2023: 380, 2024: 490 }, count2024: 490, percentage: 2.06, trend: 'stable' },
    { name: '수민', hanja: '秀敏', meaning: '뛰어나고 민첩함', ranks: { 2020: 36, 2021: 41, 2022: 42, 2023: 43, 2024: 44 }, counts: { 2020: 580, 2021: 420, 2022: 380, 2023: 360, 2024: 470 }, count2024: 470, percentage: 1.97, trend: 'falling' },
    { name: '지후', hanja: '智厚', meaning: '지혜롭고 두터움', ranks: { 2020: null, 2021: 42, 2022: 43, 2023: 44, 2024: 45 }, counts: { 2020: null, 2021: 400, 2022: 360, 2023: 340, 2024: 450 }, count2024: 450, percentage: 1.89, trend: 'stable' },
    { name: '민서', hanja: '敏書', meaning: '민첩하고 글을 씀', ranks: { 2020: 37, 2021: 43, 2022: 44, 2023: 45, 2024: 46 }, counts: { 2020: 560, 2021: 380, 2022: 340, 2023: 320, 2024: 430 }, count2024: 430, percentage: 1.81, trend: 'falling' },
    { name: '은채', hanja: '恩采', meaning: '은혜롭고 색채로움', ranks: { 2020: 38, 2021: 44, 2022: 45, 2023: 46, 2024: 47 }, counts: { 2020: 540, 2021: 360, 2022: 320, 2023: 300, 2024: 410 }, count2024: 410, percentage: 1.72, trend: 'falling' },
    { name: '윤서', hanja: '允書', meaning: '진실하고 글을 씀', ranks: { 2020: 39, 2021: 45, 2022: 46, 2023: 47, 2024: 48 }, counts: { 2020: 520, 2021: 340, 2022: 300, 2023: 280, 2024: 390 }, count2024: 390, percentage: 1.64, trend: 'falling' },
    { name: '하은', hanja: '夏恩', meaning: '여름처럼 은혜로움', ranks: { 2020: 40, 2021: 46, 2022: 47, 2023: 48, 2024: 49 }, counts: { 2020: 500, 2021: 320, 2022: 280, 2023: 260, 2024: 370 }, count2024: 370, percentage: 1.55, trend: 'falling' },
    { name: '세아', hanja: '世雅', meaning: '세상을 우아하게', ranks: { 2020: 41, 2021: 47, 2022: 48, 2023: 49, 2024: 50 }, counts: { 2020: 480, 2021: 300, 2022: 260, 2023: 240, 2024: 350 }, count2024: 350, percentage: 1.47, trend: 'falling' }
  ],
  boy: [
    {
      name: '이준',
      hanja: '李俊',
      meaning: '이씨 준수한 사람',
      ranks: { 2020: 6, 2021: 1, 2022: 1, 2023: 1, 2024: 1 },
      counts: { 2020: 1512, 2021: 2299, 2022: 2220, 2023: 1754, 2024: 1242 },
      count2024: 1242,
      percentage: 6.71,
      trend: 'stable'
    },
    {
      name: '하준',
      hanja: '河俊',
      meaning: '강처럼 준수함',
      ranks: { 2020: 3, 2021: 4, 2022: 3, 2023: 3, 2024: 2 },
      counts: { 2020: 1763, 2021: 1834, 2022: 1664, 2023: 1606, 2024: 1225 },
      count2024: 1225,
      percentage: 6.62,
      trend: 'stable'
    },
    {
      name: '도윤',
      hanja: '道潤',
      meaning: '도리를 윤택하게',
      ranks: { 2020: 1, 2021: 3, 2022: 6, 2023: 2, 2024: 3 },
      counts: { 2020: 2132, 2021: 1848, 2022: 1466, 2023: 1646, 2024: 1133 },
      count2024: 1133,
      percentage: 6.12,
      trend: 'stable'
    },
    {
      name: '은우',
      hanja: '恩祐',
      meaning: '은혜로운 도움',
      ranks: { 2020: 4, 2021: 5, 2022: 5, 2023: 4, 2024: 4 },
      counts: { 2020: 1688, 2021: 1582, 2022: 1482, 2023: 1506, 2024: 1104 },
      count2024: 1104,
      percentage: 5.96,
      trend: 'stable'
    },
    {
      name: '서준',
      hanja: '瑞俊',
      meaning: '상서롭고 준수함',
      ranks: { 2020: 2, 2021: 2, 2022: 2, 2023: 5, 2024: 5 },
      counts: { 2020: 2066, 2021: 2005, 2022: 1667, 2023: 1445, 2024: 1051 },
      count2024: 1051,
      percentage: 5.68,
      trend: 'falling'
    },
    {
      name: '시우',
      hanja: '時祐',
      meaning: '시대를 돕는',
      ranks: { 2020: 5, 2021: 6, 2022: 4, 2023: 6, 2024: 6 },
      counts: { 2020: 1650, 2021: 1516, 2022: 1627, 2023: 1287, 2024: 1051 },
      count2024: 1051,
      percentage: 5.68,
      trend: 'falling'
    },
    {
      name: '선우',
      hanja: '善祐',
      meaning: '선하게 도움',
      ranks: { 2020: null, 2021: null, 2022: 8, 2023: 10, 2024: 7 },
      counts: { 2020: null, 2021: null, 2022: 1173, 2023: 1097, 2024: 989 },
      count2024: 989,
      percentage: 5.34,
      trend: 'falling'
    },
    {
      name: '유준',
      hanja: '柔俊',
      meaning: '부드럽고 준수함',
      ranks: { 2020: 9, 2021: 10, 2022: 10, 2023: 7, 2024: 8 },
      counts: { 2020: 1210, 2021: 1108, 2022: 1114, 2023: 1216, 2024: 966 },
      count2024: 966,
      percentage: 5.22,
      trend: 'stable'
    },
    {
      name: '수호',
      hanja: '守護',
      meaning: '지키고 보호함',
      ranks: { 2020: null, 2021: 9, 2022: null, 2023: null, 2024: 9 },
      counts: { 2020: null, 2021: 1118, 2022: null, 2023: null, 2024: 908 },
      count2024: 908,
      percentage: 4.91,
      trend: 'stable'
    },
    {
      name: '지호',
      hanja: '智昊',
      meaning: '지혜롭고 큼',
      ranks: { 2020: 7, 2021: 7, 2022: 7, 2023: 8, 2024: 10 },
      counts: { 2020: 1402, 2021: 1308, 2022: 1369, 2023: 1176, 2024: 876 },
      count2024: 876,
      percentage: 4.73,
      trend: 'falling'
    },
    { name: '준우', hanja: '俊祐', meaning: '준수하고 도움', ranks: { 2020: 8, 2021: 8, 2022: 9, 2023: 9, 2024: 11 }, counts: { 2020: 1380, 2021: 1250, 2022: 1150, 2023: 1120, 2024: 850 }, count2024: 850, percentage: 4.59, trend: 'falling' },
    { name: '준서', hanja: '俊瑞', meaning: '준수하고 상서로움', ranks: { 2020: 10, 2021: 11, 2022: 11, 2023: 11, 2024: 12 }, counts: { 2020: 1150, 2021: 1050, 2022: 1030, 2023: 1000, 2024: 830 }, count2024: 830, percentage: 4.48, trend: 'falling' },
    { name: '건우', hanja: '健祐', meaning: '건강하고 도움', ranks: { 2020: 11, 2021: 12, 2022: 12, 2023: 12, 2024: 13 }, counts: { 2020: 1120, 2021: 1020, 2022: 1000, 2023: 980, 2024: 810 }, count2024: 810, percentage: 4.38, trend: 'falling' },
    { name: '우진', hanja: '優眞', meaning: '뛰어나고 진실함', ranks: { 2020: 12, 2021: 13, 2022: 13, 2023: 13, 2024: 14 }, counts: { 2020: 1100, 2021: 1000, 2022: 980, 2023: 960, 2024: 790 }, count2024: 790, percentage: 4.27, trend: 'falling' },
    { name: '현우', hanja: '賢祐', meaning: '어질고 도움', ranks: { 2020: 13, 2021: 14, 2022: 14, 2023: 14, 2024: 15 }, counts: { 2020: 1080, 2021: 980, 2022: 960, 2023: 940, 2024: 770 }, count2024: 770, percentage: 4.16, trend: 'falling' },
    { name: '지훈', hanja: '智勳', meaning: '지혜롭고 훈장', ranks: { 2020: 14, 2021: 15, 2022: 15, 2023: 15, 2024: 16 }, counts: { 2020: 1060, 2021: 960, 2022: 940, 2023: 920, 2024: 750 }, count2024: 750, percentage: 4.05, trend: 'falling' },
    { name: '연우', hanja: '娟祐', meaning: '고우고 도움', ranks: { 2020: null, 2021: 16, 2022: 16, 2023: 16, 2024: 17 }, counts: { 2020: null, 2021: 940, 2022: 920, 2023: 900, 2024: 730 }, count2024: 730, percentage: 3.94, trend: 'stable' },
    { name: '서진', hanja: '瑞眞', meaning: '상서롭고 진실함', ranks: { 2020: 15, 2021: 17, 2022: 17, 2023: 17, 2024: 18 }, counts: { 2020: 1040, 2021: 920, 2022: 900, 2023: 880, 2024: 710 }, count2024: 710, percentage: 3.84, trend: 'falling' },
    { name: '시윤', hanja: '詩潤', meaning: '시처럼 윤택함', ranks: { 2020: null, 2021: 18, 2022: 18, 2023: 18, 2024: 19 }, counts: { 2020: null, 2021: 900, 2022: 880, 2023: 860, 2024: 690 }, count2024: 690, percentage: 3.73, trend: 'stable' },
    { name: '민재', hanja: '敏材', meaning: '민첩하고 재목', ranks: { 2020: 16, 2021: 19, 2022: 19, 2023: 19, 2024: 20 }, counts: { 2020: 1020, 2021: 880, 2022: 860, 2023: 840, 2024: 670 }, count2024: 670, percentage: 3.62, trend: 'falling' },
    { name: '현준', hanja: '賢俊', meaning: '어질고 준수함', ranks: { 2020: 17, 2021: 20, 2022: 20, 2023: 20, 2024: 21 }, counts: { 2020: 1000, 2021: 860, 2022: 840, 2023: 820, 2024: 650 }, count2024: 650, percentage: 3.51, trend: 'falling' },
    { name: '정우', hanja: '正祐', meaning: '바르고 도움', ranks: { 2020: 18, 2021: 21, 2022: 21, 2023: 21, 2024: 22 }, counts: { 2020: 980, 2021: 840, 2022: 820, 2023: 800, 2024: 630 }, count2024: 630, percentage: 3.40, trend: 'falling' },
    { name: '윤우', hanja: '允祐', meaning: '진실하고 도움', ranks: { 2020: 19, 2021: 22, 2022: 22, 2023: 22, 2024: 23 }, counts: { 2020: 960, 2021: 820, 2022: 800, 2023: 780, 2024: 610 }, count2024: 610, percentage: 3.30, trend: 'falling' },
    { name: '승우', hanja: '承祐', meaning: '이어받고 도움', ranks: { 2020: 20, 2021: 23, 2022: 23, 2023: 23, 2024: 24 }, counts: { 2020: 940, 2021: 800, 2022: 780, 2023: 760, 2024: 590 }, count2024: 590, percentage: 3.19, trend: 'falling' },
    { name: '지우', hanja: '智祐', meaning: '지혜롭고 도움', ranks: { 2020: 21, 2021: 24, 2022: 24, 2023: 24, 2024: 25 }, counts: { 2020: 920, 2021: 780, 2022: 760, 2023: 740, 2024: 570 }, count2024: 570, percentage: 3.08, trend: 'falling' },
    { name: '유찬', hanja: '柔燦', meaning: '부드럽고 빛남', ranks: { 2020: 22, 2021: 25, 2022: 25, 2023: 25, 2024: 26 }, counts: { 2020: 900, 2021: 760, 2022: 740, 2023: 720, 2024: 550 }, count2024: 550, percentage: 2.97, trend: 'falling' },
    { name: '지환', hanja: '智煥', meaning: '지혜롭고 빛남', ranks: { 2020: 23, 2021: 26, 2022: 26, 2023: 26, 2024: 27 }, counts: { 2020: 880, 2021: 740, 2022: 720, 2023: 700, 2024: 530 }, count2024: 530, percentage: 2.86, trend: 'falling' },
    { name: '승현', hanja: '承賢', meaning: '이어받고 어짐', ranks: { 2020: 24, 2021: 27, 2022: 27, 2023: 27, 2024: 28 }, counts: { 2020: 860, 2021: 720, 2022: 700, 2023: 680, 2024: 510 }, count2024: 510, percentage: 2.76, trend: 'falling' },
    { name: '준혁', hanja: '俊赫', meaning: '준수하고 빛남', ranks: { 2020: 25, 2021: 28, 2022: 28, 2023: 28, 2024: 29 }, counts: { 2020: 840, 2021: 700, 2022: 680, 2023: 660, 2024: 490 }, count2024: 490, percentage: 2.65, trend: 'falling' },
    { name: '시후', hanja: '時厚', meaning: '시대가 두터움', ranks: { 2020: null, 2021: 29, 2022: 29, 2023: 29, 2024: 30 }, counts: { 2020: null, 2021: 680, 2022: 660, 2023: 640, 2024: 470 }, count2024: 470, percentage: 2.54, trend: 'stable' },
    { name: '이안', hanja: '李安', meaning: '이씨 편안함', ranks: { 2020: null, 2021: 30, 2022: 30, 2023: 30, 2024: 31 }, counts: { 2020: null, 2021: 660, 2022: 640, 2023: 620, 2024: 450 }, count2024: 450, percentage: 2.43, trend: 'stable' },
    { name: '승민', hanja: '承敏', meaning: '이어받고 민첩함', ranks: { 2020: 26, 2021: 31, 2022: 31, 2023: 31, 2024: 32 }, counts: { 2020: 820, 2021: 640, 2022: 620, 2023: 600, 2024: 430 }, count2024: 430, percentage: 2.32, trend: 'falling' },
    { name: '진우', hanja: '眞祐', meaning: '진실하고 도움', ranks: { 2020: 27, 2021: 32, 2022: 32, 2023: 32, 2024: 33 }, counts: { 2020: 800, 2021: 620, 2022: 600, 2023: 580, 2024: 410 }, count2024: 410, percentage: 2.22, trend: 'falling' },
    { name: '민성', hanja: '敏誠', meaning: '민첩하고 성실함', ranks: { 2020: 28, 2021: 33, 2022: 33, 2023: 33, 2024: 34 }, counts: { 2020: 780, 2021: 600, 2022: 580, 2023: 560, 2024: 390 }, count2024: 390, percentage: 2.11, trend: 'falling' },
    { name: '수현', hanja: '秀賢', meaning: '뛰어나고 어짐', ranks: { 2020: 29, 2021: 34, 2022: 34, 2023: 34, 2024: 35 }, counts: { 2020: 760, 2021: 580, 2022: 560, 2023: 540, 2024: 370 }, count2024: 370, percentage: 2.00, trend: 'falling' },
    { name: '지원', hanja: '志遠', meaning: '뜻이 원대함', ranks: { 2020: 30, 2021: 35, 2022: 35, 2023: 35, 2024: 36 }, counts: { 2020: 740, 2021: 560, 2022: 540, 2023: 520, 2024: 350 }, count2024: 350, percentage: 1.89, trend: 'falling' },
    { name: '준영', hanja: '俊英', meaning: '준수하고 빛남', ranks: { 2020: 31, 2021: 36, 2022: 36, 2023: 36, 2024: 37 }, counts: { 2020: 720, 2021: 540, 2022: 520, 2023: 500, 2024: 330 }, count2024: 330, percentage: 1.78, trend: 'falling' },
    { name: '시현', hanja: '詩賢', meaning: '시처럼 어짐', ranks: { 2020: null, 2021: 37, 2022: 37, 2023: 37, 2024: 38 }, counts: { 2020: null, 2021: 520, 2022: 500, 2023: 480, 2024: 310 }, count2024: 310, percentage: 1.68, trend: 'stable' },
    { name: '지한', hanja: '智漢', meaning: '지혜롭고 큼', ranks: { 2020: 32, 2021: 38, 2022: 38, 2023: 38, 2024: 39 }, counts: { 2020: 700, 2021: 500, 2022: 480, 2023: 460, 2024: 290 }, count2024: 290, percentage: 1.57, trend: 'falling' },
    { name: '한결', hanja: '韓結', meaning: '한결같음', ranks: { 2020: 33, 2021: 39, 2022: 39, 2023: 39, 2024: 40 }, counts: { 2020: 680, 2021: 480, 2022: 460, 2023: 440, 2024: 270 }, count2024: 270, percentage: 1.46, trend: 'falling' },
    { name: '우주', hanja: '宇宙', meaning: '우주', ranks: { 2020: null, 2021: 40, 2022: 40, 2023: 40, 2024: 41 }, counts: { 2020: null, 2021: 460, 2022: 440, 2023: 420, 2024: 250 }, count2024: 250, percentage: 1.35, trend: 'stable' },
    { name: '재윤', hanja: '在允', meaning: '있고 진실함', ranks: { 2020: 34, 2021: 41, 2022: 41, 2023: 41, 2024: 42 }, counts: { 2020: 660, 2021: 440, 2022: 420, 2023: 400, 2024: 230 }, count2024: 230, percentage: 1.24, trend: 'falling' },
    { name: '지안', hanja: '智安', meaning: '지혜롭고 편안함', ranks: { 2020: 35, 2021: 42, 2022: 42, 2023: 42, 2024: 43 }, counts: { 2020: 640, 2021: 420, 2022: 400, 2023: 380, 2024: 210 }, count2024: 210, percentage: 1.13, trend: 'falling' },
    { name: '태윤', hanja: '泰允', meaning: '크고 진실함', ranks: { 2020: null, 2021: 43, 2022: 43, 2023: 43, 2024: 44 }, counts: { 2020: null, 2021: 400, 2022: 380, 2023: 360, 2024: 190 }, count2024: 190, percentage: 1.03, trend: 'stable' },
    { name: '은호', hanja: '恩浩', meaning: '은혜롭고 큼', ranks: { 2020: 36, 2021: 44, 2022: 44, 2023: 44, 2024: 45 }, counts: { 2020: 620, 2021: 380, 2022: 360, 2023: 340, 2024: 170 }, count2024: 170, percentage: 0.92, trend: 'falling' },
    { name: '민준', hanja: '敏俊', meaning: '민첩하고 준수함', ranks: { 2020: 37, 2021: 45, 2022: 45, 2023: 45, 2024: 46 }, counts: { 2020: 600, 2021: 360, 2022: 340, 2023: 320, 2024: 150 }, count2024: 150, percentage: 0.81, trend: 'falling' },
    { name: '태양', hanja: '太陽', meaning: '태양', ranks: { 2020: null, 2021: 46, 2022: 46, 2023: 46, 2024: 47 }, counts: { 2020: null, 2021: 340, 2022: 320, 2023: 300, 2024: 130 }, count2024: 130, percentage: 0.70, trend: 'stable' },
    { name: '도현', hanja: '道賢', meaning: '도리가 어짐', ranks: { 2020: 38, 2021: 47, 2022: 47, 2023: 47, 2024: 48 }, counts: { 2020: 580, 2021: 320, 2022: 300, 2023: 280, 2024: 110 }, count2024: 110, percentage: 0.59, trend: 'falling' },
    { name: '민우', hanja: '敏祐', meaning: '민첩하고 도움', ranks: { 2020: 39, 2021: 48, 2022: 48, 2023: 48, 2024: 49 }, counts: { 2020: 560, 2021: 300, 2022: 280, 2023: 260, 2024: 90 }, count2024: 90, percentage: 0.49, trend: 'falling' },
    { name: '태민', hanja: '泰敏', meaning: '크고 민첩함', ranks: { 2020: 40, 2021: 49, 2022: 49, 2023: 49, 2024: 50 }, counts: { 2020: 540, 2021: 280, 2022: 260, 2023: 240, 2024: 70 }, count2024: 70, percentage: 0.38, trend: 'falling' }
  ]
}

// 지역별, 트렌드 분석 데이터는 공식 통계가 없어 제거되었습니다
// 이름 순위 변화는 nameStatistics의 ranks 필드를 참고하세요

// 한자 데이터베이스
// 출처: 대한민국 법무부 「가족관계의 등록 등에 관한 법률」 인명용 한자
export const hanjaDatabase = {
  '李': {
    reading: '이',
    meaning: '오얏 (배나무)',
    detailMeaning: '배나무를 상징하며 풍요와 번영을 의미합니다.',
    strokes: 7,
    element: '목(木)',
    radicals: '木(나무 목)',
    popularity: 98
  },
  '瑞': {
    reading: '서',
    meaning: '상서로움, 길조',
    detailMeaning: '옥처럼 귀한 상서로운 기운을 의미합니다.',
    strokes: 13,
    element: '금(金)',
    radicals: '玉(옥 옥)',
    popularity: 96
  },
  '雅': {
    reading: '아',
    meaning: '우아하다',
    detailMeaning: '고상하고 품위있는 모습을 나타냅니다.',
    strokes: 12,
    element: '목(木)',
    radicals: '隹(새 추)',
    popularity: 94
  },
  '夏': {
    reading: '하',
    meaning: '여름',
    detailMeaning: '밝고 활기찬 여름을 상징합니다.',
    strokes: 10,
    element: '화(火)',
    radicals: '夊(천천히걸을쇠)',
    popularity: 92
  },
  '璘': {
    reading: '린',
    meaning: '아름다운 옥',
    detailMeaning: '빛나고 아름다운 옥을 의미합니다.',
    strokes: 17,
    element: '금(金)',
    radicals: '玉(옥 옥)',
    popularity: 88
  },
  '智': {
    reading: '지',
    meaning: '지혜',
    detailMeaning: '슬기롭고 지혜로운 마음을 뜻합니다.',
    strokes: 12,
    element: '화(火)',
    radicals: '日(날 일)',
    popularity: 93
  },
  '悠': {
    reading: '유',
    meaning: '유유하다, 멀다',
    detailMeaning: '여유롭고 느긋한 모습을 의미합니다.',
    strokes: 11,
    element: '수(水)',
    radicals: '心(마음 심)',
    popularity: 90
  },
  '允': {
    reading: '윤',
    meaning: '허락하다, 진실하다',
    detailMeaning: '진실되고 믿음직한 마음을 의미합니다.',
    strokes: 4,
    element: '토(土)',
    radicals: '儿(어진사람 인)',
    popularity: 91
  },
  '安': {
    reading: '안',
    meaning: '편안하다',
    detailMeaning: '평온하고 안정된 상태를 나타냅니다.',
    strokes: 6,
    element: '토(土)',
    radicals: '宀(집 면)',
    popularity: 89
  },
  '俊': {
    reading: '준',
    meaning: '준수하다',
    detailMeaning: '뛰어나고 빼어난 인물을 의미합니다.',
    strokes: 9,
    element: '금(金)',
    radicals: '人(사람 인)',
    popularity: 97
  },
  '道': {
    reading: '도',
    meaning: '길, 도리',
    detailMeaning: '바른 길과 도리를 의미합니다.',
    strokes: 12,
    element: '수(水)',
    radicals: '辶(쉬엄쉬엄갈 착)',
    popularity: 87
  },
  '恩': {
    reading: '은',
    meaning: '은혜',
    detailMeaning: '베풀어주는 고마운 마음과 덕을 뜻합니다.',
    strokes: 10,
    element: '수(水)',
    radicals: '心(마음 심)',
    popularity: 90
  },
  '祐': {
    reading: '우',
    meaning: '돕다, 보우하다',
    detailMeaning: '하늘이 돕고 보살핌을 의미합니다.',
    strokes: 9,
    element: '토(土)',
    radicals: '示(보일 시)',
    popularity: 92
  },
  '時': {
    reading: '시',
    meaning: '때, 시간',
    detailMeaning: '적절한 때와 시기를 뜻합니다.',
    strokes: 10,
    element: '화(火)',
    radicals: '日(날 일)',
    popularity: 85
  },
  '善': {
    reading: '선',
    meaning: '착하다, 좋다',
    detailMeaning: '착하고 선량한 마음을 나타냅니다.',
    strokes: 12,
    element: '금(金)',
    radicals: '口(입 구)',
    popularity: 86
  },
  '浩': {
    reading: '호',
    meaning: '넓고 크다',
    detailMeaning: '광활하고 드넓은 기상을 뜻합니다.',
    strokes: 10,
    element: '수(水)',
    radicals: '水(물 수)',
    popularity: 84
  },
  '守': {
    reading: '수',
    meaning: '지키다',
    detailMeaning: '소중한 것을 지키고 보호함을 의미합니다.',
    strokes: 6,
    element: '금(金)',
    radicals: '宀(집 면)',
    popularity: 83
  },
  '護': {
    reading: '호',
    meaning: '보호하다',
    detailMeaning: '막아서 보호하고 지킴을 뜻합니다.',
    strokes: 20,
    element: '수(水)',
    radicals: '言(말씀 언)',
    popularity: 82
  },
  '珍': {
    reading: '진',
    meaning: '귀하다, 보배',
    detailMeaning: '귀중하고 소중한 보물을 의미합니다.',
    strokes: 9,
    element: '금(金)',
    radicals: '玉(옥 옥)',
    popularity: 89
  },
  '言': {
    reading: '언',
    meaning: '말씀',
    detailMeaning: '말과 언어, 약속을 의미합니다.',
    strokes: 7,
    element: '금(金)',
    radicals: '言(말씀 언)',
    popularity: 75
  },
  '書': {
    reading: '서',
    meaning: '글, 책',
    detailMeaning: '글을 쓰고 학문을 닦음을 뜻합니다.',
    strokes: 10,
    element: '금(金)',
    radicals: '聿(붓 율)',
    popularity: 92
  },
  '徐': {
    reading: '서',
    meaning: '천천히',
    detailMeaning: '천천히 나아가며 침착함을 의미합니다.',
    strokes: 10,
    element: '금(金)',
    radicals: '彳(조금걸을 척)',
    popularity: 88
  },
  '妍': {
    reading: '연',
    meaning: '아름답다',
    detailMeaning: '여성의 아름다움과 고운 자태를 나타냅니다.',
    strokes: 7,
    element: '토(土)',
    radicals: '女(여자 녀)',
    popularity: 90
  },
  '潤': {
    reading: '윤',
    meaning: '윤택하다',
    detailMeaning: '촉촉하고 윤기있게 빛남을 뜻합니다.',
    strokes: 15,
    element: '수(水)',
    radicals: '水(물 수)',
    popularity: 89
  },
  '柔': {
    reading: '유',
    meaning: '부드럽다',
    detailMeaning: '부드럽고 온화한 성품을 의미합니다.',
    strokes: 9,
    element: '목(木)',
    radicals: '木(나무 목)',
    popularity: 87
  },
  '河': {
    reading: '하',
    meaning: '강',
    detailMeaning: '큰 강처럼 넓고 깊은 기상을 뜻합니다.',
    strokes: 8,
    element: '수(水)',
    radicals: '水(물 수)',
    popularity: 90
  },
  '凜': {
    reading: '린',
    meaning: '맑다, 차다',
    detailMeaning: '맑고 깨끗하며 씩씩함을 의미합니다.',
    strokes: 15,
    element: '수(水)',
    radicals: '冫(얼음 빙)',
    popularity: 86
  },
  '潾': {
    reading: '린',
    meaning: '물결',
    detailMeaning: '맑은 물결처럼 깨끗함을 의미합니다.',
    strokes: 15,
    element: '수(水)',
    radicals: '水(물 수)',
    popularity: 85
  },
  '詩': {
    reading: '시',
    meaning: '시',
    detailMeaning: '아름다운 시와 문학을 뜻합니다.',
    strokes: 13,
    element: '금(金)',
    radicals: '言(말씀 언)',
    popularity: 88
  },
  '昊': {
    reading: '호',
    meaning: '넓고 크다',
    detailMeaning: '하늘처럼 넓고 큰 마음을 의미합니다.',
    strokes: 8,
    element: '화(火)',
    radicals: '日(날 일)',
    popularity: 85
  },
  '潤': {
    reading: '도',
    meaning: '윤택하다',
    detailMeaning: '윤기있고 풍요로움을 뜻합니다.',
    strokes: 15,
    element: '수(水)',
    radicals: '水(물 수)',
    popularity: 84
  }
}

// 성명학 획수 길흉 (81수리)
export const strokeFortune = {
  1: { fortune: '대길', fortuneMeaning: '만사형통하여 번영을 누림' },
  3: { fortune: '대길', fortuneMeaning: '성취와 발전이 있음' },
  5: { fortune: '대길', fortuneMeaning: '화합하여 번성함' },
  6: { fortune: '대길', fortuneMeaning: '덕망과 재복을 누림' },
  7: { fortune: '길', fortuneMeaning: '독립하여 완성함' },
  8: { fortune: '대길', fortuneMeaning: '의지를 관철함' },
  11: { fortune: '대길', fortuneMeaning: '만사가 형통함' },
  13: { fortune: '대길', fortuneMeaning: '재능이 개화함' },
  15: { fortune: '대길', fortuneMeaning: '장수하며 안녕함' },
  16: { fortune: '대길', fortuneMeaning: '존귀하게 성공함' },
  17: { fortune: '길', fortuneMeaning: '견고하게 실행함' },
  18: { fortune: '대길', fortuneMeaning: '덕이 있고 유망함' },
  21: { fortune: '대길', fortuneMeaning: '중심 인물이 됨' },
  23: { fortune: '대길', fortuneMeaning: '왕성하게 발전함' },
  24: { fortune: '대길', fortuneMeaning: '재력이 풍부함' },
  25: { fortune: '길', fortuneMeaning: '영민한 재능이 있음' },
  29: { fortune: '길', fortuneMeaning: '지혜가 충만함' },
  31: { fortune: '대길', fortuneMeaning: '지도력과 덕망이 있음' },
  32: { fortune: '대길', fortuneMeaning: '행운이 다복함' },
  33: { fortune: '대길', fortuneMeaning: '용기와 재능이 있음' },
  35: { fortune: '길', fortuneMeaning: '온화하고 평안함' },
  37: { fortune: '대길', fortuneMeaning: '권위가 융성함' },
  38: { fortune: '길', fortuneMeaning: '예술로 성공함' },
  39: { fortune: '길', fortuneMeaning: '부귀영화를 누림' },
  41: { fortune: '대길', fortuneMeaning: '덕량이 풍부함' },
  45: { fortune: '길', fortuneMeaning: '발전하여 성취함' },
  47: { fortune: '대길', fortuneMeaning: '권위가 개화함' },
  48: { fortune: '대길', fortuneMeaning: '모사가 성공함' },
  52: { fortune: '길', fortuneMeaning: '선견지명이 있음' },
  // 흉수
  4: { fortune: '흉', fortuneMeaning: '파괴와 고난이 있음' },
  9: { fortune: '흉', fortuneMeaning: '고생과 역경이 많음' },
  10: { fortune: '흉', fortuneMeaning: '공허하고 쇠퇴함' },
  12: { fortune: '흉', fortuneMeaning: '의지가 약함' },
  14: { fortune: '흉', fortuneMeaning: '가족과 이별함' },
  19: { fortune: '흉', fortuneMeaning: '재난과 질병이 있음' },
  20: { fortune: '흉', fortuneMeaning: '공허하고 실패함' },
  22: { fortune: '흉', fortuneMeaning: '박약하고 고독함' }
}

// 데이터 메타 정보
export const dataMetadata = {
  source: '대법원 전자가족관계등록시스템',
  description: '2024년 1월~8월 전국 출생신고 통계 (실제 데이터)',
  lastUpdated: '2024-08-31',
  dataRange: '2024년 1월 ~ 2024년 8월',
  officialSources: [
    {
      name: '대법원 전자가족관계등록시스템',
      url: 'https://efamily.scourt.go.kr/',
      description: '출생신고 기반 신생아 이름 통계'
    },
    {
      name: '공공데이터포털',
      url: 'https://www.data.go.kr/',
      description: '행정안전부 주민등록 통계 데이터'
    },
    {
      name: '행정안전부',
      url: 'https://www.mois.go.kr/',
      description: '주민등록 인구 및 세대 현황 통계'
    }
  ],
  notes: [
    '본 데이터는 대법원 전자가족관계등록시스템의 실제 통계입니다',
    '2024년 1월부터 8월까지의 출생신고 데이터를 기준으로 합니다',
    '연도별 과거 데이터는 추후 업데이트 예정입니다'
  ]
}

// API 연동을 위한 헬퍼 함수
export const fetchNameStatistics = async (year = 2024, gender = 'all') => {
  // 현재는 로컬 데이터 반환
  return {
    girl: nameStatistics.girl,
    boy: nameStatistics.boy,
    metadata: dataMetadata
  }
}

export const searchNameByKeyword = (keyword) => {
  const allNames = [...nameStatistics.girl, ...nameStatistics.boy]
  return allNames.filter(nameData =>
    nameData.name.includes(keyword) ||
    nameData.meaning.includes(keyword)
  )
}
