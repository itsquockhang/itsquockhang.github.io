import { useMemo, useState } from 'react'
import { publications } from '../data/profile'

const tagClasses = {
  Preprint: 'bg-amber-100 text-amber-800',
  Published: 'bg-emerald-100 text-emerald-800',
  'ACL Main Conf': 'bg-violet-100 text-violet-800',
  NLP: 'bg-sky-100 text-sky-800',
  Scopus: 'bg-indigo-100 text-indigo-800',
  'Software Engineering Education': 'bg-rose-100 text-rose-800',
  '2026': 'bg-[#1f5ca9]/10 text-[#1f5ca9]',
  '2025': 'bg-[#00afef]/15 text-[#007db2]',
  '2024': 'bg-slate-200 text-slate-700',
  Journal: 'bg-cyan-100 text-cyan-800',
  Springer: 'bg-orange-100 text-orange-800',
  'Book Chapter': 'bg-fuchsia-100 text-fuchsia-800',
  'ICT Research': 'bg-teal-100 text-teal-800',
}

function getTagClass(tag) {
  return tagClasses[tag] ?? 'bg-slate-100 text-slate-700'
}

function highlightMyName(text) {
  const parts = text.split(/(Quoc-Khang Tran|Tran, Quoc-Khang)/g)
  return parts.map((part, index) => {
    if (part === 'Quoc-Khang Tran' || part === 'Tran, Quoc-Khang') {
      return (
        <strong key={`${part}-${index}`} className="font-extrabold text-slate-900">
          {part}
        </strong>
      )
    }
    return <span key={`part-${index}`}>{part}</span>
  })
}

function renderVenue(venue) {
  const doiMatch = venue.match(/^DOI:\s*(.+)$/i)
  if (doiMatch) {
    const doi = doiMatch[1].trim()
    const doiUrl = `https://doi.org/${doi}`

    return (
      <p className="text-sm font-medium text-brand-primary">
        DOI:{' '}
        <a
          href={doiUrl}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-brand-accent underline-offset-2 transition hover:text-[#0d4d95]"
        >
          {doi}
        </a>
      </p>
    )
  }

  const arxivMatch = venue.match(/^arXiv:\s*(.+)$/i)
  if (arxivMatch) {
    const arxivId = arxivMatch[1].trim()
    const arxivUrl = `https://arxiv.org/abs/${arxivId}`

    return (
      <p className="text-sm font-medium text-brand-primary">
        arXiv:{' '}
        <a
          href={arxivUrl}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-brand-accent underline-offset-2 transition hover:text-[#0d4d95]"
        >
          {arxivId}
        </a>
      </p>
    )
  }

  if (/^https?:\/\//i.test(venue)) {
    return <p className="text-sm font-medium text-brand-primary">{venue}</p>
  }

  return <p className="text-sm font-medium text-brand-primary">{venue}</p>
}

function renderPaperLinks(paper) {
  const links = [
    paper.pdf ? { label: 'PDF', href: paper.pdf } : null,
  ].filter(Boolean)

  if (links.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={`${paper.id}-${link.label}`}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}

function renderPublicationCover(paper) {
  if (!paper.cover) {
    return null
  }

  if (paper.coverType === 'pdf') {
    return (
      <div className="mb-4 overflow-hidden rounded-xl border border-white/30 bg-white">
        <embed
          src={`${paper.cover}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
          type="application/pdf"
          className="h-40 w-full"
        />
      </div>
    )
  }

  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-white/30 bg-white">
      <img src={paper.cover} alt={`${paper.title} cover`} className="h-40 w-full bg-white object-cover" />
    </div>
  )
}

function PublicationsPage() {
  const [activeTag, setActiveTag] = useState('All')

  const sortedPublications = useMemo(
    () =>
      [...publications].sort((a, b) => {
        const yearA = Number.parseInt(a.year, 10) || 0
        const yearB = Number.parseInt(b.year, 10) || 0
        return yearB - yearA
      }),
    []
  )

  const availableTags = useMemo(
    () => ['All', ...new Set(sortedPublications.flatMap((paper) => paper.tags))],
    [sortedPublications]
  )

  const filteredPublications = useMemo(() => {
    if (activeTag === 'All') {
      return sortedPublications
    }
    return sortedPublications.filter((paper) => paper.tags.includes(activeTag))
  }, [activeTag, sortedPublications])

  return (
    <section className="space-y-6">
      <header className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="font-display text-3xl font-semibold text-slate-900">Publications</h1>
        <p className="mt-2 text-slate-700">
          A curated list of my research publications, from preprints to conference and journal papers.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {availableTags.map((tag) => {
            const isActive = tag === activeTag
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={
                  isActive
                    ? 'rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-white'
                    : 'rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200'
                }
              >
                {tag}
              </button>
            )
          })}
        </div>
      </header>

      <div className="grid gap-6">
        {filteredPublications.map((paper, index) => (
          <article
            key={paper.id}
            className="animate-fade-up overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            style={{ animationDelay: `${0.1 + index * 0.05}s` }}
          >
            <div className="grid md:grid-cols-[320px_1fr]">
              <div className="flex min-h-52 flex-col justify-between border-b border-slate-200 bg-linear-to-br from-brand-primary to-brand-accent p-6 text-white md:border-b-0 md:border-r">
                {renderPublicationCover(paper)}
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/80">
                  Journal / Venue
                </p>
                <h2 className="font-display text-xl font-semibold leading-tight">{paper.source}</h2>
                <p className="text-sm font-medium text-white/90">{paper.year}</p>
              </div>
              <div className="space-y-4 p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Authors</p>
                <p className="text-sm leading-relaxed text-slate-800">{highlightMyName(paper.authors)}</p>
                <h3 className="font-display text-xl leading-snug text-slate-900">{paper.title}</h3>
                <p className="text-sm text-slate-600">{paper.citation}</p>
                {renderVenue(paper.venue)}
                {renderPaperLinks(paper)}
                <div className="flex flex-wrap gap-2">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getTagClass(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredPublications.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
          No publications found for tag: {activeTag}
        </p>
      ) : null}
    </section>
  )
}

export default PublicationsPage
