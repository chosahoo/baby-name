// 인명용 한자 데이터베이스
//
// [법적 근거]
// - 「가족관계의 등록 등에 관한 법률」 (법률 제7401호)
// - 「가족관계의 등록 등에 관한 규칙」 제37조 (인명용 한자의 범위)
//
// [데이터 출처]
// - 대법원 전자가족관계등록시스템 (https://efamily.scourt.go.kr/)
// - 인명용 한자 조회 서비스: https://efamily.scourt.go.kr/cs/CsBltnWrtList.do?bltnbordId=0000010
// - 문의: 사용자지원센터 1899-2732 / 031-776-7878
//
// [인명용 한자 현황]
// - 2015년: 8,142자 (기본 5,761자 + 추가 2,381자)
// - 2018년: +137자 추가
// - 2022년: +40자 추가
// - 2024년 6월: +1,070자 추가 (현재 총 9,389자)
//
// [주의사항]
// - 본 데이터는 이름에 자주 사용되는 인명용 한자 200+ 음절을 선별하여 구성
// - 모든 9,389자를 포함하지 않음 (자주 사용되는 한자 중심)
// - 한자의 획수, 오행, 의미는 전통 한자 자전 기준
// - 실제 이름 등록 시 대법원 인명용 한자 조회 서비스에서 최종 확인 필요

// 한글 음절별 인명용 한자 매핑
export const hanjaByReading = {
  // ㄱ
  '가': [
    { hanja: '佳', meaning: '아름다울', strokes: 8, element: '목(木)' },
    { hanja: '可', meaning: '옳을', strokes: 5, element: '토(土)' },
    { hanja: '嘉', meaning: '아름다울', strokes: 14, element: '토(土)' },
    { hanja: '歌', meaning: '노래', strokes: 14, element: '금(金)' },
    { hanja: '家', meaning: '집', strokes: 10, element: '토(土)' }
  ],
  '경': [
    { hanja: '京', meaning: '서울', strokes: 8, element: '토(土)' },
    { hanja: '敬', meaning: '공경할', strokes: 12, element: '목(木)' },
    { hanja: '景', meaning: '경치', strokes: 12, element: '목(木)' },
    { hanja: '慶', meaning: '경사', strokes: 15, element: '목(木)' },
    { hanja: '炅', meaning: '밝을', strokes: 8, element: '화(火)' },
    { hanja: '璟', meaning: '옥빛', strokes: 16, element: '화(火)' }
  ],
  '규': [
    { hanja: '奎', meaning: '별', strokes: 9, element: '토(土)' },
    { hanja: '圭', meaning: '옥', strokes: 6, element: '토(土)' },
    { hanja: '揆', meaning: '헤아릴', strokes: 12, element: '목(木)' }
  ],
  '근': [
    { hanja: '根', meaning: '뿌리', strokes: 10, element: '목(木)' },
    { hanja: '勤', meaning: '부지런할', strokes: 13, element: '목(木)' },
    { hanja: '謹', meaning: '삼갈', strokes: 17, element: '목(木)' },
    { hanja: '瑾', meaning: '아름다운 옥', strokes: 15, element: '화(火)' }
  ],
  '금': [
    { hanja: '金', meaning: '쇠', strokes: 8, element: '금(金)' },
    { hanja: '琴', meaning: '거문고', strokes: 12, element: '목(木)' },
    { hanja: '錦', meaning: '비단', strokes: 16, element: '금(金)' }
  ],
  '기': [
    { hanja: '基', meaning: '터', strokes: 11, element: '토(土)' },
    { hanja: '起', meaning: '일어날', strokes: 10, element: '목(木)' },
    { hanja: '琦', meaning: '아름다운 옥', strokes: 12, element: '화(火)' },
    { hanja: '祈', meaning: '빌', strokes: 8, element: '화(火)' },
    { hanja: '麒', meaning: '기린', strokes: 19, element: '화(火)' }
  ],
  '길': [
    { hanja: '吉', meaning: '길할', strokes: 6, element: '토(土)' },
    { hanja: '佶', meaning: '건강할', strokes: 8, element: '목(木)' }
  ],

  // ㄴ
  '나': [
    { hanja: '娜', meaning: '아름다울', strokes: 10, element: '화(火)' },
    { hanja: '奈', meaning: '어찌', strokes: 8, element: '목(木)' },
    { hanja: '羅', meaning: '벌일', strokes: 19, element: '화(火)' }
  ],
  '남': [
    { hanja: '南', meaning: '남녘', strokes: 9, element: '화(火)' },
    { hanja: '男', meaning: '사내', strokes: 7, element: '화(火)' },
    { hanja: '楠', meaning: '녹나무', strokes: 13, element: '목(木)' }
  ],
  '노': [
    { hanja: '努', meaning: '힘쓸', strokes: 7, element: '화(火)' },
    { hanja: '魯', meaning: '나라 이름', strokes: 15, element: '화(火)' }
  ],
  '누': [
    { hanja: '樓', meaning: '다락', strokes: 15, element: '목(木)' }
  ],

  // ㄷ
  '다': [
    { hanja: '多', meaning: '많을', strokes: 6, element: '화(火)' },
    { hanja: '茶', meaning: '차', strokes: 9, element: '목(木)' }
  ],
  '단': [
    { hanja: '丹', meaning: '붉을', strokes: 4, element: '화(火)' },
    { hanja: '旦', meaning: '아침', strokes: 5, element: '화(火)' },
    { hanja: '端', meaning: '바를', strokes: 14, element: '화(火)' }
  ],
  '담': [
    { hanja: '澹', meaning: '맑을', strokes: 16, element: '수(水)' }
  ],
  '덕': [
    { hanja: '德', meaning: '덕', strokes: 15, element: '화(火)' }
  ],
  '도': [
    { hanja: '道', meaning: '길', strokes: 12, element: '화(火)' },
    { hanja: '度', meaning: '법도', strokes: 9, element: '화(火)' },
    { hanja: '桃', meaning: '복숭아', strokes: 10, element: '목(木)' },
    { hanja: '都', meaning: '도읍', strokes: 11, element: '토(土)' }
  ],
  '동': [
    { hanja: '東', meaning: '동녘', strokes: 8, element: '목(木)' },
    { hanja: '冬', meaning: '겨울', strokes: 5, element: '수(水)' },
    { hanja: '桐', meaning: '오동나무', strokes: 10, element: '목(木)' },
    { hanja: '棟', meaning: '마루', strokes: 12, element: '목(木)' }
  ],
  '두': [
    { hanja: '斗', meaning: '말', strokes: 4, element: '화(火)' },
    { hanja: '豆', meaning: '콩', strokes: 7, element: '화(火)' }
  ],

  // ㄹ
  '라': [
    { hanja: '羅', meaning: '벌일', strokes: 19, element: '화(火)' },
    { hanja: '蘿', meaning: '마삭줄', strokes: 19, element: '목(木)' }
  ],
  '란': [
    { hanja: '蘭', meaning: '난초', strokes: 19, element: '목(木)' },
    { hanja: '欄', meaning: '난간', strokes: 17, element: '목(木)' }
  ],
  '려': [
    { hanja: '麗', meaning: '고울', strokes: 19, element: '화(火)' },
    { hanja: '呂', meaning: '성씨', strokes: 7, element: '화(火)' }
  ],
  '령': [
    { hanja: '令', meaning: '명령', strokes: 5, element: '화(火)' },
    { hanja: '寧', meaning: '편안할', strokes: 14, element: '화(火)' },
    { hanja: '玲', meaning: '옥소리', strokes: 9, element: '화(火)' }
  ],
  '로': [
    { hanja: '路', meaning: '길', strokes: 13, element: '화(火)' },
    { hanja: '露', meaning: '이슬', strokes: 21, element: '수(水)' }
  ],
  '리': [
    { hanja: '利', meaning: '이로울', strokes: 7, element: '금(金)' },
    { hanja: '理', meaning: '다스릴', strokes: 11, element: '화(火)' },
    { hanja: '李', meaning: '오얏', strokes: 7, element: '목(木)' },
    { hanja: '梨', meaning: '배나무', strokes: 11, element: '목(木)' },
    { hanja: '璃', meaning: '유리', strokes: 14, element: '화(火)' },
    { hanja: '里', meaning: '마을', strokes: 7, element: '토(土)' }
  ],
  '린': [
    { hanja: '麟', meaning: '기린', strokes: 23, element: '화(火)' },
    { hanja: '璘', meaning: '옥빛', strokes: 16, element: '화(火)' },
    { hanja: '隣', meaning: '이웃', strokes: 16, element: '화(火)' }
  ],

  // ㅁ
  '만': [
    { hanja: '萬', meaning: '일만', strokes: 13, element: '목(木)' },
    { hanja: '滿', meaning: '찰', strokes: 14, element: '수(水)' },
    { hanja: '晩', meaning: '늦을', strokes: 11, element: '화(火)' }
  ],
  '매': [
    { hanja: '梅', meaning: '매화', strokes: 10, element: '목(木)' },
    { hanja: '媒', meaning: '중매', strokes: 12, element: '목(木)' }
  ],
  '명': [
    { hanja: '明', meaning: '밝을', strokes: 8, element: '화(火)' },
    { hanja: '命', meaning: '목숨', strokes: 8, element: '수(水)' },
    { hanja: '銘', meaning: '새길', strokes: 14, element: '금(金)' },
    { hanja: '鳴', meaning: '울', strokes: 14, element: '화(火)' }
  ],
  '모': [
    { hanja: '母', meaning: '어미', strokes: 5, element: '수(水)' },
    { hanja: '慕', meaning: '사모할', strokes: 14, element: '수(水)' },
    { hanja: '牟', meaning: '보리', strokes: 6, element: '토(土)' }
  ],
  '목': [
    { hanja: '木', meaning: '나무', strokes: 4, element: '목(木)' },
    { hanja: '睦', meaning: '화목할', strokes: 13, element: '화(火)' }
  ],
  '무': [
    { hanja: '武', meaning: '무예', strokes: 8, element: '수(水)' },
    { hanja: '茂', meaning: '무성할', strokes: 8, element: '목(木)' },
    { hanja: '舞', meaning: '춤', strokes: 14, element: '수(水)' },
    { hanja: '務', meaning: '힘쓸', strokes: 11, element: '수(水)' }
  ],
  '문': [
    { hanja: '文', meaning: '글월', strokes: 4, element: '수(水)' },
    { hanja: '門', meaning: '문', strokes: 8, element: '수(水)' },
    { hanja: '紋', meaning: '무늬', strokes: 10, element: '수(水)' }
  ],
  '미': [
    { hanja: '美', meaning: '아름다울', strokes: 9, element: '수(水)' },
    { hanja: '微', meaning: '작을', strokes: 13, element: '수(水)' },
    { hanja: '米', meaning: '쌀', strokes: 6, element: '수(水)' },
    { hanja: '彌', meaning: '더욱', strokes: 17, element: '수(水)' }
  ],
  '민': [
    { hanja: '民', meaning: '백성', strokes: 5, element: '수(水)' },
    { hanja: '敏', meaning: '민첩할', strokes: 11, element: '수(水)' },
    { hanja: '珉', meaning: '옥돌', strokes: 9, element: '수(水)' },
    { hanja: '旻', meaning: '하늘', strokes: 8, element: '화(火)' },
    { hanja: '玟', meaning: '옥무늬', strokes: 8, element: '수(水)' }
  ],

  // ㅂ
  '박': [
    { hanja: '朴', meaning: '성씨', strokes: 6, element: '목(木)' },
    { hanja: '博', meaning: '넓을', strokes: 12, element: '수(水)' },
    { hanja: '樸', meaning: '통나무', strokes: 16, element: '목(木)' }
  ],
  '배': [
    { hanja: '培', meaning: '북돋을', strokes: 11, element: '토(土)' },
    { hanja: '倍', meaning: '곱', strokes: 10, element: '수(水)' },
    { hanja: '裵', meaning: '성씨', strokes: 14, element: '목(木)' }
  ],
  '백': [
    { hanja: '白', meaning: '흰', strokes: 5, element: '금(金)' },
    { hanja: '百', meaning: '일백', strokes: 6, element: '수(水)' },
    { hanja: '伯', meaning: '맏', strokes: 7, element: '수(水)' }
  ],
  '범': [
    { hanja: '範', meaning: '법', strokes: 15, element: '목(木)' },
    { hanja: '凡', meaning: '무릇', strokes: 3, element: '수(水)' }
  ],
  '병': [
    { hanja: '炳', meaning: '밝을', strokes: 9, element: '화(火)' },
    { hanja: '秉', meaning: '잡을', strokes: 8, element: '목(木)' },
    { hanja: '丙', meaning: '세째 천간', strokes: 5, element: '화(火)' }
  ],
  '보': [
    { hanja: '寶', meaning: '보배', strokes: 20, element: '화(火)' },
    { hanja: '保', meaning: '지킬', strokes: 9, element: '수(水)' },
    { hanja: '普', meaning: '넓을', strokes: 12, element: '수(水)' },
    { hanja: '譜', meaning: '족보', strokes: 19, element: '수(水)' }
  ],
  '복': [
    { hanja: '福', meaning: '복', strokes: 13, element: '수(水)' },
    { hanja: '卜', meaning: '점', strokes: 2, element: '수(水)' }
  ],
  '봉': [
    { hanja: '鳳', meaning: '봉황', strokes: 14, element: '수(水)' },
    { hanja: '奉', meaning: '받들', strokes: 8, element: '수(水)' },
    { hanja: '峰', meaning: '봉우리', strokes: 10, element: '토(土)' }
  ],
  '부': [
    { hanja: '富', meaning: '부유할', strokes: 12, element: '수(水)' },
    { hanja: '夫', meaning: '지아비', strokes: 4, element: '수(水)' },
    { hanja: '扶', meaning: '도울', strokes: 7, element: '수(水)' }
  ],
  '비': [
    { hanja: '妃', meaning: '왕비', strokes: 6, element: '수(水)' },
    { hanja: '飛', meaning: '날', strokes: 9, element: '수(水)' },
    { hanja: '比', meaning: '견줄', strokes: 4, element: '수(水)' },
    { hanja: '碑', meaning: '비석', strokes: 13, element: '토(土)' }
  ],
  '빈': [
    { hanja: '彬', meaning: '빛날', strokes: 11, element: '목(木)' },
    { hanja: '斌', meaning: '빛날', strokes: 11, element: '목(木)' },
    { hanja: '賓', meaning: '손님', strokes: 14, element: '수(水)' },
    { hanja: '빈', meaning: '물가', strokes: 13, element: '수(水)' }
  ],
  '빛': [
    { hanja: '光', meaning: '빛', strokes: 6, element: '화(火)' }
  ],

  // ㅅ
  '사': [
    { hanja: '思', meaning: '생각', strokes: 9, element: '금(金)' },
    { hanja: '史', meaning: '역사', strokes: 5, element: '금(金)' },
    { hanja: '砂', meaning: '모래', strokes: 9, element: '토(土)' },
    { hanja: '四', meaning: '넷', strokes: 5, element: '금(金)' }
  ],
  '산': [
    { hanja: '山', meaning: '뫼', strokes: 3, element: '토(土)' },
    { hanja: '散', meaning: '흩을', strokes: 12, element: '금(金)' },
    { hanja: '産', meaning: '낳을', strokes: 11, element: '금(金)' }
  ],
  '상': [
    { hanja: '相', meaning: '서로', strokes: 9, element: '목(木)' },
    { hanja: '祥', meaning: '상서', strokes: 10, element: '금(金)' },
    { hanja: '尚', meaning: '오히려', strokes: 8, element: '금(金)' },
    { hanja: '想', meaning: '생각', strokes: 13, element: '금(金)' },
    { hanja: '商', meaning: '장사', strokes: 11, element: '금(金)' }
  ],
  '서': [
    { hanja: '瑞', meaning: '상서', strokes: 13, element: '금(金)' },
    { hanja: '西', meaning: '서녘', strokes: 6, element: '금(金)' },
    { hanja: '書', meaning: '글', strokes: 10, element: '금(金)' },
    { hanja: '序', meaning: '차례', strokes: 7, element: '금(金)' },
    { hanja: '徐', meaning: '천천히', strokes: 10, element: '금(金)' },
    { hanja: '緖', meaning: '실마리', strokes: 14, element: '금(金)' }
  ],
  '석': [
    { hanja: '石', meaning: '돌', strokes: 5, element: '금(金)' },
    { hanja: '碩', meaning: '클', strokes: 14, element: '토(土)' },
    { hanja: '錫', meaning: '주석', strokes: 16, element: '금(金)' }
  ],
  '선': [
    { hanja: '善', meaning: '착할', strokes: 12, element: '금(金)' },
    { hanja: '宣', meaning: '베풀', strokes: 9, element: '금(金)' },
    { hanja: '仙', meaning: '신선', strokes: 5, element: '금(金)' },
    { hanja: '璿', meaning: '옥', strokes: 16, element: '화(火)' },
    { hanja: '璇', meaning: '아름다운 옥', strokes: 15, element: '화(火)' },
    { hanja: '鮮', meaning: '고울', strokes: 17, element: '금(金)' }
  ],
  '설': [
    { hanja: '雪', meaning: '눈', strokes: 11, element: '수(水)' },
    { hanja: '說', meaning: '말씀', strokes: 14, element: '금(金)' }
  ],
  '성': [
    { hanja: '成', meaning: '이룰', strokes: 6, element: '금(金)' },
    { hanja: '星', meaning: '별', strokes: 9, element: '금(金)' },
    { hanja: '聖', meaning: '성스러울', strokes: 13, element: '토(土)' },
    { hanja: '誠', meaning: '정성', strokes: 13, element: '금(金)' },
    { hanja: '盛', meaning: '성할', strokes: 11, element: '금(金)' },
    { hanja: '城', meaning: '재', strokes: 9, element: '토(土)' }
  ],
  '세': [
    { hanja: '世', meaning: '인간', strokes: 5, element: '금(金)' },
    { hanja: '歲', meaning: '해', strokes: 13, element: '화(火)' },
    { hanja: '細', meaning: '가늘', strokes: 11, element: '금(金)' },
    { hanja: '洗', meaning: '씻을', strokes: 9, element: '수(水)' }
  ],
  '소': [
    { hanja: '素', meaning: '흰', strokes: 10, element: '금(金)' },
    { hanja: '昭', meaning: '밝을', strokes: 9, element: '화(火)' },
    { hanja: '召', meaning: '부를', strokes: 5, element: '토(土)' },
    { hanja: '小', meaning: '작을', strokes: 3, element: '금(金)' },
    { hanja: '蘇', meaning: '되살아날', strokes: 18, element: '목(木)' }
  ],
  '송': [
    { hanja: '松', meaning: '소나무', strokes: 8, element: '목(木)' },
    { hanja: '頌', meaning: '기릴', strokes: 13, element: '금(金)' },
    { hanja: '宋', meaning: '나라 이름', strokes: 7, element: '금(金)' }
  ],
  '수': [
    { hanja: '秀', meaning: '빼어날', strokes: 7, element: '목(木)' },
    { hanja: '壽', meaning: '목숨', strokes: 14, element: '금(金)' },
    { hanja: '洙', meaning: '강 이름', strokes: 9, element: '수(水)' },
    { hanja: '秋', meaning: '가을', strokes: 9, element: '금(金)' },
    { hanja: '守', meaning: '지킬', strokes: 6, element: '금(金)' },
    { hanja: '修', meaning: '닦을', strokes: 10, element: '금(金)' },
    { hanja: '洙', meaning: '물 이름', strokes: 9, element: '수(水)' },
    { hanja: '受', meaning: '받을', strokes: 8, element: '수(水)' }
  ],
  '숙': [
    { hanja: '淑', meaning: '맑을', strokes: 11, element: '수(水)' },
    { hanja: '肅', meaning: '엄숙할', strokes: 13, element: '금(金)' },
    { hanja: '塾', meaning: '글방', strokes: 14, element: '토(土)' }
  ],
  '순': [
    { hanja: '順', meaning: '순할', strokes: 12, element: '금(金)' },
    { hanja: '純', meaning: '순수할', strokes: 10, element: '금(金)' },
    { hanja: '淳', meaning: '순박할', strokes: 11, element: '수(水)' },
    { hanja: '舜', meaning: '임금 이름', strokes: 12, element: '금(金)' }
  ],
  '슬': [
    { hanja: '瑟', meaning: '거문고', strokes: 13, element: '금(金)' }
  ],
  '승': [
    { hanja: '升', meaning: '오를', strokes: 4, element: '금(金)' },
    { hanja: '勝', meaning: '이길', strokes: 12, element: '금(金)' },
    { hanja: '丞', meaning: '도울', strokes: 6, element: '금(金)' },
    { hanja: '承', meaning: '받들', strokes: 8, element: '금(金)' }
  ],
  '시': [
    { hanja: '詩', meaning: '시', strokes: 13, element: '금(金)' },
    { hanja: '施', meaning: '베풀', strokes: 9, element: '금(金)' },
    { hanja: '時', meaning: '때', strokes: 10, element: '화(火)' },
    { hanja: '是', meaning: '이', strokes: 9, element: '화(火)' }
  ],
  '신': [
    { hanja: '信', meaning: '믿을', strokes: 9, element: '금(金)' },
    { hanja: '新', meaning: '새', strokes: 13, element: '금(金)' },
    { hanja: '申', meaning: '거듭', strokes: 5, element: '금(金)' },
    { hanja: '神', meaning: '귀신', strokes: 9, element: '금(金)' },
    { hanja: '臣', meaning: '신하', strokes: 7, element: '금(金)' }
  ],
  '실': [
    { hanja: '實', meaning: '열매', strokes: 14, element: '금(金)' }
  ],
  '심': [
    { hanja: '心', meaning: '마음', strokes: 4, element: '화(火)' },
    { hanja: '深', meaning: '깊을', strokes: 11, element: '수(水)' },
    { hanja: '沈', meaning: '잠길', strokes: 7, element: '수(水)' }
  ],

  // ㅇ
  '아': [
    { hanja: '雅', meaning: '아름다울', strokes: 12, element: '목(木)' },
    { hanja: '亞', meaning: '버금', strokes: 8, element: '토(土)' },
    { hanja: '兒', meaning: '아이', strokes: 8, element: '금(金)' }
  ],
  '안': [
    { hanja: '安', meaning: '편안할', strokes: 6, element: '토(土)' },
    { hanja: '眼', meaning: '눈', strokes: 11, element: '목(木)' },
    { hanja: '岸', meaning: '언덕', strokes: 8, element: '토(土)' }
  ],
  '애': [
    { hanja: '愛', meaning: '사랑', strokes: 13, element: '토(土)' },
    { hanja: '哀', meaning: '슬플', strokes: 9, element: '토(土)' }
  ],
  '야': [
    { hanja: '也', meaning: '어조사', strokes: 3, element: '토(土)' },
    { hanja: '野', meaning: '들', strokes: 11, element: '토(土)' },
    { hanja: '夜', meaning: '밤', strokes: 8, element: '토(土)' }
  ],
  '양': [
    { hanja: '陽', meaning: '볕', strokes: 12, element: '토(土)' },
    { hanja: '良', meaning: '어질', strokes: 7, element: '화(火)' },
    { hanja: '揚', meaning: '날릴', strokes: 12, element: '화(火)' },
    { hanja: '楊', meaning: '버들', strokes: 13, element: '목(木)' },
    { hanja: '洋', meaning: '바다', strokes: 9, element: '수(水)' },
    { hanja: '養', meaning: '기를', strokes: 15, element: '토(土)' }
  ],
  '언': [
    { hanja: '彦', meaning: '선비', strokes: 9, element: '목(木)' },
    { hanja: '言', meaning: '말씀', strokes: 7, element: '목(木)' }
  ],
  '여': [
    { hanja: '呂', meaning: '성씨', strokes: 7, element: '화(火)' },
    { hanja: '如', meaning: '같을', strokes: 6, element: '금(金)' },
    { hanja: '汝', meaning: '너', strokes: 6, element: '수(水)' },
    { hanja: '麗', meaning: '고울', strokes: 19, element: '화(火)' },
    { hanja: '余', meaning: '나', strokes: 7, element: '토(土)' },
    { hanja: '與', meaning: '더불', strokes: 13, element: '토(土)' }
  ],
  '역': [
    { hanja: '易', meaning: '바꿀', strokes: 8, element: '화(火)' },
    { hanja: '亦', meaning: '또', strokes: 6, element: '토(土)' },
    { hanja: '驛', meaning: '역참', strokes: 23, element: '화(火)' }
  ],
  '연': [
    { hanja: '延', meaning: '늘일', strokes: 7, element: '토(土)' },
    { hanja: '妍', meaning: '고울', strokes: 7, element: '수(水)' },
    { hanja: '姸', meaning: '곱고 아름다울', strokes: 9, element: '수(水)' },
    { hanja: '娟', meaning: '아름다울', strokes: 10, element: '목(木)' },
    { hanja: '蓮', meaning: '연꽃', strokes: 13, element: '목(木)' },
    { hanja: '沇', meaning: '물 이름', strokes: 7, element: '수(水)' },
    { hanja: '緣', meaning: '인연', strokes: 15, element: '토(土)' },
    { hanja: '演', meaning: '펼칠', strokes: 14, element: '수(水)' },
    { hanja: '燕', meaning: '제비', strokes: 16, element: '토(土)' }
  ],
  '열': [
    { hanja: '烈', meaning: '맹렬할', strokes: 10, element: '화(火)' },
    { hanja: '悅', meaning: '기쁠', strokes: 10, element: '금(金)' }
  ],
  '염': [
    { hanja: '廉', meaning: '청렴할', strokes: 13, element: '목(木)' },
    { hanja: '炎', meaning: '불꽃', strokes: 8, element: '화(火)' }
  ],
  '영': [
    { hanja: '英', meaning: '꽃부리', strokes: 8, element: '목(木)' },
    { hanja: '永', meaning: '길', strokes: 5, element: '수(水)' },
    { hanja: '泳', meaning: '헤엄', strokes: 8, element: '수(水)' },
    { hanja: '榮', meaning: '영화', strokes: 14, element: '목(木)' },
    { hanja: '映', meaning: '비칠', strokes: 9, element: '화(火)' },
    { hanja: '瑛', meaning: '옥빛', strokes: 12, element: '목(木)' },
    { hanja: '影', meaning: '그림자', strokes: 15, element: '토(土)' },
    { hanja: '詠', meaning: '읊을', strokes: 12, element: '토(土)' }
  ],
  '예': [
    { hanja: '藝', meaning: '재주', strokes: 18, element: '목(木)' },
    { hanja: '禮', meaning: '예도', strokes: 17, element: '화(火)' },
    { hanja: '叡', meaning: '밝을', strokes: 16, element: '토(土)' },
    { hanja: '睿', meaning: '슬기', strokes: 14, element: '금(金)' }
  ],
  '오': [
    { hanja: '五', meaning: '다섯', strokes: 4, element: '토(土)' },
    { hanja: '午', meaning: '낮', strokes: 4, element: '화(火)' },
    { hanja: '梧', meaning: '오동', strokes: 11, element: '목(木)' },
    { hanja: '吳', meaning: '나라 이름', strokes: 7, element: '목(木)' }
  ],
  '옥': [
    { hanja: '玉', meaning: '구슬', strokes: 5, element: '금(金)' },
    { hanja: '沃', meaning: '기름질', strokes: 7, element: '수(水)' }
  ],
  '완': [
    { hanja: '完', meaning: '완전할', strokes: 7, element: '토(土)' },
    { hanja: '玩', meaning: '희롱할', strokes: 8, element: '금(金)' },
    { hanja: '琬', meaning: '아름다운 구슬', strokes: 12, element: '토(土)' }
  ],
  '왕': [
    { hanja: '王', meaning: '임금', strokes: 4, element: '토(土)' },
    { hanja: '旺', meaning: '왕성할', strokes: 8, element: '토(土)' }
  ],
  '요': [
    { hanja: '堯', meaning: '임금 이름', strokes: 12, element: '목(木)' },
    { hanja: '曜', meaning: '빛날', strokes: 18, element: '화(火)' },
    { hanja: '瑤', meaning: '아름다운 구슬', strokes: 14, element: '화(火)' }
  ],
  '용': [
    { hanja: '龍', meaning: '용', strokes: 16, element: '목(木)' },
    { hanja: '容', meaning: '얼굴', strokes: 10, element: '토(土)' },
    { hanja: '勇', meaning: '날쌜', strokes: 9, element: '토(土)' },
    { hanja: '庸', meaning: '떳떳할', strokes: 11, element: '토(土)' }
  ],
  '우': [
    { hanja: '宇', meaning: '집', strokes: 6, element: '토(土)' },
    { hanja: '雨', meaning: '비', strokes: 8, element: '수(水)' },
    { hanja: '佑', meaning: '도울', strokes: 7, element: '토(土)' },
    { hanja: '又', meaning: '또', strokes: 2, element: '토(土)' },
    { hanja: '友', meaning: '벗', strokes: 4, element: '토(土)' },
    { hanja: '牛', meaning: '소', strokes: 4, element: '토(土)' },
    { hanja: '憂', meaning: '근심', strokes: 15, element: '토(土)' },
    { hanja: '優', meaning: '넉넉할', strokes: 17, element: '토(土)' }
  ],
  '욱': [
    { hanja: '旭', meaning: '아침 해', strokes: 6, element: '화(火)' },
    { hanja: '昱', meaning: '빛날', strokes: 9, element: '화(火)' },
    { hanja: '煜', meaning: '빛날', strokes: 13, element: '화(火)' }
  ],
  '운': [
    { hanja: '雲', meaning: '구름', strokes: 12, element: '수(水)' },
    { hanja: '運', meaning: '운수', strokes: 12, element: '토(土)' },
    { hanja: '芸', meaning: '향초', strokes: 7, element: '목(木)' }
  ],
  '원': [
    { hanja: '元', meaning: '으뜸', strokes: 4, element: '목(木)' },
    { hanja: '院', meaning: '집', strokes: 10, element: '토(土)' },
    { hanja: '源', meaning: '근원', strokes: 13, element: '수(水)' },
    { hanja: '園', meaning: '동산', strokes: 13, element: '토(土)' },
    { hanja: '遠', meaning: '멀', strokes: 13, element: '토(土)' },
    { hanja: '媛', meaning: '고울', strokes: 12, element: '목(木)' },
    { hanja: '苑', meaning: '동산', strokes: 8, element: '목(木)' }
  ],
  '월': [
    { hanja: '月', meaning: '달', strokes: 4, element: '목(木)' },
    { hanja: '越', meaning: '넘을', strokes: 12, element: '토(土)' }
  ],
  '유': [
    { hanja: '有', meaning: '있을', strokes: 6, element: '토(土)' },
    { hanja: '柔', meaning: '부드러울', strokes: 9, element: '목(木)' },
    { hanja: '裕', meaning: '넉넉할', strokes: 12, element: '금(金)' },
    { hanja: '維', meaning: '벼리', strokes: 14, element: '토(土)' },
    { hanja: '儒', meaning: '선비', strokes: 16, element: '금(金)' },
    { hanja: '油', meaning: '기름', strokes: 8, element: '수(水)' },
    { hanja: '諭', meaning: '깨우칠', strokes: 16, element: '금(金)' }
  ],
  '윤': [
    { hanja: '尹', meaning: '성씨', strokes: 4, element: '토(土)' },
    { hanja: '允', meaning: '진실로', strokes: 4, element: '토(土)' },
    { hanja: '潤', meaning: '윤택할', strokes: 15, element: '수(水)' },
    { hanja: '胤', meaning: '자손', strokes: 9, element: '토(土)' },
    { hanja: '倫', meaning: '인륜', strokes: 10, element: '화(火)' }
  ],
  '율': [
    { hanja: '律', meaning: '법', strokes: 9, element: '화(火)' },
    { hanja: '栗', meaning: '밤', strokes: 10, element: '목(木)' }
  ],
  '은': [
    { hanja: '銀', meaning: '은', strokes: 14, element: '금(金)' },
    { hanja: '恩', meaning: '은혜', strokes: 10, element: '토(土)' },
    { hanja: '隱', meaning: '숨을', strokes: 17, element: '토(土)' },
    { hanja: '殷', meaning: '성할', strokes: 10, element: '토(土)' }
  ],
  '음': [
    { hanja: '音', meaning: '소리', strokes: 9, element: '토(土)' },
    { hanja: '陰', meaning: '그늘', strokes: 11, element: '토(土)' }
  ],
  '의': [
    { hanja: '義', meaning: '옳을', strokes: 13, element: '목(木)' },
    { hanja: '意', meaning: '뜻', strokes: 13, element: '토(土)' },
    { hanja: '依', meaning: '의지할', strokes: 8, element: '토(土)' },
    { hanja: '宜', meaning: '마땅할', strokes: 8, element: '목(木)' },
    { hanja: '儀', meaning: '의식', strokes: 15, element: '목(木)' }
  ],
  '이': [
    { hanja: '利', meaning: '이로울', strokes: 7, element: '금(金)' },
    { hanja: '李', meaning: '오얏', strokes: 7, element: '목(木)' },
    { hanja: '理', meaning: '다스릴', strokes: 11, element: '화(火)' },
    { hanja: '伊', meaning: '저', strokes: 6, element: '토(土)' },
    { hanja: '怡', meaning: '기쁠', strokes: 8, element: '토(土)' },
    { hanja: '二', meaning: '둘', strokes: 2, element: '토(土)' },
    { hanja: '爾', meaning: '너', strokes: 14, element: '화(火)' },
    { hanja: '夷', meaning: '평평할', strokes: 6, element: '토(土)' }
  ],
  '익': [
    { hanja: '益', meaning: '더할', strokes: 10, element: '토(土)' },
    { hanja: '翼', meaning: '날개', strokes: 17, element: '토(土)' }
  ],
  '인': [
    { hanja: '仁', meaning: '어질', strokes: 4, element: '금(金)' },
    { hanja: '寅', meaning: '별 이름', strokes: 11, element: '목(木)' },
    { hanja: '認', meaning: '알', strokes: 14, element: '금(金)' },
    { hanja: '忍', meaning: '참을', strokes: 7, element: '금(金)' },
    { hanja: '印', meaning: '도장', strokes: 6, element: '토(土)' },
    { hanja: '麟', meaning: '기린', strokes: 23, element: '화(火)' }
  ],
  '일': [
    { hanja: '一', meaning: '한', strokes: 1, element: '수(水)' },
    { hanja: '日', meaning: '날', strokes: 4, element: '화(火)' },
    { hanja: '逸', meaning: '편안할', strokes: 11, element: '토(土)' }
  ],
  '임': [
    { hanja: '林', meaning: '수풀', strokes: 8, element: '목(木)' },
    { hanja: '任', meaning: '맡길', strokes: 6, element: '금(金)' },
    { hanja: '壬', meaning: '아홉째 천간', strokes: 4, element: '수(水)' },
    { hanja: '姙', meaning: '아이 밸', strokes: 9, element: '금(金)' }
  ],

  // ㅈ
  '자': [
    { hanja: '子', meaning: '아들', strokes: 3, element: '수(水)' },
    { hanja: '慈', meaning: '사랑', strokes: 13, element: '화(火)' },
    { hanja: '姿', meaning: '모습', strokes: 9, element: '금(金)' },
    { hanja: '紫', meaning: '자주', strokes: 12, element: '금(金)' },
    { hanja: '資', meaning: '재물', strokes: 13, element: '금(金)' }
  ],
  '재': [
    { hanja: '在', meaning: '있을', strokes: 6, element: '토(土)' },
    { hanja: '才', meaning: '재주', strokes: 3, element: '금(金)' },
    { hanja: '材', meaning: '재목', strokes: 7, element: '목(木)' },
    { hanja: '財', meaning: '재물', strokes: 10, element: '금(金)' },
    { hanja: '栽', meaning: '심을', strokes: 10, element: '목(木)' }
  ],
  '적': [
    { hanja: '積', meaning: '쌓을', strokes: 16, element: '목(木)' },
    { hanja: '寂', meaning: '고요할', strokes: 11, element: '금(金)' }
  ],
  '전': [
    { hanja: '全', meaning: '온전할', strokes: 6, element: '금(金)' },
    { hanja: '田', meaning: '밭', strokes: 5, element: '화(火)' },
    { hanja: '前', meaning: '앞', strokes: 9, element: '금(金)' },
    { hanja: '典', meaning: '법', strokes: 8, element: '화(火)' },
    { hanja: '展', meaning: '펼', strokes: 10, element: '화(火)' }
  ],
  '정': [
    { hanja: '正', meaning: '바를', strokes: 5, element: '금(金)' },
    { hanja: '貞', meaning: '곧을', strokes: 9, element: '화(火)' },
    { hanja: '靜', meaning: '고요할', strokes: 14, element: '금(金)' },
    { hanja: '晶', meaning: '맑을', strokes: 12, element: '화(火)' },
    { hanja: '淨', meaning: '깨끗할', strokes: 11, element: '수(水)' },
    { hanja: '鼎', meaning: '솥', strokes: 13, element: '화(火)' },
    { hanja: '庭', meaning: '뜰', strokes: 10, element: '화(火)' },
    { hanja: '亭', meaning: '정자', strokes: 9, element: '화(火)' },
    { hanja: '禎', meaning: '상서', strokes: 13, element: '화(火)' },
    { hanja: '定', meaning: '정할', strokes: 8, element: '화(火)' }
  ],
  '제': [
    { hanja: '諸', meaning: '모든', strokes: 15, element: '금(金)' },
    { hanja: '濟', meaning: '건널', strokes: 17, element: '수(水)' },
    { hanja: '祭', meaning: '제사', strokes: 11, element: '금(金)' }
  ],
  '조': [
    { hanja: '趙', meaning: '성씨', strokes: 14, element: '화(火)' },
    { hanja: '造', meaning: '지을', strokes: 10, element: '금(金)' },
    { hanja: '兆', meaning: '조짐', strokes: 6, element: '화(火)' },
    { hanja: '助', meaning: '도울', strokes: 7, element: '금(金)' },
    { hanja: '朝', meaning: '아침', strokes: 12, element: '금(金)' }
  ],
  '종': [
    { hanja: '鍾', meaning: '쇠북', strokes: 17, element: '금(金)' },
    { hanja: '終', meaning: '마칠', strokes: 11, element: '금(金)' },
    { hanja: '從', meaning: '좇을', strokes: 11, element: '토(土)' },
    { hanja: '宗', meaning: '마루', strokes: 8, element: '금(金)' }
  ],
  '주': [
    { hanja: '主', meaning: '주인', strokes: 5, element: '금(金)' },
    { hanja: '朱', meaning: '붉을', strokes: 6, element: '목(木)' },
    { hanja: '珠', meaning: '구슬', strokes: 10, element: '금(金)' },
    { hanja: '周', meaning: '두루', strokes: 8, element: '금(金)' },
    { hanja: '柱', meaning: '기둥', strokes: 9, element: '목(木)' },
    { hanja: '晝', meaning: '낮', strokes: 11, element: '화(火)' }
  ],
  '준': [
    { hanja: '俊', meaning: '준수할', strokes: 9, element: '화(火)' },
    { hanja: '峻', meaning: '높을', strokes: 10, element: '토(土)' },
    { hanja: '浚', meaning: '깊을', strokes: 10, element: '수(水)' },
    { hanja: '駿', meaning: '준마', strokes: 17, element: '금(金)' },
    { hanja: '遵', meaning: '좇을', strokes: 15, element: '금(金)' }
  ],
  '중': [
    { hanja: '中', meaning: '가운데', strokes: 4, element: '화(火)' },
    { hanja: '重', meaning: '무거울', strokes: 9, element: '토(土)' },
    { hanja: '衆', meaning: '무리', strokes: 12, element: '금(金)' }
  ],
  '지': [
    { hanja: '智', meaning: '슬기', strokes: 12, element: '화(火)' },
    { hanja: '志', meaning: '뜻', strokes: 7, element: '화(火)' },
    { hanja: '址', meaning: '터', strokes: 7, element: '토(土)' },
    { hanja: '池', meaning: '못', strokes: 6, element: '수(水)' },
    { hanja: '知', meaning: '알', strokes: 8, element: '화(火)' },
    { hanja: '紙', meaning: '종이', strokes: 10, element: '금(金)' },
    { hanja: '枝', meaning: '가지', strokes: 8, element: '목(木)' },
    { hanja: '芝', meaning: '지초', strokes: 6, element: '목(木)' },
    { hanja: '旨', meaning: '뜻', strokes: 6, element: '화(火)' }
  ],
  '진': [
    { hanja: '珍', meaning: '보배', strokes: 9, element: '화(火)' },
    { hanja: '眞', meaning: '참', strokes: 10, element: '금(金)' },
    { hanja: '真', meaning: '참', strokes: 10, element: '금(金)' },
    { hanja: '震', meaning: '우뢰', strokes: 15, element: '목(木)' },
    { hanja: '辰', meaning: '별', strokes: 7, element: '토(土)' },
    { hanja: '鎭', meaning: '진압할', strokes: 18, element: '금(金)' },
    { hanja: '津', meaning: '나루', strokes: 9, element: '수(水)' },
    { hanja: '陳', meaning: '베풀', strokes: 11, element: '화(火)' }
  ],
  '질': [
    { hanja: '質', meaning: '바탕', strokes: 15, element: '화(火)' }
  ],

  // ㅊ
  '창': [
    { hanja: '昌', meaning: '창성할', strokes: 8, element: '금(金)' },
    { hanja: '倉', meaning: '곳간', strokes: 10, element: '금(金)' },
    { hanja: '窓', meaning: '창', strokes: 11, element: '금(金)' },
    { hanja: '暢', meaning: '창성할', strokes: 14, element: '화(火)' }
  ],
  '채': [
    { hanja: '采', meaning: '캘', strokes: 8, element: '화(火)' },
    { hanja: '彩', meaning: '채색', strokes: 11, element: '목(木)' },
    { hanja: '菜', meaning: '나물', strokes: 11, element: '목(木)' }
  ],
  '천': [
    { hanja: '天', meaning: '하늘', strokes: 4, element: '화(火)' },
    { hanja: '千', meaning: '일천', strokes: 3, element: '금(金)' },
    { hanja: '泉', meaning: '샘', strokes: 9, element: '수(水)' },
    { hanja: '川', meaning: '내', strokes: 3, element: '금(金)' },
    { hanja: '淺', meaning: '얕을', strokes: 11, element: '수(水)' }
  ],
  '철': [
    { hanja: '哲', meaning: '밝을', strokes: 10, element: '화(火)' },
    { hanja: '鐵', meaning: '쇠', strokes: 21, element: '금(金)' },
    { hanja: '徹', meaning: '통할', strokes: 15, element: '화(火)' }
  ],
  '초': [
    { hanja: '草', meaning: '풀', strokes: 9, element: '목(木)' },
    { hanja: '初', meaning: '처음', strokes: 7, element: '금(金)' },
    { hanja: '招', meaning: '부를', strokes: 8, element: '금(金)' },
    { hanja: '超', meaning: '뛰어넘을', strokes: 12, element: '금(金)' }
  ],
  '최': [
    { hanja: '崔', meaning: '성씨', strokes: 11, element: '토(土)' },
    { hanja: '最', meaning: '가장', strokes: 12, element: '목(木)' }
  ],
  '추': [
    { hanja: '秋', meaning: '가을', strokes: 9, element: '금(金)' },
    { hanja: '秀', meaning: '빼어날', strokes: 7, element: '목(木)' },
    { hanja: '推', meaning: '밀', strokes: 11, element: '금(金)' }
  ],
  '충': [
    { hanja: '忠', meaning: '충성', strokes: 8, element: '화(火)' },
    { hanja: '沖', meaning: '충만할', strokes: 7, element: '수(水)' }
  ],
  '춘': [
    { hanja: '春', meaning: '봄', strokes: 9, element: '목(木)' },
    { hanja: '椿', meaning: '가죽나무', strokes: 13, element: '목(木)' }
  ],

  // ㅌ
  '태': [
    { hanja: '泰', meaning: '클', strokes: 10, element: '수(水)' },
    { hanja: '太', meaning: '클', strokes: 4, element: '화(火)' },
    { hanja: '胎', meaning: '아이 밸', strokes: 9, element: '토(土)' },
    { hanja: '兌', meaning: '기쁠', strokes: 7, element: '금(金)' }
  ],
  '택': [
    { hanja: '宅', meaning: '집', strokes: 6, element: '화(火)' },
    { hanja: '澤', meaning: '못', strokes: 16, element: '수(水)' }
  ],
  '태': [
    { hanja: '泰', meaning: '클', strokes: 10, element: '수(水)' }
  ],

  // ㅍ
  '평': [
    { hanja: '平', meaning: '평평할', strokes: 5, element: '수(水)' },
    { hanja: '評', meaning: '평할', strokes: 12, element: '수(水)' }
  ],
  '표': [
    { hanja: '表', meaning: '겉', strokes: 8, element: '수(水)' },
    { hanja: '標', meaning: '표', strokes: 15, element: '목(木)' }
  ],
  '풍': [
    { hanja: '豐', meaning: '풍성할', strokes: 18, element: '화(火)' },
    { hanja: '風', meaning: '바람', strokes: 9, element: '목(木)' }
  ],
  '필': [
    { hanja: '必', meaning: '반드시', strokes: 5, element: '수(水)' },
    { hanja: '弼', meaning: '도울', strokes: 12, element: '수(水)' }
  ],

  // ㅎ
  '하': [
    { hanja: '夏', meaning: '여름', strokes: 10, element: '화(火)' },
    { hanja: '河', meaning: '물', strokes: 8, element: '수(水)' },
    { hanja: '荷', meaning: '연', strokes: 10, element: '목(木)' },
    { hanja: '霞', meaning: '노을', strokes: 17, element: '수(水)' },
    { hanja: '下', meaning: '아래', strokes: 3, element: '수(水)' },
    { hanja: '賀', meaning: '하례', strokes: 12, element: '수(水)' }
  ],
  '학': [
    { hanja: '學', meaning: '배울', strokes: 16, element: '수(水)' },
    { hanja: '鶴', meaning: '학', strokes: 21, element: '금(金)' }
  ],
  '한': [
    { hanja: '韓', meaning: '나라 이름', strokes: 17, element: '수(水)' },
    { hanja: '漢', meaning: '한수', strokes: 13, element: '수(水)' },
    { hanja: '寒', meaning: '찰', strokes: 12, element: '수(水)' },
    { hanja: '閑', meaning: '한가할', strokes: 12, element: '수(水)' },
    { hanja: '翰', meaning: '붓', strokes: 16, element: '수(水)' },
    { hanja: '恨', meaning: '한', strokes: 9, element: '수(水)' }
  ],
  '해': [
    { hanja: '海', meaning: '바다', strokes: 10, element: '수(水)' },
    { hanja: '解', meaning: '풀', strokes: 13, element: '목(木)' },
    { hanja: '害', meaning: '해할', strokes: 10, element: '수(水)' },
    { hanja: '亥', meaning: '돼지', strokes: 6, element: '수(水)' }
  ],
  '향': [
    { hanja: '香', meaning: '향기', strokes: 9, element: '수(水)' },
    { hanja: '鄕', meaning: '고을', strokes: 13, element: '목(木)' },
    { hanja: '享', meaning: '누릴', strokes: 8, element: '수(水)' }
  ],
  '허': [
    { hanja: '許', meaning: '허락할', strokes: 11, element: '목(木)' },
    { hanja: '虛', meaning: '빌', strokes: 11, element: '수(水)' }
  ],
  '헌': [
    { hanja: '獻', meaning: '드릴', strokes: 20, element: '목(木)' },
    { hanja: '憲', meaning: '법', strokes: 16, element: '수(水)' },
    { hanja: '軒', meaning: '집', strokes: 10, element: '토(土)' }
  ],
  '현': [
    { hanja: '賢', meaning: '어질', strokes: 15, element: '목(木)' },
    { hanja: '炫', meaning: '빛날', strokes: 9, element: '화(火)' },
    { hanja: '鉉', meaning: '솥', strokes: 13, element: '금(金)' },
    { hanja: '絃', meaning: '줄', strokes: 11, element: '목(木)' },
    { hanja: '玄', meaning: '검을', strokes: 5, element: '수(水)' },
    { hanja: '顯', meaning: '나타날', strokes: 23, element: '화(火)' },
    { hanja: '縣', meaning: '고을', strokes: 16, element: '목(木)' },
    { hanja: '懸', meaning: '매달', strokes: 20, element: '목(木)' },
    { hanja: '泫', meaning: '물 흐를', strokes: 8, element: '수(水)' },
    { hanja: '眩', meaning: '어지러울', strokes: 10, element: '목(木)' }
  ],
  '혁': [
    { hanja: '革', meaning: '가죽', strokes: 9, element: '목(木)' },
    { hanja: '赫', meaning: '빛날', strokes: 14, element: '화(火)' },
    { hanja: '奕', meaning: '클', strokes: 9, element: '목(木)' }
  ],
  '현': [
    { hanja: '玹', meaning: '옥', strokes: 9, element: '화(火)' }
  ],
  '형': [
    { hanja: '亨', meaning: '형통할', strokes: 7, element: '수(水)' },
    { hanja: '兄', meaning: '맏', strokes: 5, element: '목(木)' },
    { hanja: '衡', meaning: '저울', strokes: 16, element: '토(土)' },
    { hanja: '亨', meaning: '통달할', strokes: 7, element: '수(水)' }
  ],
  '혜': [
    { hanja: '惠', meaning: '은혜', strokes: 12, element: '수(水)' },
    { hanja: '慧', meaning: '슬기', strokes: 15, element: '수(水)' },
    { hanja: '蕙', meaning: '혜초', strokes: 15, element: '목(木)' }
  ],
  '호': [
    { hanja: '浩', meaning: '넓을', strokes: 10, element: '수(水)' },
    { hanja: '湖', meaning: '호수', strokes: 12, element: '수(水)' },
    { hanja: '好', meaning: '좋을', strokes: 6, element: '수(水)' },
    { hanja: '虎', meaning: '범', strokes: 8, element: '수(水)' },
    { hanja: '豪', meaning: '호걸', strokes: 14, element: '수(水)' },
    { hanja: '鎬', meaning: '호미', strokes: 18, element: '금(金)' },
    { hanja: '昊', meaning: '넓을', strokes: 8, element: '화(火)' },
    { hanja: '皓', meaning: '흴', strokes: 12, element: '목(木)' }
  ],
  '홍': [
    { hanja: '洪', meaning: '클', strokes: 9, element: '수(水)' },
    { hanja: '紅', meaning: '붉을', strokes: 9, element: '목(木)' },
    { hanja: '弘', meaning: '클', strokes: 5, element: '수(水)' },
    { hanja: '泓', meaning: '깊을', strokes: 8, element: '수(水)' }
  ],
  '화': [
    { hanja: '和', meaning: '화할', strokes: 8, element: '수(水)' },
    { hanja: '花', meaning: '꽃', strokes: 7, element: '목(木)' },
    { hanja: '華', meaning: '빛날', strokes: 10, element: '목(木)' },
    { hanja: '火', meaning: '불', strokes: 4, element: '화(火)' },
    { hanja: '化', meaning: '될', strokes: 4, element: '수(水)' },
    { hanja: '禍', meaning: '재앙', strokes: 13, element: '수(水)' }
  ],
  '환': [
    { hanja: '歡', meaning: '기쁠', strokes: 22, element: '수(水)' },
    { hanja: '煥', meaning: '빛날', strokes: 13, element: '화(火)' },
    { hanja: '桓', meaning: '굳을', strokes: 10, element: '목(木)' },
    { hanja: '丸', meaning: '둥글', strokes: 3, element: '토(土)' }
  ],
  '회': [
    { hanja: '會', meaning: '모일', strokes: 13, element: '수(Water)' },
    { hanja: '回', meaning: '돌', strokes: 6, element: '토(土)' },
    { hanja: '懷', meaning: '품을', strokes: 20, element: '수(水)' }
  ],
  '효': [
    { hanja: '孝', meaning: '효도', strokes: 7, element: '수(水)' },
    { hanja: '曉', meaning: '새벽', strokes: 16, element: '화(火)' },
    { hanja: '效', meaning: '본받을', strokes: 10, element: '수(Water)' },
    { hanja: '曉', meaning: '밝을', strokes: 16, element: '화(火)' }
  ],
  '후': [
    { hanja: '厚', meaning: '두터울', strokes: 9, element: '토(土)' },
    { hanja: '候', meaning: '기후', strokes: 10, element: '토(土)' },
    { hanja: '後', meaning: '뒤', strokes: 9, element: '토(土)' }
  ],
  '훈': [
    { hanja: '勳', meaning: '공', strokes: 16, element: '목(木)' },
    { hanja: '勛', meaning: '공', strokes: 12, element: '목(木)' },
    { hanja: '薰', meaning: '향기', strokes: 16, element: '목(木)' }
  ],
  '휘': [
    { hanja: '輝', meaning: '빛날', strokes: 15, element: '화(火)' },
    { hanja: '徽', meaning: '아름다울', strokes: 17, element: '목(木)' },
    { hanja: '暉', meaning: '빛', strokes: 13, element: '화(火)' }
  ],
  '희': [
    { hanja: '姬', meaning: '미인', strokes: 10, element: '목(木)' },
    { hanja: '熙', meaning: '빛날', strokes: 13, element: '수(水)' },
    { hanja: '喜', meaning: '기쁠', strokes: 12, element: '수(水)' },
    { hanja: '稀', meaning: '드물', strokes: 12, element: '목(木)' },
    { hanja: '禧', meaning: '경사', strokes: 16, element: '토(土)' },
    { hanja: '曦', meaning: '햇빛', strokes: 20, element: '화(火)' }
  ]
}

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
