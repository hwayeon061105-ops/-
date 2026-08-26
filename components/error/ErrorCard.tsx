import React from 'react'
import { TriangleAlert, RotateCcw } from 'lucide-react'

interface ErrorCardProps {
  errorMessage?: string
  onRetry: () => void
  onReset: () => void
  isSubmitting?: boolean
}

export function ErrorCard({
  errorMessage,
  onRetry,
  onReset,
  isSubmitting = false,
}: ErrorCardProps) {
  return (
    <section className="state-card error-card section-in" role="alert">
      <span className="error-icon" aria-hidden="true">
        <TriangleAlert size={23} />
      </span>
      <p className="section-kicker">SOMETHING WENT WRONG</p>
      <h2>조언을 불러오지 못했어요 😢</h2>
      <p>{errorMessage || '네트워크 상태를 확인하고 잠시 숨을 고른 뒤 다시 시도해 주세요.'}</p>

      <div className="result-actions" style={{ marginTop: '1.25rem' }}>
        <button
          type="button"
          onClick={onRetry}
          disabled={isSubmitting}
          className="primary-button"
        >
          다시 시도하기 <RotateCcw size={17} />
        </button>

        <button
          type="button"
          onClick={onReset}
          disabled={isSubmitting}
          className="text-button"
        >
          처음부터 다시 하기
        </button>
      </div>
    </section>
  )
}
