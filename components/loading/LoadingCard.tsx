import React from 'react'
import { ChevronLeft } from 'lucide-react'

interface LoadingCardProps {
  loadingMessage: string
  onCancel: () => void
}

export function LoadingCard({ loadingMessage, onCancel }: LoadingCardProps) {
  return (
    <section className="state-card loading-card section-in" aria-live="polite">
      <button
        type="button"
        className="back-button"
        onClick={onCancel}
        aria-label="입력 폼으로 돌아가기"
      >
        <ChevronLeft size={17} /> 돌아가기
      </button>

      <WorkoutFigure />

      <p className="section-kicker">YOUR MOTIVATION IS LOADING</p>
      <h2>{loadingMessage}</h2>

      <div className="loading-line" role="progressbar" aria-label="조언 생성 중">
        <span />
      </div>

      <p className="loading-caption">
        잠깐만요, 5~10초 동안 당신을 위한 최적의 동기부여를 다듬고 있어요.
      </p>
    </section>
  )
}

function WorkoutFigure() {
  return (
    <div className="workout-stage" aria-label="운동 중인 캐릭터 애니메이션">
      <div className="motion-line motion-one" />
      <div className="motion-line motion-two" />
      <div className="figure">
        <div className="figure-head" />
        <div className="figure-body" />
        <div className="figure-arm arm-one" />
        <div className="figure-arm arm-two" />
        <div className="figure-leg leg-one" />
        <div className="figure-leg leg-two" />
      </div>
      <div className="figure-shadow" />
    </div>
  )
}
