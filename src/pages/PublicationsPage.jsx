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
  if (!doiMatch) {
    return <p className="text-sm font-medium text-[#1f5ca9]">{venue}</p>
  }

  const doi = doiMatch[1].trim()
  const doiUrl = `https://doi.org/${doi}`

  return (
    <p className="text-sm font-medium text-[#1f5ca9]">
      DOI:{' '}
      <a
        href={doiUrl}
        target="_blank"
        rel="noreferrer"
        className="underline decoration-[#00afef] underline-offset-2 transition hover:text-[#0d4d95]"
      >
        {doi}
      </a>
    </p>
  )
}

function PublicationsPage() {
  return (
    <section className="space-y-6">
      <header className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="font-display text-3xl font-semibold text-slate-900">Publications</h1>
        <p className="mt-2 text-slate-700">
          A curated list of my research publications, from preprints to conference and journal papers.
        </p>
      </header>

      <div className="grid gap-6">
        {publications.map((paper, index) => (
          <article
            key={paper.id}
            className="animate-fade-up overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            style={{ animationDelay: `${0.1 + index * 0.05}s` }}
          >
            <div className="grid md:grid-cols-[320px_1fr]">
              <div className="flex min-h-52 flex-col justify-between border-b border-slate-200 bg-gradient-to-br from-[#1f5ca9] to-[#00afef] p-6 text-white md:border-b-0 md:border-r">
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
    </section>
  )
}

export default PublicationsPage
