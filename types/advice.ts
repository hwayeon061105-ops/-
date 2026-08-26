import { LucideIcon } from 'lucide-react'

export type Tone = 'spicy' | 'realistic' | 'warm'
export type ViewState = 'form' | 'loading' | 'result' | 'error'

export interface ToneOption {
  id: Tone
  label: string
  sub: string
  icon: LucideIcon
  color: 'coral' | 'blue' | 'mint'
}

export interface AdviceFormData {
  height: string
  weight: string
  mind: string
  tone: Tone
}

export interface FormErrors {
  height?: string
  weight?: string
  mind?: string
  tone?: string
}

export interface AdviceRequest {
  height: number
  weight: number
  mind: string
  tone: Tone
}

export interface AdviceResponse {
  advice: string[] // 정확히 3줄
  tone: Tone
  timestamp?: number
}
