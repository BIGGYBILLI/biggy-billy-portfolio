import { Link } from 'react-router-dom'
import CtaBand from '../components/CtaBand'
import NameMark from '../components/NameMark'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import { projects } from '../data/projects'

const capabilities = [
  'Interaction design',
  '3D & motion',
  'Front-end engineering',
  'Art direction',
  'Design systems',
  'Sound & texture',
]

const facts = [
  { label: 'Based', value: 'Working remotely, GMT — worldwide' },
  { label: 'Focus', value: 'Interactive sites, 3D illustration, identity' },
  { label: 'Tools', value: 'Figma, Blender, Three.js, TypeScript' },
  { label: 'Currently', value: 'Booking projects from January 2027' },
]

const steps = [
  {
    title: 'Conversation',
    text: 'A sixty-minute call, then a short written brief. We agree on the problem before a single pixel moves.',
  },
  {
    title: 'Direction',
    text: 'Two routes, not twelve. Each one carries a reason, a mood and a clear argument for how it works.',
  },
  {
    title: 'Build',
    text: 'Design and code in the same loop, in the browser, so nothing is lost between the idea and the thing itself.',
  },
  {
    title: 'Handover',
    text: 'Fast, accessible, documented. You own everything, and I stay reachable after launch.',
  },
]

export default function Home() {
  return (
    <>
      <section className="hero" aria-label="Introduction">
        <div className="hero-glow" aria-hidden="true" />
        <div className="shell hero-inner">
          <div className="hero-top">
            <p className="eyebrow">Independent creative developer</p>
            <p className="hero-index">Portfolio — 2026</p>
          </div>

          <NameMark />

          <div className="hero-bottom">
            <div className="hero-main">
              <p className="hero-lede">
                I design and build considered, interactive websites — the kind that carry a little
                weight, and make the people behind them look as good as they are.
              </p>
              <div className="hero-actions">
                <Link to="/work" className="btn btn-primary">
                  See selected work
                  <span className="btn-arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
                <Link to="/contact" className="btn btn-ghost">
                  Start a project
                </Link>
              </div>
            </div>

            <div className="hero-side">
              <p className="hero-status">
                <span className="status-dot" aria-hidden="true" />
                Booking from January 2027
              </p>
              <p className="hero-remote">Remote — working worldwide</p>
              <a className="scroll-cue" href="#work">
                <span>Scroll</span>
                <span className="scroll-line" aria-hidden="true">
                  <span />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="rail" aria-label="Capabilities">
        <div className="rail-track">
          {[0, 1].map((group) => (
            <div className="rail-group" key={group} aria-hidden={group === 1}>
              {capabilities.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="work" className="section shell" aria-labelledby="work-title">
        <Reveal className="section-head" variant="mask">
          <div>
            <p className="section-kicker">01 — Selected work</p>
            <h2 id="work-title">
              A few things I've
              <br />
              helped make.
            </h2>
          </div>
          <div className="head-note">
            <p>
              Four collaborations from the past three years: shops, journals, a house you can walk
              through. Some names are changed where clients asked.
            </p>
            <Link to="/work" className="text-link">
              View the full archive <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>

        <div className="work-grid">
          {projects.slice(0, 4).map((project, index) => (
            <Reveal key={project.id} delay={index * 90}>
              <ProjectCard project={project} index={String(index + 1).padStart(2, '0')} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="studio" className="section shell" aria-labelledby="studio-title">
        <div className="about-grid">
          <Reveal>
            <p className="section-kicker">02 — Studio</p>
            <h2 id="studio-title">
              A designer
              <br />
              who ships.
            </h2>
            <dl className="facts">
              {facts.map((fact) => (
                <div className="fact" key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="about-body" delay={90}>
            <p className="first">
              I started in print, which is probably why I still care more about margins than
              animations. Somewhere along the way the browser became the most interesting page in
              the studio, so I learned to build what I was drawing.
            </p>
            <p>
              Today I work alone, or alongside small teams, on websites that need a bit of nerve:
              3D-led product pages, editorial platforms, identities that have to survive being used
              every day. I write the code as I design, so nothing gets lost between the picture and
              the thing that ships.
            </p>
            <p>
              No theme underneath, no template pretending otherwise. Just a short, honest process,
              and a site you'll be glad to send to a client.
            </p>
            <p className="signature">
              Biggy Billy <span>Independent, since 2019</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section id="process" className="section shell" aria-labelledby="process-title">
        <Reveal className="section-head" variant="mask">
          <div>
            <p className="section-kicker">03 — Approach</p>
            <h2 id="process-title">
              A short process,
              <br />
              deliberately.
            </h2>
          </div>
          <div className="head-note">
            <p>
              Most projects run four to six weeks. Longer pieces — a 3D experience, a design system
              — run eight to twelve. You'll always know which week we're in.
            </p>
          </div>
        </Reveal>

        <div className="process-grid">
          {steps.map((step, index) => (
            <Reveal className="step" key={step.title} delay={index * 80}>
              <span className="step-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="quote-band" aria-label="Words from a client">
        <div className="shell">
          <Reveal className="quote-wrap">
            <blockquote className="quote">
              "Biggy took a brief we were slightly embarrassed by and returned a site that felt like
              us — calmer, sharper, <em>finished</em>. Enquiries doubled before we'd finished telling
              people about it."
            </blockquote>
            <p className="quote-attr">Mara Feld — Founder, Atlas Ceramics</p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
