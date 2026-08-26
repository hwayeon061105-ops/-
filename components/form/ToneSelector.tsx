import React from 'react'
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
  return (
    <div className="tone-grid" role="radiogroup" aria-label="조언 톤 선택">
      {TONES.map(({ id, label, sub, icon: Icon, color }) => {
        const isSelected = selectedTone === id
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => onSelectTone(id)}
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
