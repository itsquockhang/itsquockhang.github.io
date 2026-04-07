import { BookOpenCheck } from 'lucide-react'
import { courses } from '../data/profile'

function CoursesPage() {
  return (
    <section className="space-y-6">
      <header className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="font-display text-3xl font-semibold text-slate-900">Courses</h1>
        <p className="mt-2 text-slate-700">
          Teaching portfolio with key subjects in computer science and software engineering.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {courses.map((course, index) => (
          <article
            key={course.title}
            className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            style={{ animationDelay: `${0.1 + index * 0.05}s` }}
          >
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f5ca9]">
              <BookOpenCheck size={16} />
              {course.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{course.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CoursesPage
