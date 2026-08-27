import { NextRequest, NextResponse } from 'next/server'
import { AdviceRequest, AdviceResponse } from '@/types/advice'
import { generateWorkoutAdvice } from '@/lib/ai/client'
import { validateAdviceForm, hasErrors } from '@/lib/validation'
import { sanitizeInput } from '@/lib/sanitize'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 1. 유효성 검증
    const formErrors = validateAdviceForm({
      height: String(body.height ?? ''),
      weight: String(body.weight ?? ''),
      mind: String(body.mind ?? ''),
      tone: body.tone ?? 'warm',
    })

    if (hasErrors(formErrors)) {
      return NextResponse.json(
        { error: '입력값이 올바르지 않습니다.', details: formErrors },
        { status: 400 }
      )
    }

    // 2. Sanitization 및 데이터 정제
    const adviceRequest: AdviceRequest = {
      height: Number(body.height),
      weight: Number(body.weight),
      mind: sanitizeInput(String(body.mind)),
      tone: ['spicy', 'realistic', 'warm'].includes(body.tone) ? body.tone : 'warm',
      previousAdvice: Array.isArray(body.previousAdvice) ? body.previousAdvice : undefined,
    }

    // 3. AI 조언 생성
    const adviceLines = await generateWorkoutAdvice(adviceRequest)

    const responsePayload: AdviceResponse = {
      advice: adviceLines,
      tone: adviceRequest.tone,
      timestamp: Date.now(),
    }

    return NextResponse.json(responsePayload, { status: 200 })
  } catch (error) {
    console.error('[API /api/advice] Error processing request:', error)
    return NextResponse.json(
      { error: '조언을 불러오는 중 오류가 발생했습니다 😢' },
      { status: 500 }
    )
  }
}
