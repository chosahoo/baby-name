// 태몽별 한자 매핑 데이터
// 각 태몽과 관련된 한자들을 매핑

export const dreamCategories = [
  {
    id: 'animal',
    name: '동물',
    emoji: '🐉',
    dreams: [
      { id: 'dragon', name: '용', emoji: '🐉', hanja: ['賢', '浩', '俊', '榮'], meaning: '용처럼 위대하고 능력있는' },
      { id: 'tiger', name: '호랑이', emoji: '🐯', hanja: ['浩', '賢', '勳', '俊'], meaning: '호랑이처럼 용맹하고 강한' },
      { id: 'bear', name: '곰', emoji: '🐻', hanja: ['安', '厚', '賢', '浩'], meaning: '곰처럼 강인하고 믿음직한' },
      { id: 'snake', name: '뱀', emoji: '🐍', hanja: ['智', '賢', '允', '眞'], meaning: '지혜롭고 영리한' },
      { id: 'horse', name: '말', emoji: '🐴', hanja: ['俊', '浩', '敏', '翰'], meaning: '말처럼 빠르고 힘찬' },
      { id: 'cow', name: '소', emoji: '🐮', hanja: ['勤', '敏', '厚', '眞'], meaning: '소처럼 성실하고 근면한' },
      { id: 'pig', name: '돼지', emoji: '🐷', hanja: ['福', '恩', '祐', '厚'], meaning: '복이 많고 풍요로운' },
      { id: 'bird', name: '새', emoji: '🐦', hanja: ['翰', '燦', '榮', '妍'], meaning: '새처럼 자유롭고 높이 나는' },
      { id: 'crane', name: '학', emoji: '🦢', hanja: ['賢', '雅', '妍', '眞'], meaning: '학처럼 고고하고 장수하는' },
      { id: 'phoenix', name: '봉황', emoji: '🦅', hanja: ['鳳', '妍', '雅', '榮'], meaning: '봉황처럼 귀하고 상서로운' },
      { id: 'turtle', name: '거북', emoji: '🐢', hanja: ['壽', '賢', '眞', '安'], meaning: '거북처럼 장수하고 지혜로운' },
      { id: 'deer', name: '사슴', emoji: '🦌', hanja: ['雅', '妍', '娜', '敏'], meaning: '사슴처럼 우아하고 민첩한' },
      { id: 'rabbit', name: '토끼', emoji: '🐰', hanja: ['娜', '伊', '妍', '柔'], meaning: '토끼처럼 귀엽고 빠른' },
      { id: 'dog', name: '개', emoji: '🐶', hanja: ['忠', '眞', '賢', '護'], meaning: '개처럼 충성스럽고 용감한' },
      { id: 'butterfly', name: '나비', emoji: '🦋', hanja: ['妍', '雅', '娜', '彩'], meaning: '나비처럼 아름답고 우아한' },
      { id: 'fish', name: '물고기', emoji: '🐟', hanja: ['潾', '允', '浩', '祐'], meaning: '물고기처럼 자유롭고 풍요로운' },
      { id: 'whale', name: '고래', emoji: '🐋', hanja: ['浩', '潾', '賢', '雄'], meaning: '고래처럼 크고 웅장한' },
      { id: 'elephant', name: '코끼리', emoji: '🐘', hanja: ['賢', '安', '厚', '浩'], meaning: '코끼리처럼 크고 지혜로운' },
      { id: 'lion', name: '사자', emoji: '🦁', hanja: ['勇', '勳', '賢', '浩'], meaning: '사자처럼 용감하고 강한' },
      { id: 'eagle', name: '독수리', emoji: '🦅', hanja: ['翰', '俊', '榮', '浩'], meaning: '독수리처럼 높이 나는' },
      { id: 'cat', name: '고양이', emoji: '🐱', hanja: ['妍', '雅', '柔', '娜'], meaning: '고양이처럼 우아하고 영리한' },
    ]
  },
  {
    id: 'nature',
    name: '자연',
    emoji: '☀️',
    dreams: [
      { id: 'sun', name: '해', emoji: '☀️', hanja: ['夏', '妍', '燦', '榮'], meaning: '해처럼 밝고 따뜻한' },
      { id: 'moon', name: '달', emoji: '🌙', hanja: ['妍', '雅', '眞', '允'], meaning: '달처럼 맑고 아름다운' },
      { id: 'star', name: '별', emoji: '⭐', hanja: ['燦', '妍', '榮', '眞'], meaning: '별처럼 빛나는' },
      { id: 'sky', name: '하늘', emoji: '🌤️', hanja: ['夏', '浩', '賢', '允'], meaning: '하늘처럼 넓고 높은' },
      { id: 'cloud', name: '구름', emoji: '☁️', hanja: ['雲', '允', '柔', '妍'], meaning: '구름처럼 자유롭고 여유로운' },
      { id: 'wind', name: '바람', emoji: '🌬️', hanja: ['颯', '敏', '翰', '浩'], meaning: '바람처럼 시원하고 상쾌한' },
      { id: 'mountain', name: '산', emoji: '⛰️', hanja: ['賢', '安', '厚', '浩'], meaning: '산처럼 웅장하고 든든한' },
      { id: 'river', name: '강', emoji: '🌊', hanja: ['浩', '允', '潾', '淡'], meaning: '강처럼 흐르고 넓은' },
      { id: 'sea', name: '바다', emoji: '🌊', hanja: ['浩', '潾', '允', '淡'], meaning: '바다처럼 넓고 깊은' },
      { id: 'water', name: '물', emoji: '💧', hanja: ['潾', '允', '淡', '眞'], meaning: '물처럼 맑고 순수한' },
      { id: 'fire', name: '불', emoji: '🔥', hanja: ['燦', '榮', '夏', '妍'], meaning: '불처럼 열정적이고 따뜻한' },
      { id: 'light', name: '빛', emoji: '✨', hanja: ['燦', '妍', '榮', '允'], meaning: '빛처럼 밝게 빛나는' },
      { id: 'rainbow', name: '무지개', emoji: '🌈', hanja: ['彩', '妍', '雅', '娜'], meaning: '무지개처럼 아름답고 희망찬' },
      { id: 'thunder', name: '천둥/번개', emoji: '⚡', hanja: ['燦', '俊', '浩', '翰'], meaning: '번개처럼 빠르고 강한' },
      { id: 'rain', name: '비', emoji: '🌧️', hanja: ['潾', '恩', '允', '眞'], meaning: '비처럼 세상을 적시는' },
      { id: 'snow', name: '눈', emoji: '❄️', hanja: ['雪', '眞', '素', '潾'], meaning: '눈처럼 순백하고 깨끗한' },
      { id: 'waterfall', name: '폭포', emoji: '💦', hanja: ['浩', '潾', '淡', '允'], meaning: '폭포처럼 시원하고 강한' },
      { id: 'island', name: '섬', emoji: '🏝️', hanja: ['安', '穩', '賢', '眞'], meaning: '섬처럼 평화롭고 안정된' },
      { id: 'field', name: '들판', emoji: '🌾', hanja: ['榮', '豊', '實', '恩'], meaning: '들판처럼 풍요로운' },
    ]
  },
  {
    id: 'plant',
    name: '식물',
    emoji: '🌸',
    dreams: [
      { id: 'flower', name: '꽃', emoji: '🌸', hanja: ['妍', '雅', '娜', '彩'], meaning: '꽃처럼 아름답고 향기로운' },
      { id: 'tree', name: '나무', emoji: '🌳', hanja: ['榮', '賢', '安', '厚'], meaning: '나무처럼 굳건하고 성장하는' },
      { id: 'pine', name: '소나무', emoji: '🌲', hanja: ['松', '眞', '賢', '榮'], meaning: '소나무처럼 푸르고 곧은' },
      { id: 'bamboo', name: '대나무', emoji: '🎋', hanja: ['賢', '眞', '允', '安'], meaning: '대나무처럼 곧고 청렴한' },
      { id: 'plum', name: '매화', emoji: '🌺', hanja: ['妍', '雅', '眞', '允'], meaning: '매화처럼 고결하고 향기로운' },
      { id: 'orchid', name: '난초', emoji: '🌼', hanja: ['雅', '妍', '娜', '允'], meaning: '난초처럼 우아하고 고상한' },
      { id: 'chrysanthemum', name: '국화', emoji: '🌼', hanja: ['妍', '眞', '允', '賢'], meaning: '국화처럼 절개있고 아름다운' },
      { id: 'lotus', name: '연꽃', emoji: '🪷', hanja: ['妍', '潾', '眞', '允'], meaning: '연꽃처럼 맑고 고귀한' },
      { id: 'rose', name: '장미', emoji: '🌹', hanja: ['妍', '雅', '娜', '彩'], meaning: '장미처럼 화려하고 아름다운' },
      { id: 'cherry', name: '벚꽃', emoji: '🌸', hanja: ['妍', '雅', '彩', '允'], meaning: '벚꽃처럼 화사하고 아름다운' },
      { id: 'peony', name: '모란', emoji: '🌺', hanja: ['妍', '雅', '娜', '榮'], meaning: '모란처럼 화려하고 부귀한' },
      { id: 'fruit', name: '과일', emoji: '🍎', hanja: ['實', '恩', '祐', '榮'], meaning: '열매처럼 풍성하고 알찬' },
      { id: 'grape', name: '포도', emoji: '🍇', hanja: ['恩', '祐', '柔', '允'], meaning: '포도처럼 풍성하고 달콤한' },
      { id: 'peach', name: '복숭아', emoji: '🍑', hanja: ['恩', '祐', '妍', '允'], meaning: '복숭아처럼 복되고 아름다운' },
      { id: 'willow', name: '버드나무', emoji: '🌿', hanja: ['柔', '妍', '雅', '允'], meaning: '버들처럼 부드럽고 유연한' },
      { id: 'ginseng', name: '인삼', emoji: '🌱', hanja: ['參', '眞', '賢', '祐'], meaning: '인삼처럼 귀하고 건강한' },
      { id: 'mushroom', name: '버섯', emoji: '🍄', hanja: ['恩', '祐', '榮', '實'], meaning: '버섯처럼 귀하고 신비로운' },
      { id: 'watermelon', name: '수박', emoji: '🍉', hanja: ['實', '恩', '祐', '允'], meaning: '수박처럼 풍성하고 달콤한' },
    ]
  },
  {
    id: 'treasure',
    name: '보석/귀한 것',
    emoji: '💎',
    dreams: [
      { id: 'jade', name: '옥', emoji: '💎', hanja: ['珠', '眞', '妍', '允'], meaning: '옥처럼 귀하고 아름다운' },
      { id: 'pearl', name: '진주', emoji: '📿', hanja: ['珠', '眞', '妍', '雅'], meaning: '진주처럼 귀하고 빛나는' },
      { id: 'gold', name: '금', emoji: '🏆', hanja: ['燦', '榮', '妍', '允'], meaning: '금처럼 귀하고 빛나는' },
      { id: 'silver', name: '은', emoji: '⚪', hanja: ['恩', '潾', '眞', '允'], meaning: '은처럼 맑고 귀한' },
      { id: 'gem', name: '보석', emoji: '💎', hanja: ['妍', '雅', '燦', '榮'], meaning: '보석처럼 귀하고 찬란한' },
      { id: 'crystal', name: '수정', emoji: '🔮', hanja: ['潾', '眞', '允', '妍'], meaning: '수정처럼 맑고 투명한' },
      { id: 'emerald', name: '비취', emoji: '💚', hanja: ['妍', '雅', '潾', '允'], meaning: '비취처럼 영롱하고 귀한' },
    ]
  },
  {
    id: 'color',
    name: '색깔',
    emoji: '🎨',
    dreams: [
      { id: 'white', name: '흰색/백색', emoji: '⚪', hanja: ['素', '眞', '潾', '允'], meaning: '흰색처럼 순수하고 깨끗한' },
      { id: 'black', name: '검은색', emoji: '⚫', hanja: ['賢', '眞', '浩', '允'], meaning: '검은색처럼 심오하고 깊은' },
      { id: 'red', name: '붉은색', emoji: '🔴', hanja: ['燦', '妍', '夏', '榮'], meaning: '붉은색처럼 열정적이고 활기찬' },
      { id: 'blue', name: '푸른색', emoji: '🔵', hanja: ['潾', '浩', '允', '眞'], meaning: '푸른색처럼 맑고 시원한' },
      { id: 'yellow', name: '노란색', emoji: '🟡', hanja: ['燦', '妍', '榮', '夏'], meaning: '노란색처럼 밝고 따뜻한' },
      { id: 'green', name: '초록색', emoji: '🟢', hanja: ['潾', '榮', '柔', '妍'], meaning: '초록색처럼 생기있고 싱싱한' },
      { id: 'purple', name: '보라색', emoji: '🟣', hanja: ['雅', '妍', '榮', '眞'], meaning: '보라색처럼 고귀하고 우아한' },
    ]
  },
  {
    id: 'fortune',
    name: '재물/복',
    emoji: '💰',
    dreams: [
      { id: 'poop', name: '똥/대변', emoji: '💩', hanja: ['福', '恩', '祐', '榮'], meaning: '재물과 복이 가득한' },
      { id: 'money', name: '돈/동전', emoji: '💰', hanja: ['福', '恩', '榮', '祐'], meaning: '재물운이 좋은' },
      { id: 'rice', name: '쌀/곡식', emoji: '🌾', hanja: ['豊', '實', '恩', '祐'], meaning: '풍요롭고 넉넉한' },
      { id: 'fruit_harvest', name: '과일/열매', emoji: '🍎', hanja: ['實', '榮', '恩', '祐'], meaning: '결실이 풍성한' },
      { id: 'treasure_box', name: '보물상자', emoji: '💎', hanja: ['寶', '榮', '妍', '祐'], meaning: '귀하고 소중한' },
      { id: 'key', name: '열쇠', emoji: '🔑', hanja: ['開', '榮', '眞', '允'], meaning: '기회를 여는' },
    ]
  }
]

// 태몽으로 이름 추천하는 함수
export function getNamesByDream(dreamId, gender, namesData, hanjaData) {
  // 1. 태몽에 해당하는 한자 찾기
  let dreamHanja = []

  for (const category of dreamCategories) {
    const dream = category.dreams.find(d => d.id === dreamId)
    if (dream) {
      dreamHanja = dream.hanja
      break
    }
  }

  if (dreamHanja.length === 0) return []

  // 2. 해당 한자를 포함한 이름 찾기
  const names = namesData[gender] || []
  const matchedNames = []

  for (const nameData of names) {
    // 한자 표기에서 태몽 한자가 포함되어 있는지 확인
    const hasMatchingHanja = dreamHanja.some(hanja =>
      nameData.hanja && nameData.hanja.includes(hanja)
    )

    if (hasMatchingHanja) {
      matchedNames.push({
        ...nameData,
        matchedHanja: dreamHanja.find(h => nameData.hanja.includes(h))
      })
    }
  }

  // 3. 순위순으로 정렬
  return matchedNames.sort((a, b) => (a.rank2024 || 999) - (b.rank2024 || 999))
}
