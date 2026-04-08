import { useMemo, useState } from 'react'
import { BookOpenCheck } from 'lucide-react'
import { courses } from '../data/profile'

function CoursesPage() {
  const [activeTag, setActiveTag] = useState('All')

  const sortedCourses = useMemo(
    () =>
      [...courses].sort((a, b) => {
        const yearA = a.sortYear ?? 0
        const yearB = b.sortYear ?? 0
        return yearB - yearA
      }),
    []
  )

  const availableTags = useMemo(
    () => ['All', ...new Set(sortedCourses.flatMap((course) => course.tags ?? []))],
    [sortedCourses]
  )

  const filteredCourses = useMemo(() => {
    if (activeTag === 'All') {
      return sortedCourses
    }
    return sortedCourses.filter((course) => (course.tags ?? []).includes(activeTag))
  }, [activeTag, sortedCourses])

  return (
    <section className="space-y-6">
      <header className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="font-display text-3xl font-semibold text-slate-900">Courses</h1>
        <p className="mt-2 text-slate-700">
          Teaching portfolio with key subjects in computer science and software engineering.
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

      <div className="grid gap-4 md:grid-cols-3">
        {filteredCourses.map((course, index) => (
          <article
            key={course.title}
            className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            style={{ animationDelay: `${0.1 + index * 0.05}s` }}
          >
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary">
              <BookOpenCheck size={16} />
              {course.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{course.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(course.tags ?? []).map((tag) => (
                <span key={`${course.title}-${tag}`} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {filteredCourses.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
          No courses found for tag: {activeTag}
        </p>
      ) : null}
    </section>
  )
}

export default CoursesPage
