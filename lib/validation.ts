import { AdviceFormData, FormErrors } from '@/types/advice'

/**
 * PRD 5.1 및 4.1에 명시된 유효성 검증 규칙을 수행합니다.
 * 미입력 필드 발생 시 구체적인 한글 안내문구를 반환합니다.
 */
export function validateAdviceForm(data: AdviceFormData): FormErrors {
  const errors: FormErrors = {}

  // 1. 키 검증
  if (!data.height || data.height.trim() === '') {
    errors.height = '키 칸이 비어있어요'
  } else {
    const numHeight = Number(data.height)
    if (isNaN(numHeight) || numHeight <= 0) {
      errors.height = '올바른 키(cm)를 입력해 주세요'
    } else if (numHeight > 300) {
      errors.height = '키는 300cm 이하로 입력해 주세요'
    }
  }

  // 2. 몸무게 검증
  if (!data.weight || data.weight.trim() === '') {
    errors.weight = '몸무게 칸이 비어있어요'
  } else {
    const numWeight = Number(data.weight)
    if (isNaN(numWeight) || numWeight <= 0) {
      errors.weight = '올바른 몸무게(kg)를 입력해 주세요'
    } else if (numWeight > 500) {
      errors.weight = '몸무게는 500kg 이하로 입력해 주세요'
    }
  }

  // 3. 마음가짐 검증
  if (!data.mind || data.mind.trim() === '') {
    errors.mind = '현재 마음가짐 칸이 비어있어요'
  }

  return errors
}

/**
 * 에러 객체에 에러가 존재하는지 여부를 판단합니다.
 */
export function hasErrors(errors: FormErrors): boolean {
  return Object.values(errors).some((err) => Boolean(err && err.trim().length > 0))
}
