import { Link } from 'react-router-dom'
import Reveal from './Reveal'

export default function CtaBand() {
  return (
    <section className="shell section" aria-labelledby="cta-title">
      <Reveal>
        <div className="cta-band">
          <div className="cta-grid">
            <div>
              <p className="cta-kicker">Currently taking on work</p>
              <h2 id="cta-title">
                Have something in mind?
                <br />
                <em>Let's make it real.</em>
              </h2>
              <p>
                Tell me the rough shape of it — a paragraph is enough. I'll reply within two working
                days with honest thoughts and a clear way forward.
              </p>
            </div>
            <Link to="/contact" className="btn btn-light">
              Start a project
              <span className="btn-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
