import { NavLink, Outlet } from 'react-router-dom'
import { profile } from '../data/profile'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
  { to: '/publications', label: 'Publications' },
]

function linkClass({ isActive }) {
  return isActive
    ? 'rounded-full bg-[#1f5ca9] px-4 py-2 text-sm font-semibold text-white'
    : 'rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#1f5ca9] transition hover:bg-[#00afef]/20'
}

function SiteLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-800">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-primary/30 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-brand-accent/35 blur-3xl" />
      </div>

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8 md:px-10 lg:px-16">
        <div className="flex items-center gap-3">
          <NavLink to="/" aria-label="Go to homepage">
            <img
              src={profile.logoUrl}
              alt="Can Tho University logo"
              className="h-12 w-12 rounded-full border border-slate-200 bg-white object-contain p-1"
            />
          </NavLink>
          <div>
            <p className="font-display text-lg font-semibold text-brand-primary">{profile.name}</p>
            <p className="text-sm text-slate-600">{profile.role}</p>
          </div>
        </div>
        <nav className="flex flex-wrap justify-end gap-2">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-12 pt-6 md:px-10 lg:px-16 lg:pb-16">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200/80 bg-white/80">
        <div className="mx-auto w-full max-w-6xl px-6 py-5 text-sm text-slate-600 md:px-10 lg:px-16">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default SiteLayout
