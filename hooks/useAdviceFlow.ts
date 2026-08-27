import { useState, useRef, useEffect, useCallback } from 'react'
import { AdviceFormData, FormErrors, ViewState, AdviceResponse } from '@/types/advice'
import { validateAdviceForm, hasErrors } from '@/lib/validation'
import { sanitizeInput } from '@/lib/sanitize'

const INITIAL_FORM_DATA: AdviceFormData = {
  height: '',
  weight: '',
  mind: '',
  tone: 'warm',
}

const LOADING_MESSAGES = [
  '마음의 준비운동을 하는 중...',
  '당신에게 딱 맞는 말을 고르는 중...',
  'AI가 응원을 꽉 채우는 중...',
  '움직일 에너지를 끌어모으는 중...',
]

// PRD 1.2 및 4.2: 최초 생성 5초, 다시 생성 2초 UX 로딩 시간 유지
const MIN_INITIAL_LOADING_TIME_MS = 5000
const MIN_REGEN_LOADING_TIME_MS = 2000

export function useAdviceFlow() {
  const [formData, setFormData] = useState<AdviceFormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<FormErrors>({})
  const [view, setView] = useState<ViewState>('form')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [adviceLines, setAdviceLines] = useState<string[]>([])
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const topRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // 로딩 텍스트 인터벌 롤링
  useEffect(() => {
    if (view !== 'loading') return

    const interval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [view])

  /**
   * AI 조언 API 요청 실행
   */
  const executeAdviceFetch = useCallback(async (data: AdviceFormData, isRegenerate = false) => {
    // 이전 요청 취소
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    setIsSubmitting(true)
    setView('loading')
    setLoadingMessageIndex(0)
    setErrorMessage('')

    const startTime = Date.now()
    const targetLoadingTime = isRegenerate ? MIN_REGEN_LOADING_TIME_MS : MIN_INITIAL_LOADING_TIME_MS

    try {
      const response = await fetch('/api/advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          height: data.height,
          weight: data.weight,
          mind: sanitizeInput(data.mind),
          tone: data.tone,
          previousAdvice: isRegenerate ? adviceLines : undefined,
        }),
        signal: abortController.signal,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || '조언을 불러오지 못했어요 😢')
      }

      const result: AdviceResponse = await response.json()

      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, targetLoadingTime - elapsedTime)

      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime))
      }

      if (!abortController.signal.aborted) {
        setAdviceLines(result.advice)
        setView('result')
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        return // 사용자가 직접 취소한 경우
      }
      console.error('[useAdviceFlow] Fetch error:', error)
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, 2000 - elapsedTime)
      await new Promise((resolve) => setTimeout(resolve, remainingTime))

      if (!abortController.signal.aborted) {
        setErrorMessage(error instanceof Error ? error.message : '조언을 불러오지 못했어요 😢')
        setView('error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }, [adviceLines])

  /**
   * 폼 제출 핸들러 (유효성 검사 및 디바운싱)
   */
  const handleSubmit = useCallback(
    (dataToSubmit: AdviceFormData) => {
      if (isSubmitting) return // 연속 클릭 방지 (PRD 5.5)

      const validationErrors = validateAdviceForm(dataToSubmit)
      setErrors(validationErrors)

      if (hasErrors(validationErrors)) {
        return
      }

      executeAdviceFetch(dataToSubmit, false)
    },
    [isSubmitting, executeAdviceFetch]
  )

  /**
   * '원하는 느낌 나올 때까지 다시 생성' 핸들러 (이전 조언과 100% 다른 새 조언 요청)
   */
  const handleRegenerate = useCallback(() => {
    if (isSubmitting) return
    executeAdviceFetch(formData, true)
  }, [isSubmitting, formData, executeAdviceFetch])

  /**
   * 에러 화면에서 '다시 시도하기' 핸들러
   */
  const handleRetry = useCallback(() => {
    if (isSubmitting) return
    executeAdviceFetch(formData)
  }, [isSubmitting, formData, executeAdviceFetch])

  /**
   * '다시 하기' 핸들러 (폼 초기화 및 상단 복귀)
   */
  const handleReset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setFormData(INITIAL_FORM_DATA)
    setErrors({})
    setAdviceLines([])
    setErrorMessage('')
    setView('form')
    setIsSubmitting(false)

    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }, [])

  /**
   * 로딩 중 '돌아가기' 핸들러
   */
  const handleCancelLoading = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setIsSubmitting(false)
    setView('form')
  }, [])

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    view,
    setView,
    isSubmitting,
    adviceLines,
    loadingMessage: LOADING_MESSAGES[loadingMessageIndex],
    errorMessage,
    topRef,
    handleSubmit,
    handleRegenerate,
    handleRetry,
    handleReset,
    handleCancelLoading,
  }
}
