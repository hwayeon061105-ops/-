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

      <GymGoerCharacter />

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

function GymGoerCharacter() {
  return (
    <div className="gym-goer-stage" aria-label="헬스장으로 걸어가는 캐릭터 애니메이션">
      {/* 배경 – 바닥선 + 헬스장 아이콘 */}
      <svg
        className="gym-scene"
        viewBox="0 0 220 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* 바닥 */}
        <line x1="10" y1="148" x2="210" y2="148" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />

        {/* 목적지 – 헬스장 건물 실루엣 */}
        <rect x="162" y="100" width="44" height="48" rx="3" fill="var(--color-surface-2)" stroke="var(--color-border)" strokeWidth="1.5" />
        <rect x="172" y="112" width="10" height="12" rx="1" fill="var(--color-border)" /> {/* 창문 */}
        <rect x="188" y="112" width="10" height="12" rx="1" fill="var(--color-border)" />
        <rect x="177" y="128" width="12" height="20" rx="1" fill="var(--color-accent)" opacity="0.6" /> {/* 문 */}
        {/* 헬스장 간판 텍스트 */}
        <text x="184" y="109" textAnchor="middle" fontSize="6" fontWeight="700" fill="var(--color-accent)" fontFamily="sans-serif">GYM</text>

        {/* 아령 아이콘 위 건물 */}
        <rect x="170" y="92" width="28" height="7" rx="3.5" fill="var(--color-accent)" opacity="0.8" />
        <circle cx="170" cy="95.5" r="4.5" fill="var(--color-accent)" opacity="0.9" />
        <circle cx="198" cy="95.5" r="4.5" fill="var(--color-accent)" opacity="0.9" />

        {/* 걷는 사람 – CSS 애니메이션으로 이동 */}
        <g className="walking-person">
          {/* 그림자 */}
          <ellipse cx="0" cy="148" rx="14" ry="3.5" fill="rgba(0,0,0,0.12)" />

          {/* 몸통 */}
          <rect x="-10" y="96" width="20" height="28" rx="6" fill="var(--color-accent)" />

          {/* 머리 */}
          <circle cx="0" cy="86" r="12" fill="#FBBF7C" />
          {/* 눈 */}
          <circle cx="-4" cy="84" r="1.8" fill="#4A3728" />
          <circle cx="4" cy="84" r="1.8" fill="#4A3728" />
          {/* 입 – 결의에 찬 표정 */}
          <path d="M -4 89 Q 0 91 4 89" stroke="#4A3728" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* 머리카락 */}
          <path d="M -12 83 Q -8 72 0 74 Q 8 72 12 83" fill="#3D2B1F" />

          {/* 배낭 */}
          <rect x="7" y="97" width="14" height="20" rx="4" fill="var(--color-accent-dark, #c0392b)" opacity="0.85" />
          <rect x="9" y="101" width="4" height="8" rx="2" fill="rgba(255,255,255,0.3)" />

          {/* 왼팔 */}
          <g className="arm-left">
            <rect x="-18" y="98" width="9" height="22" rx="4.5" fill="#FBBF7C" />
          </g>
          {/* 오른팔 */}
          <g className="arm-right">
            <rect x="9" y="98" width="9" height="22" rx="4.5" fill="#FBBF7C" />
          </g>

          {/* 왼다리 */}
          <g className="leg-left">
            <rect x="-10" y="121" width="9" height="26" rx="4.5" fill="#374151" />
            {/* 왼발 */}
            <ellipse cx="-5.5" cy="148" rx="8" ry="4" fill="#1F2937" />
          </g>
          {/* 오른다리 */}
          <g className="leg-right">
            <rect x="1" y="121" width="9" height="26" rx="4.5" fill="#374151" />
            {/* 오른발 */}
            <ellipse cx="5.5" cy="148" rx="8" ry="4" fill="#1F2937" />
          </g>
        </g>

        {/* 발걸음 효과 점들 */}
        <circle className="step-dot step-dot-1" cx="60" cy="148" r="2.5" fill="var(--color-accent)" opacity="0.5" />
        <circle className="step-dot step-dot-2" cx="80" cy="148" r="2" fill="var(--color-accent)" opacity="0.4" />
        <circle className="step-dot step-dot-3" cx="100" cy="148" r="1.5" fill="var(--color-accent)" opacity="0.3" />
      </svg>
    </div>
  )
}

