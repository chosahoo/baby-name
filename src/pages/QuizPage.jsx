import { useState } from 'react'

const getQuestions = (mode) => {
  const simpleQuestions = [
    {
      id: 'gender',
      question: '아기의 성별은?',
      options: [
        { value: 'girl', label: '여아', emoji: '👧' },
        { value: 'boy', label: '남아', emoji: '👦' },
        { value: 'neutral', label: '중성 이름', emoji: '👶' },
        { value: 'both', label: '아직 모름', emoji: '🤷‍♀️' }
      ]
    },
    {
      id: 'style',
      question: '어떤 스타일의 이름을 원하시나요?',
      options: [
        { value: 'modern', label: '현대적', emoji: '✨', desc: '세련되고 모던한' },
        { value: 'traditional', label: '전통적', emoji: '📜', desc: '고전적인' },
        { value: 'unique', label: '독특', emoji: '🎨', desc: '개성있는' },
        { value: 'simple', label: '간단', emoji: '💫', desc: '부르기 편한' }
      ]
    },
    {
      id: 'rhythm',
      question: '이름의 리듬감은?',
      options: [
        { value: 'cheerful', label: '경쾌한', emoji: '🎵', desc: '발랄하고 귀여운' },
        { value: 'calm', label: '차분한', emoji: '🎹', desc: '안정적이고 편안한' },
        { value: 'balanced', label: '조화로운', emoji: '🎼', desc: '균형잡힌' },
        { value: 'any', label: '상관없음', emoji: '🤝', desc: '무관' }
      ]
    },
    {
      id: 'popularity',
      question: '이름의 인기도는?',
      options: [
        { value: 'popular', label: '인기 많은 이름', emoji: '⭐', desc: 'TOP 10' },
        { value: 'moderate', label: '적당히 흔한 이름', emoji: '🌟', desc: 'TOP 50' },
        { value: 'rare', label: '희귀한 이름', emoji: '💎', desc: '남들과 다르게' },
        { value: 'any', label: '상관없음', emoji: '🎲', desc: '무관' }
      ]
    },
    {
      id: 'sound',
      question: '선호하는 발음은?',
      options: [
        { value: 'soft', label: '부드러운 발음', emoji: '🌸', desc: '아, 윤, 서 등' },
        { value: 'strong', label: '또렷한 발음', emoji: '⚡', desc: '준, 현, 진 등' },
        { value: 'balanced', label: '조화로운 발음', emoji: '🎵', desc: '혼합형' },
        { value: 'any', label: '상관없음', emoji: '🎼', desc: '무관' }
      ]
    }
  ]

  const detailedQuestions = [
    ...simpleQuestions,
    {
      id: 'meaning',
      question: '이름에 담고 싶은 의미는?',
      options: [
        { value: 'wise', label: '지혜', emoji: '🧠', desc: '지혜롭고 똑똑한' },
        { value: 'kind', label: '착함', emoji: '💝', desc: '착하고 따뜻한' },
        { value: 'strong', label: '강함', emoji: '💪', desc: '강하고 당당한' },
        { value: 'bright', label: '밝음', emoji: '😊', desc: '밝고 즐거운' }
      ]
    },
    {
      id: 'feeling',
      question: '이름에서 느껴지길 바라는 느낌은?',
      options: [
        { value: 'elegant', label: '우아', emoji: '👑', desc: '우아하고 품위있는' },
        { value: 'fresh', label: '신선', emoji: '🌱', desc: '신선하고 발랄한' },
        { value: 'calm', label: '차분', emoji: '🌊', desc: '차분하고 안정적인' },
        { value: 'bright', label: '밝음', emoji: '☀️', desc: '밝고 희망찬' }
      ]
    },
    {
      id: 'hanja',
      question: '한자 이름 선호도는?',
      options: [
        { value: 'required', label: '한자 필수', emoji: '📚', desc: '한자 의미 중요' },
        { value: 'preferred', label: '한자 선호', emoji: '📖', desc: '있으면 좋음' },
        { value: 'pure', label: '순우리말', emoji: '🌿', desc: '한자 없이' },
        { value: 'any', label: '상관없음', emoji: '🎯', desc: '무관' }
      ]
    },
    {
      id: 'firstSound',
      question: '첫소리 선호는?',
      options: [
        { value: 'ㄱ', label: 'ㄱ', emoji: '🅰️', desc: '가, 고, 구 등' },
        { value: 'ㄴ', label: 'ㄴ', emoji: '🅱️', desc: '나, 노, 누 등' },
        { value: 'ㄷ', label: 'ㄷ', emoji: '🅲', desc: '다, 도, 두 등' },
        { value: 'ㄹ', label: 'ㄹ', emoji: '🅳', desc: '라, 로, 루 등' },
        { value: 'ㅁ', label: 'ㅁ', emoji: '🅴', desc: '마, 모, 무 등' },
        { value: 'ㅂ', label: 'ㅂ', emoji: '🅵', desc: '바, 보, 부 등' },
        { value: 'ㅅ', label: 'ㅅ', emoji: '🅶', desc: '사, 소, 수 등' },
        { value: 'ㅇ', label: 'ㅇ', emoji: '🅷', desc: '아, 오, 우 등' },
        { value: 'ㅈ', label: 'ㅈ', emoji: '🅸', desc: '자, 조, 주 등' },
        { value: 'ㅎ', label: 'ㅎ', emoji: '🅹', desc: '하, 호, 후 등' },
        { value: 'any', label: '상관없음', emoji: '🎯', desc: '무관' }
      ]
    },
    {
      id: 'lastSound',
      question: '끝소리 선호는?',
      options: [
        { value: 'none', label: '받침없음', emoji: '🎈', desc: '아, 우, 이 등' },
        { value: 'ㄴ', label: 'ㄴ받침', emoji: '🎀', desc: '안, 은, 인 등' },
        { value: 'ㅇ', label: 'ㅇ받침', emoji: '🎁', desc: '강, 명, 영 등' },
        { value: 'any', label: '상관없음', emoji: '🎯', desc: '무관' }
      ]
    },
    {
      id: 'season',
      question: '연상되는 계절 느낌은?',
      options: [
        { value: 'spring', label: '봄', emoji: '🌸', desc: '따뜻하고 생기있는' },
        { value: 'summer', label: '여름', emoji: '🌞', desc: '밝고 활기찬' },
        { value: 'autumn', label: '가을', emoji: '🍂', desc: '차분하고 성숙한' },
        { value: 'winter', label: '겨울', emoji: '❄️', desc: '맑고 깨끗한' },
        { value: 'any', label: '상관없음', emoji: '🎯', desc: '무관' }
      ]
    },
    {
      id: 'nature',
      question: '자연에서 연상되는 것은?',
      options: [
        { value: 'sky', label: '하늘', emoji: '☁️', desc: '넓고 높은' },
        { value: 'sea', label: '바다', emoji: '🌊', desc: '깊고 넓은' },
        { value: 'mountain', label: '산', emoji: '⛰️', desc: '웅장하고 든든한' },
        { value: 'flower', label: '꽃', emoji: '🌺', desc: '아름답고 향기로운' },
        { value: 'any', label: '상관없음', emoji: '🎯', desc: '무관' }
      ]
    },
    {
      id: 'color',
      question: '연상되는 색감은?',
      options: [
        { value: 'bright', label: '밝은색', emoji: '🌟', desc: '하얀, 노란 등' },
        { value: 'dark', label: '어두운색', emoji: '🌑', desc: '검정, 남색 등' },
        { value: 'neutral', label: '중성색', emoji: '🤍', desc: '회색, 베이지 등' },
        { value: 'any', label: '상관없음', emoji: '🎯', desc: '무관' }
      ]
    },
    {
      id: 'pronunciation',
      question: '발음의 중요도는?',
      options: [
        { value: 'easy', label: '발음 쉬운게 중요', emoji: '👄', desc: '누구나 쉽게' },
        { value: 'unique', label: '독특한 발음', emoji: '🎤', desc: '특별하게' },
        { value: 'standard', label: '표준 발음', emoji: '📣', desc: '정확하게' },
        { value: 'any', label: '상관없음', emoji: '🎯', desc: '무관' }
      ]
    },
    {
      id: 'imageType',
      question: '이름에서 받고 싶은 이미지는?',
      options: [
        { value: 'cute', label: '귀여운', emoji: '🐰', desc: '사랑스러운' },
        { value: 'cool', label: '멋진', emoji: '😎', desc: '시크하고 당당한' },
        { value: 'gentle', label: '부드러운', emoji: '🦢', desc: '온화하고 따뜻한' },
        { value: 'energetic', label: '활기찬', emoji: '⚡', desc: '생동감있는' }
      ]
    }
  ]

  return mode === 'simple' ? simpleQuestions : detailedQuestions
}

function QuizPage({ mode = 'simple', onComplete, onBack }) {
  const questions = getQuestions(mode)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 200)
    } else {
      // 마지막 질문 완료 - 분석 시작
      setIsAnalyzing(true)
      setTimeout(() => {
        onComplete(newAnswers)
      }, 3000) // 3초 분석 애니메이션
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 분석 중 화면
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-cream-200 flex items-center justify-center">
        <div className="mobile-container text-center px-4">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-100 mb-6 animate-pulse">
              <span className="text-5xl">🤔</span>
            </div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-3">
              완벽한 이름을 찾는 중...
            </h2>
            <p className="text-neutral-600 mb-6">
              {mode === 'simple' ? '5가지' : '15가지'} 답변을 바탕으로<br/>
              최적의 이름을 분석하고 있어요
            </p>
          </div>

          {/* 로딩 단계 */}
          <div className="space-y-3 max-w-sm mx-auto">
            {[
              { icon: '📊', text: '2024년 통계 분석 중...', delay: 0 },
              { icon: '🎨', text: '스타일 매칭 중...', delay: 600 },
              { icon: '💝', text: '의미 조합 중...', delay: 1200 },
              { icon: '✨', text: 'TOP 5 선정 중...', delay: 1800 }
            ].map((step, idx) => (
              <div
                key={idx}
                className="card flex items-center gap-3 animate-fadeIn"
                style={{ animationDelay: `${step.delay}ms` }}
              >
                <span className="text-2xl">{step.icon}</span>
                <span className="text-sm text-neutral-700">{step.text}</span>
              </div>
            ))}
          </div>

          {/* 로딩 바 */}
          <div className="mt-8 max-w-sm mx-auto">
            <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full animate-loading" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-200">
      <div className="mobile-container safe-top">
        {/* 헤더 */}
        <div className="pt-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="touch-target -ml-2"
            >
              <svg className="w-6 h-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm font-medium text-neutral-600">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>

          {/* 프로그레스 바 */}
          <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#E8D5C4' }}>
            <div
              className="h-full transition-all duration-500 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(to right, #E8A87C, #D4956B)'
              }}
            />
          </div>
        </div>

        {/* 질문 */}
        <div className="fade-in">
          <h2 className="text-2xl font-bold text-neutral-800 mb-8 text-center px-4">
            {questions[currentQuestion].question}
          </h2>

          {/* 옵션 */}
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="card-option w-full text-left active:scale-95"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center text-3xl flex-shrink-0">
                    {option.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-800 mb-0.5">
                      {option.label}
                    </p>
                    {option.desc && (
                      <p className="text-xs text-neutral-500">
                        {option.desc}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizPage
