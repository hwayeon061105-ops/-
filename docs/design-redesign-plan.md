# MOVE / KIND — Kinetic Glow 톤앤매너 리디자인 계획서

> design.md 기반 전체 UI 수정 작업 계획
> 작성일: 2026-08-27

---

## 📌 디자인 스펙 요약 (design.md 기준)

| 항목 | 현재 | 목표 (Kinetic Glow) |
|------|------|----------------------|
| **배경** | #f4f6f8 (Light Gray) | #0B1326 (Dark Navy) |
| **포인트 컬러** | #FF6B4A (Coral) | #FF6B4A (Coral Orange) — 유지 |
| **카드 배경** | #ffffff (흰색) | Glassmorphism (반투명 어두운 패널) |
| **텍스트** | #172033 (Dark) | White / Off-white |
| **폰트** | Arial, Noto Sans KR | Hanken Grotesk |
| **Border Radius** | 22px (큰 둥근) | 8px (세련된 모던) |
| **분위기** | Light / Clean | Dark / Kinetic / Immersive |

---

## 🗂️ 수정 대상 파일 목록

### Phase 1 — 디자인 토큰 & 글로벌 스타일
#### [MODIFY] app/globals.css
- `:root` 변수 전체 교체: Light → Dark Navy 팔레트
- CSS 토큰 추가: `--glass-bg`, `--glass-border`, `--glow-coral` 등
- Glassmorphism 유틸리티 클래스 추가
- 폰트 Google Fonts `Hanken Grotesk` 임포트 추가
- Border radius 토큰 `8px` 기준으로 통일

#### [MODIFY] app/layout.tsx
- Google Fonts `Hanken Grotesk` 적용 (next/font 방식)
- `colorScheme: 'dark'` 로 변경
- `themeColor: '#0B1326'` 으로 변경

---

### Phase 2 — Hero 섹션
#### [MODIFY] app/page.tsx — header 블록
- `hero-shell`: Dark Navy 배경, Coral Glow 그라데이션 오버레이 추가
- `hero-copy h1`: 폰트 Hanken Grotesk, 강조 텍스트 Coral Orange
- `hero-sticker`: Glassmorphism 처리 (반투명 배경 + 블러)
- `orbit-ring`: 밝은 Coral 글로우 효과
- Hero 전체: 미묘한 그리드 배경 패턴 추가 (몰입감 강화)

---

### Phase 3 — 입력 폼 카드
#### [MODIFY] components/form/AdviceForm.tsx
- `form-card`: 흰 카드 → Glassmorphism 패널 (backdrop-filter: blur)
- 섹션 레이블 색상: Coral Orange

#### [MODIFY] components/form/Field.tsx
- `input-wrap`: Light Gray 배경 → Dark Navy 반투명 배경
- Border: 어두운 반투명 → 포커스 시 Coral Orange glow
- Placeholder 텍스트: 어두운 투명 흰색

#### [MODIFY] components/form/ToneSelector.tsx
- `tone-option`: 어두운 반투명 카드 + Coral/Blue/Mint 포인트 색상 유지
- 선택된 상태: Glow 효과 강화
- `tone-option small`: 밝은 반투명 텍스트

---

### Phase 4 — 로딩 카드
#### [MODIFY] components/loading/LoadingCard.tsx
- `state-card`: Glassmorphism 패널
- GymGoerCharacter SVG: Coral/Dark Navy 팔레트 적용
- `loading-line`: 배경 어둡게, Coral 진행 바 Glow 추가
- `section-kicker`, `h2`: 흰색 텍스트

---

### Phase 5 — 결과 카드
#### [MODIFY] components/result/ResultCard.tsx
- `state-card`: Glassmorphism 패널
- `advice-card`: Coral 미묘한 glow 테두리 + 어두운 반투명 배경
- `quote-mark`: Coral Orange, 크고 강렬하게
- `advice-line`: 흰색, 높은 대비 텍스트
- `secondary-button`: 어두운 반투명 + 흰 텍스트
- `text-button`: 반투명 흰색

---

### Phase 6 — 에러 카드 & 푸터
#### [MODIFY] components/error/ErrorCard.tsx
- `error-card`: Glassmorphism 패널
- 에러 아이콘: Coral 계열로 통일

#### [MODIFY] app/page.tsx — footer 블록
- 배경: Dark Navy 연장 또는 반투명
- 텍스트: 흰색 반투명

---

## 🎨 신규 CSS 토큰 설계

```
--background: #0B1326           Dark Navy
--foreground: #F0F4FF           Off-white
--card: rgba(255,255,255,0.04)  Glassmorphism surface
--card-border: rgba(255,255,255,0.10)
--primary: #FF6B4A              Coral Orange
--glow-coral: 0 0 24px rgba(255,107,74,0.35)
--glass-bg: rgba(255,255,255,0.05)
--glass-border: rgba(255,255,255,0.10)
--glass-blur: blur(16px)
```

---

## 📅 작업 순서

```
Phase 1  globals.css + layout.tsx  (디자인 기반 확립)
Phase 2  page.tsx Hero 섹션
Phase 3  Form 컴포넌트 3종 (AdviceForm, Field, ToneSelector)
Phase 4  LoadingCard
Phase 5  ResultCard
Phase 6  ErrorCard + Footer
검증     로컬 dev 서버 확인 → Vercel 배포
```

---

## ✅ 검증 기준

- [ ] 전체 배경이 Dark Navy (#0B1326) 로 통일됨
- [ ] 카드 영역이 Glassmorphism 처리됨 (backdrop-filter)
- [ ] 폰트가 Hanken Grotesk로 전환됨
- [ ] Coral Orange 포인트 컬러 일관되게 적용됨
- [ ] 다크 배경에서 텍스트 가독성 확보됨
- [ ] 호버/포커스 Glow 애니메이션 작동
- [ ] 모바일(320px~) 및 PC(680px+) 반응형 정상 작동
- [ ] 로딩 캐릭터 SVG가 다크 모드에서 자연스럽게 보임
