import React, { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { AdviceFormData, FormErrors, Tone } from '@/types/advice'
import { Field } from './Field'
import { ToneSelector } from './ToneSelector'
import { validateAdviceForm, hasErrors } from '@/lib/validation'
import { sanitizeInput } from '@/lib/sanitize'

interface AdviceFormProps {
  formData: AdviceFormData
  setFormData: React.Dispatch<React.SetStateAction<AdviceFormData>>
  errors: FormErrors
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
  onSubmit: (sanitizedData: AdviceFormData) => void
  isSubmitting?: boolean
}

export function AdviceForm({
  formData,
  setFormData,
  errors,
  setErrors,
  onSubmit,
  isSubmitting = false,
}: AdviceFormProps) {
  const heightRef = useRef<HTMLInputElement>(null)
  const weightRef = useRef<HTMLInputElement>(null)
  const mindRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateAdviceForm(formData)
    setErrors(validationErrors)

    if (hasErrors(validationErrors)) {
      // 첫 번째 에러 필드로 포커스 이동
      if (validationErrors.height) {
        heightRef.current?.focus()
      } else if (validationErrors.weight) {
        weightRef.current?.focus()
      } else if (validationErrors.mind) {
        mindRef.current?.focus()
      }
      return
    }

    // Sanitization 수행 후 상위 제출 핸들러 호출
    const sanitizedData: AdviceFormData = {
      ...formData,
      mind: sanitizeInput(formData.mind),
    }

    onSubmit(sanitizedData)
  }

  const handleFieldChange = (field: keyof AdviceFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // 입력 시 해당 필드의 에러 초기화
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <section className="form-card section-in" aria-label="운동 조언 입력">
      <form onSubmit={handleSubmit} noValidate>
        <div className="section-heading">
          <div>
            <p className="section-kicker">01 / CHECK IN</p>
            <h2>지금의 나를 알려주세요</h2>
          </div>
          <span className="step-pill">3 MIN RESET</span>
        </div>

        <div className="measure-grid">
          <Field
            id="height"
            label="키"
            unit="cm"
            value={formData.height}
            setValue={(val) => handleFieldChange('height', val)}
            error={errors.height}
            inputRef={heightRef}
            placeholder="170"
            disabled={isSubmitting}
          />
          <Field
            id="weight"
            label="몸무게"
            unit="kg"
            value={formData.weight}
            setValue={(val) => handleFieldChange('weight', val)}
            error={errors.weight}
            inputRef={weightRef}
            placeholder="60"
            disabled={isSubmitting}
          />
        </div>

        <div className="field-group">
          <label htmlFor="mind">현재 마음가짐</label>
          <textarea
            ref={mindRef}
            id="mind"
            value={formData.mind}
            onChange={(e) => handleFieldChange('mind', e.target.value)}
            className={errors.mind ? 'input-error' : ''}
            placeholder="지금의 심정을 적어보세요"
            rows={3}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.mind)}
            aria-describedby={errors.mind ? 'mind-error' : undefined}
          />
          <p id="mind-error" className="error-text" role={errors.mind ? 'alert' : undefined}>
            {errors.mind || ' '}
          </p>
        </div>

        <div className="tone-heading">
          <div>
            <p className="section-kicker">02 / YOUR VIBE</p>
            <h2>어떤 느낌으로 받을까요?</h2>
          </div>
          <span className="required">필수 선택</span>
        </div>

        <ToneSelector
          selectedTone={formData.tone}
          onSelectTone={(tone: Tone) => handleFieldChange('tone', tone)}
          disabled={isSubmitting}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="primary-button"
          style={{ pointerEvents: isSubmitting ? 'none' : 'auto' }}
        >
          조언 받기 <ArrowRight size={19} />
        </button>

        <p className="privacy-note">입력한 정보는 조언 생성에만 사용돼요.</p>
      </form>
    </section>
  )
}
