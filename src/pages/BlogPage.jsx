import { CalendarDays, Clock3, Hash, Newspaper } from 'lucide-react'
import { lazy, Suspense } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { Link, Navigate, useParams } from 'react-router-dom'
import { blogPosts, getBlogPostBySlug } from '../data/blogPosts'

const BagOfWordsPlot = lazy(() => import('../components/BagOfWordsPlot'))
const ImageProcessingPlot = lazy(() => import('../components/ImageProcessingPlot'))

function BlogPage() {
  const params = useParams()
  const currentPost = getBlogPostBySlug(params.slug) ?? blogPosts[0]

  if (params.slug && !getBlogPostBySlug(params.slug)) {
    return <Navigate to="/blog" replace />
  }

  return (
    <section className="space-y-6">
      <header className="animate-fade-up overflow-hidden rounded-3xl border border-white/70 bg-white shadow-xl shadow-brand-primary/10">
        <div className="bg-linear-to-r from-brand-primary via-[#2d6bb9] to-brand-accent p-6 text-white md:p-8">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/90">
            <Newspaper size={14} />
            Blog
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold md:text-5xl">Notes and short articles</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/90 md:text-base">
            This blog shares practical notes, experiments, and lessons learned.
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="animate-fade-up space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6 lg:h-fit">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary">
              <Hash size={16} />
              Posts
            </p>
            <p className="mt-2 text-sm text-slate-600">Posts, notes, and ideas I want to share.</p>
          </div>

          <div className="space-y-3">
            {blogPosts.map((post) => {
              const isActive = post.slug === currentPost.slug
              return (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className={`block rounded-2xl border p-4 transition ${
                    isActive
                      ? 'border-brand-primary bg-brand-primary/5 shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:border-brand-accent/50 hover:bg-white'
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
                    {post.date}
                  </p>
                  <h2 className="mt-2 font-display text-lg font-semibold text-slate-900">{post.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              )
            })}
          </div>
        </aside>

        <article className="animate-fade-up overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm [animation-delay:0.08s]">
          <div className="border-b border-slate-200 bg-slate-50 p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary/10 px-3 py-1 font-semibold text-brand-primary">
                <CalendarDays size={14} />
                {currentPost.date}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent/10 px-3 py-1 font-semibold text-brand-accent">
                <Clock3 size={14} />
                {currentPost.readingTime}
              </span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold text-slate-900 md:text-4xl">
              {currentPost.title}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {currentPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="markdown-content p-6 md:p-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                a: ({ node, ...props }) => <a {...props} target="_blank" rel="noreferrer" />,
              }}
            >
              {currentPost.content}
            </ReactMarkdown>
          </div>

          {currentPost.slug === 'bag-of-words' ? (
            <div className="border-t border-slate-200 bg-slate-50 p-6 md:p-8">
              <Suspense
                fallback={
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                    Loading visualizations...
                  </div>
                }
              >
                <BagOfWordsPlot />
              </Suspense>
            </div>
          ) : null}

          {currentPost.slug === 'basic-image-processing' ? (
            <div className="border-t border-slate-200 bg-slate-50 p-6 md:p-8">
              <Suspense
                fallback={
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                    Loading image example...
                  </div>
                }
              >
                <ImageProcessingPlot />
              </Suspense>
            </div>
          ) : null}
        </article>
      </div>
    </section>
  )
}

export default BlogPage