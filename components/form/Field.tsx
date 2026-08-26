import React from 'react'

interface FieldProps {
  id?: string
  label: string
  unit: string
  value: string
  setValue: (value: string) => void
  error?: string
  inputRef?: React.RefObject<HTMLInputElement | null>
  placeholder: string
  disabled?: boolean
}

export function Field({
  id,
  label,
  unit,
  value,
  setValue,
  error,
  inputRef,
  placeholder,
  disabled = false,
}: FieldProps) {
  const fieldId = id || label

  return (
    <div className="field-group">
      <label htmlFor={fieldId}>{label}</label>
      <div className={`input-wrap ${error ? 'input-error' : ''}`}>
        <input
          ref={inputRef}
          id={fieldId}
          type="number"
          min="0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${fieldId}-error` : undefined}
        />
        <span>{unit}</span>
      </div>
      <p id={`${fieldId}-error`} className="error-text" role={error ? 'alert' : undefined}>
        {error || ' '}
      </p>
    </div>
  )
}
