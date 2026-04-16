import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { currentUser } from '../mock/data.js'
import EvalModal from '../components/EvalModal.jsx'
import styles from './MainLayout.module.css'
import React from 'react'

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

const PAGE_TITLES = {
  '/': 'Rankings',
  '/feed': 'Noticias',
  '/companies': 'Compañías',
  '/investments': 'Oportunidades',
  '/portfolio': 'Mi Cartera',
  '/profile': 'Perfil',
}

export default function MainLayout() {
  const location = useLocation()
  const [evalOpen, setEvalOpen] = useState(false)
  const [evalPreselect, setEvalPreselect] = useState(null)

  const pageTitle =
    PAGE_TITLES[location.pathname] ||
    (location.pathname.startsWith('/companies/') ? 'Perfil de compañía' : 'Asclepios')

  function openEval(name = null) {
    setEvalPreselect(name)
    setEvalOpen(true)
  }

  return (
    <div className={styles.app}>
      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>
          <div className={styles.logoName}>Asclepios</div>
          <div className={styles.logoSub}>Healthcare Investment</div>
        </div>

        <nav className={styles.nav}>
          {NAV.map(({ section, items }) => (
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

        <div className={styles.userArea}>
          <div className={styles.avatar}>
            {currentUser.initials}
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{currentUser.name}</div>
            <div className={styles.userRole}>
              {currentUser.role} · {currentUser.specialty}
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className={styles.main}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
          <div className={styles.topbarRight}>
            <input className={styles.search} type="text" placeholder="Buscar compañías..." />
            <button className="btn btn-outline btn-sm" onClick={() => openEval()}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Evaluar
            </button>
          </div>
        </header>

        {/* Page content — pass openEval down via context or outlet context */}
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