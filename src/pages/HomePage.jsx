import { GraduationCap, Mail, MapPin, School, BookOpen } from 'lucide-react'
import { profile, publications } from '../data/profile'

function HomePage() {
  const latestPubs = [...publications].sort((a, b) => b.year - a.year).slice(0, 5)
  return (
    <div className="space-y-6">
      <section className="campus-hero-bg animate-fade-up overflow-hidden rounded-3xl border border-white/70 bg-white/70 shadow-xl shadow-[#1f5ca9]/10 backdrop-blur">
        <div className="bg-gradient-to-r from-[#1f5ca9]/75 to-[#00afef]/65 p-6 md:p-8">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            <School size={14} />
            Academic Profile
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-white md:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-sm text-white/90 md:text-base">{profile.role}</p>
        </div>

        <div className="grid gap-6 bg-white/86 p-6 backdrop-blur-sm md:grid-cols-[220px_1fr] md:p-8">
          <div className="flex flex-col items-center gap-3">
            <img
              src="/avatar.jpeg"
              alt="Avatar placeholder"
              className="h-44 w-44 rounded-2xl border border-slate-200 bg-white object-cover shadow-sm"
            />
          </div>

          <div className="space-y-4">
            <p className="text-base leading-relaxed text-slate-700">
              {profile.institution}
            </p>
            <p className="text-sm font-semibold text-[#1f5ca9]">{profile.faculty}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f5ca9]">
                  <Mail size={16} />
                  Email
                </p>
                <p className="mt-2 text-sm text-slate-700">{profile.email}</p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f5ca9]">
                  <MapPin size={16} />
                  Address
                </p>
                <p className="mt-2 text-sm text-slate-700">{profile.address}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm [animation-delay:0.1s]">
        <h2 className="font-display text-2xl font-semibold text-slate-900">Education</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {profile.education.map((item) => (
            <article
              key={`${item.school}-${item.degree}`}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="inline-flex items-center gap-2">
                <img
                  src={item.logoUrl || profile.logoUrl}
                  alt={`${item.school} logo`}
                  className="h-7 w-7 rounded-full border border-slate-200 bg-white object-contain p-0.5"
                />
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f5ca9]">
                  <GraduationCap size={16} />
                  {item.school}
                </p>
              </div>
              <p className="mt-2 font-medium text-slate-800">{item.degree}</p>
              <p className="text-sm text-slate-600">{item.year}</p>
              {item.thesisTitle ? (
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  <span className="font-semibold text-slate-800">Thesis: </span>
                  {item.thesisTitle}
                </p>
              ) : null}
              {item.supervisor ? (
                <p className="mt-2 text-sm text-slate-600">
                  <span className="font-semibold text-slate-700">Supervisor: </span>
                  {item.supervisor}
                </p>
              ) : null}
              {item.grade || item.ranking ? (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {item.grade ? (
                    <>
                      <span className="text-sm font-semibold text-slate-700">Grade:</span>
                      <span className="inline-block rounded-full bg-[#1f5ca9]/10 px-3 py-1 text-[#1f5ca9] font-semibold text-sm">
                        {item.grade}
                      </span>
                    </>
                  ) : null}
                  {item.ranking ? (
                    <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-amber-800 font-semibold text-sm">
                      🏆 {item.ranking}
                    </span>
                  ) : null}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm [animation-delay:0.2s]">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-2xl font-semibold text-slate-900">Latest Publications</h2>
        </div>
        <div className="mt-4 space-y-3">
          {latestPubs.map((pub) => (
            <article
              key={pub.id}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:bg-white hover:shadow-sm"
            >
              <p className="text-sm font-medium text-slate-700">{pub.year}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900 leading-snug">
                {pub.title}
              </p>
              <p className="mt-2 text-xs text-slate-600">{pub.authors}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {pub.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-slate-200 px-2 py-1 text-xs font-medium text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
