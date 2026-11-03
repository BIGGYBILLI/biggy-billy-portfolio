import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/work', label: 'Work' },
  { to: '/#studio', label: 'Studio' },
  { to: '/contact', label: 'Contact' },
]

export default function SiteHeader() {
  const { pathname, hash } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const progressRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let frame = 0

    const paint = () => {
      frame = 0
      setScrolled(window.scrollY > 12)
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${ratio})`
    }

    const request = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname, hash])

  const isActive = (to: string) =>
    to === '/#studio' ? pathname === '/' && hash === '#studio' : pathname === to

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="shell header-inner">
        <Link to="/" className="brand" aria-label="Biggy Billy, home">
          Biggy Billy <span className="brand-sub">Studio</span>
        </Link>

        <nav className="header-nav" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${isActive(link.to) ? 'is-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="btn btn-primary header-cta">
            Start a project
            <span className="btn-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </nav>

        <button
          type="button"
          className={`menu-toggle ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`}>
        {links.map((link) => (
          <Link key={link.to} to={link.to}>
            {link.label}
          </Link>
        ))}
        <Link to="/contact" className="btn btn-primary">
          Start a project
        </Link>
      </div>

      <span className="scroll-progress" ref={progressRef} aria-hidden="true" />
    </header>
  )
}
