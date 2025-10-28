// 한자 획수를 가져오는 유틸리티 함수
// hanzi-writer-data 라이브러리 사용

export async function getStrokeCount(hanja) {
  try {
    // 동적 import로 해당 한자의 데이터 가져오기
    const data = await import(`hanzi-writer-data/${hanja}.json`)
    return data.strokes ? data.strokes.length : 10
  } catch (error) {
    // 데이터가 없는 한자는 기본값 10 반환
    console.warn(`No stroke data for ${hanja}`)
    return 10
  }
}

// 여러 한자의 획수를 한번에 가져오기
export async function getMultipleStrokeCounts(hanjaArray) {
  const results = await Promise.all(
    hanjaArray.map(async (hanja) => {
      const strokes = await getStrokeCount(hanja)
      return { hanja, strokes }
    })
  )
  return results
}
