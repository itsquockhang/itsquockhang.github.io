import { Mail, MapPin, School } from 'lucide-react'
import { profile } from '../data/profile'

function ContactPage() {
  return (
    <section className="space-y-6">
      <header className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="font-display text-3xl font-semibold text-slate-900">Contact</h1>
        <p className="mt-2 text-slate-700">
          Academic contact and institutional details.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm [animation-delay:0.1s]">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f5ca9]">
            <Mail size={16} />
            Email
          </p>
          <p className="mt-2 text-sm text-slate-700">{profile.email}</p>
        </article>

        <article className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm [animation-delay:0.15s]">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f5ca9]">
            <School size={16} />
            Institution
          </p>
          <p className="mt-2 text-sm text-slate-700">{profile.institution}</p>
        </article>

        <article className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm [animation-delay:0.2s]">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f5ca9]">
            <MapPin size={16} />
            Address
          </p>
          <p className="mt-2 text-sm text-slate-700">{profile.address}</p>
        </article>
      </div>
    </section>
  )
}

export default ContactPage
