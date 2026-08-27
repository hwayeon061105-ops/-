import React from 'react'
import { RotateCcw } from 'lucide-react'
import { Tone } from '@/types/advice'
import { TONES } from '@/components/form/ToneSelector'

interface ResultCardProps {
  adviceLines: string[]
  tone: Tone
  onRegenerate: () => void
  onReset: () => void
  isSubmitting?: boolean
}

export function ResultCard({
  adviceLines,
  tone,
  onRegenerate,
  onReset,
  isSubmitting = false,
}: ResultCardProps) {
  const selectedTone = TONES.find((item) => item.id === tone)
  const colorTheme = selectedTone?.color || 'coral'

  return (
    <section className="state-card result-card section-in" aria-live="polite">
      <div className="result-top">
        <div>
          <p className="section-kicker">03 / YOUR DAILY PUSH</p>
          <h2>오늘의 조언이 도착했어요</h2>
        </div>
        <span className={`result-dot tone-${colorTheme}`} />
      </div>

      {/* 3줄 조언 카드 */}
      <div className={`advice-card advice-${colorTheme}`} aria-label="AI 운동 조언 3줄">
        <span className="quote-mark" aria-hidden="true">
          "
        </span>
        {adviceLines.map((line, index) => (
          <p key={`line-${index}`} className="advice-line">
            {line}
          </p>
        ))}
      </div>

      {/* 액션 버튼 */}
      <div className="result-actions">
        <button
          type="button"
          onClick={onRegenerate}
          disabled={isSubmitting}
          className="secondary-button"
        >
          <RotateCcw size={16} /> 원하는 느낌 나올 때까지 다시 생성
        </button>

        <button
          type="button"
          onClick={onReset}
          disabled={isSubmitting}
          className="text-button"
        >
          다시 하기
        </button>
      </div>
    </section>
  )
}
