import { useState } from 'react'
import { getRecommendedHanjaCombinations, hasAvailableHanja } from '../utils/hanjaUtils'
import { hanjaByReading } from '../data/hanjaData'

function HanjaRecommendPage({ onBack }) {
  const [koreanName, setKoreanName] = useState('')
  const [surname, setSurname] = useState('김')
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')
  const [expandedSyllable, setExpandedSyllable] = useState(null)

  const commonSurnames = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '신', '권', '황', '안', '송', '전', '홍']

  // 자주 사용되는 한자 목록 (일반적으로 이름에 많이 쓰이는 한자)
  const commonHanjaList = [
    '民', '敏', '珉', '旻', '玟', // 민
    '永', '英', '泳', '榮', '映', '瑛', // 영
    '瑞', '書', '西', '徐', '緖', '序', // 서
    '俊', '峻', '浚', '駿', // 준
    '智', '志', '址', '知', '芝', // 지
    '佳', '可', '嘉', '家', '歌', '加', // 가
    '娜', '羅', '奈', // 나
    '多', '茶', // 다
    '蘭', '欄', // 란
    '麗', '呂', // 려
    '美', '微', '米', // 미
    '善', '宣', '仙', '璿', '璇', // 선
    '雪', // 설
    '成', '星', '聖', '誠', '盛', '城', '姓', // 성
    '世', '歲', '細', // 세
    '素', '昭', '召', '小', '蘇', // 소
    '秀', '壽', '洙', '秋', '守', '修', '受', // 수
    '淑', '肅', // 숙
    '順', '純', '淳', '舜', // 순
    '承', '升', '勝', '丞', // 승
    '詩', '施', '時', // 시
    '信', '新', '申', '神', // 신
    '實', // 실
    '心', '深', '沈', // 심
    '雅', '亞', // 아
    '安', '眼', '岸', // 안
    '愛', '哀', // 애
    '陽', '良', '揚', '楊', '洋', '養', // 양
    '彦', '言', // 언
    '延', '妍', '姸', '娟', '蓮', '緣', '演', '燕', // 연
    '烈', '悅', // 열
    '英', '永', '泳', '榮', '映', '瑛', '影', '詠', // 영
    '藝', '禮', '叡', '睿', // 예
    '五', '午', '梧', '吳', // 오
    '玉', '沃', // 옥
    '完', '玩', '琬', // 완
    '王', '旺', // 왕
    '堯', '曜', '瑤', // 요
    '龍', '容', '勇', '庸', // 용
    '宇', '雨', '佑', '又', '友', '牛', '優', // 우
    '旭', '昱', '煜', // 욱
    '雲', '運', '芸', // 운
    '元', '院', '源', '園', '遠', '媛', '苑', // 원
    '月', '越', // 월
    '有', '柔', '裕', '維', '儒', '油', '諭', // 유
    '尹', '允', '潤', '胤', '倫', // 윤
    '律', '栗', // 율
    '銀', '恩', '隱', '殷', // 은
    '音', '陰', // 음
    '義', '意', '依', '宜', '儀', // 의
    '利', '李', '理', '伊', '怡', '二', '爾', '夷', // 이
    '益', '翼', // 익
    '仁', '寅', '認', '忍', '印', '麟', // 인
    '一', '日', '逸', // 일
    '林', '任', '壬', '姙', // 임
    '子', '慈', '姿', '紫', '資', // 자
    '在', '才', '材', '財', '栽', // 재
    '全', '田', '前', '典', '展', // 전
    '正', '貞', '靜', '晶', '淨', '鼎', '庭', '亭', '禎', '定', // 정
    '趙', '造', '兆', '助', '朝', // 조
    '鍾', '終', '從', '宗', // 종
    '主', '朱', '珠', '周', '柱', '晝', // 주
    '俊', '峻', '浚', '駿', '遵', // 준
    '中', '重', '衆', // 중
    '智', '志', '址', '池', '知', '紙', '枝', '芝', '旨', // 지
    '珍', '眞', '真', '震', '辰', '鎭', '津', '陳', // 진
    '質', // 질
    '昌', '倉', '窓', '暢', // 창
    '采', '彩', '菜', // 채
    '天', '千', '泉', '川', '淺', // 천
    '哲', '鐵', '徹', // 철
    '草', '初', '招', '超', // 초
    '崔', '最', // 최
    '秋', '秀', '推', // 추
    '忠', '沖', // 충
    '春', '椿', // 춘
    '泰', '太', '胎', '兌', // 태
    '宅', '澤', // 택
    '平', '評', // 평
    '表', '標', // 표
    '豐', '風', // 풍
    '必', '弼', // 필
    '夏', '河', '荷', '霞', '下', '賀', // 하
    '學', '鶴', // 학
    '韓', '漢', '寒', '閑', '翰', '恨', // 한
    '海', '解', '害', '亥', // 해
    '香', '鄕', '享', // 향
    '許', '虛', // 허
    '獻', '憲', '軒', // 헌
    '賢', '炫', '鉉', '絃', '玄', '顯', '縣', '懸', '泫', '眩', '玹', // 현
    '革', '赫', '奕', // 혁
    '亨', '兄', '衡', // 형
    '惠', '慧', '蕙', // 혜
    '浩', '湖', '好', '虎', '豪', '鎬', '昊', '皓', // 호
    '洪', '紅', '弘', '泓', // 홍
    '和', '花', '華', '火', '化', '禍', // 화
    '歡', '煥', '桓', '丸', // 환
    '會', '回', '懷', // 회
    '孝', '曉', '效', // 효
    '厚', '候', '後', // 후
    '勳', '勛', '薰', // 훈
    '輝', '徽', '暉', // 휘
    '姬', '熙', '喜', '稀', '禧', '曦' // 희
  ]

  const findHanjaCombinations = () => {
    setError('')

    if (!koreanName || koreanName.length < 2) {
      setError('이름은 최소 2글자 이상이어야 합니다.')
      return
    }

    if (koreanName.length > 3) {
      setError('이름은 최대 3글자까지 가능합니다.')
      return
    }

    // 한글만 입력되었는지 확인
    const hangulOnly = /^[가-힣]+$/.test(koreanName)
    if (!hangulOnly) {
      setError('한글 이름만 입력해주세요.')
      return
    }

    // 해당 음절에 사용 가능한 한자가 있는지 확인
    if (!hasAvailableHanja(koreanName)) {
      setError('일부 음절에 사용 가능한 인명용 한자가 없습니다.')
      return
    }

    const recommendations = getRecommendedHanjaCombinations(koreanName, surname, 8)

    if (recommendations.length === 0) {
      setError('한자 조합을 생성할 수 없습니다.')
      return
    }

    setResults(recommendations)
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-orange-600'
  }

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-green-50 border-green-200'
    if (score >= 80) return 'bg-blue-50 border-blue-200'
    if (score >= 70) return 'bg-yellow-50 border-yellow-200'
    return 'bg-orange-50 border-orange-200'
  }

  const getFortuneColor = (fortune) => {
    if (fortune === '대길') return 'text-green-600 bg-green-50'
    if (fortune === '길') return 'text-blue-600 bg-blue-50'
    if (fortune === '평') return 'text-gray-600 bg-gray-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="min-h-screen bg-cream-200">
      <div className="mobile-container safe-top pb-20">
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
              한자 이름 추천
            </h1>
            <p className="text-neutral-600 mb-1">
              인명용 한자로 최적의 조합을 찾아드려요 ✍️
            </p>
            <p className="text-xs text-neutral-500">
              법무부 지정 인명용 한자 기준
            </p>
          </div>
        </div>

        {!results ? (
          <div className="space-y-4">
            <div className="card">
              <h2 className="font-semibold text-neutral-800 mb-3">
                📝 이름 입력
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-neutral-600 mb-2">성씨</label>
                  <div className="grid grid-cols-5 gap-2">
                    {commonSurnames.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSurname(s)}
                        className={`py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                          surname === s
                            ? 'bg-[#E8A87C] text-white shadow-md'
                            : 'bg-white border border-neutral-200 text-neutral-700'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-neutral-600 mb-2">이름 (한글)</label>
                  <input
                    type="text"
                    value={koreanName}
                    onChange={(e) => setKoreanName(e.target.value)}
                    placeholder="예: 서연"
                    maxLength={3}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:border-[#E8A87C] focus:outline-none bg-white"
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    한글 이름 2~3글자를 입력하세요
                  </p>
                </div>
              </div>

              {error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>

            <div className="card bg-blue-50 border border-blue-200">
              <div className="flex items-start gap-2 mb-2">
                <div className="text-xl">ℹ️</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-800 mb-1">법무부 인명용 한자란?</h3>
                  <p className="text-sm text-neutral-700 leading-relaxed mb-2">
                    「가족관계의 등록 등에 관한 법률」에 따라 법무부가 지정한 <strong>8,142자</strong>의 한자입니다.
                    대한민국에서 이름에 공식적으로 사용할 수 있는 한자입니다.
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    각 한자의 획수, 오행(五行), 의미를 기반으로 성명학적 분석을 제공합니다.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={findHanjaCombinations}
              disabled={!koreanName || !surname}
              className="w-full py-4 bg-[#E8A87C] text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] hover:bg-[#D4956B] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              한자 조합 추천받기 🎯
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="card bg-primary-50">
              <p className="text-center text-neutral-700 mb-1">
                <span className="font-bold text-lg">{surname}{koreanName}</span>의 인명용 한자 조합 TOP {results.length}
              </p>
              <p className="text-xs text-center text-neutral-500">
                법무부 지정 인명용 한자 기준
              </p>
            </div>

            {results.map((result, index) => (
              <div key={index} className={`card border-2 ${getScoreBg(result.score)} fade-in`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-400 text-white text-lg' :
                      index === 1 ? 'bg-gray-300 text-white' :
                      index === 2 ? 'bg-orange-300 text-white' :
                      'bg-neutral-200 text-neutral-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-800">
                        {surname}{result.hanja}
                      </h3>
                      <p className="text-sm text-neutral-600">({surname}{koreanName})</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-neutral-600">종합 점수</div>
                    <div className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                      {result.score}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* 한자 상세 */}
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs text-neutral-600 mb-2">한자 상세</p>
                    <div className="grid grid-cols-1 gap-2">
                      {result.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <span className="text-2xl font-bold text-neutral-800">{detail.char}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-neutral-700">{detail.reading}</span>
                              <span className="text-neutral-600">"{detail.meaning}"</span>
                            </div>
                            <div className="flex gap-2 text-xs text-neutral-500">
                              <span>{detail.strokes}획</span>
                              <span>•</span>
                              <span>{detail.element}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 의미 */}
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-xs text-neutral-600 mb-1">전체 의미</p>
                    <p className="text-sm font-medium text-neutral-800">{result.meaning}</p>
                  </div>

                  {/* 오행 조화 */}
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-neutral-600">오행 조화도</p>
                      <p className="text-sm font-bold text-green-600">{result.elementHarmony}점</p>
                    </div>
                    <div className="flex gap-1 items-center text-sm">
                      {result.elements.map((elem, idx) => (
                        <span key={idx}>
                          <span className="font-medium text-neutral-700">{elem}</span>
                          {idx < result.elements.length - 1 && <span className="mx-1 text-neutral-400">→</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 성명학 오격 */}
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-neutral-600 mb-2">성명학 오격 (五格)</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(result.ogyeok).map(([name, data]) => (
                        <div key={name} className="bg-white rounded p-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-neutral-700">{name}</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${getFortuneColor(data.fortune?.fortune || '평')}`}>
                              {data.fortune?.fortune || '평'}
                            </span>
                          </div>
                          <div className="text-neutral-500 mt-1">
                            {data.strokes}획
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 총 획수 */}
                  <div className="bg-orange-50 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-neutral-600">총 획수</p>
                      <p className="text-lg font-bold text-orange-600">{result.totalStrokes}획</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* 음절별 사용 가능한 모든 한자 보기 */}
            <div className="card bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
              <h3 className="font-bold text-neutral-800 mb-3 flex items-center gap-2">
                <span className="text-xl">📚</span>
                <span>'{koreanName}' 음절별 사용 가능한 모든 한자</span>
              </h3>
              <p className="text-xs text-neutral-600 mb-4">
                각 음절을 클릭하면 사용 가능한 모든 인명용 한자를 볼 수 있어요
              </p>

              <div className="space-y-3">
                {koreanName.split('').map((syllable, index) => {
                  const availableHanja = hanjaByReading[syllable] || []
                  const isExpanded = expandedSyllable === index

                  // 자주 사용되는 한자와 그 외 한자 분리
                  const commonHanja = availableHanja.filter(h => commonHanjaList.includes(h.hanja))
                  const otherHanja = availableHanja.filter(h => !commonHanjaList.includes(h.hanja))

                  return (
                    <div key={index} className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                      <button
                        onClick={() => setExpandedSyllable(isExpanded ? null : index)}
                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-neutral-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl font-bold text-purple-600">{syllable}</span>
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-neutral-800">
                              '{syllable}' 한자 {availableHanja.length}개
                            </div>
                            <div className="text-xs text-neutral-500">
                              자주 사용 {commonHanja.length}개 • 기타 {otherHanja.length}개
                            </div>
                          </div>
                        </div>
                        <svg
                          className={`w-5 h-5 text-neutral-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 space-y-4 fade-in">
                          {/* 자주 사용되는 한자 */}
                          {commonHanja.length > 0 && (
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">
                                  자주 사용
                                </span>
                                <span className="text-xs text-neutral-500">
                                  {commonHanja.length}개
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {commonHanja.map((hanja, idx) => (
                                  <div key={idx} className="bg-purple-50 border border-purple-200 rounded-lg p-2">
                                    <div className="flex items-start gap-2">
                                      <span className="text-2xl font-bold text-purple-700">{hanja.hanja}</span>
                                      <div className="flex-1 min-w-0">
                                        <div className="text-xs font-medium text-neutral-700 truncate">
                                          {hanja.meaning}
                                        </div>
                                        <div className="text-xs text-neutral-500 mt-0.5">
                                          {hanja.strokes}획 • {hanja.element}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 기타 한자 */}
                          {otherHanja.length > 0 && (
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-semibold text-neutral-600 bg-neutral-100 px-2 py-1 rounded">
                                  기타
                                </span>
                                <span className="text-xs text-neutral-500">
                                  {otherHanja.length}개
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                                {otherHanja.map((hanja, idx) => (
                                  <div key={idx} className="bg-neutral-50 border border-neutral-200 rounded-lg p-2">
                                    <div className="flex items-start gap-2">
                                      <span className="text-2xl font-bold text-neutral-700">{hanja.hanja}</span>
                                      <div className="flex-1 min-w-0">
                                        <div className="text-xs font-medium text-neutral-700 truncate">
                                          {hanja.meaning}
                                        </div>
                                        <div className="text-xs text-neutral-500 mt-0.5">
                                          {hanja.strokes}획 • {hanja.element}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-neutral-600 leading-relaxed">
                  💡 <strong>자주 사용</strong>으로 표시된 한자는 일반적으로 이름에 많이 쓰이는 한자입니다.
                  의미와 획수를 고려하여 선택하세요.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setResults(null)}
                className="flex-1 py-3 bg-neutral-100 text-neutral-800 rounded-xl font-medium hover:bg-neutral-200 transition-colors active:scale-95"
              >
                다시 검색
              </button>
              <button
                onClick={onBack}
                className="flex-1 py-3 bg-[#E8A87C] text-white rounded-xl font-bold hover:bg-[#D4956B] transition-colors active:scale-95"
              >
                완료
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HanjaRecommendPage
