import { Link } from 'react-router-dom'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <p className="footer-mark" aria-hidden="true">
          BIGGY BILLY
        </p>

        <div className="footer-grid">
          <div className="footer-brand-col">
            <p className="footer-brand">Biggy Billy</p>
            <p className="footer-tagline">
              Independent creative developer and 3D designer. Considered websites, made by hand.
            </p>
          </div>

          <div className="footer-col">
            <h4>Pages</h4>
            <ul>
              <li>
                <Link to="/work">Work</Link>
              </li>
              <li>
                <Link to="/#studio">Studio</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Elsewhere</h4>
            <ul>
              <li>
                <a href="mailto:hello@biggybilly.studio">hello@biggybilly.studio</a>
              </li>
              <li>
                <a href="mailto:hello@biggybilly.studio?subject=Intro%20call">Book a 20-minute call</a>
              </li>
              <li>
                <Link to="/contact#faq">Common questions</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 Biggy Billy <span className="dot-sep">·</span> Designed &amp; built in the browser
          </span>
          <span>
            No templates <span className="dot-sep">·</span> Booking from January
          </span>
        </div>
      </div>
    </footer>
  )
}
