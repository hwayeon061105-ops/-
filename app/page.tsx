'use client'

import { Sparkles } from 'lucide-react'
import { useAdviceFlow } from '@/hooks/useAdviceFlow'
import { AdviceForm } from '@/components/form/AdviceForm'
import { LoadingCard } from '@/components/loading/LoadingCard'
import { ResultCard } from '@/components/result/ResultCard'
import { ErrorCard } from '@/components/error/ErrorCard'

export default function Home() {
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    view,
    setView,
    isSubmitting,
    adviceLines,
    loadingMessage,
    errorMessage,
    topRef,
    handleSubmit,
    handleRegenerate,
    handleRetry,
    handleReset,
    handleCancelLoading,
  } = useAdviceFlow()

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* 상단 Hero 영역 */}
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

      {/* 메인 상태별 뷰 컨테이너 */}
      <div className="app-container">
        {view === 'form' && (
          <AdviceForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}

        {view === 'loading' && (
          <LoadingCard
            loadingMessage={loadingMessage}
            onCancel={handleCancelLoading}
          />
        )}

        {view === 'result' && (
          <ResultCard
            adviceLines={adviceLines}
            tone={formData.tone}
            onRegenerate={handleRegenerate}
            onReset={handleReset}
            isSubmitting={isSubmitting}
          />
        )}

        {view === 'error' && (
          <ErrorCard
            errorMessage={errorMessage}
            onRetry={handleRetry}
            onReset={handleReset}
            isSubmitting={isSubmitting}
          />
        )}

        {/* 개발 환경 전용 상태 전환 스위처 */}
        {process.env.NODE_ENV === 'development' && (
          <button
            type="button"
            className="simulate-link"
            onClick={() => setView(view === 'error' ? 'form' : 'error')}
          >
            개발용: {view === 'error' ? '폼으로 돌아가기' : '오류 상태 보기'}
          </button>
        )}
      </div>

      <footer>
        MOVE / KIND <span>—</span> 작은 움직임, 큰 마음
      </footer>
    </main>
  )
}
