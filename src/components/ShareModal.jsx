import { useState } from 'react'

function ShareModal({ isOpen, onClose, nameData }) {
  const [copied, setCopied] = useState(false)
  const [showKakaoNotice, setShowKakaoNotice] = useState(false)
  const [showImageNotice, setShowImageNotice] = useState(false)

  if (!isOpen) return null

  // 현재 페이지 URL 사용 (배포 시 자동으로 올바른 도메인 사용)
  const baseUrl = window.location.origin
  const shareUrl = `${baseUrl}/?name=${encodeURIComponent(nameData?.name || '')}`
  const shareText = `우리 아기 이름 후보: ${nameData?.name} (${nameData?.hanja})\n의미: ${nameData?.meaning}\n\nbebé name에서 확인하기 👉 ${shareUrl}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareToKakao = () => {
    // 카카오톡 공유 기능은 추후 SDK 연동 필요
    setShowKakaoNotice(true)
    setTimeout(() => setShowKakaoNotice(false), 3000)
  }

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
    window.open(twitterUrl, '_blank')
  }

  const shareToFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(fbUrl, '_blank')
  }

  const downloadAsImage = () => {
    // 이미지 저장 기능은 추후 html2canvas 라이브러리 연동 필요
    setShowImageNotice(true)
    setTimeout(() => setShowImageNotice(false), 3000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* 토스트 메시지 - 카카오톡 */}
      {showKakaoNotice && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-lg z-[60] animate-fade-in">
          <p className="text-sm">카카오톡 공유 기능은 준비 중입니다 💬</p>
        </div>
      )}

      {/* 토스트 메시지 - 이미지 저장 */}
      {showImageNotice && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-lg z-[60] animate-fade-in">
          <p className="text-sm">이미지 저장 기능은 준비 중입니다 📸</p>
        </div>
      )}

      <div className="bg-white rounded-3xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">공유하기</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl"
          >
            ×
          </button>
        </div>

        {nameData && (
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 mb-6 text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-1">
              {nameData.name}
            </h3>
            <p className="text-xl text-gray-600 mb-2">{nameData.hanja}</p>
            <p className="text-sm text-gray-700">{nameData.meaning}</p>
          </div>
        )}

        <div className="space-y-3 mb-6">
          <button
            onClick={shareToKakao}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <span className="text-xl">💬</span>
            카카오톡으로 공유
          </button>

          <button
            onClick={shareToTwitter}
            className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <span className="text-xl">🐦</span>
            트위터에 공유
          </button>

          <button
            onClick={shareToFacebook}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <span className="text-xl">📘</span>
            페이스북에 공유
          </button>

          <button
            onClick={downloadAsImage}
            className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <span className="text-xl">📸</span>
            이미지로 저장
          </button>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 mb-2">링크 복사</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-gray-100 rounded-lg text-sm"
            />
            <button
              onClick={copyToClipboard}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {copied ? '✓' : '복사'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareModal
