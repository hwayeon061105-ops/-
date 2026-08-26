'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, ChevronLeft, Flame, Heart, RotateCcw, Scale, Sparkles, TriangleAlert } from 'lucide-react'

type Tone = 'spicy' | 'realistic' | 'warm'
type View = 'form' | 'loading' | 'result' | 'error'

const tones = [
  { id: 'spicy' as Tone, label: '쓴소리', sub: '정신 번쩍', icon: Flame, color: 'coral' },
  { id: 'realistic' as Tone, label: '현실직시', sub: '팩트로 말해줘', icon: Scale, color: 'blue' },
  { id: 'warm' as Tone, label: '따뜻한 공감', sub: '다독여 주세요', icon: Heart, color: 'mint' },
]
const advice: Record<Tone, string[][]> = {
  spicy: [['오늘의 피곤함은 내일의 변명이 될 뿐이에요.', '딱 10분만 시작하면, 몸은 알아서 따라옵니다.', '자, 일어나요. 🔥 ( ͡° ͜ʖ ͡°)']],
  realistic: [['완벽한 운동보다 오늘의 20분이 훨씬 중요해요.', '지금 몸 상태에 맞춰 가볍게 땀만 내도 충분합니다.', '꾸준함은 기분이 아니라 습관에서 시작돼요. 🏋️‍♂️']],
  warm: [['오늘도 여기까지 온 것만으로 정말 잘하고 있어요.', '무리하지 말고, 가볍게 몸을 깨우는 것부터 시작해요.', '당신의 속도대로 충분히 빛나고 있어요. 🫂']],
}
const loadingCopy = ['마음의 준비운동을 하는 중...', '당신에게 딱 맞는 말을 고르는 중...', 'AI가 응원을 꽉 채우는 중...']

export default function Home() {
  const [height, setHeight] = useState(''), [weight, setWeight] = useState(''), [mind, setMind] = useState('')
  const [tone, setTone] = useState<Tone>('warm'), [view, setView] = useState<View>('form'), [errors, setErrors] = useState<Record<string, string>>({})
  const [loadingIndex, setLoadingIndex] = useState(0), [adviceIndex, setAdviceIndex] = useState(0)
  const formRef = useRef<HTMLDivElement>(null), firstInputRef = useRef<HTMLInputElement>(null)
  useEffect(() => { if (view !== 'loading') return; const interval = window.setInterval(() => setLoadingIndex((i) => (i + 1) % loadingCopy.length), 900); const timeout = window.setTimeout(() => setView('result'), 3000); return () => { window.clearInterval(interval); window.clearTimeout(timeout) } }, [view])
  const submit = () => { const next: Record<string, string> = {}; if (!height) next.height = '키 칸이 비어있어요'; if (!weight) next.weight = '몸무게 칸이 비어있어요'; if (!mind.trim()) next.mind = '현재 마음가짐 칸이 비어있어요'; setErrors(next); if (Object.keys(next).length) { firstInputRef.current?.focus(); return }; setLoadingIndex(0); setView('loading') }
  const reset = () => { setHeight(''); setWeight(''); setMind(''); setErrors({}); setView('form'); window.setTimeout(() => { formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); firstInputRef.current?.focus() }, 50) }
  const selectedColor = tones.find((item) => item.id === tone)?.color
  return <main className="min-h-screen bg-background text-foreground">
    <header className="hero-shell"><div className="hero-inner"><div className="brand-mark"><Sparkles size={16} strokeWidth={2.5} /><span>MOVE / KIND</span></div><div className="hero-copy"><p className="eyebrow">YOUR DAILY RESET</p><h1>오늘의 나를,<br /><span>움직이게 하는 말.</span></h1><p className="hero-description">지금의 컨디션을 알려주면<br />당신만을 위한 운동 조언을 건네요.</p></div><div className="hero-orbit" aria-hidden="true"><div className="orbit-ring" /><div className="hero-sticker">LET&apos;S<br />MOVE</div><span className="orbit-dot" /></div></div></header>
    <div className="app-container">
      {view === 'form' && <section ref={formRef} className="form-card section-in" aria-label="운동 조언 입력"><div className="section-heading"><div><p className="section-kicker">01 / CHECK IN</p><h2>지금의 나를 알려주세요</h2></div><span className="step-pill">3 MIN RESET</span></div><div className="measure-grid"><Field label="키" unit="cm" value={height} setValue={setHeight} error={errors.height} inputRef={firstInputRef} placeholder="170" /><Field label="몸무게" unit="kg" value={weight} setValue={setWeight} error={errors.weight} placeholder="60" /></div><div className="field-group"><label htmlFor="mind">현재 마음가짐</label><textarea id="mind" value={mind} onChange={(e) => setMind(e.target.value)} className={errors.mind ? 'input-error' : ''} placeholder="지금의 심정을 적어보세요" rows={3} /><p className="error-text">{errors.mind || ' '}</p></div><div className="tone-heading"><div><p className="section-kicker">02 / YOUR VIBE</p><h2>어떤 느낌으로 받을까요?</h2></div><span className="required">필수 선택</span></div><div className="tone-grid" role="radiogroup" aria-label="조언 톤 선택">{tones.map(({ id, label, sub, icon: Icon, color }) => <button key={id} type="button" role="radio" aria-checked={tone === id} onClick={() => setTone(id)} className={`tone-option tone-${color} ${tone === id ? 'selected' : ''}`}><span className="tone-icon"><Icon size={18} /></span><span><strong>{label}</strong><small>{sub}</small></span>{tone === id && <Check size={17} className="tone-check" />}</button>)}</div><button type="button" onClick={submit} className="primary-button">조언 받기 <ArrowRight size={19} /></button><p className="privacy-note">입력한 정보는 조언 생성에만 사용돼요.</p></section>}
      {view === 'loading' && <section className="state-card loading-card section-in" aria-live="polite"><button className="back-button" onClick={() => setView('form')}><ChevronLeft size={17} /> 돌아가기</button><WorkoutFigure /><p className="section-kicker">YOUR MOTIVATION IS LOADING</p><h2>{loadingCopy[loadingIndex]}</h2><div className="loading-line"><span /></div><p className="loading-caption">잠깐만요, 좋은 말은 고르는 데 시간이 조금 걸려요.</p></section>}
      {view === 'result' && <section className="state-card result-card section-in"><div className="result-top"><div><p className="section-kicker">03 / YOUR DAILY PUSH</p><h2>오늘의 조언이 도착했어요</h2></div><span className={`result-dot tone-${selectedColor}`} /></div><div className={`advice-card advice-${selectedColor}`}><span className="quote-mark">“</span>{advice[tone][adviceIndex % advice[tone].length].map((line, i) => <p key={`${line}-${i}`}>{line}</p>)}</div><div className="result-actions"><button type="button" onClick={() => { setAdviceIndex((i) => i + 1); setView('loading') }} className="secondary-button"><RotateCcw size={16} /> 원하는 느낌 나올 때까지 다시 생성</button><button type="button" onClick={reset} className="text-button">다시 하기</button></div></section>}
      {view === 'error' && <section className="state-card error-card section-in"><span className="error-icon"><TriangleAlert size={23} /></span><p className="section-kicker">SOMETHING WENT WRONG</p><h2>조언을 불러오지 못했어요</h2><p>잠시 숨을 고르고 다시 시도해 주세요.</p><button type="button" onClick={() => setView('loading')} className="primary-button">다시 시도하기 <RotateCcw size={17} /></button></section>}
      <button type="button" className="simulate-link" onClick={() => setView(view === 'error' ? 'form' : 'error')}>개발용: {view === 'error' ? '폼으로 돌아가기' : '오류 상태 보기'}</button>
    </div><footer>MOVE / KIND <span>—</span> 작은 움직임, 큰 마음</footer>
  </main>
}
function Field({ label, unit, value, setValue, error, inputRef, placeholder }: { label: string; unit: string; value: string; setValue: (value: string) => void; error?: string; inputRef?: React.RefObject<HTMLInputElement | null>; placeholder: string }) { return <div className="field-group"><label htmlFor={label}>{label}</label><div className={`input-wrap ${error ? 'input-error' : ''}`}><input ref={inputRef} id={label} type="number" min="0" value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} /><span>{unit}</span></div><p className="error-text">{error || ' '}</p></div> }
function WorkoutFigure() { return <div className="workout-stage" aria-label="운동 중인 캐릭터 애니메이션"><div className="motion-line motion-one" /><div className="motion-line motion-two" /><div className="figure"><div className="figure-head" /><div className="figure-body" /><div className="figure-arm arm-one" /><div className="figure-arm arm-two" /><div className="figure-leg leg-one" /><div className="figure-leg leg-two" /></div><div className="figure-shadow" /></div> }
