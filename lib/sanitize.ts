/**
 * HTML 특수문자를 이스케이프하여 XSS 취약점을 방지합니다.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * 텍스트 입력값의 앞뒤 공백 및 과도한 연속 공백/줄바꿈을 정규화합니다.
 */
export function sanitizeInput(input: string): string {
  if (!input) return ''
  // 악의적인 script/html 태그를 이스케이프하고 공백 정리
  const trimmed = input.trim()
  return escapeHtml(trimmed)
}
