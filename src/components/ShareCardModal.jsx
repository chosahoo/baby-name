import { useState, useRef, useEffect } from 'react'

function ShareCardModal({ isOpen, onClose, nameData }) {
  const canvasRef = useRef(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (isOpen && nameData) {
      generateCard()
    }
  }, [isOpen, nameData])

  const generateCard = () => {
    setIsGenerating(true)

    // Canvas에 카드 그리기
    setTimeout(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')

      // 고해상도를 위해 2배 크기로 설정
      const scale = 2
      canvas.width = 800 * scale
      canvas.height = 1000 * scale
      ctx.scale(scale, scale)

      // 배경 그라데이션
      const gradient = ctx.createLinearGradient(0, 0, 0, 1000)
      gradient.addColorStop(0, '#FFF5E6')
      gradient.addColorStop(0.5, '#FFE4CC')
      gradient.addColorStop(1, '#FFD9B3')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 800, 1000)

      // 장식 원형들
      ctx.fillStyle = 'rgba(232, 168, 124, 0.1)'
      ctx.beginPath()
      ctx.arc(650, 150, 200, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(150, 800, 150, 0, Math.PI * 2)
      ctx.fill()

      // 상단 타이틀
      ctx.fillStyle = '#8B7355'
      ctx.font = 'bold 32px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('우리 아기 이름 후보', 400, 120)

      // 메인 카드 영역
      ctx.fillStyle = '#FFFFFF'
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)'
      ctx.shadowBlur = 30
      ctx.shadowOffsetY = 10
      roundRect(ctx, 80, 180, 640, 600, 30)
      ctx.fill()
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetY = 0

      // 이름 (큰 글씨)
      ctx.fillStyle = '#2D2D2D'
      ctx.font = 'bold 100px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(nameData.name || '', 400, 360)

      // 한자 표기
      if (nameData.hanja && nameData.hanja !== '-') {
        ctx.fillStyle = '#8B7355'
        ctx.font = '40px sans-serif'
        ctx.fillText(nameData.hanja, 400, 440)
      }

      // 구분선
      ctx.strokeStyle = '#E8A87C'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(200, 480)
      ctx.lineTo(600, 480)
      ctx.stroke()

      // 의미
      if (nameData.meaning) {
        ctx.fillStyle = '#5D5D5D'
        ctx.font = '28px sans-serif'
        ctx.textAlign = 'center'
        const meaning = nameData.meaning.length > 20
          ? nameData.meaning.substring(0, 20) + '...'
          : nameData.meaning
        ctx.fillText(meaning, 400, 550)
      }

      // 순위 정보
      if (nameData.rank2024 || nameData.ranks?.['2024']) {
        const rank = nameData.rank2024 || nameData.ranks['2024']
        ctx.fillStyle = '#E8A87C'
        ctx.font = 'bold 24px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(`2024년 ${rank}위`, 400, 620)
      }

      // 인기도 정보
      if (nameData.percentage) {
        ctx.fillStyle = '#8B7355'
        ctx.font = '20px sans-serif'
        ctx.fillText(`상위 ${nameData.percentage}%`, 400, 660)
      }

      // 하단 브랜딩
      ctx.fillStyle = '#C9A98E'
      ctx.font = 'bold 36px serif'
      ctx.textAlign = 'center'
      ctx.fillText('bébé name', 400, 870)

      ctx.fillStyle = '#8B7355'
      ctx.font = '20px sans-serif'
      ctx.fillText('우리 아기 이름 찾기 🍼', 400, 920)

      // Canvas를 이미지로 변환
      const url = canvas.toDataURL('image/png')
      setImageUrl(url)
      setIsGenerating(false)
    }, 100)
  }

  // 둥근 사각형 그리기 헬퍼 함수
  const roundRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
  }

  const handleDownload = () => {
    if (!imageUrl) return

    const link = document.createElement('a')
    link.download = `${nameData.name}_이름카드.png`
    link.href = imageUrl
    link.click()
  }

  const handleShare = async () => {
    if (!imageUrl) return

    try {
      // Canvas를 Blob으로 변환
      const canvas = canvasRef.current
      canvas.toBlob(async (blob) => {
        const file = new File([blob], `${nameData.name}_이름카드.png`, { type: 'image/png' })

        if (navigator.share && navigator.canShare({ files: [file] })) {
          const hanjaText = nameData.hanja && nameData.hanja !== '-' ? ` (${nameData.hanja})` : ''
          await navigator.share({
            title: `${nameData.name} 이름 카드`,
            text: `${nameData.name}${hanjaText} - ${nameData.meaning}`,
            files: [file]
          })
        } else {
          // 공유 불가능하면 다운로드
          handleDownload()
        }
      })
    } catch (error) {
      console.error('공유 실패:', error)
      // 실패 시 다운로드
      handleDownload()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 animate-slideUp max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">이름 카드 공유</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl touch-target"
          >
            ×
          </button>
        </div>

        {isGenerating && (
          <div className="text-center py-8">
            <div className="animate-spin text-4xl mb-4">🎨</div>
            <p className="text-gray-600">카드 생성 중...</p>
          </div>
        )}

        {imageUrl && !isGenerating && (
          <>
            <div className="mb-6">
              <img
                src={imageUrl}
                alt="이름 카드"
                className="w-full rounded-2xl shadow-lg"
              />
            </div>

            <div className="space-y-3">
              <button
                onClick={handleShare}
                className="w-full bg-[#E8A87C] hover:bg-[#D4956B] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
              >
                <span className="text-2xl">📤</span>
                <span>이미지 공유하기</span>
              </button>

              <button
                onClick={handleDownload}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span className="text-xl">💾</span>
                <span>이미지 저장</span>
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              💡 카카오톡, 인스타그램 스토리 등<br/>
              원하는 곳에 공유해보세요!
            </p>
          </>
        )}

        {/* 숨겨진 Canvas */}
        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}

export default ShareCardModal
