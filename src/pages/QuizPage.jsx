import { useState } from 'react'

const questions = [
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
      { value: 'modern', label: '현대적이고 세련된', emoji: '✨' },
      { value: 'traditional', label: '전통적이고 고전적인', emoji: '📜' },
      { value: 'unique', label: '독특하고 개성있는', emoji: '🎨' },
      { value: 'simple', label: '쉽고 부르기 편한', emoji: '💫' }
    ]
  },
  {
    id: 'meaning',
    question: '이름에 담고 싶은 의미는?',
    options: [
      { value: 'wise', label: '지혜롭고 똑똑한', emoji: '🧠' },
      { value: 'kind', label: '착하고 따뜻한', emoji: '💝' },
      { value: 'strong', label: '강하고 당당한', emoji: '💪' },
      { value: 'happy', label: '밝고 즐거운', emoji: '😊' }
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
    id: 'syllables',
    question: '이름의 글자 수는?',
    options: [
      { value: 'two', label: '2글자', emoji: '✌️', desc: '간결하고 현대적' },
      { value: 'three', label: '3글자', emoji: '👌', desc: '전통적이고 안정적' },
      { value: 'any', label: '상관없음', emoji: '🤝', desc: '무관' }
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
    id: 'feeling',
    question: '이름에서 느껴지길 바라는 느낌은?',
    options: [
      { value: 'elegant', label: '우아하고 품위있는', emoji: '👑' },
      { value: 'fresh', label: '신선하고 발랄한', emoji: '🌱' },
      { value: 'calm', label: '차분하고 안정적인', emoji: '🌊' },
      { value: 'bright', label: '밝고 희망찬', emoji: '☀️' }
    ]
  }
]

function QuizPage({ onComplete, onBack }) {
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
      <div className="min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="mobile-container text-center px-4">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-100 mb-6 animate-pulse">
              <span className="text-5xl">🤔</span>
            </div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-3">
              완벽한 이름을 찾는 중...
            </h2>
            <p className="text-neutral-600 mb-6">
              8가지 답변을 바탕으로<br/>
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
    <div className="min-h-screen bg-cream-100">
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
          <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
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
