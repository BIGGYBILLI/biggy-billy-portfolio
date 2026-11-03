import { useEffect, useRef, type CSSProperties } from 'react'

/**
 * The nameplate. Each letter leans toward the pointer and warms from bone to
 * ember as it gets closer. Styles are written straight to the DOM, so hovering
 * the name never re-renders the page.
 */

type Line = { text: string; base: [number, number, number]; hot: [number, number, number] }

const LINES: Line[] = [
  { text: 'BIGGY', base: [243, 237, 225], hot: [228, 128, 84] },
  { text: 'BILLY', base: [217, 106, 63], hot: [247, 198, 176] },
]

const lerp = (a: number[], b: number[], t: number) =>
  `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)}, ${Math.round(
    a[1] + (b[1] - a[1]) * t,
  )}, ${Math.round(a[2] + (b[2] - a[2]) * t)})`

/** Offset of an element inside an ancestor, ignoring transforms on the way. */
function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0
  let y = 0
  let node: HTMLElement | null = el
  while (node && node !== ancestor) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { x, y }
}

const palette: [number[], number[]][] = []
LINES.forEach((line) => {
  line.text.split('').forEach(() => palette.push([line.base, line.hot]))
})

export default function NameMark() {
  const rootRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const nodes = () => Array.from(root.querySelectorAll<HTMLElement>('.name-letter'))

    const settle = () => {
      nodes().forEach((el) => {
        el.style.transform = ''
        el.style.color = ''
      })
      root.style.removeProperty('--name-x')
      root.style.removeProperty('--name-y')
    }

    const paint = (clientX: number, clientY: number) => {
      const rect = root.getBoundingClientRect()
      if (!rect.width) return
      const radius = Math.max(180, rect.width * 0.17)
      const still = reduce.matches

      nodes().forEach((el, i) => {
        const point = offsetWithin(el, root)
        const dx = clientX - (rect.left + point.x + el.offsetWidth / 2)
        const dy = clientY - (rect.top + point.y + el.offsetHeight / 2)
        const t = Math.max(0, 1 - Math.hypot(dx, dy) / radius)
        const eased = t * t * (3 - 2 * t)
        const base = palette[i]?.[0] ?? [243, 237, 225]
        const hot = palette[i]?.[1] ?? [228, 128, 84]

        // Reduced motion keeps the warmth, drops the float.
        el.style.transform = still
          ? ''
          : `translate3d(${(dx / radius) * 6 * eased}px, ${-eased * 16}px, 0) scale(${
              1 + eased * 0.045
            })`
        el.style.color = lerp(base, hot, eased)
      })

      root.style.setProperty('--name-x', `${((clientX - rect.left) / rect.width) * 100}%`)
      root.style.setProperty('--name-y', `${((clientY - rect.top) / rect.height) * 100}%`)
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      paint(event.clientX, event.clientY)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', settle)
    window.addEventListener('blur', settle)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', settle)
      window.removeEventListener('blur', settle)
      settle()
    }
  }, [])

  return (
    <h1 className="hero-name" ref={rootRef} aria-label="Biggy Billy">
      {LINES.map((line, lineIndex) => (
        <span
          key={line.text}
          className={`name-line ${lineIndex === 1 ? 'name-line--indent' : ''}`}
          aria-hidden="true"
        >
          {line.text.split('').map((char, i) => {
            const order = LINES.slice(0, lineIndex).reduce((sum, l) => sum + l.text.length, 0) + i
            return (
              <span
                key={`${char}-${i}`}
                className="name-letter"
                style={{ '--i': order } as CSSProperties}
              >
                {char}
              </span>
            )
          })}
        </span>
      ))}
    </h1>
  )
}
