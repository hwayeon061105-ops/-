# Sprint 3: 상태 관리, 애니메이션 및 5대 예외 처리 UI

> **스프린트 상태:** ✅ 완료 (Completed)  
> **진행 기간:** Sprint Day 6 ~ Day 7  
> **관련 PRD 섹션:** 3.1(로딩/하단 결과 레이아웃), 4.3(상태 관리 및 내비게이션), 5.2(AI API Failure), 5.5(Debouncing Exception)

---

## 1. 스프린트 목표
* 뷰 상태머신(`form` | `loading` | `result` | `error`)을 단일 커스텀 훅으로 관리하고, 중복 제출(Debouncing)을 완벽히 방어한다.
* 운동하는 캐릭터 CSS 애니메이션과 5~10초 응답 대기 UX를 완성하고, 재시도(`handleRetry`), 재생성(`handleRegenerate`), 초기화(`handleReset`) 플로우를 연결한다.

---

## 2. 작업 목록 (Tasks)

### Task 3.1: 흐름 제어 커스텀 훅 (`hooks/useAdviceFlow.ts`)
- [x] 뷰 상태(`view`), 로딩 인덱스(`loadingMessage`), 조언 결과(`adviceLines`), 에러 상태 관리
- [x] 제출 핸들러 `handleSubmit`: 유효성 검증 -> `view: loading` 전환 -> 5~10초 사이 AI 응답 대기(최소 5초 보장) -> `view: result`
- [x] 연속 클릭 방지: `isSubmitting` 플래그 및 Pointer-events 제어 (PRD 5.5 Debouncing Exception)
- [x] 초기화 핸들러 `handleReset`: 폼 리셋 후 스크롤 상단 이동 및 첫 인풋 포커스
- [x] 재생성 핸들러 `handleRegenerate`: 동일 입력값으로 AI 재호출
- [x] 취소 핸들러 `handleCancelLoading`: AbortController 기반 로딩 중단 및 폼 복귀

### Task 3.2: 로딩 애니메이션 컴포넌트 (`components/loading/LoadingCard.tsx`)
- [x] 조금씩 움직이며 운동하는 캐릭터 CSS 애니메이션 (모션 라인, 팔다리 관절 애니메이션)
- [x] 롤링 안내 텍스트 인터벌 전환 (`마음의 준비운동을 하는 중...` -> `당신에게 딱 맞는 말을 고르는 중...` -> `AI가 응원을 꽉 채우는 중...`)
- [x] 로딩 도중 폼으로 돌아가는 `돌아가기` 내비게이션 버튼 및 프로그레스 바

### Task 3.3: 결과 화면 카드 컴포넌트 (`components/result/ResultCard.tsx`)
- [x] 선택 톤 컬러 테마(Coral, Blue, Mint)가 적용된 3줄 조언 카드
- [x] 컨트롤 버튼 그룹:
  - `원하는 느낌 나올 때까지 다시 생성` (동일 조건 AI 재호출)
  - `다시 하기` (초기화 후 상단 폼 이동)

### Task 3.4: 에러 Fallback 카드 컴포넌트 (`components/error/ErrorCard.tsx`)
- [x] `"조언을 불러오지 못했어요 😢"` 및 경고 아이콘 노출 (PRD 5.2 AI API Failure Exception)
- [x] `다시 시도하기` 버튼 (동일 조건 재요청 트리거) 및 `처음부터 다시 하기` 버튼

---

## 3. 완료 조건 검증 결과 (Definition of Done)
- [x] **Debouncing Exception 검증:** `조언 받기` 클릭 즉시 버튼 비활성화 및 pointer-events 차단되어 다중 제출 방지.
- [x] **5~10초 애니메이션 시간 보장:** AI 응답이 빠르게 오더라도 최소 5초간 캐릭터 애니메이션이 렌더링된 후 결과 화면으로 전환.
- [x] **재생성 및 초기화 검증:** '원하는 느낌 나올 때까지 다시 생성' 클릭 시 AI 재호출, '다시 하기' 클릭 시 모든 폼 리셋 및 스크롤 상단 이동.
- [x] **AI API Failure Exception 검증:** 에러 발생 시 앱이 다운되지 않고 에러 안내 카드와 '다시 시도하기' 버튼이 정상 동작.
