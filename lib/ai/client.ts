import { AdviceRequest } from '@/types/advice'
import { buildAdvicePrompt } from './prompts'
import { formatToThreeLines, getRandomFallback } from './formatter'

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models'
const CANDIDATE_MODELS = ['gemini-3.7-flash', 'gemini-3.6-flash']

/**
 * Gemini API를 호출하여 운동 조언을 생성합니다. (다중 모델 장애 복구 지원)
 */
export async function generateWorkoutAdvice(request: AdviceRequest): Promise<string[]> {
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY

  // API 키가 없거나 개발용 모의 환경인 경우 스마트 생성 Fallback 제공
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gemini_api_key_here') {
    return generateSmartMockAdvice(request)
  }

  const prompt = buildAdvicePrompt(request)

  // 다중 모델 순차 호출 (Failover Resilience - 각 3.5초 타임아웃)
  for (const model of CANDIDATE_MODELS) {
    const endpoint = `${GEMINI_API_BASE}/${model}:generateContent?key=${apiKey}`
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3500) // 3.5초 타임아웃

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
        if (rawText.trim()) {
          return formatToThreeLines(rawText, request.tone)
        }
      } else {
        console.warn(`[AI Client] Model ${model} returned status ${response.status}. Trying next model...`)
      }
    } catch (error) {
      clearTimeout(timeoutId)
      console.warn(`[AI Client] Model ${model} failed:`, error)
    }
  }

  // 모든 Gemini 모델 호출 실패 시 스마트 내장 조언 생성기로 복구
  console.warn('[AI Client] All Gemini models failed, falling back to smart engine.')
  return generateSmartMockAdvice(request)
}

/**
 * API 키가 없을 때도 사용자 입력을 반영하여 자연스러운 3줄 조언을 생성하는 스마트 생성기
 */
function generateSmartMockAdvice(request: AdviceRequest): string[] {
  const { height, weight, mind, tone } = request

  if (tone === 'spicy') {
    return [
      `"${mind}"라고 주저할 시간에 ${height}cm, ${weight}kg 몸을 먼저 움직이세요!`,
      `누워서 고민만 한다고 달라지는 건 아무것도 없어요.`,
      `딱 10분만 땀 흘리고 다시 이야기해요, 지금 당장 일어나요! 🔥`,
    ]
  } else if (tone === 'realistic') {
    return [
      `키 ${height}cm, 체중 ${weight}kg에 맞춘 가벼운 스트레칭 15분부터 시작하세요.`,
      `"${mind}"라는 생각은 움직이기 시작하면 자연스럽게 해소됩니다.`,
      `완벽한 운동보다 오늘의 작은 실천 하나가 훨씬 가치 있어요. 🏋️‍♂️`,
    ]
  } else {
    return [
      `"${mind}"라는 마음이 드는 날도 당연히 있는 법이에요.`,
      `무리하지 말고 오늘 하루 열심히 살아낸 내 몸을 위해 가볍게 기지개부터 켜봐요.`,
      `당신만의 호흡과 속도대로 움직여도 충분히 잘하고 있어요. 🫂`,
    ]
  }
}
