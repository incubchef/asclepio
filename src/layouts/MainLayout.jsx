  import { useState } from 'react'
  import { NavLink, Outlet, useLocation } from 'react-router-dom'
  import { useAuth } from '../context/AuthContext.jsx'
  import EvalModal from '../components/EvalModal.jsx'
  import styles from './MainLayout.module.css'

  const NAV = [
    {
      section: 'Principal',
      items: [
        {
          to: '/',
          label: 'Rankings',
          icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="18 20 18 10"/><polyline points="12 20 12 4"/><polyline points="6 20 6 14"/>
            </svg>
          ),
        },
        {
          to: '/feed',
          label: 'Noticias',
          icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 6h16M4 12h16M4 18h7"/>
            </svg>
          ),
        },
        {
          to: '/companies',
          label: 'Compañías',
          icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M9 3v18M3 9h6M3 15h6"/>
            </svg>
          ),
        },
      ],
    },
    {
      section: 'Inversión',
      items: [
        {
          to: '/investments',
          label: 'Oportunidades',
          icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          ),
        },
        {
          to: '/portfolio',
          label: 'Mi Cartera',
          icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
          ),
        },
      ],
    },
  ]

  const ROLE_LABELS = {
    profesional: 'Profesional',
    inversor:    'Inversor',
    empresa:     'Empresa',
  }

  const PAGE_TITLES = {
    '/':            'Rankings',
    '/feed':        'Noticias',
    '/companies':   'Compañías',
    '/investments': 'Oportunidades',
    '/portfolio':   'Mi Cartera',
  }

  export default function MainLayout() {
    const location = useLocation()
    const { user, logout } = useAuth()

    const [evalOpen,      setEvalOpen]      = useState(false)
    const [evalPreselect, setEvalPreselect] = useState(null)
    const [userMenuOpen,  setUserMenuOpen]  = useState(false)

    const pageTitle =
      PAGE_TITLES[location.pathname] ||
      (location.pathname.startsWith('/companies/') ? 'Perfil de compañía' : 'Asclepios')

    function openEval(name = null) {
      setEvalPreselect(name)
      setEvalOpen(true)
    }

    // Empresas cannot access investment section
    const visibleNav = user?.role === 'empresa'
      ? NAV.filter(n => n.section !== 'Inversión')
      : NAV

    return (
      <div className={styles.app}>
        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>
          <div className={styles.logoArea}>
            <div className={styles.logoName}>Asclepios</div>
            <div className={styles.logoSub}>Healthcare Investment</div>
          </div>

          <nav className={styles.nav}>
            {visibleNav.map(({ section, items }) => (
              <div key={section}>
                <div className={styles.navSection}>{section}</div>
                {items.map(({ to, label, icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `${styles.navItem} ${isActive ? styles.navActive : ''}`
                    }
                  >
                    <span className={styles.navIcon}>{icon}</span>
                    {label}
                  </NavLink>
                ))}
              </div>
            ))}
          </nav>

          {/* ── User area with dropdown ── */}
<div
  className={styles.userArea}
  onClick={() => setUserMenuOpen(v => !v)}
  style={{ position: 'relative', overflow: 'visible' }}
>
            <div className={styles.avatar}>{user?.initials ?? '?'}</div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user?.name}</div>
              <div className={styles.userRole}>
                {ROLE_LABELS[user?.role] ?? user?.role}
                {user?.specialty ? ` · ${user.specialty}` : ''}
              </div>
            </div>
            <svg
              width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              style={{
                color: 'var(--text3)',
                flexShrink: 0,
                transform: userMenuOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }}
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>

            {/* Dropdown */}
            {userMenuOpen && (
              <div className={styles.userMenu} onClick={e => e.stopPropagation()}>
                <div className={styles.userMenuHeader}>
                  <div className={styles.userMenuName}>{user?.name}</div>
                  <div className={styles.userMenuEmail}>{user?.email}</div>
                  <span
                    className={styles.planBadge}
                    style={{
                      background: user?.plan === 'Premium'
                        ? 'rgba(245,158,11,0.12)'
                        : 'var(--surface2)',
                      color: user?.plan === 'Premium'
                        ? 'var(--gold2)'
                        : 'var(--text3)',
                    }}
                  >
                    {user?.plan ?? 'Free'}
                  </span>
                </div>
                <div className={styles.userMenuDivider} />
                <button className={styles.userMenuItem} onClick={logout}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* ── Main ── */}
        <div className={styles.main}>
          <header className={styles.topbar}>
            <h1 className={styles.pageTitle}>{pageTitle}</h1>
            <div className={styles.topbarRight}>
              <input className={styles.search} type="text" placeholder="Buscar compañías..." />
              {user?.role !== 'empresa' && (
                <button className="btn btn-outline btn-sm" onClick={() => openEval()}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Evaluar
                </button>
              )}
            </div>
          </header>

          <div className={styles.content}>
            <Outlet context={{ openEval }} />
          </div>
        </div>

        {evalOpen && (
          <EvalModal
            preselect={evalPreselect}
            onClose={() => setEvalOpen(false)}
          />
        )}
      </div>
    )
  }
