import { useState } from 'react'

function ShareModal({ isOpen, onClose, nameData }) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  // 현재 페이지 URL 사용 (배포 시 자동으로 올바른 도메인 사용)
  const baseUrl = window.location.origin
  const shareUrl = `${baseUrl}/?name=${encodeURIComponent(nameData?.name || '')}`

  console.log('ShareModal - nameData:', nameData)
  console.log('ShareModal - shareUrl:', shareUrl)
  console.log('ShareModal - encoded name:', encodeURIComponent(nameData?.name || ''))

  // 기본 공유 텍스트 (간단하게만)
  const hanjaText = nameData?.hanja && nameData?.hanja !== '-' ? ` (${nameData?.hanja})` : ''
  let shareText = `✨ 우리 아기 이름 후보: ${nameData?.name}${hanjaText}\n\n📝 의미: ${nameData?.meaning}\n\n`

  // 순위 정보가 있으면 추가
  if (nameData?.rank2024) {
    shareText += `📊 2024년 ${nameData.rank2024}위\n\n`
  }

  shareText += `💡 한자 상세, 성명학, 통계 등 자세한 정보는 링크를 눌러주세요!`

  const shareTitle = `${nameData?.name} - bébé name`

  // 네이티브 공유 기능 (모바일에서 카톡/메시지 등 선택 가능)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        })
      } catch (error) {
        // 사용자가 공유를 취소한 경우 무시
        if (error.name !== 'AbortError') {
          console.error('공유 실패:', error)
          // 공유 실패 시 링크 복사로 대체
          copyToClipboard()
        }
      }
    } else {
      // Web Share API 미지원 시 링크 복사
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    const fullText = shareText + shareUrl
    navigator.clipboard.writeText(fullText)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      {/* 복사 완료 토스트 */}
      {copied && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-lg z-[60] animate-fade-in">
          <p className="text-sm">링크가 복사되었습니다! 📋</p>
        </div>
      )}

      <div className="bg-white rounded-3xl max-w-md w-full p-6 animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">공유하기</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl touch-target"
          >
            ×
          </button>
        </div>

        {nameData && (
          <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl p-6 mb-6 text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-1">
              {nameData.name}
            </h3>
            {nameData.hanja && nameData.hanja !== '-' && (
              <p className="text-xl text-gray-600 mb-2">{nameData.hanja}</p>
            )}
            <p className="text-sm text-gray-700">{nameData.meaning}</p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={handleNativeShare}
            className="w-full bg-[#E8A87C] hover:bg-[#D4956B] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
          >
            <span className="text-2xl">📤</span>
            <span>공유하기</span>
          </button>

          <button
            onClick={copyToClipboard}
            className={`w-full font-medium py-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            <span className="text-xl">{copied ? '✓' : '📋'}</span>
            <span>{copied ? '복사 완료!' : '링크 복사'}</span>
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          💡 공유하기를 누르면 카카오톡, 메시지 등<br/>
          원하는 앱으로 공유할 수 있어요
        </p>
      </div>
    </div>
  )
}

export default ShareModal
