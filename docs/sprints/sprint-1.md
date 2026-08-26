# Sprint 1: 아키텍처 구조화 & 입력 폼 및 검증 시스템

> **스프린트 상태:** 📝 준비 중 (Planned)  
> **진행 기간:** Sprint Day 1 ~ Day 2  
> **관련 PRD 섹션:** 3.1(중단 입력 폼 영역), 4.1(입력 및 유효성 검증), 5.1(Field Blank Exception), 5.4(Sanitization Exception)

---

## 1. 스프린트 목표
* 단일 파일에 집중되어 있던 코드를 유지보수 가능한 컴포넌트, 훅, 유틸리티, 타입 계층으로 모듈화한다.
* PRD 명세에 따라 키, 몸무게, 현재 마음가짐 및 톤 선택에 대한 엄격한 필드별 미입력 감지/빨간색 에러 표시와 악의적 스크립트 방어(Sanitization)를 구현한다.

---

## 2. 작업 목록 (Tasks)

### Task 1.1: 타입 및 공통 모델 정의 (`types/advice.ts`)
- [ ] 신체 정보(`Height`, `Weight`), `Mind`, 조언 톤(`spicy` | `realistic` | `warm`) 타입 정의
- [ ] 폼 데이터(`AdviceFormData`) 및 폼 에러 상태(`FormErrors`) 인터페이스 정의
- [ ] AI API 요청 페이로드(`AdviceRequest`) 및 응답(`AdviceResponse`) 인터페이스 정의

### Task 1.2: XSS 방어 및 문자열 정규화 (`lib/sanitize.ts`)
- [ ] HTML 태그 및 특수문자 이스케이프 유틸리티 작성
- [ ] 마음가짐 텍스트의 불필요한 앞뒤 공백 및 줄바꿈 정규화 로직 작성

### Task 1.3: 필드별 유효성 검증 엔진 (`lib/validation.ts`)
- [ ] 각 필드 공백 여부 검사:
  - 키 누락 시: `"키 칸이 비어있어요"`
  - 몸무게 누락 시: `"몸무게 칸이 비어있어요"`
  - 마음가짐 누락 시: `"현재 마음가짐 칸이 비어있어요"`
- [ ] 키/몸무게의 양수(Positive Number) 검증
- [ ] 폼 전체 유효성 검사 함수 `validateAdviceForm(data)` 작성

### Task 1.4: 입력 폼 컴포넌트 모듈화 (`components/form/`)
- [ ] `components/form/Field.tsx`: 라벨, 단위(cm/kg), 에러 텍스트 표시 기능
- [ ] `components/form/ToneSelector.tsx`: 3가지 톤(쓴소리, 현실직시, 따뜻한 공감) 라디오 카드 그룹
- [ ] `components/form/AdviceForm.tsx`: 폼 레이아웃 및 `조언 받기` Primary CTA 버튼

---

## 3. 완료 조건 (Definition of Done)
- [ ] 폼 필드 중 하나라도 비어있는 상태에서 제출 시 AI 요청 단계로 넘어가지 않고 해당 필드 하단에 빨간색 안내문구가 정확히 노출되는가?
- [ ] `<script>` 등 악의적인 입력값이 안전하게 이스케이프 처리되는가?
- [ ] 폼 필드가 별도의 재사용 가능한 컴포넌트로 분리되어 있는가?
