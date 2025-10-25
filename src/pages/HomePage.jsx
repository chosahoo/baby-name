function HomePage({ onStartQuiz, onNavigate }) {
  return (
    <div className="min-h-screen bg-cream-100">
      {/* 헤더 */}
      <div className="mobile-container safe-top">
        <div className="text-center pt-8 pb-6">
          <h1 className="text-4xl font-bold text-neutral-800 mb-2">
            bebé name
          </h1>
          <p className="text-lg text-neutral-600">
            우리 아기 이름 찾기 💕
          </p>
        </div>

        {/* 메인 CTA */}
        <div className="card mb-6 fade-in">
          <h2 className="text-xl font-bold text-neutral-800 mb-2 text-center">
            8가지 질문으로 완벽한 이름 찾기
          </h2>
          <p className="text-neutral-600 text-center mb-4 text-sm">
            간단한 질문에 답하시면 우리 아기에게<br/>
            딱 맞는 이름 TOP 5를 추천해드려요
          </p>
          <button
            onClick={onStartQuiz}
            className="w-full py-4 bg-[#FF6B9D] text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] hover:bg-[#FF5A8C]"
          >
            이름 찾기 시작하기 🚀
          </button>
        </div>

        {/* 메인 기능 */}
        <div className="mb-6">
          <h3 className="section-header">메인 기능</h3>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('hanja-recommend')}
              className="card-hover w-full text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-2xl flex-shrink-0">
                  ✍️
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-neutral-800">한자 이름 추천</h4>
                  <p className="text-sm text-neutral-600 truncate">인명용 한자로 최적의 조합 찾기</p>
                </div>
                <svg className="w-5 h-5 text-neutral-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            <button
              onClick={() => onNavigate('sibling-name')}
              className="card-hover w-full text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-2xl flex-shrink-0">
                  👧👦
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-neutral-800">형제자매 이름 추천</h4>
                  <p className="text-sm text-neutral-600 truncate">첫째와 조화로운 둘째 이름</p>
                </div>
                <svg className="w-5 h-5 text-neutral-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            <button
              onClick={() => onNavigate('compare-names')}
              className="card-hover w-full text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-2xl flex-shrink-0">
                  ⚖️
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-neutral-800">이름 2개 빠른 비교</h4>
                  <p className="text-sm text-neutral-600 truncate">고민되는 두 이름 비교</p>
                </div>
                <svg className="w-5 h-5 text-neutral-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* 분석 기능 */}
        <div className="mb-6">
          <h3 className="section-header">분석 기능</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate('family-harmony')}
              className="card-hover text-left"
            >
              <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
              <h4 className="font-semibold text-neutral-800 text-sm mb-1">가족 조화도</h4>
              <p className="text-xs text-neutral-600 line-clamp-2">우리 가족과의 조화도 분석</p>
            </button>

            <button
              onClick={() => onNavigate('statistics')}
              className="card-hover text-left"
            >
              <div className="text-3xl mb-2">📈</div>
              <h4 className="font-semibold text-neutral-800 text-sm mb-1">5년 통계</h4>
              <p className="text-xs text-neutral-600 line-clamp-2">2020-2024 트렌드</p>
            </button>

            <button
              onClick={() => onNavigate('name-detail')}
              className="card-hover text-left"
            >
              <div className="text-3xl mb-2">🔍</div>
              <h4 className="font-semibold text-neutral-800 text-sm mb-1">상세 정보</h4>
              <p className="text-xs text-neutral-600 line-clamp-2">한자, 성명학 분석</p>
            </button>

            <button
              onClick={() => onNavigate('name-checklist')}
              className="card-hover text-left"
            >
              <div className="text-3xl mb-2">✅</div>
              <h4 className="font-semibold text-neutral-800 text-sm mb-1">체크리스트</h4>
              <p className="text-xs text-neutral-600 line-clamp-2">발음, 이니셜 검사</p>
            </button>
          </div>
        </div>

        {/* 기타 기능 */}
        <div className="mb-20">
          <h3 className="section-header">기타 기능</h3>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('foreign-name')}
              className="card-hover w-full text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl flex-shrink-0">
                  🌍
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-neutral-800 text-sm">외국어 표기</h4>
                  <p className="text-xs text-neutral-600">영어, 중국어, 일본어</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* 특징 */}
        <div className="pb-8">
          <div className="grid grid-cols-2 gap-3">
            <div className="card text-center">
              <div className="text-2xl mb-2">📊</div>
              <p className="text-xs font-medium text-neutral-700">최신 통계 기반</p>
            </div>
            <div className="card text-center">
              <div className="text-2xl mb-2">🎨</div>
              <p className="text-xs font-medium text-neutral-700">성명학 분석</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
