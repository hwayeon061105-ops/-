import { Tone } from '@/types/advice'

const DEFAULT_EMOJIS: Record<Tone, string> = {
  spicy: '🔥',
  realistic: '🏋️‍♂️',
  warm: '✨',
}

const FALLBACK_ADVICE: Record<Tone, string[][]> = {
  spicy: [
    [
      '오늘의 피곤함은 내일의 변명이 될 뿐이에요.',
      '딱 10분만 시작하면, 몸은 알아서 따라옵니다.',
      '자, 변명은 접어두고 지금 당장 일어나요! 🔥',
    ],
    [
      '누워있는 1분이 당신의 목표를 더 멀어지게 해요.',
      '지금 귀찮음을 이겨내는 사람만이 결과를 만듭니다.',
      '신발 끈 묶고 바로 출발해봐요! ⚡',
    ],
  ],
  realistic: [
    [
      '완벽한 1시간보다 오늘의 20분이 훨씬 중요해요.',
      '현재 컨디션에 맞춰 가볍게 스트레칭과 유산소부터 시작하세요.',
      '꾸준함은 기분이 아니라 작은 루틴에서 시작됩니다. 🏋️‍♂️',
    ],
    [
      '지금 몸 상태에 맞는 적정 강도로 움직이면 충분해요.',
      '시작 전 5분 워밍업만으로도 몸의 활력이 돌아옵니다.',
      '오늘 할 수 있는 만큼만 깔끔하게 채워보세요. ⏱️',
    ],
  ],
  warm: [
    [
      '오늘 하루를 버텨낸 것만으로도 정말 고생 많았어요.',
      '무리하지 말고, 몸을 가볍게 깨우는 스트레칭부터 편하게 시작해요.',
      '당신의 속도대로 한 걸음씩 나아가면 충분히 빛나요. 🫂',
    ],
    [
      '마음이 무거울 땐 가벼운 산책이나 호흡만으로도 좋아요.',
      '스스로를 아끼는 마음으로 몸을 부드럽게 움직여봐요.',
      '언제나 당신의 건강한 하루를 진심으로 응원해요. 🌿',
    ],
  ],
}

/**
 * 이모티콘이나 표정 문자가 포함되어 있는지 검사하는 정규식
 */
const EMOJI_REGEX = /[\p{Extended_Pictographic}\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]|\( ͡° ͜ʖ ͡°\)|\(•̀ᴗ•́\)|\(ง •̀_•́\)ง|\( ˘ ³˘\)/u

/**
 * AI 응답 텍스트를 파싱하여 정확히 3줄의 string 배열로 정규화합니다.
 * PRD 5.3 (Formatting Mismatch Exception) 규격을 준수합니다.
 */
export function formatToThreeLines(rawText: string, tone: Tone): string[] {
  if (!rawText || rawText.trim() === '') {
    return getRandomFallback(tone)
  }

  // 1. 번호 매기기(1., 2., - 등), 따옴표, 불필요한 마크다운 기호 제거
  const cleanedText = rawText
    .replace(/^```[a-z]*\n?/im, '')
    .replace(/\n?```$/im, '')
    .trim()

  // 2. 줄바꿈 단위로 분할 및 빈 줄 제거
  const rawLines = cleanedText
    .split('\n')
    .map((line) => line.replace(/^[\d+.)\-*•\s]+/, '').trim())
    .filter((line) => line.length > 0)

  let finalLines: string[] = []

  if (rawLines.length === 3) {
    finalLines = rawLines
  } else if (rawLines.length > 3) {
    // 3줄 초과 시: 앞 2줄 + 나머지 줄 합침 또는 처음 3개 선택
    finalLines = [rawLines[0], rawLines[1], rawLines.slice(2).join(' ')]
  } else if (rawLines.length === 2) {
    // 2줄인 경우: 더 긴 문장을 마침표 기준으로 분할하거나 3번째 문장 보강
    const longIndex = rawLines[0].length >= rawLines[1].length ? 0 : 1
    const parts = rawLines[longIndex].split(/(?<=[.!?])\s+/).filter(Boolean)
    if (parts.length >= 2) {
      if (longIndex === 0) {
        finalLines = [parts[0], parts.slice(1).join(' '), rawLines[1]]
      } else {
        finalLines = [rawLines[0], parts[0], parts.slice(1).join(' ')]
      }
    } else {
      finalLines = [
        rawLines[0],
        rawLines[1],
        `지금 바로 작은 한 걸음을 시작해보세요! ${DEFAULT_EMOJIS[tone]}`,
      ]
    }
  } else if (rawLines.length === 1) {
    // 1줄로 길게 온 경우: 마침표/느낌표 기준으로 3분할
    const parts = rawLines[0].split(/(?<=[.!?])\s+/).filter(Boolean)
    if (parts.length >= 3) {
      finalLines = [parts[0], parts[1], parts.slice(2).join(' ')]
    } else if (parts.length === 2) {
      finalLines = [
        parts[0],
        parts[1],
        `몸과 마음이 원하는 활력을 채워보세요. ${DEFAULT_EMOJIS[tone]}`,
      ]
    } else {
      finalLines = [
        rawLines[0],
        '천천히 몸을 움직이며 리듬을 찾아보세요.',
        `오늘의 움직임이 내일의 에너지가 됩니다. ${DEFAULT_EMOJIS[tone]}`,
      ]
    }
  } else {
    return getRandomFallback(tone)
  }

  // 3. 이모티콘 유무 검사 및 미포함 시 3번째 줄에 톤별 이모티콘 자동 부착
  const hasEmoji = finalLines.some((line) => EMOJI_REGEX.test(line))
  if (!hasEmoji) {
    finalLines[2] = `${finalLines[2]} ${DEFAULT_EMOJIS[tone]}`
  }

  return finalLines
}

/**
 * 톤별 기본 Fallback 조언 문구를 임의 반환합니다.
 */
export function getRandomFallback(tone: Tone): string[] {
  const options = FALLBACK_ADVICE[tone]
  const index = Math.floor(Math.random() * options.length)
  return [...options[index]]
}
