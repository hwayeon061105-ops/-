import { Tone } from '@/types/advice'

const THEME_COLORS: Record<Tone, { bg: string; text: string; accent: string; title: string }> = {
  spicy: {
    bg: '#1a1012',
    text: '#ffffff',
    accent: '#ff6b4a',
    title: '🔥 쓴소리 모드',
  },
  realistic: {
    bg: '#101626',
    text: '#ffffff',
    accent: '#5b82e7',
    title: '🏋️‍♂️ 현실직시 모드',
  },
  warm: {
    bg: '#0f1f1c',
    text: '#ffffff',
    accent: '#52bfa6',
    title: '🌿 따뜻한 공감 모드',
  },
}

/**
 * 3줄 조언 텍스트를 클립보드에 복사합니다.
 */
export async function copyAdviceToClipboard(adviceLines: string[]): Promise<boolean> {
  const fullText = `[MOVE / KIND 오늘의 운동 조언]\n\n${adviceLines.join('\n')}\n\n✨ 오늘의 나를, 움직이게 하는 말.`
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(fullText)
      return true
    } else {
      // Fallback
      const textArea = document.createElement('textarea')
      textArea.value = fullText
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const success = document.execCommand('copy')
      document.body.removeChild(textArea)
      return success
    }
  } catch (e) {
    console.error('Clipboard copy failed:', e)
    return false
  }
}

/**
 * Canvas API를 이용하여 인스타그램/SNS 공유용 고화질 조언 카드를 렌더링하고 다운로드합니다.
 */
export function downloadAdviceCardImage(
  adviceLines: string[],
  tone: Tone,
  filename = 'move-kind-advice.png'
): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const width = 1080
      const height = 1350
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        resolve(false)
        return
      }

      const theme = THEME_COLORS[tone] || THEME_COLORS.warm

      // 1. 배경 그라데이션
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, '#172033')
      gradient.addColorStop(0.5, theme.bg)
      gradient.addColorStop(1, '#0c1220')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // 2. 장식용 원형 블러 효과
      ctx.save()
      ctx.beginPath()
      ctx.arc(width * 0.85, height * 0.15, 240, 0, Math.PI * 2)
      ctx.fillStyle = theme.accent
      ctx.filter = 'blur(120px)'
      ctx.globalAlpha = 0.25
      ctx.fill()
      ctx.restore()

      // 3. 카드 프레임
      const cardX = 90
      const cardY = 180
      const cardW = width - 180
      const cardH = height - 360
      const radius = 40

      ctx.save()
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)'
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.roundRect(cardX, cardY, cardW, cardH, radius)
      ctx.fill()
      ctx.stroke()
      ctx.restore()

      // 4. 상단 브랜드 로고
      ctx.fillStyle = theme.accent
      ctx.font = 'bold 32px ui-monospace, monospace'
      ctx.fillText('MOVE / KIND', cardX + 60, cardY + 90)

      // 5. 날짜 스탬프
      const today = new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      ctx.fillStyle = '#8e9bb0'
      ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Noto Sans KR", sans-serif'
      ctx.fillText(today, cardX + 60, cardY + 135)

      // 6. 모드 뱃지
      ctx.fillStyle = theme.accent
      ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Noto Sans KR", sans-serif'
      ctx.fillText(theme.title, cardX + cardW - 280, cardY + 90)

      // 7. 대형 따옴표 워터마크
      ctx.save()
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)'
      ctx.font = 'italic 900 220px Georgia, serif'
      ctx.fillText('“', cardX + 50, cardY + 280)
      ctx.restore()

      // 8. 3줄 조언 텍스트 렌더링
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Noto Sans KR", sans-serif'
      ctx.textBaseline = 'top'

      const lineHeight = 110
      const textStartY = cardY + 290

      adviceLines.forEach((line, index) => {
        const y = textStartY + index * lineHeight
        // 왼쪽 액센트 라인
        ctx.fillStyle = theme.accent
        ctx.fillRect(cardX + 60, y + 8, 8, 38)

        // 텍스트 본문
        ctx.fillStyle = '#f3f6fa'
        ctx.fillText(line, cardX + 85, y)
      })

      // 9. 하단 슬로건
      ctx.fillStyle = '#6e7e96'
      ctx.font = '24px ui-monospace, monospace'
      ctx.textAlign = 'center'
      ctx.fillText('오늘의 나를, 움직이게 하는 말 ✦ MOVE / KIND', width / 2, height - 100)

      // 10. 이미지 파일 다운로드 트리거
      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = filename
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      resolve(true)
    } catch (err) {
      console.error('Image export failed:', err)
      resolve(false)
    }
  })
}
