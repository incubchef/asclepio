import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import styles from './Login.module.css'

const DEMO_USERS = [
  { label: 'Profesional',  email: 'medico@asclepios.io',   color: '#0891b2', icon: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  )},
  { label: 'Inversor',     email: 'inversor@asclepios.io', color: '#3b82f6', icon: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  )},
  { label: 'Empresa',      email: 'empresa@asclepios.io',  color: '#d97706', icon: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  )},
]

const FEATURES = [
  {
    label: 'Evaluación por expertos reales',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round">
        <circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
  {
    label: 'Rankings científicos ponderados',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    label: 'Comunidad privada y confidencial',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
]

export default function Login() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { login, loading, error, clearError } = useAuth()

  const from = location.state?.from?.pathname || '/'

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]   = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const ok = await login(email, password)
    if (ok) navigate(from, { replace: true })
  }

  function fillDemo(demoEmail) {
    clearError()
    setEmail(demoEmail)
    setPassword('demo123')
  }

  return (
    <div className={styles.page}>
      <div className={styles.gridlines} aria-hidden />
      <div className={styles.bgBlob1} aria-hidden />
      <div className={styles.bgBlob2} aria-hidden />
      <div className={styles.bgBlob3} aria-hidden />

      <div className={styles.card}>
        {/* ── Left panel ── */}
        <div className={styles.left}>
          {/* Decorative sparklines */}
          <svg className={styles.sparklines} viewBox="0 0 320 180" preserveAspectRatio="none" aria-hidden>
            <polyline points="0,140 40,120 80,130 120,90 160,100 200,70 240,80 280,55 320,60" fill="none" stroke="#38bdf8" strokeWidth="1.5"/>
            <polyline points="0,160 40,155 80,162 120,145 160,150 200,135 240,140 280,125 320,130" fill="none" stroke="#6366f1" strokeWidth="1"/>
          </svg>

          <div className={styles.brand}>
            <div className={styles.brandMark}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <rect x="8.5" y="3" width="3" height="14" rx="1.5" fill="white" opacity="0.95"/>
                <rect x="3" y="8.5" width="14" height="3" rx="1.5" fill="white" opacity="0.95"/>
                <rect x="14" y="13" width="3" height="5" rx="1" fill="white" opacity="0.5"/>
                <rect x="10" y="15" width="3" height="3" rx="1" fill="white" opacity="0.35"/>
              </svg>
            </div>
            <div>
              <div className={styles.brandName}>Asclepios</div>
              <div className={styles.brandSub}>Healthcare Investment</div>
            </div>
          </div>

          <div className={styles.leftBody}>
            <h2 className={styles.leftTitle}>
              Donde la ciencia<br />
              <em>encuentra al capital.</em>
            </h2>
            <p className={styles.leftDesc}>
              Plataforma cerrada de inversión healthcare. Evaluación científica colaborativa, rankings dinámicos y deal flow curado por expertos del sector.
            </p>
            <div className={styles.divideBar} />
          </div>

          <div className={styles.features}>
            {FEATURES.map(f => (
              <div key={f.label} className={styles.feature}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className={styles.right}>
          <h1 className={styles.formTitle}>Bienvenido</h1>
          <p className={styles.formSub}>Accede a tu cuenta Asclepios</p>

          {/* Demo shortcuts */}
          <div className={styles.demoBox}>
            <div className={styles.demoLabel}>Acceso demo rápido</div>
            <div className={styles.demoBtns}>
              {DEMO_USERS.map(d => (
                <button
                  key={d.email}
                  type="button"
                  className={styles.demoBtn}
                  style={{ '--demo-color': d.color }}
                  onClick={() => fillDemo(d.email)}
                >
                  <span className={styles.demoBtnIcon} style={{ color: d.color }}>{d.icon}</span>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.divider}><span>o accede con tu cuenta</span></div>

          <form className={styles.form} onSubmit={handleSubmit}>
            {error && <div className={styles.errorBox}>{error}</div>}

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="tu@email.com"
                value={email}
                onChange={e => { clearError(); setEmail(e.target.value) }}
                required
                autoComplete="email"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">Contraseña</label>
              <div className={styles.pwWrap}>
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  className={styles.input}
                  placeholder="········"
                  value={password}
                  onChange={e => { clearError(); setPassword(e.target.value) }}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.pwToggle}
                  onClick={() => setShowPw(v => !v)}
                  tabIndex={-1}
                  aria-label={showPw ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPw ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? <span className={styles.spinner} /> : null}
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          <p className={styles.switchLink}>
            ¿No tienes cuenta?{' '}
            <Link to="/register" className={styles.link}>Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  )
}