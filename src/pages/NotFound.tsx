import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="shell not-found">
      <p className="eyebrow">404 — Nothing here</p>
      <h1>Wrong turn.</h1>
      <p className="lede" style={{ marginTop: '1.25rem' }}>
        This page has either moved or never existed. The good work is still where you left it.
      </p>
      <div className="hero-actions">
        <Link to="/" className="btn btn-primary">
          Back to the start
        </Link>
        <Link to="/work" className="btn btn-ghost">
          See the work
        </Link>
      </div>
    </div>
  )
}
