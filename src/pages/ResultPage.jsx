import { useState } from 'react'
import ShareModal from '../components/ShareModal'

function ResultPage({ names, onBack, onNavigate }) {
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [selectedNameForShare, setSelectedNameForShare] = useState(null)

  const handleShare = (nameData) => {
    setSelectedNameForShare(nameData)
    setShareModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-cream-100">
      <div className="mobile-container safe-top pb-20">
        {/* 헤더 */}
        <div className="pt-4 pb-6">
          <button
            onClick={onBack}
            className="touch-target -ml-2 mb-4"
          >
            <svg className="w-6 h-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">
              축하합니다! 🎉
            </h1>
            <p className="text-neutral-600">
              우리 아기에게 딱 맞는 이름 TOP 5
            </p>
          </div>
        </div>

        {/* 결과 리스트 */}
        <div className="space-y-4 mb-6">
          {names.map((name, index) => (
            <div key={index} className="card fade-in">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
                    index === 0 ? 'bg-yellow-100 text-yellow-600' :
                    index === 1 ? 'bg-gray-100 text-gray-600' :
                    index === 2 ? 'bg-orange-100 text-orange-600' :
                    'bg-neutral-100 text-neutral-600'
                  }`}>
                    {index + 1}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-neutral-800 mb-1">
                    {name.name}
                  </h2>
                  <p className="text-sm text-neutral-600 mb-2">{name.hanja}</p>
                  <p className="text-sm text-neutral-700">{name.meaning}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-primary-50 rounded-xl p-3">
                  <p className="text-xs text-neutral-600 mb-1">2024년 순위</p>
                  <p className="text-lg font-bold text-primary-600">
                    {name.rank2024 ? `${name.rank2024}위` : '순위권 외'}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-3">
                  <p className="text-xs text-neutral-600 mb-1">인기도</p>
                  <p className="text-lg font-bold text-blue-600">
                    {name.popularity ? `${name.popularity}%` : '-'}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onNavigate('name-detail', name)}
                  className="flex-1 py-2.5 bg-neutral-100 rounded-xl text-sm font-medium text-neutral-800 hover:bg-neutral-200 transition-colors active:scale-95"
                >
                  상세 보기
                </button>
                <button
                  onClick={() => handleShare(name)}
                  className="flex-1 py-2.5 bg-[#FF6B9D] rounded-xl text-sm font-medium text-white hover:bg-[#FF5A8C] transition-colors active:scale-95"
                >
                  공유하기
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 다른 기능 */}
        <div className="card">
          <h3 className="font-semibold text-neutral-800 mb-3">다른 기능도 사용해보세요</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onNavigate('family-harmony')}
              className="py-3 bg-primary-50 rounded-xl text-sm font-medium text-primary-700 hover:bg-primary-100 transition-colors active:scale-95"
            >
              가족 조화도
            </button>
            <button
              onClick={() => onNavigate('name-checklist')}
              className="py-3 bg-blue-50 rounded-xl text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors active:scale-95"
            >
              체크리스트
            </button>
            <button
              onClick={() => onNavigate('compare-names')}
              className="py-3 bg-purple-50 rounded-xl text-sm font-medium text-purple-700 hover:bg-purple-100 transition-colors active:scale-95"
            >
              이름 비교
            </button>
            <button
              onClick={() => onNavigate('statistics')}
              className="py-3 bg-green-50 rounded-xl text-sm font-medium text-green-700 hover:bg-green-100 transition-colors active:scale-95"
            >
              통계 보기
            </button>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        nameData={selectedNameForShare}
      />
    </div>
  )
}

export default ResultPage
