import type { ReactNode } from 'react'
import type { ArtVariant } from '../data/projects'

const ink = '#1a1813'
const clay = '#b0592f'
const clayLight = '#c8815a'
const cream = '#f4ecdd'
const sand = '#e2d6c1'
const paper = '#ece2d1'

function Label({ children, y = 52 }: { children: ReactNode; y?: number }) {
  return (
    <text
      x="44"
      y={y}
      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      fontSize="11"
      letterSpacing="3"
      fill={ink}
      fillOpacity="0.42"
    >
      {children}
    </text>
  )
}

function Arch() {
  return (
    <>
      <rect width="800" height="600" fill="#e9dfcd" />
      <path d="M0 468h800" stroke={ink} strokeOpacity="0.12" />
      <path d="M206 512V312a194 194 0 0 1 388 0v200Z" fill={clayLight} />
      <path d="M254 512V314a146 146 0 0 1 292 0v198Z" fill={cream} />
      <path d="M302 512V318a98 98 0 0 1 196 0v194Z" fill={ink} />
      <circle cx="652" cy="172" r="52" fill={clay} />
      <circle cx="652" cy="172" r="52" fill="none" stroke={ink} strokeOpacity="0.18" />
      <Label>ATLAS — 01</Label>
      <text
        x="44"
        y="556"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="11"
        letterSpacing="3"
        fill={ink}
        fillOpacity="0.42"
      >
        THREE TONES, ONE KILN
      </text>
    </>
  )
}

function Strata() {
  return (
    <>
      <rect width="800" height="600" fill={paper} />
      <circle cx="600" cy="148" r="70" fill={clay} />
      <path d="M0 372c150-96 268 44 414-14s246-96 386-28v270H0Z" fill={sand} />
      <path d="M0 438c162-74 258 44 408 2s266-84 392-24v184H0Z" fill={clayLight} />
      <path d="M0 508c168-56 262 32 400 8s272-46 400 2v82H0Z" fill={clay} />
      <path d="M0 562c180-28 268 16 400 8s268-26 400 0v30H0Z" fill={ink} fillOpacity="0.88" />
      <Label>NORTHWIND — 02</Label>
    </>
  )
}

function Grid() {
  const verticals = Array.from({ length: 9 }, (_, i) => 400 + (i - 4) * 190)
  const horizontals = [332, 368, 416, 478, 560]
  return (
    <>
      <rect width="800" height="600" fill="#e4d9c6" />
      <g stroke={ink} strokeOpacity="0.13">
        {verticals.map((x) => (
          <line key={x} x1="400" y1="300" x2={x} y2="620" />
        ))}
        {horizontals.map((y) => (
          <line key={y} x1="0" y1={y} x2="800" y2={y} />
        ))}
      </g>
      <path d="M320 220h190v280H320Z" fill={ink} />
      <path d="M320 220l60-44h190l-60 44Z" fill={sand} />
      <path d="M510 220l60-44v280l-60 44Z" fill={clay} />
      <circle cx="648" cy="196" r="15" fill={clay} />
      <Label>FERRA — 03</Label>
    </>
  )
}

function Orbit() {
  return (
    <>
      <rect width="800" height="600" fill="#dfd3bf" />
      <circle cx="400" cy="300" r="298" fill="none" stroke={ink} strokeOpacity="0.14" />
      <circle cx="400" cy="300" r="248" fill="none" stroke={clay} />
      <circle cx="400" cy="300" r="196" fill={cream} />
      <path d="M400 104a196 196 0 0 1 0 392Z" fill={ink} />
      <circle cx="400" cy="300" r="196" fill="none" stroke={ink} strokeOpacity="0.2" />
      <circle cx="588" cy="300" r="13" fill={clay} />
      <Label>SALTWATER — 04</Label>
    </>
  )
}

function Topo() {
  const lines = Array.from({ length: 15 }, (_, i) => {
    const y0 = 128 + i * 26
    const amp = 24 + i * 2.2
    return {
      d: `M-40 ${y0} C 120 ${y0 - amp}, 220 ${y0 + amp}, 360 ${y0 - amp * 0.4} S 600 ${y0 + amp * 0.8}, 840 ${y0 - amp * 0.3}`,
      opacity: 0.14 + i * 0.024,
    }
  })
  return (
    <>
      <rect width="800" height="600" fill="#efe6d7" />
      <circle cx="560" cy="196" r="86" fill={clay} fillOpacity="0.9" />
      {lines.map((line) => (
        <path key={line.d} d={line.d} fill="none" stroke={ink} strokeOpacity={line.opacity} strokeWidth="1.2" />
      ))}
      <Label>FOLD &amp; FORM — 05</Label>
    </>
  )
}

function Waves() {
  const bars = Array.from({ length: 44 }, (_, i) => {
    const height = 70 + Math.abs(Math.sin(i * 0.52)) * 212
    const x = 58 + i * 15.6
    return { x, height, accent: i % 9 === 4 }
  })
  return (
    <>
      <rect width="800" height="600" fill="#e8dcc9" />
      <path d="M0 380h800" stroke={ink} strokeOpacity="0.12" />
      {bars.map((bar) => (
        <rect
          key={bar.x}
          x={bar.x}
          y={300 - bar.height / 2}
          width="6"
          height={bar.height}
          rx="3"
          fill={bar.accent ? clay : ink}
          fillOpacity={bar.accent ? 1 : 0.72}
        />
      ))}
      <circle cx="660" cy="152" r="34" fill={clay} />
      <Label>LUMEN — 06</Label>
    </>
  )
}

const variants: Record<ArtVariant, () => React.JSX.Element> = {
  arch: Arch,
  strata: Strata,
  grid: Grid,
  orbit: Orbit,
  topo: Topo,
  waves: Waves,
}

export default function ProjectArt({ variant }: { variant: ArtVariant }) {
  const Art = variants[variant]
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <Art />
    </svg>
  )
}
