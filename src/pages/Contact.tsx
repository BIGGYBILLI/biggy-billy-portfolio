import { useState, type ChangeEvent, type FormEvent } from 'react'
import CtaBand from '../components/CtaBand'

const EMAIL = 'hello@biggybilly.studio'

const projectTypes = ['Website', 'Interactive / 3D', 'Brand & identity', 'Design system', 'Something else']
const budgets = ['Under $5k', '$5k – $10k', '$10k – $20k', '$20k +', 'Not sure yet']

type FormState = {
  name: string
  email: string
  type: string
  budget: string
  message: string
}

type Errors = Partial<Record<keyof FormState, string>>

const initialForm: FormState = {
  name: '',
  email: '',
  type: projectTypes[0],
  budget: budgets[2],
  message: '',
}

function buildMailto(form: FormState) {
  const subject = `Project enquiry — ${form.type}`
  const body = [
    `Hi Biggy,`,
    '',
    form.message.trim(),
    '',
    `Project type: ${form.type}`,
    `Budget: ${form.budget}`,
    '',
    `Thanks,`,
    form.name.trim(),
    form.email.trim(),
  ].join('\n')

  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const faqs = [
  {
    question: 'How long does a project take?',
    answer:
      'A focused site takes four to six weeks. Anything with 3D or a design system usually lands between eight and twelve. We agree the shape of it before we start, so the timeline is never a surprise.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Most projects sit between $8k and $25k depending on scope. I quote a fixed fee after the first call — no hourly drift, no surprises halfway through.',
  },
  {
    question: 'Do you work with agencies?',
    answer:
      'Often. I can join as the interactive and 3D pair of hands, or lead the whole digital side and hand over cleanly to your team when it ships.',
  },
  {
    question: 'What do you need from me to begin?',
    answer:
      'A rough idea, whatever brand assets exist, and one person who can say yes. That is genuinely enough to start a conversation.',
  },
  {
    question: 'Can you look after it after launch?',
    answer:
      'Yes. Most clients keep a small monthly arrangement for updates, new pages and the occasional idea. It is optional, never a subscription you are locked into.',
  },
]

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)

  const update =
    (key: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { value } = event.target
      setForm((current) => ({ ...current, [key]: value }))
      setErrors((current) => ({ ...current, [key]: undefined }))
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next: Errors = {}

    if (form.name.trim().length < 2) next.name = 'A name, so I know who I am replying to.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      next.email = 'That email looks incomplete.'
    if (form.message.trim().length < 12)
      next.message = 'A sentence or two is plenty to get us started.'

    setErrors(next)
    if (Object.keys(next).length > 0) return

    window.location.href = buildMailto(form)
    setSent(true)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <div className="shell page-head">
        <p className="eyebrow">Contact — new projects</p>
        <h1>
          Tell me what
          <br />
          you're <em>making.</em>
        </h1>
        <p className="lede">
          A paragraph is enough to begin. If it sounds like a fit, we'll book twenty minutes and talk
          properly — no pitch deck, no pressure.
        </p>
      </div>

      <div className="shell contact-grid">
        <div>
          {sent ? (
            <div className="form-success" role="status">
              <h3>Your email app should be open.</h3>
              <p>
                The message is pre-written with your answers — just press send. If nothing opened,
                copy the address below or use the direct link, and I'll take it from there.
              </p>
              <div className="success-actions">
                <a className="btn btn-primary" href={buildMailto(form)}>
                  Open the email again
                </a>
                <button type="button" className="btn btn-ghost" onClick={copyEmail}>
                  {copied ? 'Address copied' : 'Copy the address'}
                </button>
                {copied && <span className="copy-status">{EMAIL}</span>}
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className={`field ${errors.name ? 'has-error' : ''}`}>
                  <label htmlFor="name">Your name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Alex Moreau"
                    value={form.name}
                    onChange={update('name')}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <span className="field-error" id="name-error">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className={`field ${errors.email ? 'has-error' : ''}`}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="alex@studio.com"
                    value={form.email}
                    onChange={update('email')}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <span className="field-error" id="email-error">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="type">What is it?</label>
                  <select id="type" name="type" value={form.type} onChange={update('type')}>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="budget">Rough budget</label>
                  <select id="budget" name="budget" value={form.budget} onChange={update('budget')}>
                    {budgets.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={`field ${errors.message ? 'has-error' : ''}`}>
                <label htmlFor="message">What are you hoping to make?</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="A shop for our ceramics studio, with a small 3D viewer for the ten best pieces. We'd like it live before spring."
                  value={form.message}
                  onChange={update('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <span className="field-error" id="message-error">
                    {errors.message}
                  </span>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Send the brief
                  <span className="btn-arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>
                <span className="form-note">
                  No database, no newsletter. This opens a pre-written email in your own mail app.
                </span>
              </div>
            </form>
          )}
        </div>

        <aside className="contact-aside" aria-label="Other ways to get in touch">
          <div className="aside-block">
            <p className="aside-label">Direct</p>
            <a className="email-link" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <p className="aside-text">
              I answer within two working days, usually sooner. If I can't take the work, I'll say so
              and point you somewhere better.
            </p>
          </div>

          <div className="aside-block">
            <p className="aside-label">Availability</p>
            <p className="aside-text" style={{ marginTop: '0.55rem' }}>
              <span className="status-dot" aria-hidden="true" />
              Booking projects from January 2027
            </p>
            <p className="aside-text">
              Two projects a month, so the work stays careful. Smaller pieces — a landing page, an
              animation pass — can often start sooner.
            </p>
          </div>

          <div className="aside-block">
            <p className="aside-label">What happens next</p>
            <ol className="next-list">
              <li>You send a short brief.</li>
              <li>Twenty-minute call, no pitch deck.</li>
              <li>A written scope, fixed price and start date.</li>
            </ol>
          </div>
        </aside>
      </div>

      <section className="shell faq-section" id="faq" aria-labelledby="faq-title">
        <div className="section-head">
          <div>
            <p className="section-kicker">Details</p>
            <h2 id="faq-title">The usual questions.</h2>
          </div>
          <div className="head-note">
            <p>Anything else, just ask. Honest answers even when the answer is no.</p>
          </div>
        </div>

        <div className="faq">
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
