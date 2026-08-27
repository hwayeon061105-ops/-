import React, { useState } from 'react'
import { RotateCcw, Copy, Download, Sparkles, Check } from 'lucide-react'
import { Tone } from '@/types/advice'
import { TONES } from '@/components/form/ToneSelector'
import { copyAdviceToClipboard, downloadAdviceCardImage } from '@/lib/share'
import { Toast } from '@/components/ui/Toast'

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
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const selectedTone = TONES.find((item) => item.id === tone)
  const colorTheme = selectedTone?.color || 'coral'

  const handleCopy = async () => {
    const success = await copyAdviceToClipboard(adviceLines)
    if (success) {
      setIsCopied(true)
      setToastMessage('클립보드에 조언이 복사되었어요! 📋')
      setTimeout(() => setIsCopied(false), 2000)
    } else {
      setToastMessage('복사에 실패했어요. 다시 시도해 주세요.')
    }
  }

  const handleDownload = async () => {
    setIsExporting(true)
    setToastMessage('고화질 공유 카드를 생성 중이에요... 🎨')
    const success = await downloadAdviceCardImage(
      adviceLines,
      tone,
      `move-kind-${tone}-${Date.now()}.png`
    )
    setIsExporting(false)
    if (success) {
      setToastMessage('인스타그램/SNS 공유 카드가 저장되었어요! 📸')
    } else {
      setToastMessage('이미지 저장에 실패했어요.')
    }
  }

  return (
    <>
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
            “
          </span>
          {adviceLines.map((line, index) => (
            <p key={`line-${index}`} className="advice-line">
              {line}
            </p>
          ))}
        </div>

        {/* 바이럴 공유 툴바 (복사 & 이미지 다운로드) */}
        <div className="share-toolbar">
          <button
            type="button"
            onClick={handleCopy}
            disabled={isSubmitting}
            className="share-button"
            title="텍스트 클립보드 복사"
          >
            {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            <span>{isCopied ? '복사됨' : '조언 복사'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={isSubmitting || isExporting}
            className="share-button share-button-highlight"
            title="인스타그램/SNS 공유 카드 다운로드"
          >
            <Download size={16} />
            <span>{isExporting ? '생성 중...' : '카드 이미지 저장'}</span>
          </button>
        </div>

        {/* 주요 액션 버튼 그룹 */}
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

      {/* 토스트 피드백 */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </>
  )
}
