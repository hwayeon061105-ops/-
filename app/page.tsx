import Link from 'next/link'
import { Sparkles, Flame, Brain, Heart, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary flex flex-col min-h-screen font-sans">
      {/* TopAppBar */}
      <header className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/5 transition-all duration-200">
        <div className="flex justify-between items-center w-full px-6 max-w-[680px] mx-auto h-16">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary" size={18} strokeWidth={2.5} />
            <span className="font-space font-semibold text-xs tracking-[0.2em] uppercase text-foreground/90">
              MOVE / KIND
            </span>
          </div>
          <Link
            href="/advice"
            className="font-space text-[10px] font-bold tracking-[0.15em] text-primary hover:text-primary/80 transition-colors uppercase"
          >
            GET STARTED
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-12 pb-16 px-4 overflow-hidden hero-shell">
          <div className="max-w-[680px] mx-auto relative z-10 flex flex-col items-start gap-4">
            <span className="font-space text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
              YOUR DAILY RESET
            </span>
            <h1 className="font-sans text-4xl sm:text-5xl font-extrabold leading-[1.15] tracking-tight text-white mt-1">
              오늘의 나를,<br />
              <span className="text-primary">움직이게 하는 말.</span>
            </h1>
            <p className="font-sans text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed mt-2">
              키, 몸무게, 그리고 지금의 마음가짐을 알려주시면 당신만을 위한 3줄 조언을 전해드려요.
            </p>
            <Link
              href="/advice"
              className="mt-6 inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-lg font-bold text-sm tracking-wide shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              무료 조언 받기
            </Link>
          </div>

          {/* Abstract Graphic Element - Orbit & Rings */}
          <div className="max-w-[680px] mx-auto relative mt-12 mb-6">
            <div className="absolute right-0 top-[-260px] pointer-events-none opacity-20 sm:opacity-30 hidden xs:block">
              <svg fill="none" height="280" viewBox="0 0 280 280" width="280" xmlns="http://www.w3.org/2000/svg">
                <circle cx="140" cy="140" r="139" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.5"></circle>
                <circle cx="210" cy="170" fill="#FF6B4A" r="42" filter="blur(2px)"></circle>
                <circle cx="230" cy="70" fill="#aab5c7" r="8"></circle>
              </svg>
            </div>
          </div>

          {/* Interactive Form Card Preview */}
          <div className="max-w-[680px] mx-auto mt-10 relative z-20">
            <div className="glass-panel rounded-lg p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <span className="font-space text-[9px] font-bold tracking-[0.15em] text-primary uppercase">
                  01 / CHECK IN
                </span>
                <span className="font-space text-[9px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                  3 MIN RESET
                </span>
              </div>
              <h2 className="font-sans text-lg sm:text-xl font-bold text-white mb-6">
                지금의 나를 알려주세요
              </h2>
              
              <div className="space-y-5 opacity-70 select-none pointer-events-none">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-space text-[10px] font-bold tracking-wider text-muted-foreground uppercase block">
                      키
                    </label>
                    <div className="relative flex items-center bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3">
                      <span className="text-white/30 text-sm">175</span>
                      <span className="absolute right-4 text-xs text-muted-foreground">cm</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-space text-[10px] font-bold tracking-wider text-muted-foreground uppercase block">
                      몸무게
                    </label>
                    <div className="relative flex items-center bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3">
                      <span className="text-white/30 text-sm">70</span>
                      <span className="absolute right-4 text-xs text-muted-foreground">kg</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-space text-[10px] font-bold tracking-wider text-muted-foreground uppercase block">
                    현재 마음가짐
                  </label>
                  <div className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3 h-24 text-white/30 text-sm">
                    오늘따라 피곤하고 퇴근 후 운동하기가 귀찮아요...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-[#080d1a] border-y border-white/5">
          <div className="max-w-[680px] mx-auto">
            <div className="text-center mb-12">
              <span className="font-space text-[9px] font-bold tracking-[0.2em] text-primary mb-2 block uppercase">
                02 / YOUR VIBE
              </span>
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-white">
                당신의 상태에 맞춘 3가지 톤
              </h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {/* Feature 1 */}
              <div className="glass-panel rounded-lg p-5 flex items-start gap-4 hover:border-primary/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Flame className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-bold text-white mb-1">쓴소리 (Hard Mode)</h3>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    오기로라도 당장 일어나서 운동가고 싶을 때, 정신 번쩍 드는 강렬하고 자극적인 동기부여를 건넵니다.
                  </p>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="glass-panel rounded-lg p-5 flex items-start gap-4 hover:border-blue-500/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Brain className="text-blue-400" size={20} />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-bold text-white mb-1">현실직시 (Realistic)</h3>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    회피하고 싶을 때, 변명 없이 나 자신을 객관적으로 돌아보고 팩트를 깨닫게 하는 냉철한 조언입니다.
                  </p>
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="glass-panel rounded-lg p-5 flex items-start gap-4 hover:border-mint/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="text-emerald-400" size={20} />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-bold text-white mb-1">따뜻한 공감 (Warmth)</h3>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    지치고 힘들어서 시작이 두려울 때, 부드럽게 감싸안고 한 걸음을 응원해주는 위로와 격려입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 px-4 relative overflow-hidden bg-background">
          {/* Subtle bottom gradient glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px] bg-gradient-radial from-primary/5 to-transparent pointer-events-none" />

          <div className="max-w-[680px] mx-auto relative z-10">
            <div className="text-center mb-12">
              <span className="font-space text-[9px] font-bold tracking-[0.2em] text-primary mb-2 block uppercase">
                03 / PROCESS
              </span>
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-white">
                어떻게 작동하나요?
              </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 sm:gap-4">
              <div className="flex flex-col items-center text-center bg-white/[0.01] border border-white/5 rounded-lg p-5 flex-1">
                <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center mb-3 text-primary font-space text-xs font-bold">
                  1
                </div>
                <h4 className="font-sans text-white text-sm font-bold mb-1">간편한 상태 정보 입력</h4>
                <p className="font-sans text-muted-foreground text-xs leading-relaxed max-w-[180px]">
                  키, 몸무게, 현재의 솔직한 마음가짐을 작성합니다.
                </p>
              </div>

              <div className="flex justify-center items-center text-white/20 rotate-90 sm:rotate-0 flex-shrink-0">
                <ArrowRight size={20} />
              </div>

              <div className="flex flex-col items-center text-center bg-white/[0.01] border border-white/5 rounded-lg p-5 flex-1">
                <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center mb-3 text-primary font-space text-xs font-bold">
                  2
                </div>
                <h4 className="font-sans text-white text-sm font-bold mb-1">정교한 AI 조언 생성</h4>
                <p className="font-sans text-muted-foreground text-xs leading-relaxed max-w-[180px]">
                  선택한 톤에 맞춰 중복 없는 개인 맞춤형 문장을 도출합니다.
                </p>
              </div>

              <div className="flex justify-center items-center text-white/20 rotate-90 sm:rotate-0 flex-shrink-0">
                <ArrowRight size={20} />
              </div>

              <div className="flex flex-col items-center text-center bg-white/[0.01] border border-white/5 rounded-lg p-5 flex-1">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mb-3 text-white font-space text-xs font-bold shadow-lg shadow-primary/20">
                  3
                </div>
                <h4 className="font-sans text-white text-sm font-bold mb-1">즉각적인 운동 행동 개시</h4>
                <p className="font-sans text-muted-foreground text-xs leading-relaxed max-w-[180px]">
                  마음에 드는 조언을 확인하고 즉시 운동 동기부여를 얻습니다.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link
                href="/advice"
                className="inline-flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-3.5 rounded-lg font-bold text-xs tracking-wider transition-all duration-200"
              >
                지금 첫 조언 받아보기
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#080d1a] py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full px-6 max-w-[680px] mx-auto gap-4">
          <div className="font-space text-[9px] font-semibold text-muted-foreground tracking-wider uppercase">
            © 2026 MOVE / KIND. ALL RIGHTS RESERVED.
          </div>
          <nav className="flex gap-4">
            <Link href="/advice" className="font-space text-[9px] text-muted-foreground hover:text-primary tracking-wider transition-colors uppercase">
              WORKOUT
            </Link>
            <span className="text-white/10 text-[9px]">—</span>
            <a href="#" className="font-space text-[9px] text-muted-foreground hover:text-primary tracking-wider transition-colors uppercase">
              PRIVACY
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
