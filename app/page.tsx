'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, RotateCcw, Sparkles, TriangleAlert } from 'lucide-react'
import { AdviceFormData, FormErrors, Tone, ViewState } from '@/types/advice'
import { AdviceForm } from '@/components/form/AdviceForm'
import { TONES } from '@/components/form/ToneSelector'

const advice: Record<Tone, string[][]> = {
  spicy: [
    ['오늘의 피곤함은 내일의 변명이 될 뿐이에요.', '딱 10분만 시작하면, 몸은 알아서 따라옵니다.', '자, 일어나요. 🔥 ( ͡° ͜ʖ ͡°)'],
  ],
  realistic: [
    ['완벽한 운동보다 오늘의 20분이 훨씬 중요해요.', '지금 몸 상태에 맞춰 가볍게 땀만 내도 충분합니다.', '꾸준함은 기분이 아니라 습관에서 시작돼요. 🏋️‍♂️'],
  ],
  warm: [
    ['오늘도 여기까지 온 것만으로 정말 잘하고 있어요.', '무리하지 말고, 가볍게 몸을 깨우는 것부터 시작해요.', '당신의 속도대로 충분히 빛나고 있어요. 🫂'],
  ],
}

const loadingCopy = [
  '마음의 준비운동을 하는 중...',
  '당신에게 딱 맞는 말을 고르는 중...',
  'AI가 응원을 꽉 채우는 중...',
]

const initialFormData: AdviceFormData = {
  height: '',
  weight: '',
  mind: '',
  tone: 'warm',
}

export default function Home() {
  const [formData, setFormData] = useState<AdviceFormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [view, setView] = useState<ViewState>('form')
  const [loadingIndex, setLoadingIndex] = useState(0)
  const [adviceIndex, setAdviceIndex] = useState(0)
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (view !== 'loading') return
    const interval = window.setInterval(() => {
      setLoadingIndex((i) => (i + 1) % loadingCopy.length)
    }, 900)
    const timeout = window.setTimeout(() => {
      setView('result')
    }, 3000)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(timeout)
    }
  }, [view])

  const handleFormSubmit = (sanitizedData: AdviceFormData) => {
    setLoadingIndex(0)
    setView('loading')
  }

  const handleReset = () => {
    setFormData(initialFormData)
    setErrors({})
    setView('form')
    window.setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const selectedColor = TONES.find((item) => item.id === formData.tone)?.color

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="hero-shell" ref={topRef}>
        <div className="hero-inner">
          <div className="brand-mark">
            <Sparkles size={16} strokeWidth={2.5} />
            <span>MOVE / KIND</span>
          </div>
          <div className="hero-copy">
            <p className="eyebrow">YOUR DAILY RESET</p>
            <h1>
              오늘의 나를,
              <br />
              <span>움직이게 하는 말.</span>
            </h1>
            <p className="hero-description">
              지금의 컨디션을 알려주면
              <br />
              당신만을 위한 운동 조언을 건네요.
            </p>
          </div>
          <div className="hero-orbit" aria-hidden="true">
            <div className="orbit-ring" />
            <div className="hero-sticker">
              LET&apos;S
              <br />
              MOVE
            </div>
            <span className="orbit-dot" />
          </div>
        </div>
      </header>

      <div className="app-container">
        {view === 'form' && (
          <AdviceForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            onSubmit={handleFormSubmit}
            isSubmitting={false}
          />
        )}

        {view === 'loading' && (
          <section className="state-card loading-card section-in" aria-live="polite">
            <button className="back-button" onClick={() => setView('form')}>
              <ChevronLeft size={17} /> 돌아가기
            </button>
            <WorkoutFigure />
            <p className="section-kicker">YOUR MOTIVATION IS LOADING</p>
            <h2>{loadingCopy[loadingIndex]}</h2>
            <div className="loading-line">
              <span />
            </div>
            <p className="loading-caption">잠깐만요, 좋은 말은 고르는 데 시간이 조금 걸려요.</p>
          </section>
        )}

        {view === 'result' && (
          <section className="state-card result-card section-in">
            <div className="result-top">
              <div>
                <p className="section-kicker">03 / YOUR DAILY PUSH</p>
                <h2>오늘의 조언이 도착했어요</h2>
              </div>
              <span className={`result-dot tone-${selectedColor}`} />
            </div>

            <div className={`advice-card advice-${selectedColor}`}>
              <span className="quote-mark">“</span>
              {advice[formData.tone][adviceIndex % advice[formData.tone].length].map((line, i) => (
                <p key={`${line}-${i}`}>{line}</p>
              ))}
            </div>

            <div className="result-actions">
              <button
                type="button"
                onClick={() => {
                  setAdviceIndex((i) => i + 1)
                  setView('loading')
                }}
                className="secondary-button"
              >
                <RotateCcw size={16} /> 원하는 느낌 나올 때까지 다시 생성
              </button>
              <button type="button" onClick={handleReset} className="text-button">
                다시 하기
              </button>
            </div>
          </section>
        )}

        {view === 'error' && (
          <section className="state-card error-card section-in">
            <span className="error-icon">
              <TriangleAlert size={23} />
            </span>
            <p className="section-kicker">SOMETHING WENT WRONG</p>
            <h2>조언을 불러오지 못했어요</h2>
            <p>잠시 숨을 고르고 다시 시도해 주세요.</p>
            <button
              type="button"
              onClick={() => setView('loading')}
              className="primary-button"
            >
              다시 시도하기 <RotateCcw size={17} />
            </button>
          </section>
        )}

        <button
          type="button"
          className="simulate-link"
          onClick={() => setView(view === 'error' ? 'form' : 'error')}
        >
          개발용: {view === 'error' ? '폼으로 돌아가기' : '오류 상태 보기'}
        </button>
      </div>

      <footer>
        MOVE / KIND <span>—</span> 작은 움직임, 큰 마음
      </footer>
    </main>
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
