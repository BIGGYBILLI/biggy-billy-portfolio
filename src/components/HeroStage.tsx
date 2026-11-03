import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import FacelessScene from '../three/FacelessScene'

export default function HeroStage() {
  const stageRef = useRef<HTMLDivElement>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const hintRef = useRef(true)
  const [hintVisible, setHintVisible] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      const el = stageRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const rawX = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const rawY = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
      pointer.current.x = Math.max(-1, Math.min(1, rawX))
      pointer.current.y = Math.max(-1, Math.min(1, rawY))

      if (hintRef.current) {
        hintRef.current = false
        setHintVisible(false)
      }
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return (
    <div className="figure-stage" ref={stageRef}>
      <div
        className="figure-canvas"
        role="img"
        aria-label="An interactive 3D sculpture of a faceless figure in warm clay. It turns gently toward your cursor."
      >
        <Canvas
          camera={{ position: [0, 0.02, 4.15], fov: 30 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <FacelessScene pointer={pointer} reduceMotion={reduceMotion} />
          </Suspense>
        </Canvas>
      </div>

      <div className="stage-grain" aria-hidden="true" />

      <div className="stage-note stage-note--tl">
        <span className="note-dot" />
        Real-time 3D
      </div>
      <div className="stage-note stage-note--tr">Fig. 01 — Faceless study</div>

      <div className="stage-caption">
        <span>Clay, light &amp; maths</span>
        <span className={`stage-hint ${hintVisible ? '' : 'is-hidden'}`} aria-hidden={!hintVisible}>
          Move your cursor
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
            <path d="M1 4h11M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </div>
  )
}
