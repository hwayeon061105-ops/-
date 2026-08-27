'use client'

import React from 'react'
import { Sparkles } from 'lucide-react'

interface LoadingCardProps {
  loadingMessage: string
  onCancel: () => void
}

export function LoadingCard({ loadingMessage, onCancel }: LoadingCardProps) {
  return (
    <section
      className="loading-fullscreen section-in"
      aria-live="polite"
    >
      {/* 상단 브랜드 */}
      <div className="lf-header">
        <Sparkles size={16} strokeWidth={2.5} style={{ color: '#ff6b4a' }} />
        <span className="lf-brand">MOVE / KIND</span>
        <button
          type="button"
          className="lf-cancel"
          onClick={onCancel}
          aria-label="취소"
        >
          ✕
        </button>
      </div>

      {/* 중앙 캐릭터 영역 */}
      <div className="lf-center">
        <SquatCharacter />
        <p className="lf-kicker">YOUR MOTIVATION IS LOADING</p>
        <h2 className="lf-title">{loadingMessage}</h2>
        <div className="lf-bar" role="progressbar" aria-label="조언 생성 중">
          <span />
        </div>
        <p className="lf-caption">당신을 위한 최적의 동기부여를 다듬고 있어요.</p>
      </div>
    </section>
  )
}

function SquatCharacter() {
  return (
    <div className="squat-stage" aria-label="스쿼트 하는 캐릭터 애니메이션">
      {/* 원형 글로우 배경 */}
      <div className="squat-circle">
        <div className="squat-circle-glow" />
      </div>

      {/* 스쿼트 스틱맨 SVG */}
      <svg
        className="squat-svg"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* 머리 */}
        <circle className="squat-body" cx="60" cy="20" r="10" fill="#FF6B4A" />

        {/* 목 + 몸통 */}
        <line className="squat-body" x1="60" y1="30" x2="60" y2="55" stroke="#FF6B4A" strokeWidth="5" strokeLinecap="round" />

        {/* 바벨 봉 */}
        <line className="squat-barbell" x1="22" y1="47" x2="98" y2="47" stroke="#FF6B4A" strokeWidth="4" strokeLinecap="round" />
        {/* 왼쪽 원판 */}
        <circle className="squat-barbell" cx="18" cy="47" r="7" fill="#FF6B4A" />
        {/* 오른쪽 원판 */}
        <circle className="squat-barbell" cx="102" cy="47" r="7" fill="#FF6B4A" />

        {/* 왼팔 */}
        <line className="squat-body" x1="60" y1="40" x2="30" y2="50" stroke="#FF6B4A" strokeWidth="4.5" strokeLinecap="round" />
        {/* 오른팔 */}
        <line className="squat-body" x1="60" y1="40" x2="90" y2="50" stroke="#FF6B4A" strokeWidth="4.5" strokeLinecap="round" />

        {/* 왼쪽 다리 (허벅지) */}
        <line className="squat-leg-l" x1="57" y1="55" x2="40" y2="78" stroke="#FF6B4A" strokeWidth="5" strokeLinecap="round" />
        {/* 왼쪽 다리 (종아리) */}
        <line className="squat-calf-l" x1="40" y1="78" x2="35" y2="100" stroke="#FF6B4A" strokeWidth="4.5" strokeLinecap="round" />

        {/* 오른쪽 다리 (허벅지) */}
        <line className="squat-leg-r" x1="63" y1="55" x2="80" y2="78" stroke="#FF6B4A" strokeWidth="5" strokeLinecap="round" />
        {/* 오른쪽 다리 (종아리) */}
        <line className="squat-calf-r" x1="80" y1="78" x2="85" y2="100" stroke="#FF6B4A" strokeWidth="4.5" strokeLinecap="round" />

        {/* 발 */}
        <line x1="28" y1="100" x2="42" y2="100" stroke="#FF6B4A" strokeWidth="4" strokeLinecap="round" />
        <line x1="78" y1="100" x2="92" y2="100" stroke="#FF6B4A" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  )
}


