import { useId, useState } from 'react'
import type { Project } from '../data/projects'
import ProjectArt from './ProjectArt'

type ProjectCardProps = {
  project: Project
  index: string
  expandable?: boolean
}

export default function ProjectCard({ project, index, expandable = false }: ProjectCardProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <article className="project-card">
      <div className="project-art-wrap">
        <span className="project-art-index">{index}</span>
        <ProjectArt variant={project.art} />
      </div>

      <div className="project-body">
        <div>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-kind">{project.kind}</p>
        </div>
        <span className="project-year">{project.year}</span>
      </div>

      <p className="project-summary">{project.summary}</p>

      <div className="project-tags">
        {project.services.map((service) => (
          <span key={service}>{service}</span>
        ))}
      </div>

      {expandable && (
        <>
          <button
            type="button"
            className="card-toggle"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Close the notes' : 'Read the short version'}
            <span className="chev" aria-hidden="true">
              +
            </span>
          </button>

          {open && (
            <div className="card-detail" id={panelId}>
              {project.detail.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <div className="card-metric">
                <strong>{project.metric.value}</strong>
                <span>{project.metric.label}</span>
              </div>
            </div>
          )}
        </>
      )}
    </article>
  )
}
