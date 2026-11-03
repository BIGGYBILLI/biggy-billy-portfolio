import CtaBand from '../components/CtaBand'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import { projects } from '../data/projects'

export default function Work() {
  return (
    <>
      <div className="shell page-head">
        <Reveal>
          <p className="eyebrow">Archive — 2023 to 2026</p>
          <h1>
            Selected work,
            <br />
            and how it was <em>made.</em>
          </h1>
          <p className="lede">
            Six recent collaborations. Each card opens into the short version — the problem, the
            decision that mattered, and what happened after. Longer case studies are available on
            request.
          </p>
        </Reveal>
      </div>

      <section className="shell" aria-label="Project archive">
        <div className="work-toolbar">
          <span>06 projects</span>
          <span>Open a card for the short version</span>
          <span>2023 — 2026</span>
        </div>

        <div className="work-grid">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 2) * 90}>
              <ProjectCard
                project={project}
                index={String(index + 1).padStart(2, '0')}
                expandable
              />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
