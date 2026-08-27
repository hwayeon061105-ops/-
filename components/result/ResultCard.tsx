import React from 'react'
import { RotateCcw, Share2, Home, Sparkles, X } from 'lucide-react'
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
  const ToneIcon = selectedTone?.icon

  const toneColorMap: Record<string, string> = {
    coral: '#FF6B4A',
    blue: '#5b82e7',
    mint: '#52bfa6',
  }
  const colorTheme = selectedTone?.color || 'coral'
  const toneColor = toneColorMap[colorTheme] ?? '#FF6B4A'

  const handleShare = async () => {
    const text = `MOVE / KIND 오늘의 운동 조언\n\n${adviceLines.join('\n')}`
    if (navigator.share) {
      await navigator.share({ text })
    } else {
      await navigator.clipboard.writeText(text)
    }
  }

  return (
    <section className="result-fullscreen section-in" aria-live="polite">
      {/* 헤더 */}
      <div className="rf-header">
        <div className="rf-brand">
          <Sparkles size={16} strokeWidth={2.5} style={{ color: '#ff6b4a' }} />
          <span>MOVE / KIND</span>
        </div>
        <button
          type="button"
          className="rf-close"
          onClick={onReset}
          aria-label="처음으로"
        >
          <X size={18} />
        </button>
      </div>

      {/* Hero 카피 */}
      <div className="rf-hero">
        <p className="rf-kicker">YOUR DAILY RESET</p>
        <h1 className="rf-headline">
          오늘의 나를,<br />
          <span>움직이게 하는 말.</span>
        </h1>
      </div>

      {/* 조언 카드 */}
      <div className="rf-card" aria-label="AI 운동 조언 3줄">
        {/* 카드 상단 – 톤 배지 & 공유 */}
        <div className="rf-card-top">
          <span className="rf-tone-badge" style={{ borderColor: toneColor, color: toneColor }}>
            {ToneIcon && <ToneIcon size={13} />}
            {selectedTone?.label}
          </span>
          <button
            type="button"
            className="rf-share"
            onClick={handleShare}
            aria-label="조언 공유"
          >
            <Share2 size={17} />
          </button>
        </div>

        {/* 조언 본문 */}
        <div className="rf-advice-body">
          {adviceLines.map((line, index) => (
            <p key={`line-${index}`} className="rf-advice-line">
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="rf-actions">
        <button
          type="button"
          onClick={onRegenerate}
          disabled={isSubmitting}
          className="rf-btn-primary"
        >
          <RotateCcw size={18} />
          다른 조언 받기
        </button>

        <button
          type="button"
          onClick={onReset}
          disabled={isSubmitting}
          className="rf-btn-secondary"
        >
          <Home size={18} />
          처음으로 돌아가기
        </button>
      </div>
    </section>
  )
}

