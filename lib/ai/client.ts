import { AdviceRequest, Tone } from '@/types/advice'
import { buildAdvicePrompt } from './prompts'
import { formatToThreeLines, getRandomFallback } from './formatter'

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models'
const CANDIDATE_MODELS = ['gemini-3.6-flash', 'gemini-3.7-flash']

/**
 * Gemini API를 호출하여 운동 조언을 생성합니다. (타임아웃 1초 적용 및 다중 모델 장애 복구 지원)
 */
export async function generateWorkoutAdvice(request: AdviceRequest): Promise<string[]> {
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY

  // API 키가 없거나 개발용 모의 환경인 경우 스마트 동적 생성기 제공
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gemini_api_key_here') {
    return generateSmartMockAdvice(request)
  }

  const prompt = buildAdvicePrompt(request)

  // 다중 모델 순차 호출 (요청에 따라 1초 타임아웃 적용 - 지연 시 즉시 초고속 동적 엔진으로 전환)
  for (const model of CANDIDATE_MODELS) {
    const endpoint = `${GEMINI_API_BASE}/${model}:generateContent?key=${apiKey}`
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 1000) // 1초(1000ms) 타임아웃

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
            temperature: 1.0, // 최대 창의성 & 다양성
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 2048,
          },
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
        if (rawText.trim()) {
          const formatted = formatToThreeLines(rawText, request.tone)
          // 이전 조언과 동일한지 확인 후 다르면 반환
          if (!request.previousAdvice || JSON.stringify(formatted) !== JSON.stringify(request.previousAdvice)) {
            return formatted
          }
        }
      } else {
        console.warn(`[AI Client] Model ${model} status ${response.status}. Trying failover...`)
      }
    } catch (error) {
      clearTimeout(timeoutId)
      // 1초 타임아웃 초과 또는 네트워크 에러
    }
  }

  // 1초 타임아웃 또는 API 오류 시, 이전 조언과 100% 다른 새로운 동적 조언 즉시 생성
  return generateSmartMockAdvice(request)
}

/**
 * 무작위 요소와 사용자 신체/심정을 정밀하게 조합하여
 * API 실패나 1초 타임아웃 상황에서도 '다시 생성' 시 매번 100% 새로운 조언을 제공하는 동적 합성 엔진
 */
function generateSmartMockAdvice(request: AdviceRequest): string[] {
  const { height, weight, mind, tone, previousAdvice = [] } = request
  const cleanMind = mind.trim() || '피곤하고 쉬고 싶음'

  // BMI 계산
  const hMeter = height / 100
  const bmi = (weight / (hMeter * hMeter)).toFixed(1)

  // 이전 조언에 포함된 모든 문장을 완전히 배제하고 새로운 문장만 무작위 추출
  const pickNewRandom = (pool: string[]): string => {
    const available = pool.filter((line) => !previousAdvice.includes(line))
    const targetPool = available.length > 0 ? available : pool
    return targetPool[Math.floor(Math.random() * targetPool.length)]
  }

  if (tone === 'spicy') {
    const lines1 = [
      `"${cleanMind}"라는 생각에 침대와 한 몸이 되기엔 ${height}cm, ${weight}kg의 잠재력이 너무 아깝습니다!`,
      `누워서 "${cleanMind}" 되뇌어봤자 ${height}cm 몸에 쌓이는 건 무기력함뿐이에요.`,
      `"${cleanMind}"라고요? 핑계 댈 시간에 운동화 끈부터 조여 매세요!`,
      `${height}cm, ${weight}kg의 멋진 몸을 만들 수 있는데 "${cleanMind}"라는 변명 뒤에 숨으실 건가요?`,
      `오늘 "${cleanMind}" 마음을 방치하면 내일의 후회는 두 배가 됩니다!`,
      `"${cleanMind}"라는 나태함에 질질 끌려다니면 당신의 몸은 절대 바뀌지 않습니다!`,
      `침대 속에서 "${cleanMind}" 불평할 때 다른 사람들은 이미 땀방울을 흘리고 있어요!`,
    ]
    const lines2 = [
      `딱 10분만 땀 흘려보면 고민했던 시간들이 부끄러워질 겁니다.`,
      `생각이 많을 땐 머리를 비우고 당장 몸부터 움직이는 게 유일한 정답이에요.`,
      `지금 귀찮음을 뚫고 일어나는 1%의 실행력이 당신의 내일을 바꿉니다.`,
      `운동은 기분 좋을 때 하는 게 아니라, 기분을 바꾸기 위해 하는 거예요.`,
      `몸은 거짓말하지 않으니 헛소리 말고 스쿼트 20개부터 바로 시작하세요.`,
      `피곤하다는 뇌의 속임수에 넘어가지 말고 심박수부터 올려보세요.`,
      `오늘 흘린 땀 한 방울이 내일 당신의 자존감을 만듭니다.`,
    ]
    const lines3 = [
      `변명은 여기까지, 지금 당장 매트 위로 올라가세요! 🔥`,
      `자리에서 벌떡 일어나서 딱 1세트만 돌파해봐요! ⚡`,
      `망설일 시간 1초도 없습니다, 즉시 스타트! 🥊`,
      `자, 핑계는 접어두고 오늘 분량 깔끔하게 해치웁시다! 💥`,
      `남들의 핑계와 타협하지 말고 지금 움직이세요! 😤`,
      `더 이상의 설명은 생략합니다, 지금 당장 GO! 🚀`,
      `당신의 한계를 깨부수는 건 오직 지금의 한 걸음입니다! 🏋️`,
    ]
    return [pickNewRandom(lines1), pickNewRandom(lines2), pickNewRandom(lines3)]
  }

  if (tone === 'realistic') {
    const lines1 = [
      `키 ${height}cm, 체중 ${weight}kg(BMI ${bmi}) 기준 오늘은 20분 맞춤 집중 루틴을 권장해요.`,
      `"${cleanMind}" 상태일 땐 고강도보다 가벼운 스트레칭과 유산소로 몸을 깨우는 게 효율적입니다.`,
      `${height}cm의 밸런스를 잡기 위해 오늘 무리하지 않는 15분 홈트부터 가볍게 시작해보세요.`,
      `"${cleanMind}" 상태에서도 실행 가능한 가장 가벼운 3가지 동작만 골라보세요.`,
      `현재 컨디션을 감안해 전신 순환을 돕는 가벼운 워밍업 10분으로 세팅해 드립니다.`,
      `체중 ${weight}kg 기준 관절 부담 없이 칼로리를 태우는 가벼운 속보 루틴이 제격입니다.`,
      `"${cleanMind}" 기분을 환기할 수 있는 15분 맨몸 순환 운동부터 권장합니다.`,
    ]
    const lines2 = [
      `시작 전 3분의 가벼운 관절 회전만으로도 부상 없이 활력을 찾을 수 있어요.`,
      `완벽한 1시간보다 오늘의 15분 작은 완수가 장기적인 습관을 만듭니다.`,
      `기분이 태도가 되지 않도록, 딱 정해진 스트레칭 루틴만 기계적으로 완료해보세요.`,
      `가장 작은 단위로 쪼개어 스쿼트 10개, 플랭크 30초만 먼저 실천하세요.`,
      `몸이 무거울수록 첫 5분만 움직여주면 엔도르핀이 분비되어 집중력이 올라갑니다.`,
      `무리한 목표 대신 오늘의 심박수를 120bpm까지 살짝 올리는 것에 집중하세요.`,
      `오늘 하루 목표치의 50%만 달성해도 하지 않은 것보다 100배 낫습니다.`,
    ]
    const lines3 = [
      `오늘 할 수 있는 만큼만 깔끔하게 채워보세요. ⏱️`,
      `무리 없는 속도로 오늘의 목표를 기록해봅시다. 📊`,
      `작은 실천이 쌓여 단단한 몸을 완성합니다. 🏋️‍♂️`,
      `가볍게 물 한 잔 마시고 바로 시작하세요! 👟`,
      `오늘의 20분이 내일의 가벼운 몸을 만듭니다. 🎯`,
      `지속 가능한 나만의 페이스를 유지해보세요. 📈`,
      `단 15분의 투자로 하루의 피로를 털어내세요. 💡`,
    ]
    return [pickNewRandom(lines1), pickNewRandom(lines2), pickNewRandom(lines3)]
  }

  // warm (따뜻한 멘토)
  const lines1 = [
    `"${cleanMind}"라는 마음이 드는 오늘, 얼마나 지치고 애쓰셨을지 마음이 쓰여요.`,
    `${height}cm, ${weight}kg의 소중한 내 몸을 위해 오늘 하루도 정말 수고 많으셨어요.`,
    `"${cleanMind}"라는 생각이 들 땐 억지로 애쓰지 않아도 괜찮아요.`,
    `지친 하루 끝에 운동을 떠올린 그 마음 하나만으로도 이미 너무 훌륭해요.`,
    `몸과 마음이 무거울 땐 나를 다독여주는 따뜻한 호흡부터 천천히 시작해봐요.`,
    `오늘의 피로 속에서도 나를 돌보려는 당신의 마음이 참 아름답습니다.`,
    `"${cleanMind}"라는 감정도 자연스러운 쉼의 신호일 수 있어요.`,
  ]
  const lines2 = [
    `편안한 옷으로 갈아입고 좋아하는 음악과 함께 기지개 한 번만 가볍게 켜볼까요?`,
    `거창한 운동 대신 바닥에 편히 누워 다리를 올리거나 부드럽게 몸을 풀어주세요.`,
    `누구와도 비교하지 말고 오직 당신만의 호흡과 속도로 기분 좋게 움직여요.`,
    `스스로를 아끼는 마음으로 어깨와 목의 긴장을 부드럽게 털어내 보세요.`,
    `오늘의 5분 산책이나 스트레칭은 내일을 살아갈 따뜻한 선물이 되어줄 거예요.`,
    `부담 갖지 말고 따뜻한 차 한 잔 마신 뒤 가볍게 제자리걸음부터 해봐요.`,
    `충분히 애쓴 나에게 몸을 깨우는 부드러운 스트레칭을 선물해주세요.`,
  ]
  const lines3 = [
    `언제나 당신의 건강하고 포근한 하루를 진심으로 응원해요. 🫂`,
    `당신은 지금 이 순간에도 충분히 잘하고 있어요. 🌿`,
    `몸과 마음에 부드러운 온기를 선물해주세요. ✨`,
    `천천히, 나만의 템포로 빛나는 오늘을 완성해요. 💛`,
    `편안한 마음으로 작은 움직임의 기쁨을 느껴보세요. 🌤️`,
    `당신의 모든 시작과 걸음을 온 마음으로 지지합니다. 🌸`,
    `오늘 밤도 편안하고 상쾌한 휴식이 함께하길 바라요. 🌱`,
  ]
  return [pickNewRandom(lines1), pickNewRandom(lines2), pickNewRandom(lines3)]
}


