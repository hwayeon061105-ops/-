import React, { useRef } from 'react'
import { Flame, Scale, Heart, Check } from 'lucide-react'
import { Tone, ToneOption } from '@/types/advice'

export const TONES: ToneOption[] = [
  { id: 'spicy', label: '쓴소리', sub: '정신 번쩍', icon: Flame, color: 'coral' },
  { id: 'realistic', label: '현실직시', sub: '팩트로 말해줘', icon: Scale, color: 'blue' },
  { id: 'warm', label: '따뜻한 공감', sub: '다독여 주세요', icon: Heart, color: 'mint' },
]

interface ToneSelectorProps {
  selectedTone: Tone
  onSelectTone: (tone: Tone) => void
  disabled?: boolean
}

export function ToneSelector({ selectedTone, onSelectTone, disabled = false }: ToneSelectorProps) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    if (disabled) return

    let nextIndex = currentIndex

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      nextIndex = (currentIndex + 1) % TONES.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      nextIndex = (currentIndex - 1 + TONES.length) % TONES.length
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      onSelectTone(TONES[currentIndex].id)
      return
    } else {
      return
    }

    onSelectTone(TONES[nextIndex].id)
    buttonRefs.current[nextIndex]?.focus()
  }

  return (
    <div className="tone-grid" role="radiogroup" aria-label="조언 톤 선택">
      {TONES.map(({ id, label, sub, icon: Icon, color }, index) => {
        const isSelected = selectedTone === id
        return (
          <button
            key={id}
            ref={(el) => {
              buttonRefs.current[index] = el
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            disabled={disabled}
            onClick={() => onSelectTone(id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`tone-option tone-${color} ${isSelected ? 'selected' : ''}`}
          >
            <span className="tone-icon">
              <Icon size={18} />
            </span>
            <span>
              <strong>{label}</strong>
              <small>{sub}</small>
            </span>
            {isSelected && <Check size={17} className="tone-check" />}
          </button>
        )
      })}
    </div>
  )
}

